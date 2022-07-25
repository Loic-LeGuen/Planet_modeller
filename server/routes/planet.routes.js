const PlanetController = require('../controllers/planet.controller');

module.exports = (app) =>{
    app.post('/api/planets', PlanetController.createPlanet);
    app.get('/api/planets', PlanetController.getAllPlanets);
    app.get('/api/planets/:id', PlanetController.getOnePlanet);
    app.put('/api/planets/:id',PlanetController.updateOnePlanet);
    app.delete('/api/planets/:id',PlanetController.deletePlanet);
}