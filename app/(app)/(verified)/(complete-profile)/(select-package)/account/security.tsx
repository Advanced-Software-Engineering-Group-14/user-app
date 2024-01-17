import Body from "../../../../../../src/components/hierarchy/text/body";
import Heading from "../../../../../../src/components/hierarchy/text/heading";
import ChangePasswordForm from "../../../../../../src/forms/change-password-form";
import NavigationLayout from "../../../../../../src/layout/navigation-layout";


export default function ChangePasswordScreen() {
    return (

        <NavigationLayout>
            <Heading text="Change Password" />
            <Body text="Complete the form to change your current password. Note that you will be logged out after successful submission" />
            <ChangePasswordForm />
        </NavigationLayout>

    )
}