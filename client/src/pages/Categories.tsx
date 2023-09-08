import { FC, useState } from "react";
import { AiFillEdit, AiFillCloseCircle } from 'react-icons/ai' // иконки 
import { FaPlus } from 'react-icons/fa'
import { Form } from "react-router-dom";
import { instance } from "../api/axios.api"; // axios: методы для запросов
import CategoryModal from "../components/CategoryModal";

// метод отправки данных формы из react-router-dom, подробнее: https://reactrouter.com/en/main/components/form#mutation-submissions
// для action (отправки) формы - импорт в router.tsx
export const categoriesAction = async ({ request}: any ) => {
  switch (request.method) {
    case "POST": {
      const formData = await request.formData()
      const title = {
        title: formData.get('title'),
      }
      // axios - запрос
      await instance.post('/categories', title)
      return null // так как функция должна что-то вернуть = хз почему
    }
    case "PATCH": {
      return null
    }
    case "DELETE": {
      return null
    }
  }
}

const Categories: FC = () => {
  // состояние активности окна (показывать или скрывать)
  const [visibleModal, setVisibleModal] = useState<boolean>(false)

  return (
  <>
    <div className="mt-10 p-4 rounded-md bg-slate-800">
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
    <button onClick={() => setVisibleModal(true)} className="mt-5 flex max-w-fit items-center gap-2 text-white/50 hover:text-white">
      <FaPlus/>
      <span>Create a new category</span>
    </button>
  </div>
{/* Модальное окно */}
{/* Add Category Modal */}
  {visibleModal && (<CategoryModal type='post' setVisibleModal={setVisibleModal}/>)}

{/* Edit Category Modal */}
  </>
  )
};

export default Categories;
