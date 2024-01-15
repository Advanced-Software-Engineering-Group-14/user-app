import { View } from "react-native";
import { COLORS } from "../../styles/colors";

export default function Separator() {
    return (
        <View style={{
            flex: 1,
            borderBottomWidth: 1,
            borderColor: `${COLORS.gray}60`
        }}></View>
    )
}