import { FC } from "react";
import { AiFillEdit, AiFillCloseCircle } from 'react-icons/ai' // иконки 
import { FaPlus } from 'react-icons/fa'
import { Form } from "react-router-dom";

const Categories: FC = () => {
  return <div className="mt-10 p-4 rounded-md bg-slate-800">
    <h1>Your category list:</h1>
    {/* Category List */}
    <div className="mt-2 flex flex-wrap items-center gap-2">
      <div className="group py-2 px-4 rounded-lg bg-blue-600 flex items-center relative gap-2">
        Salary
        <div className="absolute hidden px-3 left-0 top-0 bottom-0 right-0 rounded-lg bg-black/90 items-center justify-between group-hover:flex">
          <button>
            <AiFillEdit />
          </button>

          <Form className="flex" method="delete" action="/categories">
            <input type="hidden" value={'Category ID'} />
            <button type="submit">
              <AiFillCloseCircle />
            </button>
          </Form>
        </div>
      </div>
    </div>
    {/* Add Category */}
    <button className="mt-5 flex max-w-fit items-center gap-2 text-white/50 hover:text-white">
      <FaPlus/>
      <span>Create a new category</span>
    </button>
  </div>;
};

export default Categories;
