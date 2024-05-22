const {Spreadsheet}= require("./spreadsheet/sheet.js");
const ObjectsToCsv = require('objects-to-csv');

async function SaveToCsv(data, path) {
    const csv = new ObjectsToCsv(data);
   
    // Save to file:
    await csv.toDisk(path);
};

module.exports = { Spreadsheet, SaveToCsv}