const router = require('../router')

test('GET: /first-user - Should be response Teresa', () => {
    const res = { write: jest.fn(), end: jest.fn() };
    const req = { url: '/first-user', method: 'GET' };

    router(req, res);
    expect(res.write).toHaveBeenCalledWith('Teresa');
    expect(res.end).toHaveBeenCalled();
});

test('GET: /first-user?sort=true - Should be response John', () => {
    const res = { write: jest.fn(), end: jest.fn() };
    const req = { url: '/first-user?sort=true', method: 'GET' };

    router(req, res);
    expect(res.write).toHaveBeenCalledWith('John');
    expect(res.end).toHaveBeenCalled();
});

test('GET: /first-user?sort=false - Should be response Teresa', () => {
    const res = { write: jest.fn(), end: jest.fn() };
    const req = { url: '/first-user?sort=false', method: 'GET' };

    router(req, res);
    expect(res.write).toHaveBeenCalledWith('Teresa');
    expect(res.end).toHaveBeenCalled();
});

test('GET: /user-data?user=Teresa - Should be response data of Teresa', () => {
    const res = { write: jest.fn(), end: jest.fn() };
    const req = { url: '/user-data?user=Teresa', method: 'GET' };

    router(req, res);
    expect(res.write).toHaveBeenCalledWith('This contains metadata for TERESA\nSample data for TERESA\n67 53 98 23 121\n12 23 43 12 45');
    expect(res.end).toHaveBeenCalled();
});

test('GET: /user-data?user=teresa - Get User data with ignore case.', () => {
    const res = { write: jest.fn(), end: jest.fn() };
    const req = { url: '/user-data?user=teresa', method: 'GET' };

    router(req, res);
    expect(res.write).toHaveBeenCalledWith('This contains metadata for TERESA\nSample data for TERESA\n67 53 98 23 121\n12 23 43 12 45');
    expect(res.end).toHaveBeenCalled();
});

// Failure case
test('GET: /unknow-url - Should be response URL not found.', () => {
    const res = { write: jest.fn(), end: jest.fn() };
    const req = { url: '/unknow-url', method: 'GET' };

    router(req, res);
    expect(res.write).toHaveBeenCalledWith('URL not found.');
    expect(res.end).toHaveBeenCalled();
});

test('POST: /first-user - Should be response nothing', () => {
    const res = { write: jest.fn(), end: jest.fn() };
    const req = { url: '/first-user', method: 'POST' };

    router(req, res);
    expect(res.write).toHaveBeenCalledWith('URL not found.');
    expect(res.end).toHaveBeenCalled();
});

test('GET: /user-data?user=Teresaaaaaaa - Should be response data of User not found', () => {
    const res = { write: jest.fn(), end: jest.fn() };
    const req = { url: '/user-data?user=Teresaaaaaaa', method: 'GET' };

    router(req, res);
    expect(res.write).toHaveBeenCalledWith('User not found.');
    expect(res.end).toHaveBeenCalled();
});


test('POST: /user-data?user=Teresaaaaaaa - Should be response data of User not found', () => {
    const res = { write: jest.fn(), end: jest.fn() };
    const req = { url: '/user-data', method: 'POST' };

    router(req, res);
    expect(res.write).toHaveBeenCalledWith('URL not found.');
    expect(res.end).toHaveBeenCalled();
});