import { useEffect, useState } from "react";
import axios from "axios";
import type { Product } from "../interfaces/product.interface";

const PRODUCTS_STORAGE_KEY = "admin_products";

const readSavedProducts = (): Product[] | null => {
  try {
    const savedProducts = localStorage.getItem(PRODUCTS_STORAGE_KEY);
    if (savedProducts === null) return null;

    return JSON.parse(savedProducts) as Product[];
  } catch (error) {
    console.error("Error al leer el catálogo guardado", error);
    return null;
  }
};

export const persistProducts = (products: Product[]) => {
  localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));
};

export const useProducts = () => {
  const [initialProducts] = useState(readSavedProducts);
  const [products, setProducts] = useState<Product[]>(initialProducts ?? []);
  const [isLoading, setIsLoading] = useState(initialProducts === null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialProducts !== null) return;
    const controller = new AbortController();

    const fetchProducts = async () => {
      try {
        const response = await axios.get<{ products: Product[] }>(
          "https://dummyjson.com/products",
          { signal: controller.signal },
        );
        const savedProducts = readSavedProducts();
        setProducts(savedProducts ?? response.data.products);
      } catch (error) {
        if (controller.signal.aborted) return;
        console.error("Error al cargar los productos", error);
        setError("No se pudieron cargar los productos. Intentalo de nuevo más tarde.");
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    };

    fetchProducts();
    return () => controller.abort();
  }, [initialProducts]);

  return { products, isLoading, error };
};
