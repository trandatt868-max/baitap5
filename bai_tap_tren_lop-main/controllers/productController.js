const Product = require('../models/productModel');
const { banners } = require('../models/siteData');

exports.getHomePage = async (req, res, next) => {
  try {
    const [newProducts, topProducts] = await Promise.all([
      Product.find({ type: 'new' }).sort({ createdAt: -1 }).lean(),
      Product.find({ type: 'top' }).sort({ createdAt: -1 }).lean()
    ]);

    res.render('layout', {
      title: 'Trang chủ',
      page: 'home',
      active: 'home',
      scripts: ['home'],
      banners,
      newProducts,
      topProducts
    });
  } catch (error) {
    next(error);
  }
};
