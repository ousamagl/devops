import { model, Schema, Model, Document } from 'mongoose';

interface ILoan extends Document {
  owner: string;
  ammount: number;
  ammountToPay: number;
}

const LoanSchema: Schema = new Schema({
  owner: { type: String, required: false },
  ammount: { type: Number, required: false },
  ammountToPay: { type: Number, required: false },
});
const Loan: Model<ILoan> = model<ILoan>('user', LoanSchema);

export default Loan;
