import fetch, { Response } from 'node-fetch';

import {
  IPoint,
  TVisited,
  TMatrix,
  IQueueNode,
  ISerializedData
} from './types';

export const print = (...args: any): void => console.log(...args);

export const getEndPoint = (cols: number, rows: number): IPoint => ({
  x: cols - 1,
  y: rows - 2
});

export const getPoint = (x: number, y: number): IPoint => ({ x, y });

export const getQueueNode = (
  point: IPoint,
  isHorizontal: boolean | null = null,
  cornersAmount: number = 0
): IQueueNode => ({
  point,
  isHorizontal,
  cornersAmount
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

export const countCornersAmount = (
  currentPoint: IQueueNode,
  isHorizontalMovement: boolean
): number => {
  const { cornersAmount, isHorizontal: isCurrentHorizontal } = currentPoint;
  const isTurned: boolean =
    isCurrentHorizontal !== null &&
    isCurrentHorizontal !== isHorizontalMovement;

  return isTurned ? cornersAmount + 1 : cornersAmount;
};

export const serializeData = (data: string): ISerializedData => {
  const rawMatrix: string[] = data.split('\n');

  const [
    colsAmount,
    rowsAmount
  ]: number[] = (rawMatrix.shift() as string)
    .split(',')
    .map((item: string) => Number(item));

  const matrix: TMatrix = rawMatrix.map((row: string) => row.split(''));
  const endPoint: IPoint = getEndPoint(Number(colsAmount), Number(rowsAmount));

  return { colsAmount, rowsAmount, endPoint, matrix };
};
