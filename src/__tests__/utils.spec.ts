import { mocked } from 'ts-jest/utils';

import {
  getEndPoint,
  getPoint,
  hasTraceCorner,
  getQueueNode,
  createVisited,
  fetchFileData,
  isValidPoint,
  isVisitedPoint,
  isValidPointPath,
  isEndpointAchieved,
  isValidEndStartPoints
} from '../utils';
import { IPoint, TVisited, TMatrix, IQueueNode } from '../types';

jest.mock('node-fetch', () => jest.fn());
import fetch from 'node-fetch';

it('gets correct endpoint', () => {
  const endpoint: IPoint = getEndPoint(10, 5);

  expect(endpoint).toMatchObject<IPoint>({ x: 10 - 1, y: 5 - 2 });
});

it('gets correct point', () => {
  const point: IPoint = getPoint(10, 10);

  expect(point).toMatchObject<IPoint>({ x: 10, y: 10 });
});

it('gets queue node', () => {
  const point: IPoint = { x: 2, y: 4 };
  const corners: number = 5;

  const queueNode: IQueueNode = getQueueNode(point, corners);

  expect(queueNode).toMatchObject<IQueueNode>({ point, corners });
});

it('checks start point or end point is valid', () => {
  const matrix: TMatrix = [
    ['0', '1', '0'],
    ['0', '1', '0'],
    ['0', '1', '1']
  ];
  const startPoint: IPoint = { x: 1, y: 0 };
  const endPoint: IPoint = { x: 1, y: 2 };

  const isValid: boolean = isValidEndStartPoints(matrix, startPoint, endPoint);

  expect(isValid).toBeTruthy();
});

it('checks star tpoint or end point is invalid', () => {
  const matrix: TMatrix = [
    ['0', '1', '0'],
    ['0', '1', '0'],
    ['0', '1', '0']
  ];
  const startPoint: IPoint = { x: 1, y: 0 };
  const endPoint: IPoint = { x: 0, y: 2 };

  const isValid: boolean = isValidEndStartPoints(matrix, startPoint, endPoint);

  expect(isValid).toBeFalsy();
});

it('checks is end point achieved', () => {
  const point: IPoint = { x: 3, y: 3 };
  const endPoint: IPoint = { x: 3, y: 3 };

  const isAchived: boolean = isEndpointAchieved(point, endPoint);

  expect(isAchived).toBeTruthy();
});

it("checks isn't end point achieve", () => {
  const point: IPoint = { x: 1, y: 0 };
  const endPoint: IPoint = { x: 0, y: 2 };

  const isAchived: boolean = isEndpointAchieved(point, endPoint);

  expect(isAchived).toBeFalsy();
});

it('checks is point valid', () => {
  const testPointX: number = 0;
  const testPointY: number = 9;
  const COLS_AMOUNT: number = 10;
  const ROWS_AMOUNT: number = 10;

  const isValid: boolean = isValidPoint(
    testPointX,
    testPointY,
    COLS_AMOUNT,
    ROWS_AMOUNT
  );

  expect(isValid).toBeTruthy();
});

it('checks is point invalid', () => {
  const col: number = 0;
  const row: number = 20;
  const COLS_AMOUNT: number = 10;
  const ROWS_AMOUNT: number = 10;

  const isInvalid: boolean = isValidPoint(col, row, COLS_AMOUNT, ROWS_AMOUNT);

  expect(isInvalid).toBeFalsy();
});

describe('fetch file data', () => {
  beforeEach(() => {
    mocked(fetch).mockClear();
  });

  it('fetch success', async () => {
    const url: string = 'http//test-url';
    const getTextResponse = (): string => 'test';

    mocked(fetch).mockImplementation(
      (): Promise<any> =>
        Promise.resolve({ status: 200, text: getTextResponse })
    );

    const result: string | null = await fetchFileData(url);

    expect(result).toEqual<string>(getTextResponse());
  });

  it('fetch error', async () => {
    const url: string = 'http//test-url';

    mocked(fetch).mockImplementation(
      (): Promise<any> => Promise.resolve({ status: 404 })
    );

    const result: string | null = await fetchFileData(url);

    expect(result).toEqual<null>(null);
  });
});

it('checks is path point valid', () => {
  const matrix: TMatrix = [
    ['0', '1', '0'],
    ['0', '1', '0'],
    ['0', '1', '0']
  ];

  const isInside: boolean = isValidPointPath(1, 1, matrix);

  expect(isInside).toBeTruthy();
});

it('checks is path point invalid', () => {
  const matrix: TMatrix = [
    ['0', '1', '0'],
    ['0', '1', '0'],
    ['0', '1', '0']
  ];

  const isInside: boolean = isValidPointPath(0, 0, matrix);

  expect(isInside).toBeFalsy();
});

it('checks is point visited', () => {
  const visited: TVisited = [
    [false, true],
    [false, false]
  ];

  const isVisited: boolean = isVisitedPoint(1, 0, visited);

  expect(isVisited).toBeTruthy();
});

it("checks isn't point visited", () => {
  const visited: TVisited = [
    [false, true],
    [false, false]
  ];

  const isVisited: boolean = isVisitedPoint(0, 0, visited);

  expect(isVisited).toBeFalsy();
});

it('checks visited is created properly', () => {
  const matrix: TMatrix = [
    ['0', '1'],
    ['0', '1']
  ];

  const visited: TVisited = createVisited(matrix);

  expect(visited).toMatchObject<TVisited>([
    [false, false],
    [false, false]
  ]);
});

it('checks is path trace has corner', () => {
  const pathTrace: IPoint[] = [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 1, y: 1 }
  ];

  const cornersAmount: number = hasTraceCorner(pathTrace, 1);

  expect(cornersAmount).toEqual<number>(2);
});

it("checks is path trace hasn't corner", () => {
  const pathTrace: IPoint[] = [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 2, y: 0 }
  ];

  const cornersAmount: number = hasTraceCorner(pathTrace, 1);

  expect(cornersAmount).toEqual<number>(1);
});
