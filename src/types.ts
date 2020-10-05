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
  dist: number;
}
