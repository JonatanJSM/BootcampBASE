import axios from 'axios';
import { Client } from '../interfaces';

const url = import.meta.env.VITE_API_URL as string;

export const httpClient = axios.create({   
    baseURL: url
})

const fetchCustomers =async (): Promise<Client> => {
    const {data} = await httpClient.get<Client>("/customer",{})
    return data;
}
