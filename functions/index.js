const { onRequest } = require("firebase-functions/v2/https");

const path = require("path");
const hbs = require("hbs");

const express = require("express");

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

//  Routes for Express app
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "./templates/views");
const partialsPath = path.join(__dirname, "./templates/partials");

//  Handlebars engine installation and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//  Static path setup for serving
app.use(express.static(publicDirectoryPath));

// Home route
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "István Kalmár",
  });
});

// About route
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "István Kalmár",
  });
});

// Weather route
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Please provide an address!",
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(latitude + "," + longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }

        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    },
  );
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term!",
    });
  }
  console.log(req.query.search);
  res.send({
    products: [],
  });
});

//  Render 404 page
app.use((req, res) => {
  res.status(404).render("404", {
    title: "404",
    name: "István Kalmár",
    errorMessage: "I could not find the page you were looking for.",
  });
});

app.listen(port, () => {
  console.log(`The server is running on port ${port}.`);
});

exports.app = onRequest({ region: "us-central1" }, app);
