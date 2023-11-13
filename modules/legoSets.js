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

const setData = require("../data/setData");
const themeData = require("../data/themeData");

let sets = [];

async function Initialize() {
  try {
    for (const set of setData) {
      const obj = themeData.find((theme) => theme.id === set.theme_id);

      if (obj) {
        const setWithTheme = {
          ...set,
          theme: obj.name,
        };
        sets.push(setWithTheme);
      }
    }
  } catch (error) {
    throw new Error("Error initializing sets");
  }
}

async function getAllSets() {
  try {
    if (sets.length > 0) {
      return sets;
    } else {
      throw new Error("Nothing found!");
    }
  } catch (error) {
    throw new Error(`Error getting all sets ${error}`);
  }
}

async function getSetByNum(setNum) {
  try {
    const found = sets.find((set) => set.set_num === setNum);
    if (found) {
      return found;
    } else {
      throw new Error(`No lego found with name ${setNum}`);
    }
  } catch (error) {
    throw new Error(`Error getting set by number, ${error}`);
  }
}

async function getSetsByTheme(theme) {
  try {
    const lowercaseTheme = theme.toLowerCase();
    const match = sets.filter((set) => {
      return set.theme.toLowerCase().includes(lowercaseTheme);
    });

    if (match.length > 0) {
      return match;
    } else {
      throw new Error("Unable to find this theme");
    }
  } catch (error) {
    console.error("Error getting sets by theme:", error.message);
  }
}

module.exports = {
  Initialize,
  getAllSets,
  getSetByNum,
  getSetsByTheme,
  sets,
};
