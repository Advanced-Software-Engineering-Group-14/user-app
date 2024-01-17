import { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";
import { PaymentRes } from "../../types";
import ViewItem from "../core/view-item";
import _ from "lodash";
import dayjs from "dayjs"
import PickupStatusBadge, { colorsMap } from "../badges/pickup-status-badge";
import { COLORS } from "../../styles/colors";
import ModalClose from "../ui/modal-close";
import { BanknotesIcon } from "react-native-heroicons/solid";
import ActionLink from "../ui/action-link";
import Subheading from "../hierarchy/text/subheading";
import Body from "../hierarchy/text/body";
import Separator from "../ui/separator";
import { generatePickupStatusInfo } from "../../utils/functions";
import Button from "../ui/button";

type Props = {
    data: PaymentRes
}

export default function PaymentCard({ data }: Props) {
    const { _id, createdAt, homeowner, updatedAt, paymentMethod, paymentType, refNumber, response, totalAmount } = data
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
                        <Subheading text={`Payment for ${_.capitalize(paymentType)}`} />


                        <View style={styles.row}>

                            <ViewItem label="Amount Paid" value={_.toString(totalAmount) || "N/A"} />
                            <ViewItem label="payment reference" value={_.toString(refNumber) || "N/A"} />
                        </View>
                        <View style={styles.row}>
                            <ViewItem label="Payment method" value={_.startCase(_.replace(paymentMethod, /_/g, ' ')) || "N/A"} />
                            <ViewItem label="payment response" value={_.capitalize(response) || "N/A"} />
                        </View>

                        <View style={styles.row}>
                            <View style={styles.flexOne}>
                                <Button label="Close" action={closeModal} full />
                            </View>

                        </View>

                    </View>
                </View>
            </Modal>
            {/* Card */}
            <Pressable
                style={styles.container}
                onPress={openModal}
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
                        <BanknotesIcon size={28} color={COLORS.black} />
                        <View>
                            <Text style={styles.pickup}>
                                Payment for {_.capitalize(paymentType)}
                            </Text>
                            <Text style={styles.textStyle}>
                                {refNumber} · {_.capitalize(response)}
                            </Text>
                        </View>
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
