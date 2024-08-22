require("dotenv").config();
const { readJsonFile } = require("../utils/json-reader");
const xlsx = require("xlsx");

// Nombres de las hojas de Excel
const SHEET_NAMES = {
  HORAS_EXTRA: "Horas Extra",
  EMPLEADOS: "Empleados",
  CONFIGURACION: "Configuración",
};

// Función para generar la hoja de horas extra
function generateHorasExtraSheet(reportData, empleadosData) {
  const empleadosMap = new Map(empleadosData.map((e) => [e.id, e.nombre]));
  const data = reportData.flatMap((r) =>
    r.horasExtras.map((he) => ({
      'ID Empleado': r.empleadoId,
      'Nombre Empleado': empleadosMap.get(r.empleadoId),
      'Fecha': he.fecha,
      'Tipo Hora': he.tipoHora,
      'Cantidad Horas': he.cantidadHoras,
      'Observaciones': he.observaciones,
      'Valor Hora Extra': r.valorHoraExtra[he.tipoHora],
      'Total Valor Hora Extra': r.totalValorHoraExtra,
      'Cantidad Horas Extra': r.cantidadHorasExtra,
    }))
  );
  console.log(data);
  return xlsx.utils.json_to_sheet(data);
}

// Función para generar la hoja de empleados
function generateEmpleadosSheet(empleadosData) {
  return xlsx.utils.json_to_sheet(empleadosData);
}

// Función para generar la hoja de configuración
function generateConfigSheet(configData) {
  return xlsx.utils.json_to_sheet([configData]);
}

const exportReport = async (req, res) => {
  try {
    const [reportData, empleadosData, configData] = await Promise.all([
      readJsonFile(process.env.JSON_Horas_Extras_INFO),
      readJsonFile(process.env.JSON_Empleados_INFO),
      readJsonFile(process.env.JSON_Horas_Extras_Config),
    ]);

    const workbook = xlsx.utils.book_new();

    // Generar las hojas de Excel
    const horasExtraSheet = generateHorasExtraSheet(reportData, empleadosData);
    const empleadosSheet = generateEmpleadosSheet(empleadosData);
    const configSheet = generateConfigSheet(configData);
    console.log(horasExtraSheet);
    // Agregar las hojas al libro de trabajo
    xlsx.utils.book_append_sheet(
      workbook,
      horasExtraSheet,
      SHEET_NAMES.HORAS_EXTRA
    );
    xlsx.utils.book_append_sheet(
      workbook,
      empleadosSheet,
      SHEET_NAMES.EMPLEADOS
    );
    xlsx.utils.book_append_sheet(
      workbook,
      configSheet,
      SHEET_NAMES.CONFIGURACION
    );

    // Generar el archivo Excel
    const buffer = xlsx.write(workbook, { type: 'buffer', bookType: 'xlsx' });
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=reporte-horas-extra.xlsx"
    );
    res.status(200).send(buffer);
  } catch (error) {
    console.error("Error al generar el reporte:", error);
    res
      .status(400)
      .json({ message: "Error al generar el reporte", error: error.message });
  }
};

module.exports = {
  exportReport,
};
