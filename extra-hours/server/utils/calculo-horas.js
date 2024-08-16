function calculoHoras(hours, salario, config) {
  const valorHora = salario / config.horasMes;
  let totalValorHoraExtra = 0;

  const valorHoraExtra = {};
  const cantidadHorasExtra = Object.keys(config.horaExtra).reduce(
    (acc, current) => {
      return acc + hours[current];
    },
    0
  );

  Object.keys(config.horaExtra).forEach((key) => {
    const costoHoraExtra = valorHora * config.horaExtra[key] * hours[key];

    valorHoraExtra[key] = costoHoraExtra;
    totalValorHoraExtra += costoHoraExtra;
  });

  return {
    valorHoraExtra,
    totalValorHoraExtra,
    cantidadHorasExtra,
  };
}

module.exports = calculoHoras;