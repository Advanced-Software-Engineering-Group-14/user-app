import { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";
import { PickupRes } from "../../types";
import ViewItem from "../core/view-item";
import _ from "lodash";
import dayjs from "dayjs"
import PickupStatusBadge from "../badges/pickup-status-badge";
import { COLORS } from "../../styles/colors";

type Props = {
    data: PickupRes
}

export default function PickupCard({ data }: Props) {
    const { _id, bins, createdAt, date, driver, homeowner, payment, status, updatedAt } = data
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>{_id}</Text>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}>
                            <Text style={styles.textStyle}>Hide Modal</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            <Pressable
                style={styles.container}
                onPress={() => setModalVisible(true)}
            >
                {/* <ViewItem label="status" value={status} /> */}
                <View>

                <PickupStatusBadge status={status} />
                </View>
                <Text style={styles.pickup}>
                   Pickup for {_.toString(bins.length)} {bins.length === 1 ? "bin" : "bins"} 
                </Text>
                <Text style={styles.textStyle}>
                    {dayjs(date).format("MMM D, YYYY")} · {driver?.othernames || "No driver assigned"} {driver?.surname || ""}
                </Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 12,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
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
        marginBottom: 15,
        textAlign: 'center',
    },
    container: {
        marginBottom: 0,
        borderWidth: 1,
        width: "100%",
        padding: 12,
        borderRadius: 16,
        gap: 4,
        borderColor: COLORS.gray
        // flexDirection: "row",
        // alignItems: "center",
    },
});
