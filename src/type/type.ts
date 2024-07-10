import dayjs from "dayjs";

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
    feedback: string;
    question: string;
    created_at: dayjs.Dayjs;
}
