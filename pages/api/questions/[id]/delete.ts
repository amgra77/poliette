import type { NextApiRequest, NextApiResponse } from 'next';
import { PollQuestion } from '~db/questions.entity';
import withORM from '~db/withORM';
import getEM from '~db/getEM';
import { ErrorMessage } from '~types';

async function handler(req: NextApiRequest, res: NextApiResponse<PollQuestion | ErrorMessage>) {
    const em = getEM();
    const { id } = req.query;
    if (req.method === 'DELETE') {
        try {
            const question = await em.findOneOrFail(PollQuestion, { id });
            await em.removeAndFlush(question);
            return res.status(200).json(question);
        } catch (error) {
            console.error('error ', error);
            return res.status(404).json({ message: "Question NOT found" });
        }
    }
    else {
        return res.status(405).json({ message: `Method ${req.method} not supported` })
    }
}

export default withORM(handler);