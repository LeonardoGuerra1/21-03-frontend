import { useSuspenseQuery } from "@tanstack/react-query";
import { useAccount } from "../../hooks/useAccount";
import { useEffect, useState } from "react";
import emailIcon from "../../assets/icons/email.svg"
import keyIcon from "../../assets/icons/key.svg"
import deleteIcon from "../../assets/icons/delete.svg"
import { useOpen } from "../../hooks/useOpen";
import { QUERY_KEYS, SECURITY_FIELDS, SecurityForm } from "../../constants";
import { useForm } from "react-hook-form";
import SubmitButton from "../utils/SubmitButton";
import InputGroup from "../utils/InputGroup";

const EMAIL_FIELD = SECURITY_FIELDS[0]
const NEW_EMAIL_FIELD = SECURITY_FIELDS[1]
const PASSWORD_FIELD = SECURITY_FIELDS[2]
const NEW_PASSWORD_FIELD = SECURITY_FIELDS[3]

function Security() {
  const { getSecurity, changePassword } = useAccount()
  const { data: profile, refetch } = useSuspenseQuery({
    queryKey: [QUERY_KEYS.PROFILE_SECURITY],
    queryFn: getSecurity
  })

  const [isEditable, setIsEditable] = useState({
    email: false,
    password: false
  });
  const { render: renderEmail, show: showEmail } = useOpen(isEditable.email)
  const { render: renderPassword, show: showPassword } = useOpen(isEditable.password)

  const { register, formState: { errors, isSubmitting }, handleSubmit, setFocus, reset } =
  useForm<SecurityForm>({
    defaultValues: {
      email: profile.email,
      newEmail: "",
      password: "",
      newPassword: ""
    }
  })

  useEffect(() => {
    if (isEditable.email) setFocus(SECURITY_FIELDS[1].name as keyof SecurityForm)
    else reset()
  
    if (isEditable.password) setFocus(SECURITY_FIELDS[2].name as keyof SecurityForm)
    else reset()
  }, [isEditable]);

  const onSubmit = async (data: SecurityForm) => {
    console.log(data);
    if (isEditable.password) {
      const result = await changePassword(data.newPassword, data.password)
      if (result.ok) {
        setIsEditable({ password: false, email: false})
        reset(data)
        refetch()
      } else {
      }
    }
  }


  return (
    <>
      <div className="flex justify-start items-center gap-x-5">
        <button
          type="button"
          className="cursor-pointer flex justify-center items-center gap-x-1 opacity-30 hover:opacity-60"
          onClick={() => setIsEditable(prev => ({ email: !prev.email, password: false }))}
        >
          <img
            src={isEditable.email ? deleteIcon : emailIcon}
            alt="Change email"
            className=""
          />
          <span>
            Change email
          </span>
        </button>

        <button
          type="button"
          className="cursor-pointer flex justify-center items-center gap-x-1 opacity-30 hover:opacity-60"
          onClick={() => setIsEditable(prev => ({ password: !prev.password, email: false }))}
        >
          <img
            src={isEditable.password ? deleteIcon : keyIcon}
            alt="Change password"
            className=""
          />
          <span>
            Change password
          </span>
        </button>
      </div>

      <form action="" onSubmit={handleSubmit(onSubmit)}>

        <InputGroup
          key={EMAIL_FIELD.id}
          label={EMAIL_FIELD.label}
          type={EMAIL_FIELD.type}
          disabled={true}
          register={register(EMAIL_FIELD.name as keyof SecurityForm, { required: false })}
          error={errors[EMAIL_FIELD.name as keyof SecurityForm] !== undefined}
        />

        {(renderEmail || renderPassword) && (
          <InputGroup
            className={`${(showEmail || showPassword) ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"} origin-top duration-300`}
            key={PASSWORD_FIELD.id}
            label={PASSWORD_FIELD.label}
            type={PASSWORD_FIELD.type}
            disabled={(!isEditable.email && !isEditable.password)}
            register={register(PASSWORD_FIELD.name as keyof SecurityForm, { required: true })}
            error={errors[PASSWORD_FIELD.name as keyof SecurityForm] !== undefined}
          />
        )}

        {renderEmail && (
          <InputGroup
            className={`${(showEmail) ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"} origin-top duration-300`}
            key={NEW_EMAIL_FIELD.id}
            label={NEW_EMAIL_FIELD.label}
            type={NEW_EMAIL_FIELD.type}
            disabled={!isEditable.email}
            register={register(NEW_EMAIL_FIELD.name as keyof SecurityForm, { required: isEditable.email })}
            error={errors[NEW_EMAIL_FIELD.name as keyof SecurityForm] !== undefined}
          />
        )}

        {renderPassword && (
          <InputGroup
            className={`${(showPassword) ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"} origin-top duration-300`}
            key={NEW_PASSWORD_FIELD.id}
            label={NEW_PASSWORD_FIELD.label}
            type={NEW_PASSWORD_FIELD.type}
            disabled={!isEditable.password}
            register={register(NEW_PASSWORD_FIELD.name as keyof SecurityForm, { required: isEditable.password })}
            error={errors[NEW_PASSWORD_FIELD.name as keyof SecurityForm] !== undefined}
          />
        )}
        
        {(renderEmail || renderPassword) && (
          <div className={`w-60 ${(showEmail || showPassword) ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"} origin-top overflow-hidden duration-300`}>
            <SubmitButton text="Change" disabled={isSubmitting} />
          </div>
        )}

        {/* {SECURITY_FIELDS
          .filter(field => field.type === "email")
          .map(field =>
            (!field.conditional || (field.conditional && isEditable.email)) && (
              <InputGroup
                key={field.id}
                label={field.label}
                type={field.type}
                disabled={(!field.conditional) || (!isEditable.email || isSubmitting)}
                register={register(field.name as keyof SecurityForm, { required: true })}
                error={errors[field.name as keyof SecurityForm] !== undefined}
              />
            )
        )}

        {SECURITY_FIELDS
          .filter(field => field.type === "password")
          .map(field =>
            isEditable.password && (
              <InputGroup
                key={field.id}
                label={field.label}
                type={field.type}
                disabled={(!isEditable.password || isSubmitting)}
                register={register(field.name as keyof SecurityForm, { required: true })}
                error={errors[field.name as keyof SecurityForm] !== undefined}
              />
            )
        )} */}

      </form>
    </>
  );
}

export default Security;

// interface FieldsProps {
//   disabled: boolean
//   register: UseFormRegisterReturn
//   error: boolean
// }

// const EmailFields = ({ disabled, register, error } : FieldsProps) => {
//   return SECURITY_FIELDS.filter(field => 
//     <div key={field.id} className="my-4 flex justify-start items-center">
//       <label htmlFor="" className="w-50 font-semibold text-lg">
//         {field.label}
//       </label>
//       <div className="w-full max-w-150">
//         <Input
//           type={field.type}
//           placeholder="..."
//           disabled={disabled}
//           {...register}
//           error={error}
//         />
//       </div>
//     </div>
//   )
// }