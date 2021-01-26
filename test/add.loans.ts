import 'mocha';
import { expect } from 'chai';
import request from 'supertest';
import Server from '../server';
import l from '../server/common/logger';
import dbHandler from '../server/common/db-handler';
import { before } from 'mocha';
let server;

describe('notes', () => {
before( async ()=>{server = await Server;})

  it('test add a new loan1', async () =>
    request(server)
      .post('/api/v1/loans')
      .send({ owner: 'testloan1', ammount: 1000,ammountToPay:1120 })
      .expect('Content-Type', /json/)
      .then(r => {
        expect(r.body)
          .to.be.an('object')
          .that.has.property('ammountToPay')
          .equal(1120) 
      }));

      it('test add a new loan2', async () =>
    request(server)
      .post('/api/v1/loans')
      .send({ owner: 'testloan2', ammount: 2000,ammountToPay:2240 })
      .expect('Content-Type', /json/)
      .then(r => {
        expect(r.body)
          .to.be.an('object')
          .that.has.property('owner')
          .equal('testloan2') 
      }));
  
});
