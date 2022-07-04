export interface ErrorMessage {
    message: string;
}

export interface PollQuestionCreate {
    question: string;
    options: string[];
}

export interface PollVote {
    id: string;
}