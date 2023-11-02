// таблица транзакций
import { FC } from 'react'; // тип функционального компонента от React
import { FaTrash } from 'react-icons/fa';
import { useLoaderData } from 'react-router-dom';
import { IResponseTransactionLoader } from '../types/types';
// хэлперы 
import { formatDate } from '../helpers/date.helper' // форматирование даты в более читабельный вид
import { formatToUSD } from '../helpers/currency.helper' // форматирование даты в более читабельный вид

const TransactionTable: FC = () => {
    // получим данные от посредника useLoaderData (react-router-dom) <= transactionLoader
    const { transactions } = useLoaderData() as IResponseTransactionLoader // как тип IResponseTransactionLoader
    //console.log(transactions)

    return <>
        <div className='bg-slate-800 px-4 py-3 rounded-md'>
            <table className='w-full'>
                <thead>
                    <tr>
                        <td className='font-bold'> № </td>
                        <td className='font-bold'>Title</td>
                        <td className='font-bold'>Amount($)</td>
                        <td className='font-bold'>Category</td>
                        <td className='font-bold'>Date</td>
                        <td className='text-right'>Action</td>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((transaction, idx) => (
                        <tr key={idx}>
                            <td>{idx + 1}</td>
                            <td> {transaction.title} </td>
                            <td className={
                                transaction.type === 'income'
                                    ? 'text-green-500'
                                    : 'text-red-500'
                            }
                            >
                                {transaction.type == 'income'
                                    ? `+ ${formatToUSD.format(transaction.amount)}`
                                    : `- ${formatToUSD.format(transaction.amount)}`
                                }
                            </td>
                            <td> {transaction.category?.title || `Other`} </td>
                            <td>{formatDate(transaction.createdAt)}</td>
                            <td>
                                <button className='btn hover:btn-red ml-auto'>
                                    <FaTrash />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </>
};

export default TransactionTable;