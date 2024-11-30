const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const schoolRoutes = require('./routes/school');

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Routes

app.use('/api', schoolRoutes);

const PORT = process.env.PORT ;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
