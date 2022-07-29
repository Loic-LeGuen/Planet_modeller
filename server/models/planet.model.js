const mongoose = require('mongoose');

const PlanetSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name is required"],
        minLength:[3,"Name must be at least 3 characters"],
    },
    size:{
        type:Number,
        required:[true,"Size is required"],
        min:[12,"Smallest size allowed is 12"],
        max:[25,"Largest size allowed is 25"]
    },
    designation:{
        type:Number,
        required:[true,"Designation Required"]
    },
    industrial_districts:{
        type:Number,
        min:0
    },
    mining_districts:{
        type:Number,
        min:0
    },
    generator_districts:{
        type:Number,
        min:0
    },
    agriculture_districts:{
        type:Number,
        min:0
    },

},
    {timestamps:true}
);

const Planet = mongoose.model("Planet",PlanetSchema);

module.exports = Planet;