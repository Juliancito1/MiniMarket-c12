import { useEffect, useState, type FormEvent } from "react";
import { persistProducts, useProducts } from "../hooks/useProducts";
import type { Product } from "../interfaces/product.interface";
import Swal from "sweetalert2";

interface ProductForm {
  title: string;
  rating: string;
  price: string;
  thumbnail: string;
}

const emptyForm: ProductForm = {
  title: "",
  rating: "",
  price: "",
  thumbnail: "",
};

export const AdminDashboard = () => {
  const { products, isLoading, error } = useProducts();
  const [adminProducts, setAdminProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [form, setForm] = useState<ProductForm>(emptyForm);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoading && !error) setAdminProducts(products);
  }, [products, isLoading, error]);

  const openCreateForm = () => {
    setActionError(null);
    setEditingProduct(null);
    setForm(emptyForm);
    setIsFormOpen(true);
  };

  const openEditForm = (product: Product) => {
    setActionError(null);
    setEditingProduct(product);
    setForm({
      title: product.title,
      rating: String(product.rating),
      price: String(product.price),
      thumbnail: product.thumbnail,
    });
    setIsFormOpen(true);
  };

  const commitProducts = (updatedProducts: Product[]) => {
    try {
      persistProducts(updatedProducts);
      setAdminProducts(updatedProducts);
      setActionError(null);
      return true;
    } catch (error) {
      console.error("Error al guardar el catálogo en este navegador", error);
      setActionError(
        "No se pudieron guardar los cambios en este navegador. Revisá el espacio disponible.",
      );
      return false;
    }
  };

  const saveProduct = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const updatedProduct: Product = {
      id: editingProduct?.id ?? Math.max(0, ...adminProducts.map(({ id }) => id)) + 1,
      title: form.title.trim(),
      rating: Number(form.rating),
      price: Number(form.price),
      thumbnail: form.thumbnail.trim(),
    };

    const updatedProducts = editingProduct
      ? adminProducts.map((product) =>
          product.id === editingProduct.id ? updatedProduct : product,
        )
      : [updatedProduct, ...adminProducts];

    if (commitProducts(updatedProducts)) setIsFormOpen(false);
  };

  const deleteProduct = (product: Product) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, borrar",
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedProducts = adminProducts.filter((p) => p.id !== product.id);
        if (commitProducts(updatedProducts)) {
          Swal.fire({
            title: "Borrado",
            text: "El producto ha sido borrado.",
            icon: "success",
          });
        }
      }
    });
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-100 dark:bg-slate-950">
      <div className="mx-auto flex max-w-7xl flex-col md:flex-row">
        <aside className="w-full shrink-0 border-b border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 md:min-h-[calc(100vh-4rem)] md:w-60 md:border-r md:border-b-0">
          <h1 className="text-lg font-bold text-slate-900 dark:text-white">
            Administración
          </h1>
          <nav aria-label="Navegación de administración" className="mt-6">
            <a
              href="#resumen"
              className="block rounded-lg bg-emerald-50 px-3 py-2 font-medium text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
            >
              Resumen
            </a>
            <a
              href="#productos"
              className="mt-1 block rounded-lg px-3 py-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              Productos
            </a>
          </nav>
        </aside>

        <main className="min-w-0 flex-1 p-5 sm:p-8">
          <section id="resumen" aria-labelledby="dashboard-title">
            <p className="text-sm font-medium text-emerald-700 dark:text-emerald-400">
              Panel de Administración
            </p>
            <h2
              id="dashboard-title"
              className="mt-1 text-3xl font-bold text-slate-900 dark:text-white"
            >
              Resumen
            </h2>
            <div className="mt-6 max-w-xs rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Productos en catálogo
              </p>
              <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
                {isLoading ? "…" : adminProducts.length}
              </p>
            </div>
          </section>

          <section id="productos" aria-labelledby="products-title" className="mt-10">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <h2
                id="products-title"
                className="text-2xl font-semibold text-slate-900 dark:text-white"
              >
                Productos
              </h2>
              <button
                type="button"
                onClick={openCreateForm}
                className="rounded-lg bg-emerald-700 px-4 py-2 font-medium text-white hover:bg-emerald-800 focus:outline-none focus:ring-4 focus:ring-emerald-300 dark:bg-emerald-600 dark:hover:bg-emerald-700"
              >
                Crear producto
              </button>
            </div>
            {isLoading && (
              <p className="text-slate-600 dark:text-slate-300">Cargando productos...</p>
            )}
            {error && <p role="alert" className="mb-4 text-red-600 dark:text-red-400">{error}</p>}
            {actionError && <p role="alert" className="mb-4 text-red-600 dark:text-red-400">{actionError}</p>}
            {!isLoading && (
              <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <table className="w-full min-w-3xl text-left text-sm">
                  <thead className="bg-slate-50 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                    <tr>
                      <th scope="col" className="px-4 py-3 font-semibold">Producto</th>
                      <th scope="col" className="px-4 py-3 font-semibold">Nombre</th>
                      <th scope="col" className="px-4 py-3 font-semibold">Calificación</th>
                      <th scope="col" className="px-4 py-3 font-semibold">Precio</th>
                      <th scope="col" className="px-4 py-3 font-semibold">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                    {adminProducts.map((product) => (
                      <tr key={product.id} className="text-slate-700 dark:text-slate-200">
                        <td className="px-4 py-3">
                          {product.thumbnail ? (
                            <img
                              src={product.thumbnail}
                              alt=""
                              className="h-12 w-12 rounded-md bg-white object-contain"
                            />
                          ) : (
                            <span className="text-slate-400">Sin imagen</span>
                          )}
                        </td>
                        <td className="px-4 py-3 font-medium">{product.title}</td>
                        <td className="px-4 py-3">{product.rating}</td>
                        <td className="px-4 py-3">${product.price.toFixed(2)}</td>
                        <td className="px-4 py-3">
                          <div className="flex gap-2">
                            <button
                              type="button"
                              onClick={() => openEditForm(product)}
                              className="rounded-md border border-blue-600 px-3 py-1.5 font-medium text-blue-700 hover:bg-blue-50 dark:text-blue-300 dark:hover:bg-slate-800"
                            >
                              Editar
                            </button>
                            <button
                              type="button"
                              onClick={() => deleteProduct(product)}
                              className="rounded-md border border-red-600 px-3 py-1.5 font-medium text-red-700 hover:bg-red-50 dark:text-red-300 dark:hover:bg-slate-800"
                            >
                              Borrar
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {adminProducts.length === 0 && (
                      <tr>
                        <td colSpan={5} className="px-4 py-8 text-center text-slate-500 dark:text-slate-400">
                          No hay productos para mostrar.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </main>
      </div>

      {isFormOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setIsFormOpen(false);
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="product-form-title"
            className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl dark:bg-slate-900"
          >
            <h2 id="product-form-title" className="text-2xl font-bold text-slate-900 dark:text-white">
              {editingProduct ? "Editar producto" : "Crear producto"}
            </h2>
            <form className="mt-5 space-y-4" onSubmit={saveProduct}>
              <div>
                <label htmlFor="product-title" className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-200">
                  Nombre
                </label>
                <input
                  id="product-title"
                  required
                  maxLength={120}
                  value={form.title}
                  onChange={(event) => setForm({ ...form, title: event.target.value })}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="product-price" className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-200">
                    Precio
                  </label>
                  <input
                    id="product-price"
                    type="number"
                    min="0"
                    step="0.01"
                    required
                    value={form.price}
                    onChange={(event) => setForm({ ...form, price: event.target.value })}
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>
                <div>
                  <label htmlFor="product-rating" className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-200">
                    Calificación (0 a 5)
                  </label>
                  <input
                    id="product-rating"
                    type="number"
                    min="0"
                    max="5"
                    step="0.1"
                    required
                    value={form.rating}
                    onChange={(event) => setForm({ ...form, rating: event.target.value })}
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="product-thumbnail" className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-200">
                  URL de imagen (opcional)
                </label>
                <input
                  id="product-thumbnail"
                  type="url"
                  value={form.thumbnail}
                  onChange={(event) => setForm({ ...form, thumbnail: event.target.value })}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="rounded-lg border border-slate-300 px-4 py-2 font-medium text-slate-700 hover:bg-slate-100 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-emerald-700 px-4 py-2 font-medium text-white hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-700"
                >
                  Guardar
                </button>
              </div>
            </form>
          </section>
        </div>
      )}
    </div>
  );
};
