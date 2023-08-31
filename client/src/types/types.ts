// ожидаемые данные отправляемые на сервер при регистрации new user (в src\services\auth.service.ts)
export interface IUserData {
    email: string
    password: string
}

// ожидаемые поля в ответе от сервера при регистрации нового пользователя
export interface IResponseUserData {
    email: string | undefined // либо тип string либо undefined 
    password: string | undefined
    createdAt: string | undefined
    updatedAt: string | undefined
    __v?: number | undefined // необязательное поля
    _id?: string | undefined // необязательное поля
    message: string | undefined
}