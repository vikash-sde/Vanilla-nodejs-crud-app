const { configDotenv } = require("dotenv");
const http = require("http");
const {
  getReq,
  postReq,
  deleteReq,
  putReq,
} = require("./Controller/movies.controller");

let movies = require("./movies.json");

//server
configDotenv();
const PORT = process.env.PORT || 5001;

const server = http.createServer((req, res) => {
  req.movies = movies;
  switch (req.method) {
    case "GET":
      getReq(req, res);
      break;
    case "POST":
      postReq(req, res);
      break;
    case "PUT":
      putReq(req, res);
      break;
    case "DELETE":
      deleteReq(req, res);
      break;

    default:
      res.statusCode = 404;
      res.setHeader("Content-Type", "application/json");
      res.write(JSON.stringify({ message: "Not Found" }));
      res.end();
      break;
  }
});

server.listen(PORT, () => {
  console.log(`server running at port: ${PORT}`);
});
