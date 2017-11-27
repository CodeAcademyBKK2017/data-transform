const dataTransform = require('../index');

test('it work /first-user', () => {
    const req = {
        url: '/first-user',
        method: 'GET'
    };
    const res = {
        write: jest.fn(),
        end: jest.fn()
    }

    dataTransform(req, res);
    expect(res.write).toHaveBeenCalled();
    expect(res.write).toHaveBeenLastCalledWith('Teresa');
    expect(res.end).toHaveBeenCalled();
});

test('it work /first-user sort=false', () => {
    const req = {
        url: '/first-user?sort=false',
        method: 'GET'
    };
    const res = {
        write: jest.fn(),
        end: jest.fn()
    }

    dataTransform(req, res);
    expect(res.write).toHaveBeenCalled();
    expect(res.write).toHaveBeenLastCalledWith('Teresa');
    expect(res.end).toHaveBeenCalled();
});

test('it work /first-user sort=true', () => {
    const req = {
        url: '/first-user?sort=true',
        method: 'GET'
    };
    const res = {
        write: jest.fn(),
        end: jest.fn()
    }

    dataTransform(req, res);
    expect(res.write).toHaveBeenCalled();
    expect(res.write).toHaveBeenLastCalledWith('John');
    expect(res.end).toHaveBeenCalled();
});

test('it work /first-user sort=true POST Not Use', () => {
    const req = {
        url: '/first-user?sort=true',
        method: 'POST'
    };
    const res = {
        write: jest.fn(),
        end: jest.fn()
    }

    dataTransform(req, res);
    expect(res.write).toHaveBeenCalled();
    expect(res.write).toHaveBeenLastCalledWith('GET Only');
    expect(res.end).toHaveBeenCalled();
});

test('it work /other', () => {
    const req = {
        url: '/other',
        method: 'GET'
    };
    const res = {
        write: jest.fn(),
        end: jest.fn()
    }

    dataTransform(req, res);
    expect(res.write).toHaveBeenCalled();
    expect(res.write).toHaveBeenLastCalledWith('error');
    expect(res.end).toHaveBeenCalled();
});

test('it work /user-data?user=Teresa', () => {
    const req = {
        url: '/user-data?user=Teresa',
        method: 'GET'
    };
    const res = {
        write: jest.fn(),
        end: jest.fn()
    }

    return dataTransform(req, res).then(() => {
        expect(res.write).toHaveBeenCalled();
        expect(res.write).toHaveBeenLastCalledWith('This contains metadata for TERESA\nSample data for TERESA\n67 53 98 23 121\n12 23 43 12 45');
        expect(res.end).toHaveBeenCalled();
    });
  
});

test('it work /user-data?userTest=Teresa', () => {
    const req = {
        url: '/user-data?userTest=Teresa',
        method: 'GET'
    };
    const res = {
        write: jest.fn(),
        end: jest.fn()
    }

    dataTransform(req, res);
    expect(res.write).toHaveBeenCalled();
    expect(res.write).toHaveBeenLastCalledWith('error');
    expect(res.end).toHaveBeenCalled();
});

test('it work /user-merged-data?user=Teresa', () => {
    const req = {
        url: '/user-merged-data?user=Teresa',
        method: 'GET'
    };
    const res = {
        write: jest.fn(),
        end: jest.fn()
    }

    let dataJson = {
        metaData: '1yiyqeiwyqiuey',
        data: 'This contains metadata for TERESA\nSample data for TERESA\n67 53 98 23 121\n12 23 43 12 45'
    }

    return dataTransform(req, res).then((data) => {
        //expect(res.write).toHaveBeenCalled();
        expect(data).toMatchObject(dataJson);
        expect(res.end).toHaveBeenCalled();
    });
  
});

test('it work /user-merged-data?userTest=Teresa not work', () => {
    const req = {
        url: '/user-merged-data?userTest=Teresa1111',
        method: 'GET'
    };
    const res = {
        write: jest.fn(),
        end: jest.fn()
    }

    dataTransform(req, res);
    expect(res.write).toHaveBeenCalled();
    expect(res.write).toHaveBeenLastCalledWith('error');
    expect(res.end).toHaveBeenCalled();
  
});