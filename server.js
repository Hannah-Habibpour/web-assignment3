// <!-----------------------------------------------------------------------------------
// *  WEB322 – Assignment 03
// *
// *  I declare that this assignment is my own work in accordance with Seneca's
// *  Academic Integrity Policy:
// *
// *  https://www.senecacollege.ca/about/policies/academic-integrity-policy.html
// *
// *  Name: Hannaneh Habibpour         Student ID: 185186210      Date: 13-11-2023
// *
// *  Published URL: https://relieved-ant-cowboy-hat.cyclic.app
// *
// ------------------------------------------------------------------------------------>
const legoData = require("./modules/legoSets");
const express = require("express");
const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");

(async () => {
  try {
    await legoData.Initialize();

    app.listen(8080, () => {
      console.log("Example app is listening on port 8080");
    });

    app.get("/", async (req, res) => {
      try {
        res.render("home", {
          legoSets: [
            {
              id: "01-1",
              name: "Chain Links",
              imageUrl: "https://cdn.rebrickable.com/media/sets/01-1.jpg",
            },
            {
              id: "011-1",
              name: "Basic Building Set",
              imageUrl: "https://cdn.rebrickable.com/media/sets/011-1.jpg",
            },
            {
              id: "01-2",
              name: "Bulldozer Chain Links",
              imageUrl: "https://cdn.rebrickable.com/media/sets/01-2.jpg",
            },
            {
              id: "02-1",
              name: "Extra Large Tires & Hubs",
              imageUrl: "https://cdn.rebrickable.com/media/sets/02-1.jpg",
            },
            {
              id: "021-1",
              name: "Wheel Set",
              imageUrl: "https://cdn.rebrickable.com/media/sets/021-1.jpg",
            },
            {
              id: "02-2",
              name: "Digger Bucket Assembly",
              imageUrl: "https://cdn.rebrickable.com/media/sets/02-2.jpg",
            },
          ],
        });
      } catch (error) {
        res.status(500).send("Internal Server Error");
      }
    });

    app.get("/viewData", function (req, res) {
      let someData = {
        name: "John",
        age: 23,
        occupation: "developer",
        company: "Scotiabank",
      };

      res.render("viewData", {
        data: someData,
      });
    });

    app.get("/about", async (req, res) => {
      try {
        res.render("about", {
          name: "Hannah",
          description:
            "Currently I'm a student in Seneca College. I like creation and learning different skills, which is why I chose the CPP program.",
          imageUrl: "path/image.jpg",
        });
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
          // res.status(200).json(sets);
          res.render("sets", {
            data: sets,
          });
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
          // res.status(200).json(set);
          res.render("set", {
            data: set,
          });
        } else {
          res.status(404).send("Lego set not found for set number: " + setNum);
        }
      } catch (error) {
        res.status(404).send("Error: " + error.message);
      }
    });

    app.get("*", async (req, res) => {
      try {
        res.status(404).render("404", { page: "404" });
      } catch (error) {
        res.status(500).send("Internal Server Error");
      }
    });
  } catch (error) {
    console.error("Initialization error:", error);
  }
})();
