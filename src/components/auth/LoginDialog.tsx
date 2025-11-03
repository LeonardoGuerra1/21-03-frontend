import { useState } from "react";
import { LOGIN_DEFAULT, LOGIN_FIELDS, LoginForm, ServiceResponse, SIGNUP_ACTION } from "../../constants";
import { useAccount } from "../../hooks/useAccount";
import { useDialogStore } from "../../stores/useDialogStore";
import Dialog from "../utils/Dialog";
import Input from "../utils/Input";
import { useForm } from "react-hook-form"
import SubmitButton from "../utils/SubmitButton";

function LoginDialog() {
  const changeAction = useDialogStore().changeAction
  const closeDialog = useDialogStore().closeDialog

  const { register, formState: { errors, isSubmitting, isSubmitSuccessful }, handleSubmit } =
  useForm<LoginForm>({
    defaultValues: LOGIN_DEFAULT
  })
  const { login } = useAccount()
  const [result, setResult] = useState<ServiceResponse | null>(null);
  const [internal, setInternal] = useState(false);

  const onSubmit = async (data: LoginForm) => {
    const result = await login(data.email, data.password)
    setResult(result)

    if (result.ok) {
      setTimeout(() => closeDialog(), 1000);
    } else {
      if (result.internal !== undefined)
        setInternal(true)
    }
  }

  return (
    <Dialog>
      <span className="block mb-4 text-center text-2xl font-semibold">
        ACCESS
      </span>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        {LOGIN_FIELDS.map(field => (
          <div key={field.id} className="my-4">
            <Input
              type={field.type}
              placeholder={field.label}
              disabled={isSubmitting}
              {...register(field.name as keyof LoginForm, { required: true })}
              error={errors[field.name as keyof LoginForm] !== undefined}
            />
          </div>
        ))}

        {result !== null && (
          <span className={`block mb-4 text-center font-semibold ${result.ok ? "text-green-400" : "text-red-400"}`}>
            {result.message}
          </span>
        )}

        <button
          type="button"
          className="mx-auto mb-2 flex justify-center items-center gap-x-2 cursor-pointer"
          disabled={isSubmitting || isSubmitSuccessful}
          onClick={() => changeAction(SIGNUP_ACTION)}
        >
          <span className="text-white/50 hover:text-white/70 duration-100">
            Don't have an account?
          </span>
          <span className="font-semibold hover:text-blue-300 duration-100">
            Sign up
          </span>
        </button>

        <div className="w-full">
          <SubmitButton
            text="LOGIN"
            loading={isSubmitting}
            internal={internal}
          />
        </div>
      </form>
    </Dialog>
  )
}

export default LoginDialog;