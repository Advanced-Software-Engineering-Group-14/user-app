import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useAuth } from '../../../../../src/context/auth-context'
import Button from '../../../../../src/components/ui/button'
import { WrenchScrewdriverIcon, TrashIcon } from "react-native-heroicons/outline";
import { COLORS } from '../../../../../src/styles/colors';
import Heading from '../../../../../src/components/hierarchy/text/heading';
import Body from '../../../../../src/components/hierarchy/text/body';
import Subheading from '../../../../../src/components/hierarchy/text/subheading';
import { useSession } from '../../../../../src/components/providers/session-provider';
import Container from '../../../../../src/components/ui/container';
import { Stack, useNavigation } from 'expo-router';

const HomeScreen = () => {
  const { signOut, session } = useSession()
  const user = JSON.parse(session || "")

  const navigation = useNavigation();

  React.useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  return (
    <View>
      
      <Container >
        <View>
          <TrashIcon size={82} color={COLORS.black} />

        </View>
        <Heading text="Wastify" />
        <Subheading text={`Hello ${user?.othernames}!`} />
        <Body text="Our team is still developing this page" />
        <Button full action={signOut} label='Logout' />

      </Container>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    height: "100%",
    weight: "100%",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingHorizontal: 8

  },
  screen: {
    flex: 1,
    height: "100%",
    weight: "100%",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingHorizontal: 8
  }
})

export default HomeScreen
