#!/urs/bin/env node
import clear from 'clear';

import messages from './messages';
import { mainTmp } from './templates';
import {
  print,
  createVisited,
  getPoint,
  getEndPoint,
  getQueueNode,
  isValidPoint,
  fetchFileData,
  isVisitedPoint,
  isValidPointPath,
  isEndpointAchieved,
  isValidEndStartPoints
} from './utils';
import { IPoint, TVisited, TMatrix, IQueueNode } from './types';
import { DIRECTIONS, START_POINT } from './constants';

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
  const queue: IQueueNode[] = [getQueueNode(startPoint)];

  visited[startPoint.y][startPoint.x] = true;

  const findAdjcells = (): string => {
    const current: IQueueNode = queue.shift() as IQueueNode;

    if (isEndpointAchieved(current.point, endPoint))
      return `${messages.scriptSuccessMsg} ${current.cornersAmount}`;

    DIRECTIONS.forEach((direction: number[]) => {
      const col: number = current.point.x + direction[0];
      const row: number = current.point.y + direction[1];
      const isHorizontalMovement: boolean = direction[0] !== 0;

      const isTurned: boolean =
        current.isHorizontal !== null &&
        current.isHorizontal !== isHorizontalMovement;

      const cornersAmount: number = isTurned
        ? current.cornersAmount + 1
        : current.cornersAmount;

      const isValidCurrentPoint: boolean =
        isValidPoint(col, row, COLS_AMOUNT, ROWS_AMOUNT) &&
        isValidPointPath(col, row, matrix) &&
        !isVisitedPoint(col, row, visited);

      if (isValidCurrentPoint) {
        const NewQueueNode: IQueueNode = getQueueNode(
          getPoint(col, row),
          isHorizontalMovement,
          cornersAmount
        );

        visited[row][col] = true;
        queue.push(NewQueueNode);
      }
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
