#!/urs/bin/env node
import clear from 'clear';
import { Answers } from 'inquirer';

import messages from './messages';
import { questions } from './questions';
import { mainTmp } from './templates';
import {
  print,
  serializeData,
  createVisited,
  countCornersAmount,
  getPoint,
  getQueueNode,
  fetchFileData,
  isMatrixValid,
  isValidPoint,
  isVisitedPoint,
  isValidPointPath,
  isEndpointAchieved,
  isValidEndStartPoints
} from './utils';
import { IPoint, TVisited, TMatrix, IQueueNode, FieldName } from './types';
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

      const cornersAmount: number = countCornersAmount(
        current,
        isHorizontalMovement
      );

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

  const answer: Answers = await questions();
  const fileData: string | null = await fetchFileData(
    answer[FieldName.fileUrl]
  );

  if (!fileData) return print(messages.fetchFileErrorMsg);

  const { colsAmount, rowsAmount, endPoint, matrix } = serializeData(fileData);

  if (!isMatrixValid(colsAmount, rowsAmount))
    return print(messages.matrixValidationErrorMsg);

  const result: string = breadthFirstSearch(
    matrix,
    START_POINT,
    endPoint,
    colsAmount,
    rowsAmount
  );

  print(result);
})();
