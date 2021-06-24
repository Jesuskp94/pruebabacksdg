const { Router } = require('express');
const express = require('express');
const jwt = require('jsonwebtoken');

const config = require('../configs/config');
const usuarios = require('../res/usuarios.json');

const router = Router();
const app = express();

//configuraciones previas
app.set('llave', config.llave);
app.use(express.urlencoded({extended: false}));


//Solicitud validación
router.post('/', (req, res) => {
  const usuarioCliente = req.body.user;
  const contrasenaCliente = req.body.password;

  console.log(usuarioCliente, contrasenaCliente);

  var validacion = false;

  usuarios.forEach((usuario) => {
    if(usuarioCliente === usuario.nickname && contrasenaCliente === usuario.password) {
      validacion = true;
      console.log(validacion);
      return
    }
  });

  if(validacion) {
    const payload = {
      check:  true
    };
    console.log("La validacion del usuario es: " + payload.check);
    const token = jwt.sign(payload, app.get('llave'), {
      expiresIn: 1440
    });
    res.json({
      mensaje: 'Autenticación correcta',
      token: token
    });
  } else {
      res.status(401).json({ mensaje: "Usuario o contraseña incorrectos"})
  }
})

module.exports = router;