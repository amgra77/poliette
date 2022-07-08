import type { NextApiRequest, NextApiResponse } from 'next';
import { PollQuestion } from '~db/questions.entity';
import withORM from '~db/withORM';
import getEM from '~db/getEM';
import { ErrorMessage } from '~types';

async function handler(req: NextApiRequest, res: NextApiResponse<PollQuestion[] | ErrorMessage>) {
    const em = getEM();
    if (req.method === 'GET') {
        try {
            const questions = await em.find(PollQuestion, {}) as PollQuestion[];
            return res.status(200).json(questions);
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