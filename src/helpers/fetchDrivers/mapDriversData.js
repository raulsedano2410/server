function mapDriversData(driverData) {
  if (Array.isArray(driverData)) {
    return driverData.map(mapDriverData);
  } else {
    return mapDriverData(driverData);
  }
}

function mapDriverData({
  id,
  name,
  image,
  dob,
  nationality,
  description,
  teams,
}) {
  return {
    id,
    firstName: name?.forename,
    lastName: name?.surname,
    photoUrl: image?.url,
    birthDate: dob,
    nationality,
    bio: description,
    teams,
  };
}
module.exports = mapDriversData;
