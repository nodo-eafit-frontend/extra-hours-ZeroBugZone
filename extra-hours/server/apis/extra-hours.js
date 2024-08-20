require('dotenv').config();
const calcularHorasExtras = require('../utils/calculo-horas');
const { readJsonFile } = require('../utils/json-reader');
const fs = require('fs').promises;

const getExtraHours = async (req, res) => {
  try {
    const reportData = await readJsonFile(process.env.JSON_Horas_Extras_INFO);
    const { empleadoId } = req.params;
    const result = reportData.filter(eh => eh.empleadoId === parseInt(empleadoId));
    if (result && result[0]) {
      res.status(200).json(result[0]);
    } else {
      res.status(200).json({})
    }
  } catch (error) {
    res.status(400).json({ message: 'Error al obtener las horas extra', error: error.message });
  }
};

const getAllExtraHour = async (req, res) => {
  try {
    const reportData = await readJsonFile(process.env.JSON_Horas_Extras_INFO);
    res.status(200).json(reportData);
  } catch (error) {
    res.status(400).json({ message: 'Error al obtener las horas extra', error: error.message });
  }
};

const createOrUpdateExtraHour = async (req, res) => {
  try {
    const config = await readJsonFile(process.env.JSON_Horas_Extras_Config);
    const empleados = await readJsonFile(process.env.JSON_Empleados_INFO);
    const reportData = await readJsonFile(process.env.JSON_Horas_Extras_INFO);
    
    const horasExtrasEmpleado = req.body;
    
    const empleado = empleados.find(e => e.id === horasExtrasEmpleado.empleadoId);
    const salario = empleado.salario;
    calcularHorasExtras(horasExtrasEmpleado, salario, config);

    
    const index = reportData.findIndex(eh => eh.empleadoId === parseInt(horasExtrasEmpleado.empleadoId));
    if (index !== -1) {
      reportData[index] = { ...reportData[index], ...horasExtrasEmpleado };
    }else {
      reportData.push(horasExtrasEmpleado);
    }
    await fs.writeFile(process.env.JSON_Horas_Extras_INFO, JSON.stringify(reportData, null, 2));
    res.status(201).json(horasExtrasEmpleado);

  } catch (error) {
    console.log(error);
    res.status(400).json({ message: 'Error al crear hora extra', error: error.message });
  }
};

const deleteExtraHour = async (req, res) => {
  try {
    const { id_registro } = req.params;
    const reportData = await readJsonFile(process.env.JSON_Horas_Extras_INFO);
    const index = reportData.findIndex(eh => eh.id_registro === parseInt(id_registro));
    if (index !== -1) {
      const deletedExtraHour = reportData.splice(index, 1)[0];
      await fs.writeFile(process.env.JSON_Horas_Extras_INFO, JSON.stringify(reportData, null, 2));
      res.status(200).json(deletedExtraHour);
    } else {
      res.status(404).json({ message: 'Hora extra no encontrada' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Error al eliminar hora extra', error: error.message });
  }
};

module.exports = {
  getExtraHours,
  getAllExtraHour,
  createOrUpdateExtraHour,
  deleteExtraHour,
};