const express = require('express');

const mongoose = require('mongoose');

const app = express();

const cors = require('cors');

mongoose.connect('mongodb+srv://charles:test123@gql-ninja-xkf9r.mongodb.net/test?retryWrites=true&w=majority');
mongoose.connection.once('open', () => {
    console.log('connected to mongodb Atlas');
});

// require express-graphql as graphqlHTTP
const graphqlHTTP = require('express-graphql');

const schema = require('./Schema/Schema.js');



// allow cross origin request.
app.use(cors());

app.use("/graphql", graphqlHTTP({
    schema,
    graphiql: true // use the graphiql tool
}));

app.listen(4000, () => {
    console.log("Now listening for requests on port 4000");
});

