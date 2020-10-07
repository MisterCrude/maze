#!/urs/bin/env node
import clear from 'clear';

import messages from './messages';
import { mainTmp } from './templates';
import {
  print,
  isValidPoint,
  createVisited,
  getPoint,
  getEndPoint,
  getQueueNode,
  fetchFileData,
  isVisitedPoint,
  isValidPointPath,
  isEndpointAchieved,
  isValidEndStartPoints
} from './utils';
import { IPoint, TVisited, TMatrix, IQueueNode } from './types';

export const ROW_STEPS: number[] = [-1, 0, 0, 1];
export const COL_STEPS: number[] = [0, -1, 1, 0];
export const START_POINT: IPoint = { x: 0, y: 1 };

export const breadthFirstSearch = (
  matrix: TMatrix,
  startPoint: IPoint,
  endPoint: IPoint,
  COLS_AMOUNT: number,
  ROWS_AMOUNT: number
): string => {
  if (!isValidEndStartPoints(matrix, startPoint, endPoint))
    return messages.pointInvalidMsg;

  const visited: TVisited = createVisited(matrix);
  const queue: IQueueNode[] = [];

  visited[startPoint.y][startPoint.x] = true;
  queue.push(getQueueNode(startPoint, 0));

  const findAdjcells = (): string => {
    const current: IQueueNode = queue.shift() as IQueueNode;

    if (isEndpointAchieved(current.point, endPoint))
      return `${messages.scriptSuccessMsg} ${current.dist}`;

    [0, 1, 2, 3].forEach((step: number) => {
      const col: number = current.point.x + COL_STEPS[step];
      const row: number = current.point.y + ROW_STEPS[step];

      const isValidCurrentPoint: boolean =
        isValidPoint(col, row, COLS_AMOUNT, ROWS_AMOUNT) &&
        isValidPointPath(col, row, matrix) &&
        !isVisitedPoint(col, row, visited);

      visited[row][col] = isValidCurrentPoint;
      isValidCurrentPoint
        ? queue.push(getQueueNode(getPoint(col, row), current.dist + 1))
        : queue;
    });

    if (queue.length) return findAdjcells();

    return messages.scriptErrorMsg;
  };
  return findAdjcells();
};

(async () => {
  clear();
  print(mainTmp(messages.appNameMsg));

  const fileData: string | null = await fetchFileData(
    'http://127.0.0.1:4000/assets/file.txt'
  );

  if (!fileData) return print(messages.fetchFileErrorMsg);

  const rawMatrix: string[] = fileData.split('\n');

  const [
    colsAmount,
    rowsAmount
  ]: number[] = (rawMatrix.shift() as string)
    .split(',')
    .map((item: string) => Number(item));

  const matrix: TMatrix = rawMatrix.map((row: string) => row.split(''));

  const endPoint: IPoint = getEndPoint(Number(colsAmount), Number(rowsAmount));

  const result: string = breadthFirstSearch(
    matrix,
    START_POINT,
    endPoint,
    colsAmount,
    rowsAmount
  );

  print(result);
})();
