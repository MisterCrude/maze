import inquirer, { Question, Answers } from 'inquirer';

import messages from './messages';
import { ICustomQuestion, FieldName } from './types';

export const urlQuestion: Question<ICustomQuestion> = {
  message: messages.urlQuestionMsg,
  name: FieldName['fileUrl'],
  type: 'input'
};

export const questions = async (): Promise<Answers> =>
  inquirer.prompt<Answers>([urlQuestion]);
