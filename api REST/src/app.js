const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const config = require('./configs/config');

const app = express();


//configuraciones
app.set('port', process.env.PORT || 3000);
app.set('json spaces', 2);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('llave', config.llave);


//Middleware
app.use(morgan('dev'));

  //Middleware para permitir o denegar el acceso a las rutas que no queremos que se acceda indebidamente
  const rutasProtegidas = express.Router(); 

  rutasProtegidas.use((req, res, next) => {
      const token = req.headers['access-token'];

      if (token) {
        jwt.verify(token, app.get('llave'), (err, decoded) => {      
          if (err) {
            return res.json({ mensaje: 'Token inválida' });    
          } else {
            req.decoded = decoded;    
            next();
          }
        });
      } else {
        res.send({ 
            mensaje: 'Token no proveída.' 
        });
      }
  });

app.use(express.json());


//Rutas
app.use('/api/v1/validaciones',require('./routes/validaciones'));
app.use('/api/v1/subscripciones',require('./routes/subscripciones'));
app.use('/api/v1/usuarios', rutasProtegidas, require('./routes/usuarios'));
app.use('/api/v1/mensajes',require('./routes/mensajes'));


//debug
app.use('/api/v1/tests', require('./routes/tests'));
// app.use('/api/v1/tests', rutasProtegidas, require('./routes/index'));


//Levantar el servidor
app.listen(app.get('port'), () => {
  console.log(`Server started on port ${app.get('port')}`);
});