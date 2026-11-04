import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { useAuth } from "../context/AuthContext";
import { usuarios } from "../data/users";

type LoginFormData = {
  email: string;
  password: string;
};

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const navigate = useNavigate();

  const onLogin = (data: LoginFormData) => {
    Swal.fire({
      title: "Bienvenido",
      text: "Has iniciado sesión correctamente.",
      icon: "success",
      background: "#1e293b",
      color: "#f8fafc",
    });
    console.log("Datos del formulario:", data);

    const foundUser = usuarios.find((user) => user.email === data.email);

    if (foundUser) {
      authContext.login({
        id: foundUser?.id,
        name: foundUser?.name,
        email: data.email,
        role: foundUser.role,
      });
      navigate(foundUser.role === "admin" ? "/admin" : "/");
    } else {
      Swal.fire({
        title: "Error",
        text: "Usuario no encontrado, no es posible inicar sesión",
        icon: "error",
      });
    }
  };

  const authContext = useAuth();

  return (
    <section className="flex min-h-full items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-lg sm:p-8 dark:border-slate-700 dark:bg-slate-900">
        <div className="mb-8 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-blue-700 dark:text-blue-400">
            MiniMarket
          </p>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Iniciar sesión
          </h1>
          <p className="mt-2 text-slate-600 dark:text-slate-300">
            Ingresá tu correo para iniciar una sesión local de demostración.
          </p>
        </div>

        <form className="space-y-5" noValidate onSubmit={handleSubmit(onLogin)}>
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200"
            >
              Correo electrónico
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-200 dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:focus:border-blue-400 dark:focus:ring-blue-900"
              placeholder="nombre@ejemplo.com"
              {...register("email", {
                required: "El correo electrónico es obligatorio.",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Ingresá un correo electrónico válido.",
                },
              })}
            />
            {errors?.email && (
              <p
                id="email-error"
                className="mt-1 text-sm text-red-600 dark:text-red-400"
              >
                {errors?.email.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200"
            >
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-200 dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:focus:border-blue-400 dark:focus:ring-blue-900"
              placeholder="Tu contraseña"
              {...register("password", {
                required: "La contraseña es obligatoria.",
                minLength: {
                  value: 6,
                  message: "La contraseña debe tener al menos 6 caracteres.",
                },
              })}
            />
            {errors?.password && (
              <p
                id="password-error"
                className="mt-1 text-sm text-red-600 dark:text-red-400"
              >
                {errors?.password.message}
              </p>
            )}
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400">
            La contraseña solo se valida en este formulario y no se guarda.
          </p>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-blue-700 px-5 py-3 font-medium text-white transition hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900"
          >
            {isSubmitting ? "Ingresando..." : "Ingresar"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-300">
          ¿Querés volver al catálogo?{" "}
          <Link
            to="/"
            className="font-medium text-blue-700 hover:underline dark:text-blue-400"
          >
            Ver productos
          </Link>
        </p>
      </div>
    </section>
  );
};
