const { Router } = require('express');
const router = Router();
const usuarios = require('../res/usuarios.json');


/**
 * Petición GET que devuelve todas las subscripciones
 * @return número de susbscripciones actualmente
 */
router.get('/', (req, res) => {
  res.json(usuarios);
})

/**
 * Petición GET que devuelve el estado de la susbcripcion del usuario indicado en la cabecera
 * @param String cadena de texto que se refiere al nickname de un usuario (el nickname es clave primaria)
 * @return usuario
 */
 router.get('/:nickname', (req, res) => {
  const nickname = req.params.nickname;

  var respuesta = getUsuarios(nickname);

  if(respuesta.length > 0) {
    res.json(respuesta);
  } else {
    res.status(400).json({respuesta: "El usuario no existe"});
  }
})

/**
 * Request POST que inserta un nuevo usuario en la bbdd
 * @param los datos se pasan dentro del body (revisar datos a insertar)
 * @return si la inserción se ha hecho correctamente o no
 */
 router.post('/', (req, res) => {
  const { nickname, password, subscrito } = req.body;

  var id = usuarios.length + 1;

  if(nickname && password && subscrito != undefined) {
    if(!isUsuarioInJSON(nickname)) {
      usuarios.push({id ,nickname, password, subscrito });
      res.json({respuesta: "usuario registrado correctamente"});
    } else {
      res.status(400).json({respuesta: "El usuario no existe"});
    }
  }
  else
  {
    res.status(400).json({respuesta: "Te has dejado de insertar un dato"}); //TODO: cambiar if gurdo por varios para determinar que datos faltan
  }
})

/**
 * DELETE que inserta borra un usuario de la "bbdd"
 * @param nickname
 * @return si la inserción se ha hecho correctamente o no
 */
 router.delete('/:nickname', (req, res) => {
  const nickname = req.params.nickname;

  var respuesta = getUsuarios(nickname);

  if(respuesta.length > 0) {
    usuarios.splice(usuarios.indexOf(respuesta[0]), 1);
    res.json({respuesta: "Usuario borrado con éxito"});
  } else {
    res.status(400).json({respuesta: "El usuario no existe"});
  }
})


//Métodos auxiliares
function getUsuarios(nickname) {
  var respuesta = [];

  usuarios.forEach((usuario) => {
    if(usuario.nickname === nickname) {
      respuesta.push(usuario);
    }
  });

  return respuesta;
}

function isUsuarioInJSON(nickname) {
  usuarios.forEach((usuario) => {
    if(usuario.nickname === nickname) {
      return true;
    }
  });
  return false;  
}


module.exports = router;