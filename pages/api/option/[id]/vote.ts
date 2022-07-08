import type { NextApiRequest, NextApiResponse } from 'next';
import { ErrorMessage } from '~types';
import { PollOption } from '~db/question-option';
import withORM from '~db/withORM';
import getEM from '~db/getEM';

async function handler( req: NextApiRequest, res: NextApiResponse<PollOption|ErrorMessage>) {
    const em = getEM();
    if (req.method === 'POST') {
        const { id } = req.query;
        if (!(id !== undefined && typeof id === 'string')) {
            return res.status(404).json({ message: `ID not supplied` })
        }
        else {
            try {
                const pollOption = await em.findOneOrFail(PollOption, id);
                pollOption.count = pollOption.count + 1;
                await em.persistAndFlush(pollOption);
                return res.status(200).json(pollOption);
            } catch (error) {
                console.error('error ', error);
                return res.status(500).json({ message: "There was a problem voting" });
            }
        }
    }
    else {
        return res.status(405).json({message: `Method ${req.method} not supported`})
    }
}

export default withORM(handler);