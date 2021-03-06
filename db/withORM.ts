import { MikroORM, RequestContext } from '@mikro-orm/core';
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import config from './mikro-orm.config';
import 'reflect-metadata';

declare global {
    var __MikroORM__: MikroORM;
}

const getORM = async () => {
    if (!global.__MikroORM__) {
        global.__MikroORM__ = await MikroORM.init(config);
    }
    return global.__MikroORM__;
};

const withORM = (handler: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse) => {
    const orm = await getORM();
    return RequestContext.createAsync(orm.em, async () => handler(req, res));
}

export default withORM;