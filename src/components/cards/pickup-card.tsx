import { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";
import { PickupRes } from "../../types";
import ViewItem from "../core/view-item";
import _ from "lodash";
import dayjs from "dayjs"
import PickupStatusBadge from "../badges/pickup-status-badge";
import { COLORS } from "../../styles/colors";
import ModalClose from "../ui/modal-close";
import { GridContainer } from "../grid/grid-container";
import { GridRow } from "../grid/grid-row";
import { GridCol } from "../grid/grid-col";

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
                        <Text style={styles.modalTitle}>
                            Pickup for {_.toString(bins.length)} {bins.length === 1 ? "bin" : "bins"}
                        </Text>

                        <GridContainer cols={2}>
                            <GridRow gap={0}>
                                <GridCol col={1}>
                                    <ViewItem label="status" value={status} />
                                </GridCol>
                            </GridRow>
                        </GridContainer>

                    </View>
                </View>
            </Modal>
            {/* Card */}
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
        width: "100%"
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
        marginBottom: 4,
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
        fontSize: 20
    }
});
