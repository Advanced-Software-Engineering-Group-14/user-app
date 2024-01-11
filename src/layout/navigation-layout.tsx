import { View } from "react-native";
import BottomNav from "../components/navigation/bottom-nav";
import Container from "../components/ui/container";

type Props = {
    children: React.ReactNode
}

export default function NavigationLayout({ children }: Props) {
    return (
        <Container>
            {children}
            <BottomNav />
        </Container>
    )
}

