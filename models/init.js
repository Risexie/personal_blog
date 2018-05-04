var mongoose = require('mongoose');
mongoose.connect('mongodb://192.168.99.100:32769/personal_blog', {
    useMongoClient: true
});
var db = mongoose.connection;
db.on('error', function (err) {
    console.log(err);
});

db.once('open', function () {
    console.log('mongodb connect success!')
});