import L from '../../common/logger';
import ILoan from '../models/loan.model';
import { model, Schema, Model, Document } from 'mongoose';

interface ILoan extends Document {
  owner: string;
  ammount: number;
  ammountToPay: number;
  status: string;
}

const LoanSchema: Schema = new Schema({
  owner: { type: String, required: false },
  ammount: { type: Number, required: false },
  ammountToPay: { type: Number, required: false },
  status: { type: String, required: false },
});
const Loan: Model<ILoan> = model<ILoan>('Loan', LoanSchema);

export class BankService {
  create(owner: string, ammount: number): Promise<ILoan> {
    const tmm = 1.12;
    const ammountToPay = ammount * tmm;
    L.info(`Loan assigned to : ${owner}`);
    const loan = ILoan.create({
      owner: owner,
      ammount: ammount,
      ammountToPay: ammountToPay,
      status: 'unpayed',
    });

    return Promise.resolve(loan);
  }
  update(owner: string, ammount: number): Promise<ILoan> {
    const tmm = 1.12;
    const original = ammount / tmm;
    L.info(`Loan assigned to : ${owner} closed`);
    const loan = ILoan.create({
      owner: owner,
      ammount: original,
      ammountToPay: ammount,
      status: 'payed',
    });

    return Promise.resolve(loan);
  }

  all(): Promise<ILoan[]> {
    L.info('fetching all loans');
    const loans = ILoan.find();
    return Promise.resolve(loans);
  }
}

export default new BankService();
