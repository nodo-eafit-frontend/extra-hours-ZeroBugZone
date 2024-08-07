const express = require('express');
const { getStats, postStats } = require('../apis/stats');
const { getEmpleadoInfo } = require('../apis/get_empleados');
// const { getTipsInfo } = require('') // TODO: completar
const { getTest} = require('../apis/export');





const router = express.Router();

router.get('/test', getTest);



router.get('/getEmpleadoInfo', getEmpleadoInfo);

router.get('/stats', getStats);
router.post('/stats', postStats);

// router.get(); // TODO: Agregar API con su respectivo método

module.exports = router;
 