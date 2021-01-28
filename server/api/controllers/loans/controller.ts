import { Request, Response } from 'express';
import BankService from '../../services/loan.service';
export class Controller {
  create(req: Request, res: Response): void {
    BankService.create(
      req.body.owner,
      req.body.ammount,
      req.body.status
    ).then((r) => res.status(201).location(`/api/v1/loans`).json(r));
  }

  all(req: Request, res: Response): void {
    BankService.all().then((r) => res.json(r));
  }
}
export default new Controller();
