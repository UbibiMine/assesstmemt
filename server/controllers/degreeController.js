const pool = require('../config/database');

// Get all degrees
exports.getAllDegrees = async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [degrees] = await connection.query('SELECT * FROM degree ORDER BY degree_id');
    connection.release();
    res.json(degrees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get degree by ID
exports.getDegreeById = async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [degree] = await connection.query('SELECT * FROM degree WHERE degree_id = ?', [req.params.id]);
    connection.release();
    res.json(degree);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create degree
exports.createDegree = async (req, res) => {
  const { degree_desc } = req.body;
  try {
    const connection = await pool.getConnection();
    // Check if degree already exists
    const [existing] = await connection.query('SELECT * FROM degree WHERE degree_desc = ?', [degree_desc]);
    if (existing.length > 0) {
      connection.release();
      return res.status(400).json({ message: 'Degree already exists' });
    }
    const [result] = await connection.query('INSERT INTO degree (degree_desc) VALUES (?)', [degree_desc]);
    connection.release();
    res.status(201).json({ id: result.insertId, degree_desc });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update degree
exports.updateDegree = async (req, res) => {
  const { degree_desc } = req.body;
  try {
    const connection = await pool.getConnection();
    await connection.query('UPDATE degree SET degree_desc = ? WHERE degree_id = ?', [degree_desc, req.params.id]);
    connection.release();
    res.json({ id: req.params.id, degree_desc });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete degree
exports.deleteDegree = async (req, res) => {
  try {
    const connection = await pool.getConnection();
    await connection.query('DELETE FROM degree WHERE degree_id = ?', [req.params.id]);
    connection.release();
    res.json({ message: 'Degree deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
