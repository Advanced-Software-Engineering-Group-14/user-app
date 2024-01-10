import { StyleSheet, Text, View,   FlatList, } from "react-native";
import Heading from "../../src/components/hierarchy/text/heading";
import SafeArea from "../../src/components/ui/safe-area";
import BackButton from "../../src/components/ui/back-button";
import Container from "../../src/components/ui/container";
import Body from "../../src/components/hierarchy/text/body";
import { useSession } from "../../src/components/providers/session-provider";
import { useQuery } from "@tanstack/react-query"
import { GET_BIN_PACKAGES } from "../../src/utils/server/bin-package";
import CustomError from "../../src/components/core/custom-error";
import { FlashList } from "@shopify/flash-list";
import SelectPackageCard from "../../src/components/cards/select-package-card";
import Loader from "../../src/components/core/loading";
import Button from "../../src/components/ui/button";


export default function SelectPackage() {
    const { user, signOut } = useSession()
    const { isPending, isError, data, error, isSuccess } = useQuery({
        queryKey: ['bin-packages'],
        queryFn: async () => {
            if (user && user.token) {
                const homeowners = await GET_BIN_PACKAGES()
                return homeowners
            }

        },
        retry: 3,
        staleTime: 300,
        refetchOnMount: true
    })



    console.log(data)
    return (
        <SafeArea>
            <BackButton />
            <Container vPadding>
                <Heading text="Set Up Your Account" />
                <Body text="Choose your preferred bin package. After successfully paying, you will be required to log in again." />
                {
                    isPending ? <Loader /> : <Container noPadding>
                        {
                            isError ? <CustomError /> : <Container noPadding  isCenter>
                                <FlatList
                                    style={styles.listContainer}
                                    data={data}
                                    renderItem={({ item }) => <SelectPackageCard item={item} />}
                                    keyExtractor={item => item._id}
                                />
                                <View style={styles.spacing} />

                                <Body text="or" />
                                <View style={styles.spacing} />

                                <Button full type='button' action={signOut} label='Logout' />
                            </Container>
                        }

                    </Container>
                }



            </Container>
        </SafeArea>
    )
}

const styles = StyleSheet.create({
    spacing: {
        marginBottom: 10,

    },
    listContainer: {
        flex: 1,
        width: "100%",
        // borderWidth: 6
    }
})