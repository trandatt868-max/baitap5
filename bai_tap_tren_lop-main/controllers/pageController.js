exports.about = (req, res) => {
    res.render('layout', {
        title: 'Giới thiệu',
        page: 'about',
        active: 'about',
        scripts: ['about']
    });
};

exports.contact = (req, res) => {
    res.render('layout', {
        title: 'Liên hệ',
        page: 'contact',
        active: 'contact',
        scripts: []
    });
};
