import React, { useContext, useState } from "react";
import {
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  TextInput

} from "react-native";

import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { AuthContext } from "../../contexts/AuthContext";
import { StackPramsList } from "../../routes/app.routes";
import { api } from "../../services/api";

export default function Dashboard() {
  const navigation = useNavigation<NativeStackNavigationProp<StackPramsList>>();

  const { signOut } = useContext(AuthContext)

  const [table, setTable] = useState('');

  async function handleSubmit() {
    if (table === '') return;

    const res = await api.post("order/create", { table: Number(table) })

    const { id } = res.data

    console.log(res.data);

    navigation.navigate('Order', { number: table, orderId: id });

    setTable('');
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>New Order</Text>

      <TextInput
        style={styles.input}
        placeholder="Number of table"
        placeholderTextColor="#F0F0F0"
        keyboardType="numeric"
        value={table}
        onChangeText={setTable}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Open table</Text>
      </TouchableOpacity>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: "center",
    paddingVertical: 15,
    backgroundColor: '#1d1d2e'
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 24,
  },
  input: {
    width: '90%',
    height: 60,
    backgroundColor: '#101026',
    borderRadius: 4,
    paddingHorizontal: 8,
    textAlign: 'center',
    fontSize: 22,
    color: '#fff'
  },
  button: {
    width: '90%',
    height: 40,
    backgroundColor: '#3fffa3',
    borderRadius: 3,
    marginVertical: 12,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    fontSize: 18,
    color: '#101026',
    fontWeight: 'bold',
  }
})
