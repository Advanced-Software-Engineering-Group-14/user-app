import { StyleSheet, Text, View,  FlatList } from 'react-native'
import React from 'react'
import { useQuery } from '@tanstack/react-query';
import { useNavigation } from 'expo-router';
import Button from '../../../src/components/ui/button'
import Body from '../../../src/components/hierarchy/text/body';
import { useSession } from '../../../src/components/providers/session-provider';
import Container from '../../../src/components/ui/container';
import NavigationLayout from '../../../src/layout/navigation-layout';
import { GET_USER_PICKUPS } from '../../../src/utils/server/pickup';
import Loader from '../../../src/components/core/loading';
import CustomError from '../../../src/components/core/custom-error';
import CustomEmpty from '../../../src/components/core/custom-empty';
import PickupCard from '../../../src/components/cards/pickup-card';
import { VIEW_USER_PAYMENTS } from '../../utils/server/payment';
import PaymentCard from '../cards/payment-card';

const MostRecentPayment = () => {
  const { user } = useSession()
  // const user = JSON.parse(session || "")

  const { isPending, isError, data, error, isSuccess } = useQuery({
    queryKey: ['payments'],
    queryFn: async () => {
        if (user && user.token) {
            const payments = await VIEW_USER_PAYMENTS()
            return payments
          }

    },
    retry: 3,
    staleTime: 300,
    refetchOnMount: true
  })


  const navigation = useNavigation();

  React.useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  return isPending ? <Loader /> : <Container noPadding>
              {
                isError ? <CustomError /> : <Container noPadding isCenter>
                  {
                    data?.length === 0 ? <CustomEmpty title='payments' /> :
                      <FlatList
                        style={styles.listContainer}
                        data={data?.slice(0,5)}
                        renderItem={({ item }) => <PaymentCard data={item} />}
                        keyExtractor={item => item._id}
                      />
                  }
                </Container>
              }

          </Container >
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

export default MostRecentPayment
