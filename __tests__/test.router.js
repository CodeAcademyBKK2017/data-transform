const sv = require('../router');
//Success Case  Test for Success /first-user/ with method GET sort=false
const request ={};
test('123456',()=>{
  const response = {
    write : jest.fn(),
    end : jest.fn()
  };
  request.url = 'http://test.com/first-user/?sort=false';
  request.method = 'GET';
  sv.router(request,response);
  expect(response.write).toHaveBeenCalled();
  expect(response.write).toHaveBeenCalledWith('Teresa');
});
test('Test for Success /first-user/ with method GET sort=true',()=>{
  const response = {
    write : jest.fn(),
    end : jest.fn()
  };
  request.url = 'http://test.com/first-user/?sort=true';
  request.method = 'GET';
  sv.router(request,response);
  expect(response.write).toHaveBeenCalled();
  expect(response.write).toHaveBeenCalledWith('John');
});
test('Test for Success Call FirstNameAPI sort=false',()=>{
  expect(sv.firstNameAPI('false')).toBe('Teresa');
});
test('Test for Success Call FirstNameAPI sort=true ',()=>{
  expect(sv.firstNameAPI('true')).toBe('John');
});
test('Test for Success url=/user-data/user="Teresa" with method GET is working',()=>{
  const response = {
    write : jest.fn(),
    end : jest.fn()
  };
  request.url = 'http://test.com/user-data/?user=Teresa';
  request.method = 'GET';
  const expectedString = 'This contains metadata for TERESA\r\nSample data for TERESA\r\n67 53 98 23 121\r\n12 23 43 12 45';
  sv.router(request,response);
  expect(response.write).toHaveBeenCalled();
  expect(response.write).toHaveBeenCalledWith(expectedString);
});
//Fail Case
test('Test for Fail response with POST method',()=>{
  const response = {
    write : jest.fn(),
    end : jest.fn()
  };
  request.url = 'http://test.com/first-user/';
  request.method = 'POST';
  sv.router(request,response);
  expect(response.write).toBeCalledWith('WRONG METHOD');
});
test('Test for Fail FirstUserAPI empty sort flag',()=>{
  expect(sv.firstNameAPI('')).toBe('No Data Found');    
});
test('Test for Fail response Get UserAPI',()=>{;
  expect(sv.getUserAPI('xxxx')).toBe('');
});