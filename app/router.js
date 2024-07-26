const { Router } = require('express');
const router = Router();
const controller = require('./controller/controller');

router.get('/', (request, response) => {
  response.render('index')
});

router.get('/aria', (request, response) => {
  response.render('aria', controller.createPageContent(aria))
});

router.get('/poudlard', (request, response) => {
  response.render('poudlard')
});

router.get('/pathfinder', (request, response) => {
  response.render('pathfinder')
});

module.exports = router;