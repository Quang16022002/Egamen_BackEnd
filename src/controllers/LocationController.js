const {
  fetchProvinces,
  fetchDistricts,
  fetchWards,
} = require("../services/LocationServices");

async function getLocations(req, res) {
  try {
    const provinces = await fetchProvinces();
    const districts = await fetchDistricts();
    const wards = await fetchWards();

    res.json({
      provinces,
      districts,
      wards,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching locations", error });
  }
}

module.exports = {
  getLocations,
};
