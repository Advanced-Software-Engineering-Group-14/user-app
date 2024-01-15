import { View, StyleSheet, Text } from "react-native";
import { COLORS } from "../../styles/colors";
import Body from "../hierarchy/text/body";
import { usePathname, Link } from 'expo-router';
import { NAVLINKS } from "./navlinks";

export default function BottomNav() {
    const pathname = usePathname();

    function isActive(path: string) {
        // console.log(pathname)
        return pathname === path
    }



    return (
        <View style={styles.container} >
            {
                NAVLINKS.map((item, index) => (
                    <Link key={index} href={item.path}>
                        <View  style={styles.linkContainer}>
                            <item.icon color={isActive(item.path) ? COLORS.primary : `${COLORS.grey}`} size={32} />
                            <Text style={{
                                ...styles.linkText,
                                color: isActive(item.path) ? COLORS.primary : `${COLORS.grey}`
                            }} >
                                {item.title}
                            </Text>
                        </View>
                    </Link>
                ))
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // height: "100%",
        width: "110%",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 8,
        paddingHorizontal: 20,
        paddingBottom: 50,
        paddingTop: 16,
        flexDirection: "row",
        backgroundColor: `#f5f5f5`,
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
    },
    linkContainer: {
        alignItems: "center",
        justifyContent: "center",
        gap: 4,
    },
    linkText: {
        textAlign: "center"
    }
})
