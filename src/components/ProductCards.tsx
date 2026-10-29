import { useEffect, useState } from "react";
import { ProductCard } from "./ProductCard";
import axios from "axios";
import { type Product } from "../interfaces/product.interface";

export const ProductCards = () => {
  const [products, setProducts] = useState<Product[] | null>(null)

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const respuesta = await axios.get('https://dummyjson.com/products')
        setProducts(respuesta.data.products)
      } catch (error) {
        console.error(error)
      }
    }
    obtenerProductos();
  }, [])

  console.log(products)
  

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
      {products && products.map((product) => (
        <ProductCard product={product} key={product.id} />
      ))}
    </section>
  );
};
