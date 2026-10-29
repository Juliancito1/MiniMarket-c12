import { ProductCards } from "../components/ProductCards"

export const Home = () => {
  return (
    <section className="max-w-4xl mx-auto mt-2">
      <h1 className="text-3xl">Nuestros Productos</h1>
      <p className="text-xl">Encontra los mejores productos en esta tienda</p>
      <ProductCards/>
    </section>
  )
}
