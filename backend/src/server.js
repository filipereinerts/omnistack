const express  = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const socketio = require('socket.io');
const http = require('http');

const routes = require('./routes');

const app = express();
const server  = http.Server(app);
const io = socketio(server);

mongoose.connect('mongodb+srv://omnistack:omnistack@omnistack-gabpk.mongodb.net/omnistack?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//Fazer com redis no futuro
const connectUsers = {};

io.on('connection', socket => {

    const { user_id } = socket.handshake.query;
    
    connectUsers[user_id] = socket.id;

});

//Desta maneira, funciona como um middleware (tudo passa por aqui)
app.use((request, response, next) => {

    //Colocando nosso io pra todos os requests
    request.io = io;
    request.connectUsers = connectUsers;

    return next();

});

app.use(cors());
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(routes);
server.listen(4000);