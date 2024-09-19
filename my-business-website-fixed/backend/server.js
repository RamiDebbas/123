
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./utils/db');
const authRoutes = require('./routes/authRoutes');
const estimateRoutes = require('./routes/estimateRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const adminRoutes = require('./routes/adminRoutes');
const { protect, admin } = require('./middleware/authMiddleware');
const path = require('path');
const cors = require('cors');

dotenv.config({ path: './config.env' });
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/estimate', estimateRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/admin', protect, admin, adminRoutes);

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('../frontend/build'));
    app.get('*', (req, res) =>
        res.sendFile(path.resolve(__dirname, '..', 'frontend', 'build', 'index.html'))
    );
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
