import axios from "axios";
import config from "../../config";
import { ApiResponse, BinRes } from "../../types";


export const GET_USER_BINS = async () => {
    try {
        // const response:  ApiResponse<HomeownerRes> = await Axios({
        //     method: "POST",
        //     url: `/homeowner`,
        //     data: info
        // })

        const response: ApiResponse<BinRes[]> = await axios.get(`${config.api.base}bin/user`)
        
        // console.log("register-status", response)

        if (response.status === 200 || response.status === 201) {
            return response.data.data
        } else {
            throw new Error("oops")
        } 
    } catch (error) {
        throw error
    }
}

export const FILL_ALL_BINS = async () => {
    try {
        // const response:  ApiResponse<HomeownerRes> = await Axios({
        //     method: "POST",
        //     url: `/homeowner`,
        //     data: info
        // })

        const response: ApiResponse<BinRes[]> = await axios.patch(`${config.api.base}bin/fill`)
        
        // console.log("register-status", response)

        if (response.status === 200 || response.status === 201) {
            return response.data.data
        } else {
            throw new Error("oops")
        } 
    } catch (error) {
        throw error
    }
}

export const FILL_SINGLE_BIN = async (id: string) => {
    try {
        // const response:  ApiResponse<HomeownerRes> = await Axios({
        //     method: "POST",
        //     url: `/homeowner`,
        //     data: info
        // })

        const response: ApiResponse<BinRes> = await axios.patch(`${config.api.base}bin/fill/${id}`)
        
        // console.log("register-status", response)

        if (response.status === 200 || response.status === 201) {
            return response.data.data
        } else {
            throw new Error("oops")
        } 
    } catch (error) {
        throw error
    }
}


export const EMPTY_ALL_BINS = async () => {
    try {
        // const response:  ApiResponse<HomeownerRes> = await Axios({
        //     method: "POST",
        //     url: `/homeowner`,
        //     data: info
        // })

        const response: ApiResponse<BinRes[]> = await axios.patch(`${config.api.base}bin/empty`)
        
        // console.log("register-status", response)

        if (response.status === 200 || response.status === 201) {
            return response.data.data
        } else {
            throw new Error("oops")
        } 
    } catch (error) {
        throw error
    }
}

export const EMPTY_SINGLE_BIN = async (id: string) => {
    try {
        // const response:  ApiResponse<HomeownerRes> = await Axios({
        //     method: "POST",
        //     url: `/homeowner`,
        //     data: info
        // })

        const response: ApiResponse<BinRes[]> = await axios.patch(`${config.api.base}bin/empty/${id}`)
        
        // console.log("register-status", response)

        if (response.status === 200 || response.status === 201) {
            return response.data.data
        } else {
            throw new Error("oops")
        } 
    } catch (error) {
        throw error
    }
}


