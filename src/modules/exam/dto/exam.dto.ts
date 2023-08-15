import { ExamAIResponse } from 'exam.type';
export class CreateExamDto {
  grade: number;
  subject: string;
  topic: string;
  part: number;
  num_question: number;
}

export class UpdateExamDto {
  grade: number;
  subject: string;
  topic: string;
  part: number;
  exam_responses: ExamAIResponse;
}
