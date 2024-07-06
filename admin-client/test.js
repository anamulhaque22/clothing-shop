const object = { a: 1, b: 2, c: 3 };
let newObject = {};

Object.keys(object).forEach((key) => {
  newObject[key] = String(object[key]);
});
console.log(newObject);
