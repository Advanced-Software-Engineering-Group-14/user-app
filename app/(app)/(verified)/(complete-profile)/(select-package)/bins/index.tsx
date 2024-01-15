import { StyleSheet, Text, View, FlatList, Alert } from 'react-native'
import React from 'react'
import { useQuery } from '@tanstack/react-query';
import { useNavigation } from 'expo-router';
import Button from '../../../../../../src/components/ui/button'
import { useSession } from '../../../../../../src/components/providers/session-provider';
import Container from '../../../../../../src/components/ui/container';
import NavigationLayout from '../../../../../../src/layout/navigation-layout';
import { GET_USER_BINS, EMPTY_ALL_BINS, FILL_ALL_BINS } from '../../../../../../src/utils/server/bin';
import Body from '../../../../../../src/components/hierarchy/text/body';
import Loader from '../../../../../../src/components/core/loading';
import CustomError from '../../../../../../src/components/core/custom-error';
import CustomEmpty from '../../../../../../src/components/core/custom-empty';
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { BinRes } from '../../../../../../src/types';
import BinCard from '../../../../../../src/components/cards/bin-card';

const BinsScreen = () => {
  const { signOut, user } = useSession()
  // const user = JSON.parse(session || "")
  const queryClient = useQueryClient()
  const { isPending, isError, data, error, isSuccess } = useQuery({
    queryKey: ['bins'],
    queryFn: async () => {
      if (user && user.token) {
        const bins = await GET_USER_BINS()
        return bins
      }

    },
    retry: 3,
    staleTime: 300,
    refetchOnMount: true
  })

  const fillAllBins = useMutation({
    mutationFn: () => {
      if (user && user.token) {
        return FILL_ALL_BINS()
      }
      throw new Error("Please login again")
    },
    onSuccess: (newData) => {
      queryClient.setQueryData(['bins'], (oldData: BinRes[]) => {
        return newData
      })
      return Alert.alert("Success", "Request successfull")

    },
    onError: (error: any) => {
      console.log(error.response?.data?.message)
      return Alert.alert("Oops", error.response?.data?.message || "Something went wrong")

    }
  })

  const emptyAllBins = useMutation({
    mutationFn: () => {
      if (user && user.token) {
        return EMPTY_ALL_BINS()
      }
      throw new Error("Please login again")
    },
    onSuccess: (newData) => {
      queryClient.setQueryData(['bins'], (oldData: BinRes[]) => {
        return newData
      })
      return Alert.alert("Success", "Request successfull")

    },
    onError: (error: any) => {
      console.log(error.response)
      return Alert.alert("Oops", error.response?.data?.message || "Something went wrong")

    }
  })

  function fillBins() {
    fillAllBins.mutate(undefined)
  }

  function emptyBins() {
    emptyAllBins.mutate(undefined)
  }


  const navigation = useNavigation();

  React.useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  return (
    <NavigationLayout>

      <View style={styles.container}  >
        <Text style={styles.title}>
          Your Bins
        </Text>
        {/* <Button label="Create New Pickup" link="/schedules/new" /> */}
        <View style={styles.row}>
          <View style={styles.flexOne}>
            <Button label="Empty all bins" disabled={emptyAllBins.isPending} action={emptyBins} full />
          </View>
          <View style={styles.flexOne}>
            <Button label="Fill all bins" variant="primary" disabled={fillAllBins.isPending} action={fillBins} full />
          </View>


          {/* <View style={styles.flexOne}>
            <Button variant="primary" label="Pay Now" action={() => { }} full />
          </View> */}

        </View>
        <Body text="Tap on a bin to perform more actions." />

        {
          isPending ? <Loader /> : <Container noPadding>
            {
              isError ? <CustomError /> : <Container noPadding isCenter>
                {
                  data?.length === 0 ? <CustomEmpty title='bins' /> :
                    <FlatList
                      style={styles.listContainer}
                      data={data}
                      renderItem={({ item }) => <BinCard data={item} />}
                      keyExtractor={item => item._id}
                    />
                }
              </Container>
            }

          </Container>
        }
        {/* </ScrollView> */}
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
  flexOne: {
    flex: 1
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

export default BinsScreen
