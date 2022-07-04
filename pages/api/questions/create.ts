import type { NextApiRequest, NextApiResponse } from 'next';
import { PollQuestion } from '~db/questions.entity';
import withORM from '~db/withORM';
import getEM from '~db/getEM';
import { ErrorMessage, PollQuestionCreate } from '~types';
import { PollOption } from '~db/question-option';

async function handler( req: NextApiRequest, res: NextApiResponse<PollQuestion|ErrorMessage>) {
    const em = getEM();
    if (req.method === 'POST') {
        try {
            const { question:questionContent, options: questionOptions } = req.body as PollQuestionCreate;
            const newQuestion = new PollQuestion(questionContent);
            if (questionOptions && questionOptions.length) {
                questionOptions.forEach(oneOption => {
                    newQuestion.pollOptions.add(new PollOption(oneOption))
                })
            }
            await em.persistAndFlush(newQuestion);
            return res.status(200).json(newQuestion);
        } catch (error) {
            console.error('error ', error);
            return res.status(500).json({ message: "There was a problem processing your request" });
        }
    }
    else {
        return res.status(405).json({ message: `Method ${req.method} not supported` })
    }
}

export default withORM(handler);