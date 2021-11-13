const express = require("express");
const app = express();

const { products } = require("./data");
app.set("view engine", "ejs");
app.use(express.static("./assets"));
function timeAvailable(req, res, next) {
  const day = new Date().getDay();
  const hour = new Date().getHours();
  if (day >= 1 && day <= 5) {
    if (hour > 9 && hour < 17) {
      next();
    } else {
      res.send("out of time");
    }
  } else {
    return res.send("out of day");
  }
}
// app.use(timeAvailable);
app.get("/", (req, res) => {
  res.render("home");
});
app.get("/services", timeAvailable, (req, res) => {
  res.render("services", { products: products });
});
app.get("/contact", (req, res) => {
  res.render("contact");
});

app.all("*", (req, res) => {
  res.status(404).send("<h1>404 Page Not Found</h1>");
});

app.listen(5000, () => console.log("server running at port 5000 ...."));
