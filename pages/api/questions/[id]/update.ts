import type { NextApiRequest, NextApiResponse } from 'next';
import { PollQuestion } from '~db/questions.entity';
import withORM from '~db/withORM';
import getEM from '~db/getEM';
import { ErrorMessage } from '~types';

async function handler(req: NextApiRequest, res: NextApiResponse<PollQuestion | ErrorMessage>) {
    const em = getEM();
    const { id } = req.query;
    if (req.method === 'PATCH') {
        try {
            const question = await em.findOneOrFail(PollQuestion, { id });
            const { question: questionContent } = req.body;
            if (questionContent) {
                question.question = questionContent;
                await em.persistAndFlush(question);
            }
            return res.status(200).json(question);
        } catch (error) {
            console.error('error ', error);
            return res.status(500).json({ message: "There was a problem updating question" });
        }
    }
    else {
        return res.status(405).json({ message: `Method ${req.method} not supported` })
    }
}

export default withORM(handler);