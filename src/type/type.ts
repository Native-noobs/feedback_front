import dayjs from "dayjs";

export interface QuestionType {
    name: String;
    type: "multi" | "single";
    variants: Variants[];
    id?: String
}
export interface Variants {
    name: String;
}
export interface FeedbackType {
    id?: String;
    feedback: String;
    question: String;
    created_at: dayjs.Dayjs;
}
