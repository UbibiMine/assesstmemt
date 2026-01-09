const pool = require('../config/database');

// Get all classes
exports.getAllClasses = async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [classes] = await connection.query(`
      SELECT c.*, co.course_desc 
      FROM class c 
      JOIN course co ON c.course_id = co.course_id 
      ORDER BY c.class_id
    `);
    connection.release();
    res.json(classes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Search classes
exports.searchClasses = async (req, res) => {
  const { query } = req.query;
  try {
    const connection = await pool.getConnection();
    const [classes] = await connection.query(`
      SELECT c.*, co.course_desc 
      FROM class c 
      JOIN course co ON c.course_id = co.course_id 
      WHERE c.class_desc LIKE ? OR c.class_id LIKE ?
      ORDER BY c.class_id
    `, [`%${query}%`, `%${query}%`]);
    connection.release();
    res.json(classes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create class
exports.createClass = async (req, res) => {
  const { course_id, class_desc } = req.body;
  try {
    const connection = await pool.getConnection();
    // Check if class already exists
    const [existing] = await connection.query(
      'SELECT * FROM class WHERE course_id = ? AND class_desc = ?',
      [course_id, class_desc]
    );
    if (existing.length > 0) {
      connection.release();
      return res.status(400).json({ message: 'Class already exists' });
    }
    const [result] = await connection.query(
      'INSERT INTO class (course_id, class_desc) VALUES (?, ?)',
      [course_id, class_desc]
    );
    connection.release();
    res.status(201).json({ class_id: result.insertId, course_id, class_desc });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update class
exports.updateClass = async (req, res) => {
  const { course_id, class_desc } = req.body;
  try {
    const connection = await pool.getConnection();
    await connection.query(
      'UPDATE class SET course_id = ?, class_desc = ? WHERE class_id = ?',
      [course_id, class_desc, req.params.id]
    );
    connection.release();
    res.json({ class_id: req.params.id, course_id, class_desc });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete class
exports.deleteClass = async (req, res) => {
  try {
    const connection = await pool.getConnection();
    await connection.query('DELETE FROM class WHERE class_id = ?', [req.params.id]);
    connection.release();
    res.json({ message: 'Class deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
