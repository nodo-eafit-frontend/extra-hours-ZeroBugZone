/*require('dotenv').config();
const { readJsonFile } = require('../utils/json-reader');
// const gameInfoJSON = require('../data/game-info.json');

const EmpleadoInfo = async (request, response) => {
	try {
		const empleadoInfoJSON = await readJsonFile(process.env.JSON_Empleados_INFO); 
        		response.status(200).send(empleadoInfoJSON);
	} catch (error) {
		response.status(400);
	}
};

module.exports = {
	getEmpleadoInfo,
};
*/
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

module.exports = {
  getEmpleadoInfo,
};