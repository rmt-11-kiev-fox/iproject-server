const axios = require('axios')


const randomDrink = async () => {
  try {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/random.php`
    const drink = await axios.get(url)
    return drink.data.drinks
  } catch (err) {
    return console.log(err)

  }
}

const specificDrink = async (drinkName) => {
  try {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drinkName}`
    const drink = await axios.get(url)
    return drink.data.drinks
  } catch (err) {
    return console.log(err)

  }
}

const halalDrinks = async () => {
  try {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic`
    const drink = await axios.get(url)
    return drink.data.drinks
  } catch (err) {
    return console.log(err)
  }
}

const nonHalalDrinks = async () => {
  try {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic`
    const drink = await axios.get(url)
    return drink.data.drinks
  } catch (err) {
    return console.log(err)
  }
}

module.exports = {
  randomDrink,
  specificDrink,
  halalDrinks,
  nonHalalDrinks
}