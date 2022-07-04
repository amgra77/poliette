import type { NextApiRequest, NextApiResponse } from 'next';
import { ErrorMessage } from '~types';
import { PollOption } from '~db/question-option';
import { MikroORM } from '@mikro-orm/core';
import config from '~db/mikro-orm.config';

export default async function handler( req: NextApiRequest, res: NextApiResponse<PollOption|ErrorMessage>) {
    if (req.method === 'POST') {
        try {
            const orm = await MikroORM.init(config);
            const em = orm.em.fork();
            const { id } = req.query;
            if (id!==undefined && typeof id === 'string') {
                const pollOption = await em.findOneOrFail(PollOption, id);
                pollOption.count = (pollOption.count??0) + 1;
                await em.persistAndFlush(pollOption);
                return res.status(200).json(pollOption);
            }
            else {
                throw new Error("optionID not provided");
            }
        } catch (error) {
            console.error('error ', error);
            return res.status(500).json({ message: "There was a problem processing your request" });
        }
    }
    else {
        return res.status(405).json({ message: `Method ${req.method} not supported` })
    }
}