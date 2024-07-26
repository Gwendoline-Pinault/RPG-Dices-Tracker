const express = require('express');
const router = require('./app/router.js');
const app = express();

app.set('view engine', 'ejs');
app.set('views', './app/views');

app.use(express.static('./public'));
app.use(express.urlencoded({extended: true}));
app.use(router);
app.listen(3000, () => {console.log('http://localhost:3000')})