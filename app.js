const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const destinasiRoutes = require('./routes/destinasiRoutes');
const { uploadDir } = require('./config/multerConfig');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static(uploadDir));

// Routes
app.use('/api/destinasi', destinasiRoutes);

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Terjadi kesalahan pada server',
    error: err.message
  });
});

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uploadDir: uploadDir
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT,'192.168.191.221', () => {
  console.log(`Server berjalan di port ${PORT}`);
});