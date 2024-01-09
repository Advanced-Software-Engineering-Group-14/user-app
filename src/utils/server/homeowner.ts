import axios from "axios";
import { ApiResponse, HomeownerRes } from "../../types";
import Axios from "../axios"
import config from "../../config";

type RegisterInput = {
    email: string
    surname: string
    othernames: string
    gender: "MALE" | "FEMALE",
    phone: string
    password: string
}


type VerifyCodeInput = {
    email: string
    code: string
}

export const REGISTER_USER = async (info: RegisterInput) => {
    try {
        // const response:  ApiResponse<HomeownerRes> = await Axios({
        //     method: "POST",
        //     url: `/homeowner`,
        //     data: info
        // })

        const response: any = await axios.post(`${config.api.base}homeowner`, info)
        
        console.log("register-status", response)

        if (response.status === 200 || response.status === 201) {
            return response.data.data
        } else {
            throw new Error("oops")
        } 
    } catch (error) {
        throw error
    }
}

export const VERIFY_HOMEOWNER_EMAIL = async (info: VerifyCodeInput) => {
    try {
        const response:  ApiResponse<HomeownerRes> = await Axios({
            method: "POST",
            url: `/homeowner/verify`,
            data: info
        })

        if (response.status === 200) {
            return response.data.data
        } else {
            throw new Error("oops")
        } 
    } catch (error) {
        throw error
    }
}