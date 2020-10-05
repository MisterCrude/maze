import fetch, { Response } from 'node-fetch';

import { VISITED_MARK } from './consts';
import { IPoint, IQueueNode } from './types';

export const print = (...args: any): void => console.log(...args);

export const getEndPoint = (cols: number, rows: number): IPoint => ({
  x: cols - 1,
  y: rows - 2
});

export const getPoint = (x: number, y: number): IPoint => ({ x, y });

export const getQueueNode = (point: IPoint, dist: number): IQueueNode => ({
  point,
  dist
});

export const fetchFileData = async (
  url: string,
  errorMsg: string
): Promise<string> => {
  const res: Response = await fetch(url);

  return res.status === 200 ? res.text() : errorMsg;
};

export const isValideUrl = (input: string): boolean => input?.length < 3;

export const isValidPoint = (
  col: number,
  row: number,
  COLS_AMOUNT: number,
  ROWS_AMOUNT: number
): boolean => row >= 0 && row < ROWS_AMOUNT && col >= 0 && col < COLS_AMOUNT;

export const isValidEndStartPoints = (
  matrix: string[][],
  startPoint: IPoint,
  endPoint: IPoint
): boolean =>
  Number(matrix[startPoint.y][startPoint.x]) === 1 &&
  Number(matrix[endPoint.y][endPoint.x]) === 1;

export const isEndpointAchieved = (point: IPoint, endPoint: IPoint): boolean =>
  point.x === endPoint.x && point.y === endPoint.y;

export const isValidPathPoint = (
  col: number,
  row: number,
  matrix: string[][]
): boolean => Number(matrix[row][col]) === 1;

export const isVisitedPoint = (
  col: number,
  row: number,
  visited: string[][]
): boolean => visited[row][col] === VISITED_MARK;
