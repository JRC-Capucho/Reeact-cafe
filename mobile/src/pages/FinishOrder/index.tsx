import React from "react";


import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import { Feather } from '@expo/vector-icons'

import { useNavigation, useRoute, RouteProp } from '@react-navigation/native'
import { api } from "../../services/api";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackPramsList } from "../../routes/app.routes";

type RouteDataParams = {
  FinishOrder: {
    table: number;
    orderId: number;
  }
}

type FinishOrderProps = RouteProp<RouteDataParams, "FinishOrder">



export default function FinishOrder() {
  const route = useRoute<FinishOrderProps>();

  const navigation = useNavigation<NativeStackNavigationProp<StackPramsList>>()

  async function handleFinish() {
    try {
      await api.put('order/sendOrder',
        {
          id: route.params.orderId
        })
      navigation.popToTop();

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.alert}>Finish Order ?</Text>
      <Text style={styles.title}>Table {route.params?.table}</Text>
      <TouchableOpacity style={styles.button} onPress={handleFinish}>
        <Text style={styles.textButton}>Finish</Text>
        <Feather name="shopping-cart" size={20} color="#1d1d2e" />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1d1d2e',
    paddingVertical: '5%',
    paddingHorizontal: '4%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  alert: {
    fontSize: 20,
    color: '#FFF',
    fontWeight: 'bold',
    marginBottom: 12,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 12
  },
  button: {
    backgroundColor: '#3fffa3',
    flexDirection: "row",
    width: '65%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
  textButton: {
    fontSize: 18,
    marginRight: 8,
    fontWeight: "bold",
    color: '#1d1d2e'
  }
})
