const express = require('express');

const mongoose = require('mongoose');

const app = express();

const cors = require('cors');

mongoose.connect('mongodb+srv://charles:N6qGQfrglAYmKZUH@gql-ninja-xkf9r.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});
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

app.use(express.static('client/build'));


if(process.env.NODE_ENV === 'production'){
    const path = require('path');
    app.get('/*', (req, res) => {
        console.log('works');
        res.sendFile(path, resolve(__dirname, '../client', 'build', 'index.html'));
    })
}

// create application port on development
const port = process.env.PORT || 3001;

// listen for connection
app.listen(port, ()=> {
    console.log(`SERVER RUNNING ON PORT ${port}`);
});

