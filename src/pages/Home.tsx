import { ProductCards } from "../components/ProductCards"

export const Home = () => {
  return (
    <section className="mx-auto mt-2 max-w-4xl px-4 pb-6">
      <h1 className="text-3xl text-slate-900 dark:text-slate-100">Nuestros Productos</h1>
      <p className="text-xl text-slate-700 dark:text-slate-300">
        Encontra los mejores productos en esta tienda
      </p>
      <ProductCards/>
    </section>
  )
}
