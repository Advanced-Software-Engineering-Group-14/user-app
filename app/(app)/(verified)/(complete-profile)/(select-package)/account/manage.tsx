import Body from "../../../../../../src/components/hierarchy/text/body";
import Heading from "../../../../../../src/components/hierarchy/text/heading";
import ManageDetailsForm from "../../../../../../src/forms/manage-details-form";
import NavigationLayout from "../../../../../../src/layout/navigation-layout";


export default function ManageDetailsScreen() {
    return (

        <NavigationLayout>
            <Heading text="Manage Details" />
            <Body text="Edit your current account details" />
            <ManageDetailsForm />
        </NavigationLayout>

    )
}