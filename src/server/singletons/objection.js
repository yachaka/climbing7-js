
import * as objection from 'objection';
import knexSingleton from './knex';

objection.Model.knex(knexSingleton);

module.exports = objection;