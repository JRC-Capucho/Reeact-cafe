import Header from "@/components/ui/Header";
import { canSSRAuth } from "@/utils/canSSRAuth";
import Head from "next/head";

import { FiUpload } from 'react-icons/fi'

import styles from './styles.module.scss'
import { ChangeEvent, FormEvent, useState } from "react";
import { setupAPICliente } from "@/services/api";
import { toast } from "react-toastify";
import { api } from "@/services/apiClient";

type ItemProps = {
  id: number;
  name: string;
}

interface CategoryProps {
  categoryList: ItemProps[];
}

export default function Product({ categoryList }: CategoryProps) {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState('');
  const [describe, setDescribe] = useState('');

  const [urlImage, setUrlImage] = useState("");
  const [image, setImage] = useState(null);

  const [category, setCategory] = useState(categoryList || []);
  const [categorySelected, setCategorySelected] = useState(0);



  function handleFile(event: ChangeEvent<HTMLInputElement>) {
    event.preventDefault();

    if (!event.target.files)
      return;

    const productImage = event.target.files[0];

    if (!productImage) return;

    if (productImage.type === 'image/png' || productImage.type === 'image/jpeg') {
      setImage(productImage);
      setUrlImage(URL.createObjectURL(productImage));
    }
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    console.log("nice")
    try {

      if (productName === '' || price === '' || describe === '' || image === null) {
        toast.warn("Empty fields")
        return;
      }

      const data = new FormData()

      data.append('name', productName)
      data.append('price', price)
      data.append('description', describe)
      data.append('categoryId', categorySelected)
      data.append('file', image)


      await api.post('product/create', data)
      toast.success(`Register ${productName} with success!`)

      setProductName('');
      setPrice('');
      setDescribe('');
      setImage(null)
      setUrlImage('')

    } catch (error) {
      console.log(error);
      toast.warn(`Error in register ${error}`)
    }
  }

  return (
    <>
      <Head>
        <title>Product</title>
      </Head>
      <div>
        <Header />
        <main className={styles.container}>
          <h1>Product Page</h1>
          <form className={styles.form} onSubmit={handleSubmit}>

            <label className={styles.labelAvatar}>
              <span>
                <FiUpload color="#FFF" size={25} />
                <input type="file" accept="image/png,image/jpeg" onChange={handleFile} />
                {urlImage && (
                  <img
                    className={styles.preview}
                    src={urlImage}
                    alt="image-product"
                    width={250}
                    height={250}
                  />
                )}
              </span>
            </label>

            <select
              className={styles.select}
              value={categorySelected}
              onChange={(e) => setCategorySelected(e.target.value)}
            >
              {categoryList.map((item) => {
                return (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                )
              })}
            </select>

            <input
              placeholder="Enter Product Name"
              className={styles.input}
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
            <input
              className={styles.input}
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter Product Price"
            />

            <textarea
              className={styles.input}
              value={describe}
              onChange={(e) => setDescribe(e.target.value)}
              placeholder="Describe product" />

            <button
              className={styles.buttonAdd}
              type="submit"
            >
              Create
            </button>
          </form>
        </main>
      </div>
    </>
  )

}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  const apiClient = setupAPICliente(ctx);

  const res = await apiClient.get('category');

  return {
    props: {
      categoryList: res.data
    }
  }
})
