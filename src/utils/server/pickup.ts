import axios from "axios";
import config from "../../config";
import { ApiResponse, BinPackageRes, PickupRes } from "../../types";


export const GET_USER_PICKUPS = async () => {
    try {
        // const response:  ApiResponse<HomeownerRes> = await Axios({
        //     method: "POST",
        //     url: `/homeowner`,
        //     data: info
        // })

        const response: ApiResponse<PickupRes[]> = await axios.get(`${config.api.base}pickup/user`)
        
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