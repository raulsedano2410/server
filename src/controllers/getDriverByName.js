async function getDriverByName(req, res) {
  try {
    const [driversFromApi, driversFromDb] = await Promise.all([
      req?.driversFromApi,
      req?.driversFromDb,
    ]);

    const allSelectedDrivers = [...driversFromApi, ...driversFromDb];

    // Limitar a los primeros 15 conductores del resultado total
    const first15Drivers = allSelectedDrivers.slice(0, 15);
    if (!first15Drivers.length) {
      return res.status(404).json({ error: 'El conductor no existe' });
    }
    return res.status(200).json(first15Drivers);
  } catch (error) {
    res.status(500).json({ error });
  }
}
module.exports = getDriverByName;
