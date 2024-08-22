const express = require('express');
const { getEmpleadoInfo, getAllEmpleados } = require('../apis/get_empleados');
const {getExtraHours, getAllExtraHour, createOrUpdateExtraHour, deleteExtraHour} = require('../apis/extra-hours');
const { exportReport} = require('../apis/export');


const router = express.Router();

router.get('/getEmpleados/', getAllEmpleados);
router.get('/getEmpleadoInfo/:id', getEmpleadoInfo);
router.get('/extra-hours/:empleadoId', getExtraHours);
router.get('/getAllExtraHours/', getAllExtraHour);
router.post('/extra-hours/:empleadoId', createOrUpdateExtraHour);
router.delete('/extra-hours/:id_registro', deleteExtraHour);
router.get('/excel', exportReport);
module.exports = router;