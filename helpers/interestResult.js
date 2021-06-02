const { Art, Automotive, Coffee, Cooking, Electronic, Entreprenuer, Health, Home, Office, Sport } = require("../models");
const getResult = require("./getResult")

async function interestResult(model, num) {
  let results;
  switch (model) {
    case "Art":
      results = await getResult(Art, num);
      break;
    case "Automotive":
      results = await getResult(Automotive, num);
      break;
    case "Coffee":
      results = await getResult(Coffee, num);
      break;
    case "Cooking":
      results = await getResult(Cooking, num);
      break;
    case "Electronic":
      results = await getResult(Electronic, num);
      break;
    case "Entreprenuer":
      results = await getResult(Entreprenuer, num);
      break;
    case "Health":
      results = await getResult(Health, num);
      break;
    case "Home":
      results = await getResult(Home, num);
      break;
    case "Office":
      results = await getResult(Office, num);
      break;
    case "Sport":
      results = await getResult(Sport, num);
      break;
    default:
      results = 'invalid'
  }
  return results;
}

module.exports = interestResult;
