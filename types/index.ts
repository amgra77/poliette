export interface ErrorMessage {
    message: string;
}

export interface PollOption {
    id: string;
    option: string;
    count: number;
}

export interface PollQuestion {
    id: string;
    question: string;
    created: string; // ISO DATE
    updated: string; // ISO DATE
    pollOptions: PollOption[];
}

export interface PollQuestionCreate {
    question: string;
    options: string[];
}

export interface PollVote {
    id: string;
}