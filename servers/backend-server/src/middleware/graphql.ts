
import { graphqlExpress, ExpressHandler } from 'graphql-server-express';
import { GraphQLOptions } from 'graphql-server-core';
import 'isomorphic-fetch';
import { logger } from '@sample-stack/utils';
import * as express from 'express';
import { counterRepo } from '../container';
import { schema } from '../api/schema';
import { database } from '@sample-stack/graphql-schema';
import { ICounterRepository, TYPES as CounterTypes } from '@sample-stack/store';

const { persons, findPerson, addPerson } = database;
let debug: boolean = false;
if (process.env.LOG_LEVEL && process.env.LOG_LEVEL === 'trace' || process.env.LOG_LEVEL === 'debug' ) {
    debug = true;
}
export const graphqlExpressMiddleware =
    graphqlExpress((request: express.Request, response: express.Response) => {
        try {
            const graphqlOptions: GraphQLOptions = {
                debug,
                schema,
                context: {
                    persons,
                    findPerson,
                    addPerson,
                    Count: counterRepo,
                },
                formatError: error => {
                    logger.error('GraphQL execution error:', error);
                    return error;
                },
            };
            return graphqlOptions;
        } catch (e) {
            logger.error(e.stack);
        }
    });
