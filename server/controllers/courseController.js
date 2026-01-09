const pool = require('../config/database');

// Get all courses
exports.getAllCourses = async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [courses] = await connection.query('SELECT * FROM course ORDER BY course_id');
    connection.release();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Search courses
exports.searchCourses = async (req, res) => {
  const { query } = req.query;
  try {
    const connection = await pool.getConnection();
    const [courses] = await connection.query(`
      SELECT * FROM course 
      WHERE course_desc LIKE ? OR course_id LIKE ?
      ORDER BY course_id
    `, [`%${query}%`, `%${query}%`]);
    connection.release();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create course
exports.createCourse = async (req, res) => {
  const { course_desc } = req.body;
  try {
    const connection = await pool.getConnection();
    // Check if course already exists
    const [existing] = await connection.query(
      'SELECT * FROM course WHERE course_desc = ?',
      [course_desc]
    );
    if (existing.length > 0) {
      connection.release();
      return res.status(400).json({ message: 'Course already exists' });
    }
    const [result] = await connection.query(
      'INSERT INTO course (course_desc) VALUES (?)',
      [course_desc]
    );
    connection.release();
    res.status(201).json({ course_id: result.insertId, course_desc });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update course
exports.updateCourse = async (req, res) => {
  const { course_desc } = req.body;
  try {
    const connection = await pool.getConnection();
    await connection.query(
      'UPDATE course SET course_desc = ? WHERE course_id = ?',
      [course_desc, req.params.id]
    );
    connection.release();
    res.json({ course_id: req.params.id, course_desc });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete course
exports.deleteCourse = async (req, res) => {
  try {
    const connection = await pool.getConnection();
    await connection.query('DELETE FROM course WHERE course_id = ?', [req.params.id]);
    connection.release();
    res.json({ message: 'Course deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
