import { Link } from 'react-router'
import type { Product } from '../interfaces/product.interface'

export const ProductCard = ({product}:{product : Product}) => {
  return (
    <div className="flex h-full w-full max-w-sm flex-col rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <Link to={`/productos/${product?.id}`}>
        <img
          className="h-64 w-full rounded-t-lg bg-white object-contain p-8 dark:bg-slate-800"
          src={product?.thumbnail}
          alt={product?.title}
        />
      </Link>
      <div className="flex flex-1 flex-col px-5 pb-5">
        <Link to={`/products/${product?.id}`}>
          <h5 className="line-clamp-2 min-h-14 text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
            {product?.title}
          </h5>
        </Link>
        <div className="mb-5 mt-2.5 flex h-6 items-center">
          <span className="rounded bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-800 dark:bg-blue-200 dark:text-blue-800">
            {product?.rating}
          </span>
        </div>
        <div className="mb-2 flex items-center justify-between">
          <span className="text-3xl font-bold text-gray-900 dark:text-white">
            ${product?.price}
          </span>
        </div>
        <div className="mt-auto flex gap-3">
          <Link
            to={`/products/${product?.id}`}
            className="flex flex-1 items-center justify-center rounded-lg bg-blue-700 px-3 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Ver Detalle
          </Link>
          <a
            href="#"
            className="flex flex-1 items-center justify-center rounded-lg bg-blue-700 px-3 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Añadir al carrito
          </a>
        </div>
      </div>
    </div>
  )
}
