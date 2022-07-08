import { RequestContext } from "@mikro-orm/core";
import { EntityManager, PostgreSqlDriver } from '@mikro-orm/postgresql';

const getEM = () => {
    const em = RequestContext.getEntityManager() as EntityManager<PostgreSqlDriver>;
    if (!em) throw new Error("Entity manager not found. Are you in a 'withORM'-wrapped Context?");
    return em;
}

export default getEM;