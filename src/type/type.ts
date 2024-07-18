export interface QuestionType {
    name: string;
    type: "multi" | "single" | "number";
    variants: Variants[];
    status?: string;
    id?: string
}
export interface Variants {
    name: string;
    id?: string;
    status?: string;
}
export interface FeedbackType {
    id?: string;
    question: [];
    answers: Answers[];
}
export interface Answers {
    feedback: string;
    question: string;
    id: string
}