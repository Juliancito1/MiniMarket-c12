import { ProductCard } from "./ProductCard";
import { useProducts } from "../hooks/useProducts";

export const ProductCards = () => {
  const { products, isLoading, error } = useProducts();

  return (
    <section className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
      {isLoading && <p className="text-slate-600 dark:text-slate-300">Cargando productos...</p>}
      {error && <p role="alert" className="text-red-600 dark:text-red-400">{error}</p>}
      {products.map((product) => (
        <ProductCard product={product} key={product.id} />
      ))}
    </section>
  );
};
