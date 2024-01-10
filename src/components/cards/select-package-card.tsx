import { View, StyleSheet, Text, TouchableOpacity, Alert } from "react-native"
import { BinPackageRes } from "../../types"
import _ from "lodash"
import { WrenchScrewdriverIcon, TrashIcon } from "react-native-heroicons/solid";
import { COLORS } from "../../styles/colors";
import { useRef } from "react"
import { Paystack, paystackProps, } from 'react-native-paystack-webview';
import { useSession } from "../providers/session-provider";
import { Redirect, router } from 'expo-router';
import config from "../../config";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { PAY_FOR_BIN_PACKAGE, CreateBinPaymentInput} from "../../utils/server/payment"

interface Response {
    status: string;
}
interface SuccessResponse extends Response {
    transactionRef?: string;
    data?: any;
}

type Props = {
    item: BinPackageRes
}


export default function SelectPackageCard({ item }: Props) {
    const { user, signOut } = useSession();
    const paystackWebViewRef = useRef<paystackProps.PayStackRef | any>();

    if (!!!user) {
        return <Redirect href="/login" />;
    }

    const { _id, binNum, name, price, size, } = item
    const sizesMap = {
        sm: "small",
        md: "medium",
        lg: "large"
    }

    function triggerPayment() {
        paystackWebViewRef?.current?.startTransaction()
    }

    const payForBin = useMutation({
        mutationFn: (values: CreateBinPaymentInput) => {
            if (user && user.token) {
                return PAY_FOR_BIN_PACKAGE(values, user.token)
            }
            throw new Error("Please login again")
        }
    })


    async function createPaymentRecord(res: SuccessResponse) {
      

        const info: CreateBinPaymentInput = {
            paymentMethod: "mobile_money",
            binPackage: _id,
            response: res.status !== "success" ? "failure" : res.status,
            refNumber: res.data?.transactionRef?.trxref,
            totalAmount: price
        }

        console.log(info)

        payForBin.mutate(info, {
            onSuccess: async (newData) => {
                console.log(newData)
                await signOut()
            },
            onError: (error: any) => {
                console.log(error?.response?.data)
                return Alert.alert("Oops!", error?.response?.data?.message || "Couldn't create payment record")
            } 
        })

    }

    const sizeText = sizesMap[size]
    return (

        <TouchableOpacity onPress={triggerPayment} style={styles.container} >
            <Paystack
                paystackKey={config.paystack.public}
                activityIndicatorColor={COLORS.black}
                channels={[ "mobile_money", ]}
                billingName="Wastify"
                firstName={user?.othernames}
                lastName={user?.surname}
                currency="GHS"
                billingEmail={user?.email}
                amount={`${_.toString(price)}.00`}
                onCancel={(e) => {
                    // handle response here
                    console.log(e)
                }}
                onSuccess={(res) => {
                    createPaymentRecord(res)
                }}
                ref={paystackWebViewRef}
            />
            {/* <View style={styles.container}> */}
            <View>
                <TrashIcon size={50} color={COLORS.grey} />
            </View>
            <View>

                <Text style={styles.name}>
                    {name}
                </Text>
                <Text style={styles.description}>
                    This package comes with {_.toString(binNum)} {sizeText} bins
                </Text>
                <Text style={styles.price}>
                    GHC {_.toString(price)}
                </Text>
            </View>
            {/* </View> */}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        borderWidth: 1,
        width: "100%",
        padding: 12,
        borderRadius: 16,
        gap: 4,
        flexDirection: "row",
        alignItems: "center",
    },
    name: {
        fontSize: 20,
        fontWeight: "600",

    },
    description: {
        fontSize: 14,
    },
    price: {
        fontSize: 16,
        fontWeight: "600"
    },
    image: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: '#0553',
    },
    container2: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
})