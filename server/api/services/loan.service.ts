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
  create(owner: string, ammount: number, status: string): Promise<ILoan> {
    const tmm = 1.12;
    const ammountToPay = ammount * tmm;
    L.info(`Loan assigned to : ${owner}`);
    const loan = ILoan.create({
      owner: owner,
      ammount: ammount,
      ammountToPay: ammountToPay,
      status: status,
    });

    return Promise.resolve(loan);
  }

  all(): Promise<ILoan[]> {
    L.info('fetching all loans');
    const loans = ILoan.find();
    return Promise.resolve(loans);
  }

  allPaid(): Promise<ILoan[]> {
    L.info('fetching all loans');
    const loans = ILoan.find({ status: 'Paid' || 'paid' });
    return Promise.resolve(loans);
  }
}

export default new BankService();
