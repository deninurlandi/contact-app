const express = require('express');
const expressLayout = require('express-ejs-layouts');
const { check, body, validationResult } = require('express-validator');
const methodOverride = require('method-override');

require('./utils/db');
const Contact = require('./model/contact');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(expressLayout);
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.get('/', (req, res) => {
  res.render('index', {
    title: 'home',
    layout: './layout/main-layout',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'halaman about',
    layout: './layout/main-layout',
  });
});

app.get('/contact', async (req, res) => {
  const contacts = await Contact.find();
  res.render('contact', {
    title: 'halaman contact',
    layout: './layout/main-layout',
    contacts,
  });
  // Contact.find().then((resolve) => {
  //   res.send(resolve);
  // });
});

app.post(
  '/contact',
  [
    body('nama').custom(async (value) => {
      const duplikat = await Contact.findOne({ nama: value }).maxTimeMS(30000);
      if (duplikat) {
        throw new Error('nama contact sudah ada');
      }
      return true;
    }),
    check('email', 'email anda tidak valid').isEmail(),
    check('nohp', 'no HP anda tidak valid').isMobilePhone('id-ID'),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render('add-contact', {
        title: 'halaman tambah contact',
        layout: './layout/main-layout',
        errors: errors.array(),
      });
    } else {
      Contact.insertMany(req.body);
      res.redirect('/contact');
    }
  },
);

app.get('/contact/add', (req, res) => {
  res.render('add-contact', {
    title: 'halaman tambah contact',
    layout: './layout/main-layout',
  });
});

app.get('/contact/change/:nama', async (req, res) => {
  const contact = await Contact.findOne({ nama: req.params.nama });
  if (!contact) {
    res.status(404);
    res.send('<h1>404</h1>');
  } else {
    res.render('ubah-contact', {
      title: 'halaman ubah contact',
      layout: './layout/main-layout',
      contact,
    });
  }
});

app.put(
  '/contact',
  [
    body('nama').custom(async (value, { req }) => {
      const duplikat = await Contact.findOne({ nama: value });
      if (value !== req.body.oldNama && duplikat) {
        throw new Error('nama contact sudah ada');
      }
      return true;
    }),
    check('email', 'email anda tidak valid').isEmail(),
    check('nohp', 'no HP anda tidak valid').isMobilePhone('id-ID'),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render('ubah-contact', {
        title: 'halaman tambah contact',
        layout: './layout/main-layout',
        errors: errors.array(),
        contact: req.body,
      });
    } else {
      Contact.updateOne(
        { _id: req.body._id },
        {
          $set: {
            nama: req.body.nama,
            email: req.body.email,
            nohp: req.body.nohp,
          },
        },
      ).then((result) => {
        res.redirect('/contact');
      });
    }
  },
);

app.delete('/contact', (req, res) => {
  Contact.deleteOne({ nama: req.body.nama }).then((result) => {
    res.redirect('/contact');
  });
});

app.get('/contact/:nama', async (req, res) => {
  const contact = await Contact.findOne({ nama: req.params.nama });
  res.render('detail', {
    title: 'halaman detail contact',
    layout: './layout/main-layout',
    contact,
  });
});

app.listen(port, () => {
  console.log('server running on port http://localhost:' + port);
});
