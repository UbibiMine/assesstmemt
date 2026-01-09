const pool = require('../config/database');

// Get all students
exports.getAllStudents = async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [students] = await connection.query(`
      SELECT s.*, d.degree_desc 
      FROM students s 
      JOIN degree d ON s.degree_id = d.degree_id 
      ORDER BY s.student_id
    `);
    connection.release();
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Search students
exports.searchStudents = async (req, res) => {
  const { query } = req.query;
  try {
    const connection = await pool.getConnection();
    const [students] = await connection.query(`
      SELECT s.*, d.degree_desc 
      FROM students s 
      JOIN degree d ON s.degree_id = d.degree_id 
      WHERE s.student_FName LIKE ? OR s.student_LName LIKE ? OR s.student_id LIKE ?
      ORDER BY s.student_id
    `, [`%${query}%`, `%${query}%`, `%${query}%`]);
    connection.release();
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create student
exports.createStudent = async (req, res) => {
  const { degree_id, student_FName, student_LName } = req.body;
  try {
    const connection = await pool.getConnection();
    // Check if student already exists
    const [existing] = await connection.query(
      'SELECT * FROM students WHERE degree_id = ? AND student_FName = ? AND student_LName = ?',
      [degree_id, student_FName, student_LName]
    );
    if (existing.length > 0) {
      connection.release();
      return res.status(400).json({ message: 'Student already exists' });
    }
    const [result] = await connection.query(
      'INSERT INTO students (degree_id, student_FName, student_LName) VALUES (?, ?, ?)',
      [degree_id, student_FName, student_LName]
    );
    connection.release();
    res.status(201).json({ student_id: result.insertId, degree_id, student_FName, student_LName });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update student
exports.updateStudent = async (req, res) => {
  const { degree_id, student_FName, student_LName } = req.body;
  try {
    const connection = await pool.getConnection();
    await connection.query(
      'UPDATE students SET degree_id = ?, student_FName = ?, student_LName = ? WHERE student_id = ?',
      [degree_id, student_FName, student_LName, req.params.id]
    );
    connection.release();
    res.json({ student_id: req.params.id, degree_id, student_FName, student_LName });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete student
exports.deleteStudent = async (req, res) => {
  try {
    const connection = await pool.getConnection();
    await connection.query('DELETE FROM students WHERE student_id = ?', [req.params.id]);
    connection.release();
    res.json({ message: 'Student deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
