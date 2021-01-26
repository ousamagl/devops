import { Request, Response } from 'express';
import BankService from '../../services/loan.service';
export class Controller {
  create(req: Request, res: Response): void {
    /*var tmm =1.12;
    var ammountToPay = req.body.ammount*tmm;*/
    BankService.create(req.body.owner, req.body.ammount).then((r) =>
      res.status(201).location(`/api/v1/notes`).json(r)
    );
  }
  all(req: Request, res: Response): void {
    BankService.all().then((r) => res.json(r));
  }
}
export default new Controller();
