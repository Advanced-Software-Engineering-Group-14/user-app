import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useAuth } from '../../../../../src/context/auth-context'
import Button from '../../../../../src/components/ui/button'
import { WrenchScrewdriverIcon, TrashIcon, ClockIcon } from "react-native-heroicons/outline";
import { COLORS } from '../../../../../src/styles/colors';
import Heading from '../../../../../src/components/hierarchy/text/heading';
import Body from '../../../../../src/components/hierarchy/text/body';
import Subheading from '../../../../../src/components/hierarchy/text/subheading';
import { useSession } from '../../../../../src/components/providers/session-provider';
import Container from '../../../../../src/components/ui/container';
import { Stack, useNavigation } from 'expo-router';
import NavigationLayout from '../../../../../src/layout/navigation-layout';
import BottomNav from '../../../../../src/components/navigation/bottom-nav';
import storage from '../../../../../src/config/storage';
import CustomEmpty from '../../../../../src/components/core/custom-empty';
import ActionLink from '../../../../../src/components/ui/action-link';
import MostRecentPickup from '../../../../../src/components/data-fetch/most-recent-pickup';

const HomeScreen = () => {
  const { signOut, user } = useSession()


  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  return (
    <NavigationLayout>

      <View style={styles.container}  >
        <Text style={styles.title}>
          Welcome {user?.othernames},
        </Text>
        {/* <Body text="Hello" /> */}
        <View style={styles.gridContainer}>
          <View style={styles.row}>
            <ActionLink href="/bins" icon={TrashIcon} text="Manage Bin" />
            <ActionLink color={COLORS.primary} href="/schedules/new" icon={ClockIcon} text="Schedule" />
          </View>
          <View style={{
            flex: 3
          }}>

            <View style={styles.section}>
              <Subheading text="Most Recent Pickup" />
              <MostRecentPickup />
            </View>
            
          </View>
        </View>

      </View>
    </NavigationLayout>
  )
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    height: "100%",
    width: "100%",
    gap: 16,

  },
  title: {
    fontSize: 30,
    fontWeight: "600",
    marginTop: 12,
  },
  row: {
    flexDirection: "row",
    gap: 8,
    width: "100%",

  },
  gridContainer: {
    flex: 2, // the number of columns you want to devide the screen into
    marginHorizontal: "auto",
    width: "100%",
    // backgroundColor: "red"
  },
  section: {
    marginTop: 20,
    flex: 1,
    gap: 8,
    // height: "30%"
  }

})

export default HomeScreen
