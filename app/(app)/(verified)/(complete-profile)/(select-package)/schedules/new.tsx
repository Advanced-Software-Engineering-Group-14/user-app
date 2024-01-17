import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Button from '../../../../../../src/components/ui/button'
import { useSession } from '../../../../../../src/components/providers/session-provider';
import Container from '../../../../../../src/components/ui/container';
import { Stack, useNavigation } from 'expo-router';
import NavigationLayout from '../../../../../../src/layout/navigation-layout';
import Body from '../../../../../../src/components/hierarchy/text/body';
import DateTimePicker from 'react-native-ui-datepicker';
import dayjs from 'dayjs';
import Subheading from '../../../../../../src/components/hierarchy/text/subheading';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CREATE_PICKUP } from '../../../../../../src/utils/server/pickup';
import _ from 'lodash';
import { PickupRes } from '../../../../../../src/types';
import { COLORS } from '../../../../../../src/styles/colors';

const NewScheduleScreen = () => {
  const { signOut, user } = useSession()
  const queryClient = useQueryClient()

  // const user = JSON.parse(session || "")

  const navigation = useNavigation();

  React.useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const [value, setValue] = useState(dayjs());


  const createPickup = useMutation({
    mutationFn: () => {
      const newData = {
        date: new Date(_.toString(value))
      }
        if (user && user.token) {
            return CREATE_PICKUP(newData)
        }
        throw new Error("Please login again")
    },
    onSuccess: (newData) => {
        queryClient.setQueryData(['pickups'], (oldData: PickupRes[]) => {
            return [...oldData, newData]
        })

        return Alert.alert("Success", "Request successfull")

    },
    onError: (error: any) => {
        console.log(error)
        return Alert.alert("Oops", error.response?.data?.message || "Something went wrong")
    }
  })
  
  function onSubmit() {
    createPickup.mutate()
  }


  return (
    <NavigationLayout>

      <View style={styles.container}  >
        <Text style={styles.title}>
          Create New Pickup
        </Text>
        <Body text="Select a date for your pickup" />
        <View>
          <DateTimePicker
            mode="date"
            value={value}
            onValueChange={(date: any) => setValue(date)}
            selectedItemColor={COLORS.primary}
          />

        </View>
        <Body text={`Your current pickup date is: `} />
        <Subheading text={`${dayjs(value).format("dddd, MMMM D, YYYY")}`} />
        <Button action={onSubmit} label="Confirm Pickup" />

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
  spacing: {
    marginBottom: 10,

  },
  listContainer: {
    flex: 1,
    width: "100%",
    // borderWidth: 6
  }
})

export default NewScheduleScreen
