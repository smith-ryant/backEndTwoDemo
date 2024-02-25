const express = require("express");
const cors = require("cors");
const movies = require("./db.json");
const app = express();
const SERVER_PORT = 4004;
const baseURL = `/api/movies`;

app.use(express.json());
app.use(cors());

let id = 11;

app.get(baseURL, (req, res) => {
  res.status(200).json(movies);
});
app.post(baseURL, (req, res) => {
  const { title, rating, imageURL } = req.body;
  //const { title, rating, imagURL } = req.body;
  const newMovie = { ...req.body, id, rating: +rating };
  movies.push(newMovie);
  id += 1;
  res.status(200).json(movies);
});
app.delete(`${baseURL}/:identification`, (req, res) => {
  const { identification } = req.params;
  for (let i = 0; i < movies.length; ++i) {
    if (movies[i].id === +identification) {
      movies.splice(i, 1);
      res.status(200).json(movies);
    }
  }
});

// Nitin's code below

/* app.put(`${baseURL}/:identification`, (req, res) => {
  const { identification } = req.params;
  const { type } = req.body;
  
  for (let i = 0; i < movies.length; i++) {
    if (type === "plus") {
      console.log(movies[i].rating);
      const newRating = movies[i].rating + 1;
      movies[i].rating = newRating;
      res.status(200).json(movies);
      return;
    }
    if (type === "minus" && movies[i].rating > 1) {
      console.log(movies[i].rating);
      const newRating = movies[i].rating - 1;
      movies[i].rating = newRating;
      res.status(200).json(movies);
      return;
    }
    res.status(200).json(movies);
  }
}); */

//Nitin's code above
app.put(`${baseURL}/:identification`, (req, res) => {
  const { identification } = req.params;
  const { type } = req.body;
  
  // Find the movie with the given identification
  const movie = movies.find((movie) => movie.identification === identification);

  if (!movie) {
    return res.status(404).json({ error: "Movie not found" });
  }

  if (type === "plus") {
    const newRating = movie.rating + 1;
    movie.rating = newRating;
  } else if (type === "minus" && movie.rating > 1) {
    const newRating = movie.rating - 1;
    movie.rating = newRating;
  }

  res.status(200).json(movies);
});
app.listen(SERVER_PORT, () => console.log(`Up on port ${SERVER_PORT}`));
