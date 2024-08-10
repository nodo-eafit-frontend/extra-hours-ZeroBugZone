/*require('dotenv').config();
const { readJsonFile } = require('../utils/json-reader');
const xlsx = require('xlsx');

const exportReport = async (req, res) => {
  try {
    const [reportData, empleadosData, configData] = await Promise.all([
      readJsonFile(process.env.JSON_REPORT_INFO),
      readJsonFile(process.env.JSON_EMPLEADOS_INFO),
      readJsonFile(process.env.JSON_CONFIG_INFO)
    ]);

    const workbook = xlsx.utils.book_new();
    
    // Hoja de reporte
    const reportSheet = xlsx.utils.json_to_sheet(reportData.map(r => ({
      ID: r.id,
      Fecha: r.Fecha,
      'Horas Diurnas': r.hours.diurna,
      'Horas Nocturnas': r.hours.nocturna,
      'Horas Diurnas Festivas': r.hours.diurnaFestiva,
      'Horas Nocturnas Festivas': r.hours.nocturnaFestiva
    })));
    xlsx.utils.book_append_sheet(workbook, reportSheet, 'Reporte');

    // Hoja de empleados
    const empleadosSheet = xlsx.utils.json_to_sheet(empleadosData);
    xlsx.utils.book_append_sheet(workbook, empleadosSheet, 'Empleados');

    // Hoja de configuración
    const configSheet = xlsx.utils.json_to_sheet([configData]);
    xlsx.utils.book_append_sheet(workbook, configSheet, 'Configuración');

    const buffer = xlsx.write(workbook, { type: 'buffer', bookType: 'xlsx' });
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=reporte-horas-extra.xlsx');
    res.status(200).send(buffer);
  } catch (error) {
    res.status(400).json({ message: 'Error al generar el reporte', error: error.message });
  }
};

module.exports = {
  exportReport,
};*/