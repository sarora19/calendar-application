const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const fs = require("fs");
const cors = require("cors");
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

bodyParser.raw({ type: "application/x-www-form-urlencoded" });

app.get("/api/getDate", (req, res) => {
  try {
    var content = fs.readFileSync("test.txt", "utf8");
    res.send({ content });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

app.post("/api/setDate", (req, res) => {
  try {
    var content = "";
    content = fs.readFileSync("test.txt", "utf8");

    var stream = fs.createWriteStream("test.txt");
    stream.once("open", function(fd) {
      var selDate = "selectedDate" + ": " + req.body["selectedDate"];

      if (content == "") {
        content = selDate;
      } else {
        content = content + "\r\n" + selDate;
      }

      stream.write(content);
      stream.end();
    });

    res.send(
      `I received your POST request. This is what you sent me: ${
        req.body["selectedDate"]
      }`
    );
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

app.listen(port, () => console.log(`Listening on port ${port}`));
