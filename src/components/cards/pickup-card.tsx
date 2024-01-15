import { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";
import { PickupRes } from "../../types";
import ViewItem from "../core/view-item";
import _ from "lodash";
import dayjs from "dayjs"
import PickupStatusBadge, { colorsMap } from "../badges/pickup-status-badge";
import { COLORS } from "../../styles/colors";
import ModalClose from "../ui/modal-close";
import { ClockIcon } from "react-native-heroicons/solid";
import ActionLink from "../ui/action-link";
import Subheading from "../hierarchy/text/subheading";
import Body from "../hierarchy/text/body";
import Separator from "../ui/separator";
import { generatePickupStatusInfo } from "../../utils/functions";
import Button from "../ui/button";

type Props = {
    data: PickupRes
}

export default function PickupCard({ data }: Props) {
    const { _id, bins, createdAt, date, driver, homeowner, payment, status, updatedAt } = data
    const [modalVisible, setModalVisible] = useState(false);

    function closeModal() {
        setModalVisible(false)
    }

    function openModal() {
        setModalVisible(true)
    }


    function cancelPickup() {
        closeModal()
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
                        <Subheading text={`Pickup for ${_.toString(bins?.length)} ${bins?.length === 1 ? "bin" : "bins"}`} />


                        <View style={styles.row}>

                            <ViewItem label="pickup date" value={dayjs(date).format("ddd, MMM D, YYYY")} />
                            <ViewItem label="bin number" value={`${_.toString(bins?.length)} ${bins?.length === 1 ? "bin" : "bins"}`} />
                        </View>
                        <View style={styles.row}>
                            <ViewItem label="status" value={`${_.capitalize(status)} - ${generatePickupStatusInfo(status)}`} />
                        </View>
                        <Separator />

                        <View style={styles.row}>

                            <ViewItem label="driver firstname" value={driver?.othernames || "N/A"} />
                            <ViewItem label="driver surname" value={driver?.surname || "N/A"} />
                        </View>
                        <View style={styles.row}>

                            <ViewItem label="driver email" value={driver?.email || "N/A"} />
                            <ViewItem label="driver phone" value={driver?.phone || "N/A"} />
                        </View>
                        <Separator />

                        <View style={styles.row}>

                            <ViewItem label="Amount Paid" value={_.toString(payment?.totalAmount) || "N/A"} />
                            <ViewItem label="payment reference" value={_.toString(payment?.refNumber) || "N/A"} />
                        </View>
                        <View style={styles.row}>
                            <ViewItem label="Payment method" value={_.toString(payment?.paymentMethod) || "N/A"} />
                            <ViewItem label="payment response" value={_.capitalize(payment?.response) || "N/A"} />
                        </View>

                        <View style={styles.row}>
                            <View style={styles.flexOne}>
                                <Button label="Close" action={closeModal} full />
                            </View>

                            {
                                status === "completed" &&
                                <View style={styles.flexOne}>
                                    <Button variant="primary" label="Pay Now" action={closeModal} full />
                                </View>
                            }
                            {
                                status === "pending" &&
                                <View style={styles.flexOne}>
                                    <Button variant="destructive" label="Cancel" action={cancelPickup} full />
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
                {/* <ViewItem label="status" value={status} /> */}
                <View style={{
                    ...styles.row,
                    alignItems: "center",
                    // justifyContent: "space-between"
                }}>
                    <View style={{
                        ...styles.row,
                        alignItems: "center",

                    }}>
                        <ClockIcon size={28} color={COLORS.black} />
                        <View>
                            <Text style={styles.pickup}>
                                Pickup for {_.toString(bins.length)} {bins.length === 1 ? "bin" : "bins"}
                            </Text>
                            <Text style={styles.textStyle}>
                                {dayjs(date).format("MMM D, YYYY")} · {driver?.othernames || "No driver assigned"} {driver?.surname || ""} · {_.capitalize(status)}
                            </Text>
                            {/* <View style={{
                                backgroundColor: colorsMap[status],
                                height: 10,
                                width: 10,
                                borderRadius: 12,
                            }}>
                            </View> */}
                        </View>
                    </View>
                   
                    {/* <PickupStatusBadge status={status} /> */}
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
