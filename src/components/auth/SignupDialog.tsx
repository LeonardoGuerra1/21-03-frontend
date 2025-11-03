import { useForm } from "react-hook-form";
import { useDialogStore } from "../../stores/useDialogStore";
import Dialog from "../utils/Dialog";
import { LOGIN_ACTION, ServiceResponse, SIGNUP_DEFAULT, SIGNUP_FIELDS, SignupForm } from "../../constants";
import Input from "../utils/Input";
import { useAccount } from "../../hooks/useAccount";
import { useState } from "react";
import SubmitButton from "../utils/SubmitButton";

function SignupDialog() {
  const changeAction = useDialogStore().changeAction
  const closeDialog = useDialogStore().closeDialog

  const { register, formState: { errors, isSubmitting }, handleSubmit } = useForm<SignupForm>({
    defaultValues: SIGNUP_DEFAULT
  })
  const { signup } = useAccount()
  const [result, setResult] = useState<ServiceResponse | null>(null);
  const [internal, setInternal] = useState(false);
  
  const onSubmit = async (data: SignupForm) => {
    const result = await signup(data)
    setResult(result)
    
    if (result.ok) {
      setTimeout(() => {
        closeDialog()
      }, 1000);
    } else {
      if (result.internal !== null)
        setInternal(true)
    }
  }

  return (
    <Dialog>
      <span className="block mb-4 text-center text-2xl font-semibold">
        CREATE YOUR ACCOUNT
      </span>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        {SIGNUP_FIELDS.map(field => (
          <div key={field.id} className="my-4">
            <Input
              type={field.type}
              placeholder={field.label}
              disabled={isSubmitting}
              {...register(field.name as keyof SignupForm, { required: true })}
              error={(errors[field.name as keyof SignupForm] !== undefined)}
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
          disabled={isSubmitting}
          onClick={() => changeAction(LOGIN_ACTION)}
          >
          <span className="text-white/50 hover:text-white/70 duration-100">
            Already have an account?
          </span>
          <span className="font-semibold hover:text-blue-300 duration-100">
            Log in
          </span>
        </button>

        <div className="w-full">
          <SubmitButton
            text="SIGNUP"
            loading={isSubmitting}
            internal={internal}
          />
        </div>
      </form>
    </Dialog>
  );
}

export default SignupDialog;