const Planet = require('../models/planet.model');

module.exports = {
    createPlanet: (req,res) =>{
        Planet.create(req.body)
            .then((newPlanet)=>{
                console.log(newPlanet);
                res.json(newPlanet);
            })
            .catch((err)=>{
                console.log(err);
                res.status(400).json({err});
            })
    },

    getAllPlanets: (req,res) =>{
        Planet.find({})
        .then((planets) => {
            console.log(planets);
            res.json(planets);
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json({err});
        })
    },

    getOnePlanet : (req,res)=>{
        Planet.findOne({_id:req.params.id})
            .then((planet)=> {
                console.log([planet]);
                res.json(planet);
            })
            .catch((err)=>{
                console.log(err);
                res.status(400).json({err});
            })
    },

    updateOnePlanet : (req,res)=>{
        Planet.findOneAndUpdate(
            {_id:req.params.id},
            req.body,
            {new:true, runValidators:true}
            )
            .then((updatedPlanet)=> {
                console.log(updatedPlanet);
                res.json(updatedPlanet);
            })
            .catch((err)=>{
                console.log(err);
                res.status(400).json({err});
            })
    },
    deletePlanet : (req,res)=>{
        Planet.deleteOne({_id:req.params.id})
            .then((deleteconfirmation)=> {
                console.log(deleteconfirmation);
                res.json(deleteconfirmation);
            })
            .catch((err)=>{
                console.log(err);
                res.status(400).json({err});
            })
    }
}