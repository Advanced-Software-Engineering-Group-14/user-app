import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useAuth } from '../../../../../../src/context/auth-context'
import Button from '../../../../../../src/components/ui/button'
import { WrenchScrewdriverIcon, TrashIcon, UserCircleIcon } from "react-native-heroicons/solid";
import { COLORS } from '../../../../../../src/styles/colors';
import Heading from '../../../../../../src/components/hierarchy/text/heading';
import Body from '../../../../../../src/components/hierarchy/text/body';
import Subheading from '../../../../../../src/components/hierarchy/text/subheading';
import { useSession } from '../../../../../../src/components/providers/session-provider';
import Container from '../../../../../../src/components/ui/container';
import { Link, useNavigation } from 'expo-router';
import NavigationLayout from '../../../../../../src/layout/navigation-layout';
import BottomNav from '../../../../../../src/components/navigation/bottom-nav';
import { ACCOUNT_LINKS } from '../../../../../../src/components/navigation/account-links';
import { A } from '@expo/html-elements';
import ViewItem from '../../../../../../src/components/core/view-item';

const AccountScreen = () => {
  const { signOut, user } = useSession()
  // const user = JSON.parse(session || "")

  const navigation = useNavigation();

  React.useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  return (
    <NavigationLayout>
      <View style={styles.container}  >
        <View style={{
          alignItems: "center",
          gap: 4,

        }}>
          <View>
            <UserCircleIcon strokeWidth={1} color={COLORS.gray} size={82} />
          </View>
          <View style={{
            alignItems: "center",
            gap: 4,

          }}>
            <Text style={styles.title}>
              {user?.othernames} {user?.surname}
            </Text>
            <Text style={styles.subtitle}>
              {user?.email || "N/A"} · {user?.phone || "N/A"}
            </Text>
          </View>
        </View>
        {/* <Body text="Hello" /> */}
        <View style={styles.gridContainer}>
          
          <View style={{
            flex: 3
          }}>

            <View style={{
              marginVertical: 12,
              gap: 8,
            }}>
              {
                ACCOUNT_LINKS.map((item, i) => {
                  return item.isExternal ? <A href={item.path} key={i} >
                    <View style={{
                      ...styles.row,
                      ...styles.link,

                    }}>
                      <item.icon size={32} color={COLORS.grey} />
                      <Text style={styles.linkTitle}>
                        {item.title}
                      </Text>
                    </View>
                  </A> : <Link href={item.path} key={i}>
                    <View style={{
                      ...styles.row,
                      ...styles.link,
                    }} >
                      <item.icon size={32} color={COLORS.grey} />

                      <Text style={styles.linkTitle}>
                        {item.title}
                      </Text>
                    </View>
                  </Link>
                })
              }

            </View>

            <Button full action={signOut} label='Logout' />
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
    marginTop: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: "600",
    textAlign: 'center'
  },
  row: {
    flexDirection: "row",
    gap: 8,
    width: "100%",
    alignItems: "center"

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
  },
  link: {
    paddingVertical: 10,
  },
  linkTitle: {
    fontSize: 20,
    color: COLORS.grey
  },
  subtitle: {
    fontSize: 18,
    color: COLORS.grey
  }
})

export default AccountScreen
