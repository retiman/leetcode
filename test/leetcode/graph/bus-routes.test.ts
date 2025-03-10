import fs from 'fs';
import path from 'path';
import { numBusesToDestination } from '../../src/graph/bus-routes';

describe('bus routes', () => {
  test('bus routes - test case 2', async () => {
    const routes = [[7, 12], [4, 5, 15], [6], [15, 19], [9, 12, 13]];

    expect(numBusesToDestination(routes, 15, 12)).toBe(-1);
  });

  test('bus routes - test case 3', async () => {
    const data = fs.readFileSync(path.join(__dirname, '__data__', 'bus-routes.test.json')).toString();
    const routes = JSON.parse(data);

    expect(numBusesToDestination(routes, 0, 100000)).toBe(-1);
  });
});
