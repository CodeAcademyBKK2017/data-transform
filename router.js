const info = require('./assets/info.json');
const url = require('url');
const fs = require('fs');
const compareName = (a, b) => {
  if(a.name < b.name)return -1;
  if(a.name > b.name)return 1;
  // return 0;
};
const firstNameAPI = (sortFlag) => {
  const userData = info.data;
  switch (sortFlag) {
    case 'true':
      userArrCopy = userData.slice();
      userArrSort = userArrCopy.sort(compareName);
      userName = userArrSort[0].name
      break;
    case 'false':
      userName = userData[0].name
      break;
    default : userName = 'No Data Found';
  }
  return userName;
}

const getUserAPI = (userName) => {
  const usersData = info.data;
  const filterData = usersData.find((u) =>u.name === userName ? u : '');
  const filePath = filterData.dataFile
  return fs.readFileSync(`./assets/data/${filePath}`, 'utf-8');
}
const router = (req, res) => {
  const parsed = url.parse(req.url, true);
  switch (req.method) {
    case 'GET': {
      switch (parsed.pathname) {
        case '/first-user/':
          res.write(firstNameAPI(parsed.query.sort));
          break;
        case '/user-data/':
          res.write(getUserAPI(parsed.query.user));
          break;
        default: res.write('WRONG PATH NAME OR URL');
      }
      break;
    }
    default : res.write('WRONG METHOD');
  }
  res.end();
}

module.exports = {
  router: router,
  firstNameAPI: firstNameAPI,
  getUserAPI : getUserAPI
};