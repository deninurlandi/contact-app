const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/Deni');

// // menambah satu data
// const contact1 = new Contact({
//   nama: 'deni nurlandi',
//   email: 'deninur@gmail',
//   nohp: '08123456789',
// });

// // simpan ke collection
// contact1.save().then((resolve) => {
//   console.log(resolve);
// });
