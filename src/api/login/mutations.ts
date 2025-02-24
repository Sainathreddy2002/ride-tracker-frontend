import axiosInstance from "../../config/axiosSetup";
import { Login, Signup } from "./Login-types";

export const login=async(payload:Login)=>{
    return await axiosInstance.post('/auth/login',payload).then(res=>res.data);
}

export const register=async(payload:Signup)=>{
    return await axiosInstance.post('/auth/signup', payload).then(res=>res.data);
}