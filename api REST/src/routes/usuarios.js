const { Router } = require('express');
const router = Router();
const usuarios = require('../res/usuarios.json');


/**
 * Petición GET que devuelve todas las subscripciones
 * @return número de susbscripciones actualmente
 */
router.get('/', (req, res) => {
  res.status(200).json(usuarios);
})

/**
 * Petición GET que devuelve el estado de la susbcripcion del usuario indicado en la cabecera
 * @param String cadena de texto que se refiere al nick_name de un usuario (el nick_name es clave primaria)
 * @return usuario
 */
 router.get('/:nick_name', (req, res) => {
  const nick_name = req.params.nick_name;

  var respuesta = getUsuarios(nick_name);

  if(respuesta.length > 0) {
    res.status(200).json(respuesta);
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
  const { nick_name, password, subscrito } = req.body;

  var id = usuarios.length + 1;

  if(nick_name && password && subscrito != undefined) {
    if(!isUsuarioInJSON(nick_name)) {
      usuarios.push({id ,nick_name, password, subscrito });
      res.status(201).json({respuesta: "Usuario registrado correctamente"});
    } else {
      res.status(400).json({respuesta: "El usuario no existe"});
    }
  }
  else
  {
    res.status(422).json({respuesta: "Te has dejado de insertar un dato"}); //TODO: cambiar if gurdo por varios para determinar que datos faltan
  }
})

/**
 * DELETE que inserta borra un usuario de la "bbdd"
 * @param nick_name
 * @return si la inserción se ha hecho correctamente o no
 */
 router.delete('/:nick_name', (req, res) => {
  const nick_name = req.params.nick_name;

  var respuesta = getUsuarios(nick_name);

  if(respuesta.length > 0) {
    usuarios.splice(usuarios.indexOf(respuesta[0]), 1);
    res.status(204).json({respuesta: "Usuario borrado con éxito"});
  } else {
    res.status(400).json({respuesta: "El usuario no existe"});
  }
})


//Métodos auxiliares
function getUsuarios(nick_name) {
  var respuesta = [];

  usuarios.forEach((usuario) => {
    if(usuario.nick_name === nick_name) {
      respuesta.push(usuario);
    }
  });

  return respuesta;
}

function isUsuarioInJSON(nick_name) {
  usuarios.forEach((usuario) => {
    if(usuario.nick_name === nick_name) {
      return true;
    }
  });
  return false;  
}


module.exports = router;