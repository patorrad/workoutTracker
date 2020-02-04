const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
mongoose.set('debug', true);
const path = require("path");

const PORT = process.env.PORT || 3000;

const db = require("./models/Workouts.js");
//db.collection.find().then(data => console.log(data));
const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true });

// db.create({ name: "Work Out Tracker" })
//   .then(dbLibrary => {
//     //console.log(dbLibrary);
//   })
//   .catch(({message}) => {
//     //console.log(message);
//   });

//=======API ROUTES=========
app.get("/api/workouts", (req,res) => {
  db.find({}).sort({day:-1}).limit(1).then(dbBook => {//
    console.log(dbBook) 
    res.json(dbBook);
  })
  .catch(err => {
    res.json(err);
  });
});

app.put("/api/workouts/:id", (req,res) => {
  console.log(req.body.name);
  db.updateOne({_id: req.params.id}, {exercises: [
      req.body
    ]} 
  )
  .then(dbBook => {//
    console.log(dbBook) 
    res.json(dbBook);
  })
  .catch(err => {
    res.json(err);
  });
});

app.post("/api/workouts/", (req,res) => {
  db.create({})
  .then((id) => {
    console.log(id);
    res.json(id);
  })
  .catch(err => {
    res.json(err);
  });
});

app.get("/api/workouts/range", (req,res) => {
  db.find({}).then(dbBook => {//
    console.log(dbBook) 
    res.json(dbBook);
  })
  .catch(err => {
    res.json(err);
  });
});

//=======HTML ROUTES========
app.get("/exercise", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/exercise.html"));
});

app.get("/stats", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/stats.html"));
});



//===================================  
/*
app.post("/submit", ({body}, res) => {
  db.Book.create(body)
    .then(({_id}) => db.Library.findOneAndUpdate({}, { $push: { books: _id } }, { new: true }))
    .then(dbLibrary => {
      res.json(dbLibrary);
    })
    .catch(err => {
      res.json(err);
    });
});

app.get("/books", (req, res) => {
  db.Book.find({})
    .then(dbBook => {
      res.json(dbBook);
    })
    .catch(err => {
      res.json(err);
    });
});

app.get("/library", (req, res) => {
  db.Library.find({})
    .then(dbLibrary => {
      res.json(dbLibrary);
    })
    .catch(err => {
      res.json(err);
    });
});

app.get("/populated", (req, res) => {
  db.Library.find({})
    .populate("books")
    .then(dbLibrary => {
      res.json(dbLibrary);
    })
    .catch(err => {
      res.json(err);
    });
});
*/

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});