const requestBodyParser = require("../utils/body-parser");
const crypto = require("crypto");
const writeToFile = require("../utils/write-to-file");

const getReq = (req, res) => {
  let baseUrl = req.url.substring(0, req.url.lastIndexOf("/") + 1);
  let id = req.url.split("/")[3];
  console.log(baseUrl);
  if (req.url === "/api/movies") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.write(JSON.stringify(req.movies));
    res.end();
  } else if (baseUrl === "/api/movies/" && id) {
    let filterMovie = req.movies.filter((movie) => {
      return movie.Title === id;
    });

    console.log(filterMovie);

    if (filterMovie.length > 0) {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(filterMovie));
    } else {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "don't exist" }));
    }
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Not Found" }));
  }
};

const postReq = async (req, res) => {
  if (req.url === "/api/movies") {
    try {
      let body = await requestBodyParser(req);
      body.Title = crypto.randomUUID();
      req.movies.push(body);
      writeToFile(req.movies);
      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "user created success" }));
    } catch (err) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "user created failed" }));
    }
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Not Found" }));
  }
};
const deleteReq = (req, res) => {
  let baseUrl = req.url.substring(0, req.url.lastIndexOf("/") + 1);
  let id = req.url.split("/")[3];

  if (baseUrl === "/api/movies/" && id) {
    let index = req.movies.findIndex((movie) => {
      return movie.Title === id;
    });

    if (index === -1) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "don't exist" }));
    } else {
      req.movies.splice(index, 1);
      writeToFile(req.movies);
      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(JSON.stringify(req.movies));
    }
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: " Route Not Found" }));
  }
};
const putReq = async (req, res) => {
  let baseUrl = req.url.substring(0, req.url.lastIndexOf("/") + 1);
  let id = req.url.split("/")[3];

  if (baseUrl === "/api/movies/" && id) {
    try {
      let body = await requestBodyParser(req);

      let index = req.movies.findIndex((movie) => {
        return movie.Title === id;
      });

      if (index === -1) {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "don't exist" }));
      } else {
        req.movies[index] = { ...body, Title: id };
        writeToFile(req.movies);
        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(JSON.stringify(req.movies[index]));
      }
    } catch (error) {
      console.log(error);
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Not Found" }));
    }
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: " Route Not Found" }));
  }
};

module.exports = { getReq, postReq, putReq, deleteReq };
