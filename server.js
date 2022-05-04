const fs = require("fs");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const data = fs.readFileSync("./database.json");
const conf = JSON.parse(data);

const config = {
  server: conf.host,
  port: conf.port,
  database: conf.database,
  user: conf.user,
  password: conf.password,
  encrypt: false,
};

const sql = require("mssql");

const multer = require("multer");
const upload = multer({ dest: "./upload" });

sql.connect(config, function (err) {
  if (err) {
    return console.error("error : ", err);
  }
  console.log("MSSQL 연결 완료");
});

app.get("/api/customers", (req, res) => {
  var request = new sql.Request();
  q = "SELECT * FROM CUSTOMER WHERE isDeleted = 0";
  request.query(q, (err, rows, fields) => {
    res.send(rows.recordset);
  });
});

app.use("/image", express.static("./upload"));

app.post("/api/customers", upload.single("image"), (req, res) => {
  let image = ""; //"/image/" + req.file.filename;
  let name = req.body.name;
  let birthday = req.body.birthday;
  let gender = req.body.gender;
  let job = req.body.job;

  var request = new sql.Request();
  q = `INSERT INTO CUSTOMER VALUES ('${image}', '${name}', '${birthday}', '${gender}', '${job}', GETDATE(), 0)`;
  console.log(q);
  request.query(q, (err, rows, fields) => {
    res.send(rows.recordset);
  });
});

app.delete("/api/customers/delete/:id", (req, res) => {
  var request = new sql.Request();
  q = `UPDATE CUSTOMER SET isDeleted = 1 WHERE id = ${req.params.id}`;
  request.query(q, (err, rows, fields) => {
    res.send(rows.recordset);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});