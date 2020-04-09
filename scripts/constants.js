const path = require('path');
const URL_PDF = "https://www.visa.com.ar/dam/VCOM/regional/lac/SPA/argentina/pay-with-visa/cards/extra-cash/extra-cash-agosto-2019.pdf";
const APP_ROOT = path.resolve(__dirname, '..');
const PDF_FILE = path.resolve(APP_ROOT, "./files/extra-cash.pdf");
const PLACES_FILE = path.resolve(APP_ROOT, "./files/places.json");
const INVALID_PLACES_FILE = path.resolve(APP_ROOT, "./files/invalid-places.json");

module.exports = {
  URL_PDF,
  PDF_FILE,
  APP_ROOT,
  PLACES_FILE,
  INVALID_PLACES_FILE,
};
