import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";
import {
  getRegisteredUsers,
  saveRegisteredUser,
  usuarios,
} from "../data/users";

type RegisterFormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const navigate = useNavigate();

  const onRegister = async (data: RegisterFormData) => {
    const email = data.email.trim().toLowerCase();
    const alreadyRegistered = [...usuarios, ...getRegisteredUsers()].some(
      (user) => user.email.toLowerCase() === email,
    );

    if (alreadyRegistered) {
      await Swal.fire({
        title: "Correo ya registrado",
        text: "Probá iniciar sesión con ese correo.",
        icon: "error",
      });
      return;
    }

    try {
      saveRegisteredUser({
        id: Date.now(),
        name: data.name.trim(),
        email,
        password: data.password,
        role: "user",
      });
    } catch (error) {
      console.error("No se pudo guardar la cuenta en localStorage", error);
      await Swal.fire({
        title: "No se pudo crear la cuenta",
        text: "Revisá el almacenamiento del navegador e intentá nuevamente.",
        icon: "error",
      });
      return;
    }

    await Swal.fire({
      title: "Cuenta creada",
      text: "Tus datos de práctica se guardaron en este navegador. Ahora podés iniciar sesión.",
      icon: "success",
    });
    navigate("/login");
  };

  return (
    <section className="flex min-h-full items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-lg sm:p-8 dark:border-slate-700 dark:bg-slate-900">
        <div className="mb-8 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-blue-700 dark:text-blue-400">
            MiniMarket
          </p>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Crear cuenta
          </h1>
          <p className="mt-2 text-slate-600 dark:text-slate-300">
            Registrate para practicar el flujo de inicio de sesión.
          </p>
        </div>

        <form
          className="space-y-5"
          noValidate
          onSubmit={handleSubmit(onRegister)}
        >
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200"
            >
              Nombre
            </label>
            <input
              id="name"
              type="text"
              autoComplete="name"
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-200 dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:focus:border-blue-400 dark:focus:ring-blue-900"
              placeholder="Tu nombre"
              {...register("name", {
                required: "El nombre es obligatorio.",
                minLength: {
                  value: 2,
                  message: "El nombre debe tener al menos 2 caracteres.",
                },
              })}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {errors.name.message}
              </p>
            )}
          </div>

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
            {errors.email && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {errors.email.message}
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
              autoComplete="new-password"
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-200 dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:focus:border-blue-400 dark:focus:ring-blue-900"
              placeholder="Al menos 6 caracteres"
              {...register("password", {
                required: "La contraseña es obligatoria.",
                minLength: {
                  value: 6,
                  message: "La contraseña debe tener al menos 6 caracteres.",
                },
              })}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200"
            >
              Confirmar contraseña
            </label>
            <input
              id="confirmPassword"
              type="password"
              autoComplete="new-password"
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-200 dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:focus:border-blue-400 dark:focus:ring-blue-900"
              placeholder="Repetí tu contraseña"
              {...register("confirmPassword", {
                required: "Confirmar la contraseña es obligatorio.",
                validate: (value) =>
                  value === watch("password") ||
                  "Las contraseñas no coinciden.",
              })}
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400">
            Práctica educativa: los datos, incluida la contraseña, quedan en
            texto plano en este navegador. No uses una contraseña real.
          </p>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-blue-700 px-5 py-3 font-medium text-white transition hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900"
          >
            {isSubmitting ? "Creando cuenta..." : "Registrarme"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-300">
          ¿Ya tenés cuenta?{" "}
          <Link
            to="/login"
            className="font-medium text-blue-700 hover:underline dark:text-blue-400"
          >
            Iniciar sesión
          </Link>
        </p>
      </div>
    </section>
  );
};
