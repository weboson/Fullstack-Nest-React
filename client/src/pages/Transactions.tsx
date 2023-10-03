import { FC } from "react";
import { toast } from "react-toastify";
import { instance } from "../api/axios.api";
import TransactionForm from "../components/TransactionForm";
import TransactionTable from "../components/TransactionTable";
import { ICategory} from "../types/types";

// загрузчик списка категорий => в форму
export const transactionLoader = async () => {
  const categories = await instance.get<ICategory[]>('/categories') // axios - запрос
  
  const data = {
    categories: categories.data,
  }
  return data
}

// action 
export const transactionAction = async ({ request }: any) => {
  switch (request.method) {
    case 'POST': {
      const formData = await request.formData() // данные с form-ы
      // формируем объект из данных от формы
      const newTransaction = {
        title: formData.get('title'),
        amount: +formData.get('amount'), // '+' - иначе ошибка
        category: formData.get('category'),
        type: formData.get('type'),
      }

      // вызов axios (axios.api.ts) - передали объект с данными введенные в форме
      await instance.post('/transactions', newTransaction)
      toast.success('Transaction added.') //библиотека анимированных сообщений
      return null // т.к. должно что-то вернуть
    }
      case 'DELETE': {

      }
  }
}


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
    <h1 className="my-5">
      <TransactionTable />
    </h1>
  </>);
};

export default Transactions;
