import { useState } from "react";
import { Alert, Modal, StyleSheet, Pressable, View } from "react-native";
import { BinRes } from "../../types";
import ViewItem from "../core/view-item";
import _ from "lodash";
import { COLORS } from "../../styles/colors";
import ModalClose from "../ui/modal-close";
import { TrashIcon } from "react-native-heroicons/solid";
import { TrashIcon as TrashIconO } from "react-native-heroicons/outline";
import Subheading from "../hierarchy/text/subheading";
import Body from "../hierarchy/text/body";
import Separator from "../ui/separator";
import Button from "../ui/button";
import { FILL_SINGLE_BIN, EMPTY_SINGLE_BIN } from "../../utils/server/bin";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "../providers/session-provider";

type Props = {
    data: BinRes
}

export default function BinCard({ data }: Props) {
    const { user } = useSession()
    const { _id, createdAt, homeowner, status, updatedAt, category, isCustom, price, size } = data
    const [modalVisible, setModalVisible] = useState(false);
    const queryClient = useQueryClient()


    function closeModal() {
        setModalVisible(false)
    }

    function openModal() {
        setModalVisible(true)
    }


    const fillSingleBin = useMutation({
        mutationFn: () => {
            if (user && user.token) {
                return FILL_SINGLE_BIN(_id)
            }
            throw new Error("Please login again")
        },
        onSuccess: (newData) => {
            queryClient.setQueryData(['bins'], (oldData: BinRes[]) => {
                const filtered = oldData ? oldData.filter((item) => item._id !== _id) : oldData
                return [...filtered, newData]
            })
            closeModal()

            return Alert.alert("Success", "Request successfull")

        },
        onError: (error: any) => {
            console.log(error.response)
            return Alert.alert("Oops", error.response?.data?.message || "Something went wrong")
        }
    })

    const emptySingleBin = useMutation({
        mutationFn: () => {
            if (user && user.token) {
                return EMPTY_SINGLE_BIN(_id)
            }
            throw new Error("Please login again")
        },
        onSuccess: (newData) => {
            queryClient.setQueryData(['bins'], (oldData: BinRes[]) => {
                const filtered = oldData ? oldData.filter((item) => item._id !== _id) : oldData
                return [...filtered, newData]
            })
            closeModal()
            return Alert.alert("Success", "Request successfull")

        },
        onError: (error: any) => {
            console.log(error.response)
            return Alert.alert("Oops", error.response?.data?.message || "Something went wrong")
        }
    })

    function fillBin() {
        fillSingleBin.mutate(undefined)
    }

    function emptyBin() {
        emptySingleBin.mutate(undefined)
    }


    return (
        <View style={{}}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    // Alert.alert('Modal has been closed.');
                    closeModal()
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <ModalClose action={closeModal} />
                        <Subheading text={`${_.capitalize(category)} Bin`} />


                        <View style={styles.row}>

                            <ViewItem label="size" value={_.toUpper(size)} />
                            <ViewItem label="price" value={`GHC ${_.toString(price)}`} />
                        </View>
                        <View style={styles.row}>

                            <ViewItem label="status" value={_.capitalize(status)} />
                            <ViewItem label="category" value={`GHC ${_.capitalize(category)}`} />
                        </View>

                        <Separator />



                        <View style={styles.row}>
                            <View style={styles.flexOne}>
                                <Button label="Close" action={closeModal} full />
                            </View>

                            {
                                status === "full" &&
                                <View style={styles.flexOne}>
                                    <Button variant="destructive" label="Empty Bin" action={emptyBin} full />
                                </View>
                            }
                            {
                                status === "empty" &&
                                <View style={styles.flexOne}>
                                    <Button variant="primary" label="Fill Bin" action={fillBin} full />
                                </View>
                            }
                        </View>

                    </View>
                </View>
            </Modal>
            {/* Card */}
            <Pressable
                style={styles.container}
                onPress={() => setModalVisible(true)}
            >
                <View style={{
                    ...styles.row,
                }}>
                    {
                        status === "full" ? 
                        <TrashIcon size={46} color={COLORS.black} /> :
                        <TrashIconO size={46} color={COLORS.black} />
                    }
                    <View style={{

                    }}>
                        <Subheading text={`${_.capitalize(category)} Bin`} />
                        <Body text={` ${_.capitalize(status)} `} />

                    </View>
                </View>
                



            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // marginTop: 8,
        backgroundColor: `${COLORS.black}50`,
        padding: 16,
    },
    modalView: {
        backgroundColor: COLORS.white,
        borderRadius: 8,
        padding: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
        position: "relative",
        width: "100%",
        gap: 8,
    },
    textStyle: {
        fontWeight: "400",
        fontSize: 14
    },
    pickup: {
        fontWeight: "500",
        fontSize: 18
    },
    modalText: {
        // textAlign: 'center',
    },
    container: {
        marginBottom: 8,
        borderWidth: 1,
        width: "100%",
        padding: 12,
        borderRadius: 16,
        gap: 4,
        borderColor: COLORS.gray
        // flexDirection: "row",
        // alignItems: "center",
    },
    modalTitle: {
        fontWeight: "600",
        fontSize: 20,
        marginBottom: 8,
    },
    row: {
        flexDirection: "row",
        gap: 8,
        width: "100%",

    },
    flexOne: {
        flex: 1
    }

});
