function calcularHorasExtras( horasExtrasEmpleado, salario, config) {
  
  const valorHora = salario / config.horasMes; // Aquí se debe definir el salario base
  
  let totalValorHoraExtra = 0;
  let cantidadHorasExtra = 0;
  
  const valorHoraExtra = {};
  
  // Inicializar valorHoraExtra para cada tipo de hora
  Object.keys(config.horaExtra).forEach((tipo) => {
    valorHoraExtra[tipo] = 0;
  });

  // Calcular el total de horas extras y el valor de cada tipo
  horasExtrasEmpleado.horasExtras.forEach(extra => {
    const tipo = extra.tipoHora;
    const cantidadHoras = parseFloat(extra.cantidadHoras);

    if (config.horaExtra[tipo] !== undefined) {
      const costoHoraExtra = valorHora * config.horaExtra[tipo] * cantidadHoras;
      valorHoraExtra[tipo] += costoHoraExtra;
      totalValorHoraExtra += costoHoraExtra;
      cantidadHorasExtra += cantidadHoras;
    }
  });

  // Actualizar el objeto empleado con los valores calculados
  horasExtrasEmpleado.valorHoraExtra = valorHoraExtra;
  horasExtrasEmpleado.totalValorHoraExtra = totalValorHoraExtra;
  horasExtrasEmpleado.cantidadHorasExtra = cantidadHorasExtra;
}

module.exports = calcularHorasExtras;