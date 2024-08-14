const express = require('express');
const { getEmpleadoInfo } = require('../apis/get_empleados');
const {getExtraHours, createExtraHour, updateExtraHour, deleteExtraHour} = require('../apis/extra-hours');
const { exportReport} = require('../apis/export');


const router = express.Router();

router.get('/getEmpleadoInfo/:id', getEmpleadoInfo);
router.get('/extra-hours/:id', getExtraHours);
router.post('/extra-hours/', createExtraHour);
router.put('/extra-hours/:id_registro', updateExtraHour);
router.delete('/extra-hours/:id_registro', deleteExtraHour);
router.get('/export', exportReport);
module.exports = router;