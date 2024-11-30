const db = require('../config/db');
const calDistance = require('../utils/distanceCalculator');

// Add School
exports.addSchool = (req, res) => {
    const { name, address, latitude, longitude } = req.body;

    if (!name || !address || !latitude || !longitude) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const sql = 'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)';
    db.query(sql, [name, address, latitude, longitude], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'School added successfully', id: result.insertId });
    });
};

// List Schools
exports.listSchools = (req, res) => {
    const { latitude, longitude } = req.query;

    if (!latitude || !longitude) {
        return res.status(400).json({ error: 'Latitude and longitude are required' });
    }

    const sql = 'SELECT * FROM schools';
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        const sortedSchools = results.map((school) => ({
            ...school,
            distance: calDistance(latitude, longitude, school.latitude, school.longitude).toFixed(4),
        })).sort((a, b) => a.distance - b.distance);

        res.json(sortedSchools);
    });
};
