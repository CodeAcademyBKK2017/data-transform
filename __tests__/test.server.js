const sv = require('../requestHandler');
//Success Case
let request ={};
test('Test for response with url=/first-user/ with method GET is working sort false',()=>{
    const response = {
        write : jest.fn(),
        end : jest.fn()
   }
    request.url = 'http://test.com/first-user/?sort=false';
    request.method = 'GET'
    sv.requestHandler(request,response);
    expect(response.write).toHaveBeenCalled();
    expect(response.write).toHaveBeenCalledWith('Teresa');
})
test('Test for response with url=/first-user/ with method GET is working sort true',()=>{
    const response = {
        write : jest.fn(),
        end : jest.fn()
   }
    request.url = 'http://test.com/first-user/?sort=true';
    request.method = 'GET'
    sv.requestHandler(request,response);
    expect(response.write).toHaveBeenCalled();
    expect(response.write).toHaveBeenCalledWith('John');
})
test('Test Call API return First Name ',()=>{
    const response = {
        write : jest.fn(),
        end : jest.fn()
   }
    expect(sv.firstNameAPI(false)).toBe('Teresa');
})

test('Test for response with url=/user-data/user="Teresa" with method GET is working',()=>{
const response = {
    write : jest.fn(),
    end : jest.fn()
}
request.url = 'http://test.com/user-data/?user=Teresa';
request.method = 'GET';
const expectedString = 'This contains metadata for TERESA\r\nSample data for TERESA\r\n67 53 98 23 121\r\n12 23 43 12 45';
sv.requestHandler(request,response);
expect(response.write).toHaveBeenCalled();
expect(response.write).toHaveBeenCalledWith(expectedString);
})
//Fail Case
test('Test for response with url=/first-user/ with method POST is will not working',()=>{
    const response = {
        write : jest.fn(),
        end : jest.fn()
   }
    request.url = 'http://test.com/first-user/';
    request.method = 'POST'
    sv.requestHandler(request,response);
    expect(response.write).not.toBeCalled();
})