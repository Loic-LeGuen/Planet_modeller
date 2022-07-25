const mongoose = require('mongoose');
const dbName = "planet_templates";

mongoose.connect(`mongodb://localhost/${dbName}`,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(()=> console.log(`Establshed a connection to ${dbName} database :)`))
    .catch((err) => console.log(`something went wrong while connecting  ${dbName} database :( `, err));