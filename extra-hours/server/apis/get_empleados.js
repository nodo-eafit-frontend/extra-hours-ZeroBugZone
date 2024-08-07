require('dotenv').config();
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
