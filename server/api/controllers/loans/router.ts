import express from 'express';
import controller from './controller';
export default express
  .Router()
  .post('/', controller.create)
  .post('/', controller.update)
  .get('/', controller.all);
//.put('/', controller.update);
