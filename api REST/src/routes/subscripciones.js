const { Router } = require('express');
const router = Router();
const usuarios = require('../res/usuarios.json');

const NO_USER = "El nombre indicado no existe";

/**
 * Petición GET que devuelve todas las subscripciones
 * @return número de susbscripciones actualmente
 */
router.get('/', (req, res) => {
  res.json({"numUsuarios ": getNumUsuariosSubscritos()});
})

/**
 * Petición GET que devuelve el estado de la subscripcion de un usuario
 * @return booleano
 */
 router.get('/:nickname', (req, res) => {
  const nickname = req.params.nickname;
  console.log(nickname);
  var arrayRespuesta = getUsuarioInJSON(nickname);

  //Ésto es muy feo, pero es mejor que volver a recorrer el array (revisar método mandarMensaje() de mensajes.js)
  console.log(arrayRespuesta[0]);

  if(arrayRespuesta) {
    res.json({'nicknameUsuario': arrayRespuesta[0].nickname});
  } else  {
    res.status(400).json({respuesta: NO_USER});
  }
})

/**
 * Solicitud PUT que modifica el estado de la subscripción de un usuario
 * @param String cadena de texto que se refiere al nickname de un usuario (el nickname es clave primaria)
 * @return usuario
 */
 router.put('/:nickname/:subscripcion', (req, res) => {
  const nickname = req.params.nickname;
  const subscripcion = req.params.subscripcion;

  var arrayRespuesta = getUsuarioInJSON(nickname);

  if(arrayRespuesta) {
    let pos = usuarios.indexOf(arrayRespuesta[0]);
    usuarios[pos].subscrito = subscripcion;
    res.json({
      'nicknameUsuario': arrayRespuesta[0].nickname,
      'subscripcionUsuario': subscripcion
    });
  } else {
    res.status(400).json({respuesta: NO_USER});
  }
})



//Métodos auxiliares
function getNumUsuariosSubscritos() {
  var respuesta = 0;

  usuarios.forEach((usuario) => {
    if(usuario.subscrito) {
      respuesta++;
    }
  });

  return respuesta;
}

function getUsuarioInJSON(nickname) {
  var arrayRespuesta = [];

  usuarios.forEach((usuario) => {
    if(usuario.nickname === nickname) {
      arrayRespuesta.push(usuario);
    }
  });

  return arrayRespuesta;
}


module.exports = router;