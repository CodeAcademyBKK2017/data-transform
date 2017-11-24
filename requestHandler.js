const url = require('url');
const fs = require('fs');

const infoJson = require('./assets/info.json');

//--------------------------------------------------

const PAGE_NOT_FOUND = 'Page not found.';
const WRONG_METHOD = 'WRONG METHOD';
const USER_NOT_FOUND = 'USER NOT FOUND';
const REQUEST_SPEC_UNDEFINED = 'REQUEST SPEC UNDEFINED';

//--------------------------------------------------

const requestHandler = (req, res) => {
	const method = req.method;
	const parsed = url.parse(req.url, true);
	const pathname = parsed.pathname;
	const query = parsed.query;
	
	//---------------------------
	// console.log('>>>>>START');
	//---------------------------

	const matchedPathnameRequestSpec = supportedReqSpec.find((element) => {
		return element.pathname === pathname;
	});

	if(!matchedPathnameRequestSpec) {
		responseWithWriteMessage(res, PAGE_NOT_FOUND);
		return;
	}

	//-----

	const matchedObjRequestSpec = supportedReqSpec.find((element) => {
		return element.method === method && element.pathname === pathname;
	});

	if(!matchedObjRequestSpec) {
		responseWithWriteMessage(res, WRONG_METHOD);
		return;
	}
    
	//-----
    
	// switch (matchedObjRequestSpec) {
	{
		// case {method: 'GET', pathname: '/first-user'}:{
		if(matchedObjRequestSpec.method === 'GET' && matchedObjRequestSpec.pathname === '/first-user') {
			const isSortAsc = (query.sort === 'true');
			getFirstUserApi(isSortAsc, res);
			// break;
		}
		// case {method: 'GET', pathname: '/user-data'}:{
		else if(matchedObjRequestSpec.method === 'GET' && matchedObjRequestSpec.pathname === '/user-data') {
			getUserDataApi(query.user, res);
			// break;
		}
		// default:{
		else {
			responseWithWriteMessage(res, REQUEST_SPEC_UNDEFINED);
			// break;
		}
	}
    
	//-------------------------
	// console.log('<<<<<END');
	//-------------------------
};

//--------------------------------------------------

function RequestSpec(method, pathname) {
	this.method = method;
	this.pathname = pathname;
}

const supportedReqSpec = [
	new RequestSpec('GET', '/first-user'),
	new RequestSpec('GET', '/user-data')
];

const responseWithWriteMessage = (response, message) => {
	response.write(message);
	response.end();
};

//-----

const getFirstUserObject = (isSortAsc) => {
	const originalUserArray = infoJson.data;
	const tempUserArray = [...originalUserArray];

	if(isSortAsc) {
		tempUserArray.sort((obj1, obj2) => {
			return obj1.name > obj2.name;
		});
	}
    
	return tempUserArray[0];
};

const getFirstUserApi = (isSortAsc, res) => {
	const firstUser = getFirstUserObject(isSortAsc);
	responseWithWriteMessage(res, firstUser.name);
};

//-----

const getUserDataWithName = (name) => {
	const originalUserArray = infoJson.data;
	const matchedUser = originalUserArray.find((user) => {
		return user.name === name;
	});

	return matchedUser;
};

const getUserDataApi = (name, res) => {
	const user = getUserDataWithName(name);
	if(user) {
		const userFilePath = `./assets/data/${user.dataFile}`;
		const data = fs.readFileSync(userFilePath, 'utf8');
		responseWithWriteMessage(res, data);
	}
	else {
		responseWithWriteMessage(res, USER_NOT_FOUND);
	}
};

//--------------------------------------------------

module.exports = {
	requestHandler,
	PAGE_NOT_FOUND,
	WRONG_METHOD,
	USER_NOT_FOUND
};
