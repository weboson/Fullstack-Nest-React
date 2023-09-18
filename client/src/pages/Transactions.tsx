import { FC } from "react";
import TransactionForm from "../components/TransactionForm";

const Transactions: FC = () => {
  return (
  <>
    <div className="grid grid-cols-3 gap-4 mt-4 items-start">
      {/* Add Transaction Form */}
      <div className="col-span-2 grid">
        <TransactionForm />
      </div>

      {/* Statistic block */}
      <div className="rounded-md bg-slate-800 p-3">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="uppercase text-sm font-bold text-center">
              Total Income:
            </p>
            <p className="mt-2 rounded-sm bg-green-600 p-1 text-center">
              1000$
            </p>
          </div>
          <div>
            <p className="uppercase text-sm font-bold text-center">
              Total Expense:
            </p>
            <p className="mt-2 rounded-sm bg-red-500 p-1 text-center">
              1000$
            </p>
          </div>
        </div>

        <>Chart</>
      </div>
    </div>

    {/* Transactions Table */}
    <h1 className="my-5">Table</h1>
  </>);
};

export default Transactions;
