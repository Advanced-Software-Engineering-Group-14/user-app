import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useAuth } from '../context/auth-context'
import Button from '../components/ui/button'
import {  WrenchScrewdriverIcon, TrashIcon } from "react-native-heroicons/outline";
import { COLORS } from '../styles/colors';
import Heading from '../components/hierarchy/text/heading';
import Body from '../components/hierarchy/text/body';
import Subheading from '../components/hierarchy/text/subheading';

const HomeScreen = () => {
  const { authState, onLogout } = useAuth()
  return (
    <View>
      <View style={styles.container}>
        <View>
          <TrashIcon size={82} color={COLORS.black} />

        </View>
        <Heading text="Wastify" />
        <Subheading text={`Hello ${authState?.user?.othernames}!`} />
        <Body text="Our team is still developing this page" />
        <Button full action={onLogout} label='Logout' />

      </View>
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
