const fs = require("fs").promises;
const path = require("path");

async function fetchProvinces() {
  const data = await fs.readFile(
    path.join(__dirname, "../data/provinces.json"),
    "utf8"
  );
  return JSON.parse(data).data.data;
}

async function fetchDistricts() {
  const data = await fs.readFile(
    path.join(__dirname, "../data/districts.json"),
    "utf8"
  );
  return JSON.parse(data).data.data;
}

async function fetchWards() {
  const data = await fs.readFile(
    path.join(__dirname, "../data/wards.json"),
    "utf8"
  );
  return JSON.parse(data).data.data;
}

module.exports = {
  fetchProvinces,
  fetchDistricts,
  fetchWards,
};
