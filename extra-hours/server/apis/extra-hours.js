require('dotenv').config();
const { readJsonFile } = require('../utils/json-reader');
const fs = require('fs').promises;

const getExtraHours = async (req, res) => {
  try {
    const reportData = await readJsonFile(process.env.JSON_Horas_Extras_INFO);
    const { id } = req.params;
    const result = reportData.filter(eh => eh.id_empleado === parseInt(id));
    res.status(200).json(result);
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

const createExtraHour = async (req, res) => {
  try {
    const reportData = await readJsonFile(process.env.JSON_Horas_Extras_INFO);
    const newExtraHour = req.body;
    newExtraHour.id_registro = reportData.length + 1;
    reportData.push(newExtraHour);
    await fs.writeFile(process.env.JSON_Horas_Extras_INFO, JSON.stringify(reportData, null, 2));
    res.status(201).json(newExtraHour);
  } catch (error) {
    res.status(400).json({ message: 'Error al crear hora extra', error: error.message });
  }
};

const updateExtraHour = async (req, res) => {
  try {
    const { id } = req.params;
    const reportData = await readJsonFile(process.env.JSON_Horas_Extras_INFO);
    const index = reportData.findIndex(eh => eh.id === parseInt(id));
    if (index !== -1) {
      reportData[index] = { ...reportData[index], ...req.body };
      await fs.writeFile(process.env.JSON_Horas_Extras_INFO, JSON.stringify(reportData, null, 2));
      res.status(200).json(reportData[index]);
    } else {
      res.status(404).json({ message: 'Hora extra no encontrada' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar hora extra', error: error.message });
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
  createExtraHour,
  updateExtraHour,
  deleteExtraHour,
};