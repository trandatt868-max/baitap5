// Chạy bằng: node seed.js
require('dotenv').config();

const mongoose = require('mongoose');
const Product = require('./models/productModel');

const products = [
  { name: 'Bánh kem dâu', price: 350000, image: 'banhkem-dau.jpg', tag: 'new', type: 'new' },
  { name: 'Bánh su kem cà phê', price: 120000, image: 'banh-su-kem-ca-phe-1.jpg', tag: 'sale', type: 'new' },
  { name: 'Cupcake', price: 45000, image: 'cupcake.jpg', type: 'new' },
  { name: 'Crepe chocolate', price: 60000, image: 'crepe-chocolate.jpg', type: 'new' },
  { name: 'Mango mousse cake', price: 280000, image: 'mango-mousse-cake.jpg', tag: 'hot', type: 'top' },
  { name: 'Matcha mousse', price: 260000, image: 'MATCHA-MOUSSE.jpg', tag: 'sale', type: 'top' },
  { name: 'Macaron', price: 90000, image: 'Macaron9.jpg', type: 'top' },
  { name: 'Pizza Miami', price: 150000, image: 'pizza-miami.jpg', type: 'top' },
  { name: 'Fruit cake', price: 320000, image: 'Fruit-Cake.jpg', tag: 'hot', type: 'top' },
  { name: 'Bánh trái cây', price: 200000, image: 'banhtraicay.jpg', type: 'top' },
  { name: 'Crepe Pháp', price: 70000, image: 'crepe-phap.jpg', type: 'top' },
  { name: 'Su kem dâu', price: 55000, image: 'sukemdau.jpg', type: 'top' }
];

async function seed() {
  if (!process.env.MONGO_URI) {
    throw new Error('Thiếu MONGO_URI trong file .env');
  }

  await mongoose.connect(process.env.MONGO_URI);
  const operations = products.map(product => ({
    updateOne: {
      filter: { name: product.name, type: product.type },
      update: { $setOnInsert: product },
      upsert: true
    }
  }));
  const result = await Product.bulkWrite(operations);

  console.log(`✅ Đã thêm ${result.upsertedCount} sản phẩm mới; dữ liệu hiện có được giữ nguyên.`);
}

seed()
  .catch(error => {
    console.error('❌ Lỗi seed:', error.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }
  });