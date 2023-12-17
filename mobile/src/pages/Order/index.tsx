import React, { useState, useEffect } from "react"

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
  FlatList
} from "react-native"

import { useRoute, RouteProp } from "@react-navigation/native"

import { Feather } from '@expo/vector-icons'
import { api } from "../../services/api"

import { useNavigation } from '@react-navigation/native'
import { ModalPicker } from "../../components/ModalPicker"

type RouteDetailParams = {
  Order: {
    number: number | string;
    orderId: number;
  }
}

export type CategoryProps = {
  id: number;
  name: string;
}

type ProductProps = {
  id: number;
  name: string;
}

type ItemProps = {
  id: number;
  productId: number;
  name: string;
  amount: number;
}

type OrderRouteProps = RouteProp<RouteDetailParams, 'Order'>;

export default function Order() {
  const route = useRoute<OrderRouteProps>();
  const navigator = useNavigation();

  const [amount, setAmount] = useState('');

  const [category, setCategory] = useState<CategoryProps[] | []>([]);
  const [categorySelected, setCategorySelected] = useState<CategoryProps | undefined>();
  const [modalCategoryVisible, setModalCategoryVisible] = useState(false);

  const [products, setProducts] = useState<ProductProps[] | []>([]);
  const [productSelected, setProductSelected] = useState<ProductProps | undefined>()
  const [modalProductVisible, setModalProductVisible] = useState(false);

  const [items, setItems] = useState<ItemProps>([]);

  useEffect(() => {
    async function getCategory() {
      const res = await api.get('category')
      setCategory(res.data)
      setCategorySelected(res.data[0])
    }
    getCategory()
  }, [])

  useEffect(() => {
    async function getProduct() {
      const res = await api.get('products', { params: { categoryId: categorySelected?.id } })
      setProducts(res.data)
      setProductSelected(res.data[0])
    }
    getProduct()
  }, [categorySelected])

  function handleChangeCategory(item: CategoryProps) {
    setCategorySelected(item)
  }

  function handleChangeProduct(item: ProductProps) {
    setProductSelected(item)
  }

  async function handleCloseOrder() {
    try {
      await api.delete('order/delete', { params: { id: route.params?.orderId } })
      navigator.goBack()
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Table {route.params.number}</Text>
        <TouchableOpacity onPress={handleCloseOrder}>
          <Feather name="trash-2" size={28} color="#FF3F4b" />
        </TouchableOpacity>
      </View>

      {category.length !== 0 && (
        <TouchableOpacity style={styles.input} onPress={() => setModalCategoryVisible(true)}>
          <Text style={{ color: "#FFF" }}>
            {categorySelected?.name}
          </Text>
        </TouchableOpacity>
      )}

      {products.length !== 0 && (
        <TouchableOpacity style={styles.input} onPress={() => setModalProductVisible(true)}>
          <Text style={{ color: "#FFF" }}>{productSelected?.name}</Text>
        </TouchableOpacity>
      )}

      <View style={styles.qtdContainer}>
        <Text style={styles.qtdText}>Quantity</Text>
        <TextInput
          style={[styles.input, { width: '60%', textAlign: "center" }]}
          keyboardType="numeric"
          placeholderTextColor="#FFF"
          placeholder="1"
          value={amount}
          onChangeText={setAmount}
        />
      </View>
      <View style={styles.action}>

        <TouchableOpacity style={styles.buttonAdd}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { opacity: items.length === 0 ? 0.3 : 1 }]}
          disabled={items.length === 0}
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>


      <FlatList
        showsVerticalScrollIndicator={false}
        style={{ flex: 1, marginTop: 24 }}
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={}
      />

      <Modal
        transparent={true}
        visible={modalCategoryVisible}
        animationType="fade"
      >
        <ModalPicker
          handleCloseModal={() => setModalCategoryVisible(false)}
          options={category}
          selectedItem={handleChangeCategory}
        />
      </Modal>

      <Modal
        transparent={true}
        visible={modalProductVisible}
        animationType="fade"
      >
        <ModalPicker
          handleCloseModal={() => setModalProductVisible(false)}
          options={products}
          selectedItem={handleChangeProduct}
        />
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1d1d2e',
    paddingVertical: '5%',
    paddingEnd: '4%',
    paddingStart: '4%',
  },
  header: {
    flexDirection: 'row',
    marginbottom: 12,
    alignItems: 'center',
    marginTop: 24,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFF',
    marginRight: 14
  },
  input: {
    backgroundColor: "#101026",
    borderRadius: 4,
    width: '100%',
    height: 40,
    marginBottom: 12,
    justifyContent: 'center',
    paddingHorizontal: 8,
    color: '#FFF',
    fontSize: 22
  },
  qtdContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  qtdText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: "#FFF"
  },
  action: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: "space-between",
  },
  buttonAdd: {
    backgroundColor: "#3fd1ff",
    borderRadius: 4,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    width: '20%'
  },
  buttonText: {
    color: "#101026",
    fontSize: 18,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#3fffa3',
    borderRadius: 4,
    height: 40,
    width: '75%',
    alignItems: 'center',
    justifyContent: 'center',
  }
})
