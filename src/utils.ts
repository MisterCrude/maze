import fetch, { Response } from 'node-fetch';

import { IPoint, TVisited, TMatrix, IQueueNode } from './types';

export const print = (...args: any): void => console.log(...args);

export const getEndPoint = (cols: number, rows: number): IPoint => ({
  x: cols - 1,
  y: rows - 2
});

export const getPoint = (x: number, y: number): IPoint => ({ x, y });

export const getQueueNode = (point: IPoint, corner: number): IQueueNode => ({
  point,
  corner
});

export const fetchFileData = async (url: string): Promise<string | null> => {
  const res: Response = await fetch(url);

  return res.status === 200 ? res.text() : null;
};

export const isValideUrl = (input: string): boolean => input?.length < 3;

export const isValidPoint = (
  col: number,
  row: number,
  COLS_AMOUNT: number,
  ROWS_AMOUNT: number
): boolean => row >= 0 && row < ROWS_AMOUNT && col >= 0 && col < COLS_AMOUNT;

export const isValidEndStartPoints = (
  matrix: TMatrix,
  startPoint: IPoint,
  endPoint: IPoint
): boolean =>
  Number(matrix[startPoint.y][startPoint.x]) === 1 &&
  Number(matrix[endPoint.y][endPoint.x]) === 1;

export const isEndpointAchieved = (point: IPoint, endPoint: IPoint): boolean =>
  point.x === endPoint.x && point.y === endPoint.y;

export const isValidPointPath = (
  col: number,
  row: number,
  matrix: TMatrix
): boolean => !!matrix[row] && Number(matrix[row][col]) === 1;

export const isVisitedPoint = (
  col: number,
  row: number,
  visited: TVisited
): boolean => !!visited[row] && visited[row][col] === true;

export const createVisited = (matrix: TMatrix): TVisited =>
  matrix.map((row: string[]) => row.map(() => false));

export const hasTraceCorner = (pathTrace: IPoint[]): boolean =>
  pathTrace.length > 2 &&
  pathTrace[0].x !== pathTrace[2].x &&
  pathTrace[0].y !== pathTrace[2].y;
