const fs = require("fs");

const path = require("path");

const writeToFile = (data) => {
  console.log(data);
  try {
    fs.writeFileSync(
      path.join(__dirname, "..", "movies.json"),
      JSON.stringify(data),
      "utf-8"
    );
  } catch (error) {
    console.log(error);
  }
};

module.exports = writeToFile;
