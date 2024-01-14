import { View, StyleSheet } from "react-native";
import { COLORS } from "../../styles/colors";
import Container from "../ui/container";
import SafeArea from "../ui/safe-area";
import { ExclamationTriangleIcon } from "react-native-heroicons/outline";
import BackButton from "../ui/back-button";
import Heading from "../hierarchy/text/heading";
import Subheading from "../hierarchy/text/subheading";
import Body from "../hierarchy/text/body";
import { useSession } from "../providers/session-provider";
import Button from "../ui/button";

type Props = {
    error?: Error | null
}

export default function CustomError({ error }: Props) {
    const { signOut} = useSession()

    return (
        <SafeArea>
            <BackButton />
            <Container isCenter>
                <View>
                    <ExclamationTriangleIcon size={62} color={COLORS.black} />
                </View>
                <Heading text="Uh - oh!" />
                <Subheading text={`It seems something went wrong`} />
                <Body text={error?.message || "Try logging in again"} />
                <Button full action={signOut} label='Logout' />

            </Container>
        </SafeArea>
    )
}

const styles = StyleSheet.create({
    backButtonWrapper: {
        padding: 10,
    }
})