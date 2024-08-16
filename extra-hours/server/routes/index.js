const express = require('express');
const { getEmpleadoInfo, getAllEmpleados } = require('../apis/get_empleados');
const {getExtraHours, getAllExtraHour, createExtraHour, updateExtraHour, deleteExtraHour} = require('../apis/extra-hours');
const { exportReport} = require('../apis/export');


const router = express.Router();

router.get('/getEmpleados/', getAllEmpleados);
router.get('/getEmpleadoInfo/:id', getEmpleadoInfo);
router.get('/extra-hours/:id', getExtraHours);

router.get('/getAllExtraHours/', getAllExtraHour);
router.post('/extra-hours/', createExtraHour);
router.put('/extra-hours/:id_registro', updateExtraHour);
router.delete('/extra-hours/:id_registro', deleteExtraHour);
router.get('/export', exportReport);
module.exports = router;