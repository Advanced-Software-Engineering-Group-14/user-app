import axios from "axios";
import config from "../../config";
import { ApiResponse, PaymentRes } from "../../types";

export type CreateBinPaymentInput = {
    paymentMethod: "card" | "mobile_money" | "bank"
    response: "success" | "failure"
    totalAmount: number
    refNumber: string
    binPackage: string
}

export const PAY_FOR_BIN_PACKAGE = async (info: CreateBinPaymentInput, token: string) => {
    console.log(info)
    try {
        const response: ApiResponse<PaymentRes> = await axios.post(`${config.api.base}payment/bin-package`, info, {
            // headers: {
            //     "Authorization": `Bearer ${token}`
            // }
        })
        
        console.log("payment-status", response)

        if (response.status === 200 || response.status === 201) {
            return response.data.data
        } else {
            throw new Error("oops")
        } 
    } catch (error) {
        throw error
    }
}

export const VIEW_USER_PAYMENTS = async () => {
    try {
        const response: ApiResponse<PaymentRes[]> = await axios.get(`${config.api.base}payment/user`,
        )
        
        console.log("payment-status", response)

        if (response.status === 200 || response.status === 201) {
            return response.data.data
        } else {
            throw new Error("oops")
        } 
    } catch (error) {
        throw error
    }
}

