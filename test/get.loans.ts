import 'mocha';
import { expect } from 'chai';
import request from 'supertest';
import Server from '../server';
import l from '../server/common/logger';
import dbHandler from '../server/common/db-handler';
import { before } from 'mocha';
let server;

describe('notes', () => {
  before(async () => { server = await Server; })
  it('test add a new loan1', async () =>
    request(server)
      .post('/api/v1/loans')
      .send({ owner: 'testloan1', ammount: 1000, ammountToPay: 1120,status:'Paid' })
      .expect('Content-Type', /json/)
      .then(r => {
        expect(r.body)
          .to.be.an('object')
          .that.has.property('ammountToPay')
          .equal(1120)
      }));


  it('test retrieve all records', () =>
    request(server)
      .get('/api/v1/loans')
      .expect('Content-Type', /json/)
      .then(r => {
        expect(r.body)
          .to.be.an('array')
          .of.length(1);
      }));

});
