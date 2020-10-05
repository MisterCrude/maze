import {
  getEndPoint,
  getPoint,
  isValidPoint,
  getQueueNode,
  isValidEndStartPoints
} from '../utils';
import { IPoint, IQueueNode } from '../types';

it('gets correct endpoint', () => {
  const endpoint: IPoint = getEndPoint(10, 5);

  expect(endpoint).toMatchObject<IPoint>({ x: 10 - 1, y: 5 - 2 });
});

it('gets correct point', () => {
  const point: IPoint = getPoint(10, 10);

  expect(point).toMatchObject<IPoint>({ x: 10, y: 10 });
});

it('checks is point valid', () => {
  const testPointX: number = 0;
  const testPointY: number = 9;
  const ROWS: number = 10;
  const COLS: number = 10;

  const isValid: boolean = isValidPoint(testPointX, testPointY, COLS, ROWS);

  expect(isValid).toBeTruthy();
});

it('checks is point invalid', () => {
  const testPointX: number = 0;
  const testPointY: number = 20;
  const ROWS: number = 10;
  const COLS: number = 10;

  const isInvalid: boolean = isValidPoint(testPointX, testPointY, COLS, ROWS);

  expect(isInvalid).toBeFalsy();
});

it('gets queue node', () => {
  const point: IPoint = { x: 2, y: 4 };
  const dist: number = 5;

  const queueNode: IQueueNode = getQueueNode(point, dist);

  expect(queueNode).toMatchObject<IQueueNode>({ point, dist });
});

it('checks start point or end point is valid', () => {
  const matrix: string[][] = [
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
  const matrix: string[][] = [
    ['0', '1', '0'],
    ['0', '1', '0'],
    ['0', '1', '0']
  ];
  const startPoint: IPoint = { x: 1, y: 0 };
  const endPoint: IPoint = { x: 0, y: 2 };

  const isValid: boolean = isValidEndStartPoints(matrix, startPoint, endPoint);

  expect(isValid).toBeFalsy();
});
