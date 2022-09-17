let express = require("express");
let compression = require("compression");
let app = express();
var cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(compression());

let path = __dirname + "/dist";
let port = 9000;

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.static(path, { maxage: "17d" }));

app.set("views", path);
app.set("view engine", "ejs");

app.get("*", function (req, res) {
  // const cookieToken = req.cookies || {};
  // const { uuid = "" } = cookieToken;
  // const redirectionHost = process.env.BASE_HOST || "localhost:3030";
  // const redirectionProtocol = process.env.SERVICE_PROTOCOL || "http";
  // if (uuid == "") {
  //   const { url = "" } = req;
  //   const { host = redirectionHost } = req.headers;
  //   const redirectionUrl = `//${redirectionHost}/login?r=${redirectionProtocol}://${host}${url}`;
  //   return res.redirect(redirectionUrl);
  // }
  let date = toLocalTime();
  let log = "[" + date + '] "' + req.method + " " + req.url + '"';
  if (req.headers !== undefined) {
    if (typeof req.headers["user-agent"] === "string") {
      log += ' "' + req.headers["user-agent"] + '"';
    }
  }
  res.render("index.ejs", { user: "emplyee" });
  //res.sendFile(path + '/index.html');
});

app.listen(port, "0.0.0.0", (err) =>
  console.log("App listening on port %s!", port, err)
);

var toLocalTime = function () {
  let d = new Date();
  let offset = (new Date().getTimezoneOffset() / 60) * -1;
  let n = new Date(d.getTime() + offset);
  return n;
};
