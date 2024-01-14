import { View } from "react-native";
import BottomNav from "../components/navigation/bottom-nav";
import Container from "../components/ui/container";
import SafeArea from "../components/ui/safe-area";
import BackButton from "../components/ui/back-button";

type Props = {
    children: React.ReactNode
}

export default function NavigationLayout({ children }: Props) {
    return (
        <Container>

            <SafeArea>
                <BackButton />
                {children}
            </SafeArea>
            <BottomNav />
        </Container>
    )
}

