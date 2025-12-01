// src/store/examStore.ts
export type AnswerOption = "A" | "B" | "C" | "D";

export type ExamAnswer = {
  id: string;
  code: string;
  answers: AnswerOption[];
};

let exams: ExamAnswer[] = [];

export const getExams = (): ExamAnswer[] => exams;

export const upsertExam = (exam: ExamAnswer) => {
  const idx = exams.findIndex((e) => e.id === exam.id);
  if (idx === -1) {
    exams.push(exam);
  } else {
    exams[idx] = exam;
  }
};

export const findExamById = (id: string): ExamAnswer | undefined =>
  exams.find((e) => e.id === id);
