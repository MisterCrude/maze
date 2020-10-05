import { IPoint, IQueueNode } from './types';

export const isValideUrl = (input: string): boolean => input?.length < 3;

export const print = (...args: any): void => console.log(...args);

export const getEndPoint = (cols: number, rows: number): IPoint => ({
  x: cols - 1,
  y: rows - 2
});

export const getPoint = (x: number, y: number): IPoint => ({ x, y });

export const isValidPoint = (
  row: number,
  col: number,
  COLS: number,
  ROWS: number
): boolean => row >= 0 && row < ROWS && col >= 0 && col < COLS;

export const getQueueNode = (point: IPoint, dist: number): IQueueNode => ({
  point,
  dist
});

export const isValidEndStartPoints = (
  matrix: string[][],
  startPoint: IPoint,
  endPoint: IPoint
): boolean =>
  Number(matrix[startPoint.y][startPoint.x]) === 1 &&
  Number(matrix[endPoint.y][endPoint.x]) === 1;
