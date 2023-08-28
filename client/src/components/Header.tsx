import { FC } from 'react'; // TypeScript - интерфейс функционального компонента: FC
import { Link, NavLink } from 'react-router-dom'; // Link - это обозначение ссылки
import { FaBtc, FaSignOutAlt } from 'react-icons/fa'; // библиотека иконок

const Header: FC = () => {
    // залогинен ли пользователь
    const isAuth = false;

    return (
        <header className='flex items-center p-4 shadow-sm bg-slate-800 backdrop-blur-sm'>
            <Link to="/">
                <FaBtc size={20} />
            </Link>

            {
                //! menu
                // условие: если user авторизирован, то отрендерить список (menu)
                isAuth && (
                    <nav className='ml-auto mr-10'>
                        <ul className="flex items-center gap-5">
                            <li>
                                <NavLink to={'/'} className={({ isActive }) => isActive ? 'text-white' : 'text-white/50'}> Home</NavLink>
                            </li>
                            <li>
                                <NavLink to={'/transactions'} className={({ isActive }) => isActive ? 'text-white' : 'text-white/50'}> Transactions </NavLink>
                            </li>
                            <li>
                                <NavLink to={'/categories'} className={({ isActive }) => isActive ? 'text-white' : 'text-white/50'}> Categories</NavLink>
                            </li>
                        </ul>
                    </nav>
                )
            }
            {
                // button log_in/log_out
                isAuth
                    ? (
                        <button className='btn btn-red'>
                            <span>Log Out</span>
                            <FaSignOutAlt />
                        </button>
                    )
                    : (
                        <Link to={'auth'} className='py-2 text-white/50 hover:text-white ml-auto'>
                            Log In / Sing In
                        </Link>
                    )
            }
        </header>
    )

}

export default Header;