const API = require('../index')


test('API first-user is called', () => {
    const req = {
        url:"/first-user/",
        method:"GET"
    }

    const res ={
        write:jest.fn(),
        end:jest.fn()
    }

    API(req,res);
    
    expect(res.write).toHaveBeenCalled();
    expect(res.write).toBeCalledWith("Teresa");
    expect(res.end).toHaveBeenCalled();
})

test('API first-user is called with sort = true', () => {
    const req = {
        url:"/first-user/?sort=true",
        method:"GET"
    }

    const res ={
        write:jest.fn(),
        end:jest.fn()
    }

    API(req,res);
    
    expect(res.write).toHaveBeenCalled();
    expect(res.write).toBeCalledWith("John");
    expect(res.end).toHaveBeenCalled();
})

test('API user-data is called and get Data in file', () => {
    const req = {
        url:"/user-data/?user=Teresa",
        method:"GET"
    }

    const ans = `This contains metadata for TERESA\r\nSample data for TERESA\r\n67 53 98 23 121\r\n12 23 43 12 45`

    const res ={
        write:jest.fn(),
        end:jest.fn()
    }

    API(req,res);

    expect(res.write).toHaveBeenCalled();
    expect(res.write).toBeCalledWith(ans);
    expect(res.end).toHaveBeenCalled();
})

test('API user-data is called and get Data in file With POST', () => {
    const req = {
        url:"/user-data/?user=Teresa",
        method:"POST"
    }
    const res ={
        write:jest.fn(),
        end:jest.fn()
    }

    API(req,res);
    
    expect(res.write).toHaveBeenCalled();
    expect(res.write).toBeCalledWith("GET ONLY!");
    expect(res.end).toHaveBeenCalled();
})

test('API first-user is called With POST', () => {
    const req = {
        url:"/first-user/",
        method:"POST"
    }
    const res ={
        write:jest.fn(),
        end:jest.fn()
    }

    API(req,res);
    
    expect(res.write).toHaveBeenCalled();
    expect(res.write).toBeCalledWith("GET ONLY!");
    expect(res.end).toHaveBeenCalled();
})