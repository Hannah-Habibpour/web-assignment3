// <!-----------------------------------------------------------------------------------
// *  WEB322 – Assignment 03
// *
// *  I declare that this assignment is my own work in accordance with Seneca's
// *  Academic Integrity Policy:
// *
// *  https://www.senecacollege.ca/about/policies/academic-integrity-policy.html
// *
// *  Name: Hannaneh Habibpour         Student ID: 185186210      Date: 29-10-2023
// *
// *  Published URL:
// *
// ------------------------------------------------------------------------------------>
const legoData = require("./modules/legoSets");
const express = require("express");
const app = express();

app.use(express.static("public"));

(async () => {
  try {
    await legoData.Initialize();

    app.listen(8080, () => {
      console.log("Example app is listening on port 8080");
    });

    app.get("/", async (req, res) => {
      try {
        res.status(200).sendFile(__dirname + "/views/home.html");
      } catch (error) {
        res.status(500).send("Internal Server Error");
      }
    });

    app.get("/about", async (req, res) => {
      try {
        res.status(200).sendFile(__dirname + "/views/about.html");
      } catch (error) {
        res.status(500).send("Internal Server Error");
      }
    });

    app.get("/lego/sets", async (req, res) => {
      const theme = req.query.theme;
      try {
        let sets;
        if (theme) {
          sets = await legoData.getSetsByTheme(theme);
        } else {
          sets = await legoData.getAllSets();
        }

        if (sets.length > 0) {
          res.status(200).json(sets);
        } else {
          res.status(404).send("No Lego sets found!");
        }
      } catch (error) {
        res.status(404).send("Error retrieving Lego sets: " + error.message);
      }
    });

    app.get("/lego/sets/:setNum", async (req, res) => {
      const setNum = req.params.setNum;
      try {
        const set = await legoData.getSetByNum(setNum);

        if (set) {
          res.status(200).json(set);
        } else {
          res.status(404).send("Lego set not found for set number: " + setNum);
        }
      } catch (error) {
        res.status(404).send("Error: " + error.message);
      }
    });

    app.get("*", async (req, res) => {
      try {
        res.status(404).sendFile(__dirname + "/views/404.html");
      } catch (error) {
        res.status(500).send("Internal Server Error");
      }
    });
  } catch (error) {
    console.error("Initialization error:", error);
  }
})();
