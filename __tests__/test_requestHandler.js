const reqHand = require('../requestHandler');

//--------------------------------------------------

test('Exercise 1: read first user: Success', function() {
    const request = {
        url: '/first-user',
        method: 'GET'
    };
    const response = {
        write: jest.fn(),
        end: jest.fn()
    }
    reqHand.requestHandler(request, response);

    expect(response.write).toHaveBeenCalledWith('Teresa');
    expect(response.end).toHaveBeenCalled();
});

test('Exercise 1: read first user: Failure', function() {
    const request = {
        url: '/first-user',
        method: 'POST'
    };
    const response = {
        write: jest.fn(),
        end: jest.fn()
    }
    reqHand.requestHandler(request, response);

    expect(response.write).toHaveBeenCalledWith(reqHand.WRONG_METHOD);
    expect(response.end).toHaveBeenCalled();
});

test('Exercise 2: read first user with sort: Success', function() {
    const request = {
        url: '/first-user?sort=true',
        method: 'GET'
    };
    const response = {
        write: jest.fn(),
        end: jest.fn()
    }
    reqHand.requestHandler(request, response);

    expect(response.write).toHaveBeenCalledWith('John');
    expect(response.end).toHaveBeenCalled();
});

test('Exercise 2: read first user with sort: Failure', function() {
    const request = {
        url: '/first-user?sort=false',
        method: 'GET'
    };
    const response = {
        write: jest.fn(),
        end: jest.fn()
    }
    reqHand.requestHandler(request, response);

    expect(response.write).toHaveBeenCalledWith('Teresa');
    expect(response.end).toHaveBeenCalled();
});

test('Exercise 3: read user data: Success', function() {
    const request = {
        url: '/user-data?user=Teresa',
        method: 'GET'
    };
    const response = {
        write: jest.fn(),
        end: jest.fn()
    }
    reqHand.requestHandler(request, response);

    expect(response.write).toHaveBeenCalledWith(`This contains metadata for TERESA
Sample data for TERESA
67 53 98 23 121
12 23 43 12 45`);
    expect(response.end).toHaveBeenCalled();
});

test('Exercise 3: read user data: Failure', function() {
    const request = {
        url: '/user-data?user=asdf',
        method: 'GET'
    };
    const response = {
        write: jest.fn(),
        end: jest.fn()
    }
    reqHand.requestHandler(request, response);

    expect(response.write).toHaveBeenCalledWith(reqHand.USER_NOT_FOUND);
    expect(response.end).toHaveBeenCalled();
});

//--------------------------------------------------

test('Page Not Found', function() {
    const request = {
        url: '/qwertyuiop',
        method: 'GET'
    };
    const response = {
        write: jest.fn(),
        end: jest.fn()
    }
    reqHand.requestHandler(request, response);

    expect(response.write).toHaveBeenCalledWith(reqHand.PAGE_NOT_FOUND);
    expect(response.end).toHaveBeenCalled();
});
