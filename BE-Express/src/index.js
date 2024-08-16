const express = require('express');
const apiRoutes = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 3000;

//Enable CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

// Middleware to parse JSON requests data
app.use(express.json());

// Routes
app.use('/api', apiRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});