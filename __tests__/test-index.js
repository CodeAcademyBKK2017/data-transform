const router = require('../router');

test('Success /first-user', () => {
    const req = {
        url: '/first-user',
        method: 'GET'
    }
    const res = {
        write: jest.fn(),
        end: jest.fn()
    }
    router(req, res);
    expect(res.write).toHaveBeenCalled();
    expect(res.write).toHaveBeenLastCalledWith('Teresa');
    expect(res.end).toHaveBeenCalled();
});

test('Success /first-user', () => {
    const req = {
        url: '/first-user?sort=true',
        method: 'GET'
    }
    const res = {
        write: jest.fn(),
        end: jest.fn()
    }
    router(req, res);
    expect(res.write).toHaveBeenCalled();
    expect(res.write).toHaveBeenLastCalledWith('John');
    expect(res.end).toHaveBeenCalled();
});

test('Success /first-user', () => {
    const req = {
        url: '/first-user?sort=false',
        method: 'GET'
    }
    const res = {
        write: jest.fn(),
        end: jest.fn()
    }
    router(req, res);
    expect(res.write).toHaveBeenCalled();
    expect(res.write).toHaveBeenLastCalledWith('Teresa');
    expect(res.end).toHaveBeenCalled();
});

test('Failure /first-user', () => {
    const req = {
        url: '/first-userXXX',
        method: 'GET'
    }
    const res = {
        write: jest.fn(),
        end: jest.fn()
    }
    router(req, res);
    expect(res.write).toHaveBeenCalled();
    expect(res.write).toHaveBeenLastCalledWith('');
    expect(res.end).toHaveBeenCalled();
});

test('Success /user-data', () => {
    const req = {
        url: '/user-data?user=Teresa',
        method: 'GET'
    }
    const res = {
        write: jest.fn(),
        end: jest.fn()
    }
    router(req, res);
    expect(res.write).toHaveBeenCalled();
    expect(res.write).toHaveBeenLastCalledWith(`This contains metadata for TERESA\r\nSample data for TERESA\r\n67 53 98 23 121\r\n12 23 43 12 45`);
    expect(res.end).toHaveBeenCalled();
});

test('Success /user-data', () => {
    const req = {
        url: '/user-data?user=Teresa',
        method: 'GET'
    }
    const res = {
        write: jest.fn(),
        end: jest.fn()
    }
    router(req, res);
    expect(res.write).toHaveBeenCalled();
    expect(res.write).toHaveBeenLastCalledWith(`This contains metadata for TERESA\r\nSample data for TERESA\r\n67 53 98 23 121\r\n12 23 43 12 45`);
    expect(res.end).toHaveBeenCalled();
});

test('Failure /user-data', () => {
    const req = {
        url: '/user-data?user=TeresaXXX',
        method: 'GET'
    }
    const res = {
        write: jest.fn(),
        end: jest.fn()
    }
    router(req, res);
    expect(res.write).toHaveBeenCalled();
    expect(res.write).toHaveBeenLastCalledWith(``);
    expect(res.end).toHaveBeenCalled();
});

test('Failure /user-data', () => {
    const req = {
        url: '/user-data',
        method: 'GET'
    }
    const res = {
        write: jest.fn(),
        end: jest.fn()
    }
    router(req, res);
    expect(res.write).toHaveBeenCalled();
    expect(res.write).toHaveBeenLastCalledWith(``);
    expect(res.end).toHaveBeenCalled();
});

test('Failure /no-url', () => {
    const req = {
        url: '/no-url',
        method: 'GET'
    }
    const res = {
        write: jest.fn(),
        end: jest.fn()
    }
    router(req, res);
    expect(res.write).toHaveBeenCalled();
    expect(res.write).toHaveBeenLastCalledWith(``);
    expect(res.end).toHaveBeenCalled();
});
