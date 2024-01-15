import { Pressable } from "react-native";
import { XMarkIcon } from "react-native-heroicons/outline";
import { COLORS } from "../../styles/colors";

type Props = {
    action: () => void
}

export default function ModalClose({ action }: Props) {
    return (
        <Pressable style={{
            padding: 5,
            position: "absolute",
            right: 4,
            top: 4
        }} onPress={action}>
            <XMarkIcon size={24} color={COLORS.black} />
        </Pressable>
    )
}