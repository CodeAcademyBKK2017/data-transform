const info = require('./assets/info.json');
const url = require('url');
const fs = require('fs');
const compareName = (a,b)=>{
  var nameA = a.name.toUpperCase(); // ignore upper and lowercase
  var nameB = b.name.toUpperCase(); // ignore upper and lowercase
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }
}
const firstNameAPI = (sortFlag)=>{
  const alldata = info.data;
  let userDataArr = alldata// alldata.slice(0,1)
  let userObject; 
  let userName;
  if(sortFlag === 'true'){
    userArrSortCopy = userDataArr.slice();
    userArrSort = userArrSortCopy.sort(compareName);
    userObject = userArrSort[0]
    userName = userObject.name
    return userName 
  }else{
    userObject = userDataArr[0] 
    userName = userObject.name
    return userName 
  }
}

const getUserAPI = (userName)=>{
  const alldata = info.data;
  const filterData = alldata.find((obj) => obj.name === userName ? obj : false);
  const filePath = filterData.dataFile
  console.log(filePath);
  const result = fs.readFileSync(`./assets/data/${filePath}`,'utf8')
  return result;
}
const requestHandler = (req, res) => {
  const parsed = url.parse(req.url,true);
  const pathName = parsed.pathname;
  const method = req.method;
  const sort = parsed.query.sort;
  const user = parsed.query.user;
  if(pathName === '/first-user/'){
      if(method === 'GET'){
        res.write(firstNameAPI(sort));
      }else{
        console.log('WRONG METHOD');
      }
  }else if(pathName === '/user-data/'){
    if(method === 'GET'){
      res.write(getUserAPI(user));
    }else{
      console.log('WRONG METHOD');
    }
  }else{
    console.log('WRONG PATH NAME URL');
  }
  res.end(); //end the response
}

module.exports = {
  requestHandler : requestHandler,
  firstNameAPI : firstNameAPI
};