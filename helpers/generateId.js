function generateId(output, arrayLength) {
  let results = [];
  while (results.length < output) {
    let num = Math.floor(Math.random() * arrayLength);
    if (!results.includes(num)) {
      results.push(num);
    }
  }
  return results;
}

module.exports = generateId
