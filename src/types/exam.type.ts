interface Question {
  question: string;
  choices: string[];
  correct_answer: string;
  indicator: string;
  bloom_level: string;
}

export interface ExamAIResponse {
  [key: string]: Question;
}

export interface ExamRequestData {
  grade: number;
  subject: string;
  topic: string;
  part: number;
  num_question: number;
  exam_responses?: ExamAIResponse;
}
