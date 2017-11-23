/*
# DATA EXERCISE

## Exercise 1: Read a JSON file

GET /first-user/
> This will read info.json file and return the name of the first user in the data array.

Expected Response

"Teresa"

## Exercise 2: Sort the array

GET /first-user/?sort=true
> If sort=true, the API will sort the array and return the first name of the sorted data.
> if sort=false, the API will return the first name of the array.

Expected Response

"John"


> __Note:__ Use `POSTMAN` for testing the APIs and `nodemon` for fast development
*/
const compareName = (a,b)=>a.name - b.name
const info = require('./assets/info.json');
const firstNameAPI = ()=>{
  const alldata = info.data;
  const userData = alldata[0] // alldata.slice(0,1) 
  const userName = userData.name
  console.log(alldata.sort(compareName))
  return userName;
}
 firstNameAPI();
module.exports = firstNameAPI;
