//Rutas
const { Router } = require('express');
const router = Router();

/**
 * Comprueba funcionamiento de las peticiones GET
 * @returns JSON de prueba
 */
router.get('/', (req, res) => {
  const data = {
    "name": "pepe",
    "status": "ok"
  } 
  res.json(data);
})

module.exports = router;