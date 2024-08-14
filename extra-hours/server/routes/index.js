const express = require('express');
const { getEmpleadoInfo } = require('../apis/get_empleados');
const {getExtraHours, createExtraHour, updateExtraHour, deleteExtraHour} = require('../apis/extra-hours');


const router = express.Router();

router.get('/getEmpleadoInfo/:id', getEmpleadoInfo);
router.get('/extra-hours/:id', getExtraHours);
router.post('/extra-hours', createExtraHour);
router.put('/extra-hours/:id', updateExtraHour);
router.delete('/extra-hours/:id', deleteExtraHour);

module.exports = router;