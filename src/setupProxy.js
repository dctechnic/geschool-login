const proxy = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(proxy('/_api', { target: 'https://student.geschool.net' }));
    app.use(proxy('/p/', { target: 'https://student.geschool.net' }));
    app.use(proxy('/r3/', { target: 'https://student.geschool.net' }));
};

// module.exports = function(app) {
//     app.use(proxy('/_api', { target: 'https://teach.geschool.net/',  secure: false, }));
//     app.use(proxy('/p/', { target: 'https://teach.geschool.net/',  secure: false, }));
// }; 