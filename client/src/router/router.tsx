import { createBrowserRouter } from "react-router-dom"; // создает RouterApp
import Auth from "../pages/Auth";
import Categories from "../pages/Categories";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import Layout from "../pages/Layout";
import Transactions from "../pages/Transactions";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />, // основной шаблон
        errorElement: <ErrorPage />, // шаблон ошибки
        // дочерние страницы
        children: [
            {
                index: true, // одно и тоже, что: path: '/'
                element: <Home />,
            },
            {
                path: "transactions",
                element: <Transactions />,
            },
            {
                path: "categories",
                element: <Categories />,
            },
            {
                path: "auth",
                element: <Auth />,
            }
        ]

    }
])