async function getDrivers(req, res) {
  try {
    //Curisamente funcionan sin promesas:
    const [driversApi, driversDb] = await Promise.all([
      req.driversApi,
      req.driversDb,
    ]);
 
    const allDrivers = [...driversApi, ...driversDb];

    return res.status(200).json(allDrivers);
  } catch (error) {
    return res.status(500).json({ error });
  }
}
module.exports = getDrivers;
