import { FC } from 'react';
import { FaPlus } from 'react-icons/fa';
import { Form, useLoaderData } from 'react-router-dom';
import { IResponseTransactionLoader } from '../types/types';

const TransactionForm: FC = () => {

    const { categories } = useLoaderData() as IResponseTransactionLoader// useLoaderData из "react-router-dom"

    return (
        <div className='rounded-md bg-slate-800 p-4'>
            <Form className='grid gap-2 method="post' action="/transactions">
                <label className='grid' htmlFor="title">
                    <span>Title</span>
                    <input className='input' type="text" placeholder='Title...' name='title' required />
                </label>
                <label className='grid' htmlFor="amount">
                    <span>Amount</span>
                    <input className='input' type="number" placeholder='Amount...' name='amount' required />
                </label>

                {/* Select */}
                {categories.length
                    ? (
                        <label htmlFor="category" className='grid'>
                            <span>Category:</span>
                            <select className="input" name="category" required>
                                {categories.map((ctg, idx) => (
                                    <option key={idx} value={ctg.id}>{ctg.title}</option>
                                ))}
                            </select>
                        </label>
                    )
                    : (
                        <h1 className='mt-1 text-red-300'>To continue create a category first</h1>
                    )
                }

                <button
                    //onClick={() => setVisibleModal(true)} 
                    className="flex max-w-fit items-center gap-2 text-white/50 hover:text-white">
                    <FaPlus />
                    <span>Manage Categories:</span>
                </button>

                {/* Radio Buttons */}
                <div className='flex items-center gap-4'>
                    <label className='flex cursor-pointer items-center gap-2'>
                        <input type="radio" name='type' value={'income'} className='form-radio text-blue-600' />
                        <span>Income</span>
                    </label>
                    <label className='flex cursor-pointer items-center gap-2'>
                        <input type="radio" name='type' value={'expense'} className='form-radio text-blue-600' />
                        <span>Expense</span>
                    </label>
                </div>

                {/* Submit Button */}
                <button className='btn btn-green max-w-fit mt-2'>
                    Submit
                </button>
            </Form>
        </div>
    );
};

export default TransactionForm;