const express = require('express');
const app = express();
const authRoutes = require('./routes/auth');
const analyticsRoutes = require('./routes/analytics');
const orderRoutes = require('./routes/order');
const categoryRoutes = require('./routes/category');
const positionRoutes = require('./routes/position');

app.use('/api/auth', authRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/position', positionRoutes);


module.exports = app;