const requestHandle = require('../index')

const reqFirstUser = { url:"/first-user/" };
const reqSortTrue = { url:"/first-user/?sort=true" };
const reqSortFalse = { url:"/first-user/?sort=false" };
const res = {
    write:jest.fn(),
    end:jest.fn()
};

test('test service 1',()=>{
    requestHandle(reqFirstUser,res);
    expect(res.write).toHaveBeenCalled();
    expect(res.write).toBeCalledWith("Teresa");
    expect(res.end).toHaveBeenCalled();
})

test('test service 2',()=>{
        requestHandle(reqSortTrue,res);
        expect(res.write).toHaveBeenCalled();
        expect(res.write).toBeCalledWith("John");
        expect(res.end).toHaveBeenCalled();
})

test('test service 3',()=>{
    requestHandle(reqSortFalse,res);
    expect(res.write).toHaveBeenCalled();
    expect(res.write).toBeCalledWith("Teresa");
    expect(res.end).toHaveBeenCalled();
})