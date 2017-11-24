const fs = require('fs');

const json = require('./assets/info.json');

const getFristName = (res,q) =>{
    let arrayOfJson =[]
    const data = json.data;
    if((q !== []) && (q.sort === 'true')){
        for (let i in data) {
            arrayOfJson.push(data[i].name)  
       }
       arrayOfJson.sort();
       return arrayOfJson[0]
    }else{
        return json.data[0].name
    }
}

const filterData = (need,data) => {
    //console.log(data,need)
    if(data.name === need){
        return data.dataFile;
    }
}

const getDataFromFile = (query,res) => {
   // console.log(query);
    const nameFile = json.data.filter(filterData.bind(this,query));
    return fs.readFileSync(`./assets/data/${nameFile[0].dataFile}`,'utf8');
}

module.exports = {
    getFristName:getFristName,
    getDataFromFile:getDataFromFile
}