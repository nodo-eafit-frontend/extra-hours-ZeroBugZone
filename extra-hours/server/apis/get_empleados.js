require('dotenv').config();
const { readJsonFile } = require('../utils/json-reader');

const getEmpleadoInfo = async (req, res) => {
  try {
    const empleadosData = await readJsonFile(process.env.JSON_EMPLEADOS_INFO);
    const { id } = req.params;
    const empleado = empleadosData.find(emp => emp.id === parseInt(id));
    
    if (empleado) {
      res.status(200).json({
        nombre: empleado.nombre,
        cargo: empleado.cargo,
        supervisor: empleado.supervisor,
        salario: empleado.salario
      });
    } else {
      res.status(404).json({ message: 'Empleado no encontrado' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Error al obtener información del empleado', error: error.message });
  }
};


const getAllEmpleados = async (req, res) => {
  try {
    const empleadosData = await readJsonFile(process.env.JSON_EMPLEADOS_INFO);
    if (empleadosData) {
      res.status(200).json(empleadosData);
    } else {
      res.status(404).json({ message: 'Empleados no encontrado' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Error al obtener información del empleado', error: error.message });
  }
};

module.exports = {
  getEmpleadoInfo, getAllEmpleados
};