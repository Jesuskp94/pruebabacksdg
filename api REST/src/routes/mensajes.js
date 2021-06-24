const { Router } = require('express');
const router = Router();
const usuarios = require('../res/usuarios.json');



/**
 * Petición POST que manda un mensaje a todos los usuarios que están subscritos
 * @param {mensaje: "cuerpo del mensaje"}
 * @return respuesta 
 */
 router.post('/', (req, res) => {
  const mensaje = req.body.mensaje;
  console.log(mensaje);

  if(mensaje) {
    if(mandarMensaje(mensaje)) {
      res.status(200).json({respuesta: "Todos los mensajes se han mandado con éxito"});
    } else {
      res.status(400).json({respuesta: "El mensaje no se ha podido mandar, no hay usuarios subscritos"});
    }
  } else {
    res.status(422).json({respuesta: "No hay texto en el mensaje."});
  }
})


//Implementar cuando desee crear una persistencia de mensajes
// /**
//  * Petición GET que devuelve todas las subscripciones
//  * @return número de susbscripciones actualmente
//  */
// router.get('/', (req, res) => {
  
//   res.json("mensajes");
// })



//Métodos auxiliares
function mandarMensaje(mensaje)
{
  //********************************************************************************************************Preguntar si esta solución es mejorable (hay dos bucles...)
  var usuariosSubscritos = getUsuariosSubscritos();

  if(usuariosSubscritos.length > 0) {
    for (let contador = 0; contador < usuariosSubscritos.length; contador++) {
      //TODO: implementar envio a los destinatarios
      console.log('Mensaje enviado a ' + usuariosSubscritos[contador].nickname);
    }
    return true;
  }
  return false;
}
function getUsuariosSubscritos() {
  var arrayRespuesta = [];

  usuarios.forEach((usuario) => {
    if(usuario.subscrito) {
      arrayRespuesta.push(usuario);
    }
  });

  return arrayRespuesta;
}

module.exports = router;