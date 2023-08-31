import { instance } from './../api/axios.api';
// методы для axios - запросов ( get, post(data), get(:id), delete(:id), update(:id)) 

import { IResponseUserData, IUserData } from "../types/types";

export const AuthService = {
    async registration(userData: IUserData): Promise<IResponseUserData> {
        // ------------------post - запрос( 'UrlParams',  )
        const {data} = await instance.post<IUserData, {data: IResponseUserData}>('user', userData) //! instance настроен нами в axios.api.ts - userData это данные
        return data
    }, // => промис с ожидаемыми полями описанные в типе IResponseUserData
    async login() {},
    async getMe() {},
}