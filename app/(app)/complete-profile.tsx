import { View } from "react-native";
import Heading from "../../src/components/hierarchy/text/heading";
import SafeArea from "../../src/components/ui/safe-area";
import BackButton from "../../src/components/ui/back-button";
import Container from "../../src/components/ui/container";
import Body from '../../src/components/hierarchy/text/body';
import CompleteProfileForm from "../../src/forms/complete-profile-form";

export default function CompleteProfile() {
    return (
        <SafeArea>
            <BackButton />
            <Container>
                <Heading text="Complete Profile" />
                <Body text="Provide the following details to continue using Wastify" />
                <CompleteProfileForm />
            </Container>
        </SafeArea>
    )
}