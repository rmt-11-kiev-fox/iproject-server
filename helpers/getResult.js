const generateId = require('./generateId')

async function getResult(model, num) {
  let resultsData = []
  await model
    .findAll()
    .then((result) => {
      let indexes = generateId(num, result.length)
      indexes.forEach((element) => {
        let obj = {
          name: result[element].name,
          brand: result[element].brand,
          price: result[element].price === 'None' ? false : result[element].price,
          url: result[element].url,
          imageurl: result[element].imageUrl.split('|')[0],
          rating: result[element].rating,
          countRating: result[element].countRating,
        }
        resultsData.push(obj)
      })
    })
    .catch((err) => {
      resultsData = 'invalid'
    })
  return resultsData
}

module.exports = getResult
