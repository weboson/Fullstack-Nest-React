// Модальное окно
import { FC } from 'react';
import { Form } from 'react-router-dom';

interface ICategoryModal {
    type: 'post' | 'patch'
    id: number
    setVisibleModal: (visible: boolean) => void
}

const CategoryModal: FC<ICategoryModal> = ({type, id, setVisibleModal}) => { // type - post,delete,putch, setVisibleModal - функция - закрыть/открыть модальное окно
    return (
        <div className='fixed top-0 left-0 bottom-0 right-0 w-full h-full bg-black/50 flex justify-center items-center'>
            <Form className='grid gap-2 w-[300px] p-5 rounded-md bg-slate-900'>
                <label htmlFor="title">
                    <small>Category Title</small>
                    <input className='input w-full' type="text" name='title' placeholder='Title... ' />
                </label>

                <div className='flex items-center gap-2'>
                    <button className='btn btn-green' disabled type='submit'>
                        {type == 'patch' ? 'Save' : 'Create'}
                    </button>
                    <button className='btn btn-red'>Close</button>
                </div>
            </Form>
        </div>
    );
};

export default CategoryModal;