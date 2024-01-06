const mongoose = require('mongoose');

// Ganti string koneksi dengan string koneksi MongoDB Atlas yang benar
const mongoUri =
  'mongodb://denipjg14:Deni1409@ac-a7hcrt9-shard-00-00.fwl8r7f.mongodb.net:27017,ac-a7hcrt9-shard-00-01.fwl8r7f.mongodb.net:27017,ac-a7hcrt9-shard-00-02.fwl8r7f.mongodb.net:27017/Kadit?ssl=true&replicaSet=atlas-sx57bn-shard-0&authSource=admin&retryWrites=true&w=majority';

// Terhubung ke MongoDB
mongoose.connect(mongoUri);

// Mendapatkan koneksi default

// const mongoose = require('mongoose');
// mongoose.connect(
//   'mongodb+srv://denipjg14:Deni1409@cluster0.fwl8r7f.mongodb.net/Kadit?retryWrites=true&w=majority',
// );

// const contact1 = new Contact({
//   nama: 'deni nurlandi',
//   email: 'deninur@gmail',
//   nohp: '08123456789',
// });

// // simpan ke collection
// contact1.save().then((resolve) => {
//   console.log(resolve);
// });
