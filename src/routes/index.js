const { Router } = require('express');
const { QueryTypes } = require('sequelize');


const router = Router();

//rutas acá

router.use('/', (req, res) => {
  res.status(404).send('Página no encontrada');
});

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = router;
