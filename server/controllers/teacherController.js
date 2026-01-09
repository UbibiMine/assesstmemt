const pool = require('../config/database');

// Get all teachers
exports.getAllTeachers = async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [teachers] = await connection.query('SELECT * FROM teacher ORDER BY teacher_id');
    connection.release();
    res.json(teachers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Search teachers
exports.searchTeachers = async (req, res) => {
  const { query } = req.query;
  try {
    const connection = await pool.getConnection();
    const [teachers] = await connection.query(`
      SELECT * FROM teacher 
      WHERE teacher_Fname LIKE ? OR teacher_Lname LIKE ? OR teacher_id LIKE ?
      ORDER BY teacher_id
    `, [`%${query}%`, `%${query}%`, `%${query}%`]);
    connection.release();
    res.json(teachers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create teacher
exports.createTeacher = async (req, res) => {
  const { teacher_Fname, teacher_Lname } = req.body;
  try {
    const connection = await pool.getConnection();
    // Check if teacher already exists
    const [existing] = await connection.query(
      'SELECT * FROM teacher WHERE teacher_Fname = ? AND teacher_Lname = ?',
      [teacher_Fname, teacher_Lname]
    );
    if (existing.length > 0) {
      connection.release();
      return res.status(400).json({ message: 'Teacher already exists' });
    }
    const [result] = await connection.query(
      'INSERT INTO teacher (teacher_Fname, teacher_Lname) VALUES (?, ?)',
      [teacher_Fname, teacher_Lname]
    );
    connection.release();
    res.status(201).json({ teacher_id: result.insertId, teacher_Fname, teacher_Lname });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update teacher
exports.updateTeacher = async (req, res) => {
  const { teacher_Fname, teacher_Lname, is_active } = req.body;
  try {
    const connection = await pool.getConnection();
    await connection.query(
      'UPDATE teacher SET teacher_Fname = ?, teacher_Lname = ?, is_active = ? WHERE teacher_id = ?',
      [teacher_Fname, teacher_Lname, is_active !== undefined ? is_active : 1, req.params.id]
    );
    connection.release();
    res.json({ teacher_id: req.params.id, teacher_Fname, teacher_Lname, is_active });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Toggle teacher active status
exports.toggleTeacherStatus = async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [teacher] = await connection.query('SELECT is_active FROM teacher WHERE teacher_id = ?', [req.params.id]);
    if (teacher.length === 0) {
      connection.release();
      return res.status(404).json({ message: 'Teacher not found' });
    }
    const newStatus = teacher[0].is_active ? 0 : 1;
    await connection.query('UPDATE teacher SET is_active = ? WHERE teacher_id = ?', [newStatus, req.params.id]);
    connection.release();
    res.json({ message: 'Status updated', is_active: newStatus });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete teacher
exports.deleteTeacher = async (req, res) => {
  try {
    const connection = await pool.getConnection();
    await connection.query('DELETE FROM teacher WHERE teacher_id = ?', [req.params.id]);
    connection.release();
    res.json({ message: 'Teacher deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
