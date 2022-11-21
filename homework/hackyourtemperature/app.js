import express, { json, response } from "express";
import { engine } from "express-handlebars";
import fetch from "node-fetch";
import { API_KEY } from "./sources/keys.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

app.get("/", function (req, res) {
  res.send("hello from backend to frontend!");
});

app.get("/weather", function (req, res) {
  res.render("index");
});

app.post("/weather", async (req, res) => {
  const cityName = req.body.cityName;
  if (cityName === undefined || cityName === "") {
    res.render("index", {
      weatherText: "Please enter a city name",
    });
    return;
  }

  try {
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=${API_KEY}&units=metric`;
    const fetchWeather = await fetch(apiURL);
    const jsonFormat = await fetchWeather.json();
    const value = jsonFormat.main.temp;

    res.render("index", {
      cityName,
      value,
    });
  } catch (error) {
    console.log(error);
    res.render("index", { weatherText: "City is not found!" });
  }
});

export default app;
