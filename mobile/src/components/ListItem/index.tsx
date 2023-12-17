import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface ItemProps {
  data: {
    id: number;
    productId: number;
    name: string;
    amount: number;
  }
}

export function ListItem({ data }: ItemProps) {
  return (
    <View style={styles.container}>
      <Text>Item of list</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {

  }
})
