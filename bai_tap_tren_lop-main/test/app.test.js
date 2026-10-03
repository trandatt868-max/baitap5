const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const ejs = require('ejs');

const root = path.resolve(__dirname, '..');

function findEjsFiles(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    const filePath = path.join(directory, entry.name);
    return entry.isDirectory()
      ? findEjsFiles(filePath)
      : filePath.endsWith('.ejs') ? [filePath] : [];
  });
}

test('product model has a single canonical export', () => {
  assert.equal(
    require('../models/productModel'),
    require('../models/sanphamModel')
  );
});

test('product model accepts valid product documents', async () => {
  const Product = require('../models/productModel');
  const product = new Product({
    name: 'Test cake',
    price: 100000,
    type: 'new'
  });

  await assert.doesNotReject(product.validate());
});

test('product model rejects missing required fields and invalid types', async () => {
  const Product = require('../models/productModel');
  const product = new Product({ name: 'Incomplete cake', price: 100000, type: 'invalid' });

  await assert.rejects(product.validate());
});

test('all EJS templates compile', () => {
  for (const filePath of findEjsFiles(path.join(root, 'views'))) {
    assert.doesNotThrow(() => {
      ejs.compile(fs.readFileSync(filePath, 'utf8'), { filename: filePath });
    }, filePath);
  }
});

test('home page renders each product card exactly once', async () => {
  const product = { name: 'Unique test product', price: 100000, type: 'new' };
  const html = await ejs.renderFile(path.join(root, 'views/layout.ejs'), {
    title: 'Test shop',
    page: 'home',
    active: 'home',
    scripts: [],
    banners: [],
    newProducts: [product],
    topProducts: []
  });

  assert.equal((html.match(/class="single-item product-card"/g) || []).length, 1);
  assert.equal((html.match(/Unique test product/g) || []).length, 4);
});

test('home, about, and contact routes are registered', () => {
  const router = require('../routes');
  const paths = router.stack
    .filter(layer => layer.route)
    .map(layer => layer.route.path);

  assert.deepEqual(paths, ['/', '/about', '/contact']);
});
