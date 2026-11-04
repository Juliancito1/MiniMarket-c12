import { useState } from "react";
import { useForm } from "react-hook-form";
import { useProducts } from "../hooks/useProducts";
import type { Product } from "../interfaces/product.interface";

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
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductForm>({ defaultValues: emptyForm });

  const openCreateForm = () => {
    setEditingProduct(null);
    reset(emptyForm);
    setIsFormOpen(true);
  };

  const openEditForm = (product: Product) => {
    setEditingProduct(product);
    reset({
      title: product.title,
      rating: String(product.rating),
      price: String(product.price),
      thumbnail: product.thumbnail,
    });
    setIsFormOpen(true);
  };

  const onSubmit = (_data: ProductForm) => {
    // Implementar aquí la creación o edición del producto.
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
                {isLoading ? "…" : products.length}
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
                    {products.map((product) => (
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
                              className="rounded-md border border-red-600 px-3 py-1.5 font-medium text-red-700 hover:bg-red-50 dark:text-red-300 dark:hover:bg-slate-800"
                            >
                              Borrar
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {products.length === 0 && (
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
            <form
              className="mt-5 space-y-4"
              noValidate
              onSubmit={handleSubmit(onSubmit)}
            >
              <div>
                <label htmlFor="product-title" className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-200">
                  Nombre
                </label>
                <input
                  id="product-title"
                  aria-invalid={Boolean(errors.title)}
                  aria-describedby={errors.title ? "product-title-error" : undefined}
                  {...register("title", {
                    required: "El nombre es obligatorio.",
                    maxLength: {
                      value: 120,
                      message: "El nombre no puede superar los 120 caracteres.",
                    },
                  })}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
                {errors.title && (
                  <p id="product-title-error" role="alert" className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.title.message}
                  </p>
                )}
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="product-price" className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-200">
                    Precio
                  </label>
                  <input
                    id="product-price"
                    type="number"
                    step="0.01"
                    aria-invalid={Boolean(errors.price)}
                    aria-describedby={errors.price ? "product-price-error" : undefined}
                    {...register("price", {
                      required: "El precio es obligatorio.",
                      min: { value: 0, message: "El precio no puede ser negativo." },
                    })}
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                  {errors.price && (
                    <p id="product-price-error" role="alert" className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {errors.price.message}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="product-rating" className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-200">
                    Calificación (0 a 5)
                  </label>
                  <input
                    id="product-rating"
                    type="number"
                    step="0.1"
                    aria-invalid={Boolean(errors.rating)}
                    aria-describedby={errors.rating ? "product-rating-error" : undefined}
                    {...register("rating", {
                      required: "La calificación es obligatoria.",
                      min: { value: 0, message: "La calificación mínima es 0." },
                      max: { value: 5, message: "La calificación máxima es 5." },
                    })}
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                  {errors.rating && (
                    <p id="product-rating-error" role="alert" className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {errors.rating.message}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <label htmlFor="product-thumbnail" className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-200">
                  URL de imagen (opcional)
                </label>
                <input
                  id="product-thumbnail"
                  type="url"
                  aria-invalid={Boolean(errors.thumbnail)}
                  aria-describedby={errors.thumbnail ? "product-thumbnail-error" : undefined}
                  {...register("thumbnail", {
                    pattern: {
                      value: /^https?:\/\/.+/i,
                      message: "Ingresá una URL que comience con http:// o https://.",
                    },
                  })}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
                {errors.thumbnail && (
                  <p id="product-thumbnail-error" role="alert" className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.thumbnail.message}
                  </p>
                )}
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
