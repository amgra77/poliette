import { MikroORM } from '@mikro-orm/core';
import type { NextApiRequest, NextApiResponse } from 'next';
import { PollQuestion } from '~db/questions.entity';
import config from '~db/mikro-orm.config';

export default async function handler(req: NextApiRequest, res: NextApiResponse<PollQuestion[]>) {
    const orm = await MikroORM.init(config);
    const em = orm.em.fork();
    const q = await em.find(PollQuestion, {}, {populate: ['pollOptions']});
    res.status(200).json(q);
}