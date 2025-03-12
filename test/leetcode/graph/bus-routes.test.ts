from 


soln = Solution()

    const routes = [[7, 12], [4, 5, 15], [6], [15, 19], [9, 12, 13]];

    expect(numBusesToDestination(routes, 15, 12)).toBe(-1);

    const data = fs.readFileSync(path.join(__dirname, '__data__', 'bus-routes.test.json')).toString();
    const routes = JSON.parse(data);

    expect(numBusesToDestination(routes, 0, 100000)).toBe(-1);