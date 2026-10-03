const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const routes = require('./routes/index');

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error('MONGO_URI is missing. Set it in the .env file before starting the app.');
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/', routes);

app.use((req, res) => {
  res.status(404).send('Trang bạn yêu cầu không tồn tại.');
});

app.use((error, req, res, next) => {
  console.error('❌ Request failed:', error);
  if (res.headersSent) {
    return next(error);
  }
  res.status(500).send('Đã xảy ra lỗi khi xử lý yêu cầu.');
});

async function startServer() {
  await mongoose.connect(MONGO_URI);
  console.log(`✅ MongoDB connected: ${mongoose.connection.name}`);

  app.listen(PORT, () => {
    console.log(`Server chạy tại http://localhost:${PORT}`);
  });
}

startServer().catch(error => {
  console.error('❌ Could not connect to MongoDB. Check that MongoDB is running and MONGO_URI is correct.');
  console.error(error);
  process.exitCode = 1;
});
