// Middleware para validar el cuerpo de la solicitud
function postDriverValidate(req, res, next) {
  const newDriver = req.body;
  if (!newDriver || typeof newDriver !== 'object') {
    return res
      .status(400)
      .json({ error: 'Se esperaba un objeto en el cuerpo de la solicitud' });
  }

  const missingProperties = [];

  if (!newDriver.firstName) missingProperties.push('firstName');

  if (!newDriver.lastName) missingProperties.push('lastName');

  if (!newDriver.birthDate) missingProperties.push('birthDate');

  if (!newDriver.nationality) missingProperties.push('nationality');

  if (!newDriver.teams) missingProperties.push('teams');

  // Lanzará error si un dato es ausente.
  if (missingProperties.length > 0) {
    const missingPropertiesString = missingProperties.join(', ');

    const errorMessage =
      missingProperties.length > 1
        ? `Faltan las siguientes propiedades: ${missingPropertiesString.replace(
            /,([^,]*)$/,
            ' y$1',
          )}`
        : `Falta la siguiente propiedad: ${missingPropertiesString}`;

    return res.status(400).json({
      error: errorMessage,
    });
  }

  // Lanzará error 'teams' no es un array.
  if (!Array.isArray(newDriver.teams)) {
    res.status(400).json({ error: 'La propiedad "teams" debe ser un array' });
  }

  // Lanzará error si los elementos en 'teams' no son números.
  if (!newDriver.teams.every((item) => typeof item === 'number')) {
    res
      .status(400)
      .json({ error: "Al menos un elemento de 'teams' no es un número" });
  }

  // Si pasa la validación, llamamos a la función principal
  next();
}
module.exports = postDriverValidate;
