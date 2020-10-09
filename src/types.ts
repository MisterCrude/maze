import { Answers } from 'inquirer';

export enum FieldName {
  fileUrl = 'fileUrl'
}

export interface ICustomQuestion extends Answers {
  name: FieldName;
}

export interface IPoint {
  x: number;
  y: number;
}

export interface IQueueNode {
  point: IPoint;
  isHorizontal: boolean | null;
  cornersAmount: number;
}

export type TVisited = boolean[][];

export type TMatrix = string[][];

export interface ISerializedData {
  colsAmount: number;
  rowsAmount: number;
  endPoint: IPoint;
  matrix: TMatrix;
}
