import { useForm } from "react-hook-form";
import { PERSONAL_INFO_FIELDS, PersonalInfoForm, QUERY_KEYS } from "../../constants";
import { useEffect, useState } from "react";
import { useAccount } from "../../hooks/useAccount";
import { useSuspenseQuery } from "@tanstack/react-query";
import editIcon from "../../assets/icons/edit.svg"
import deleteIcon from "../../assets/icons/delete.svg"
import SubmitButton from "../utils/SubmitButton";
import { useOpen } from "../../hooks/useOpen";
import InputGroup from "../utils/InputGroup";

function PersonalInfo() {
  const { getProfile, updateInfo } = useAccount()
  const { data: profile, refetch } = useSuspenseQuery({
    queryKey: [QUERY_KEYS.PROFILE_INFO],
    queryFn: getProfile
  })

  const [isEditable, setIsEditable] = useState(false);
  const { render, show } = useOpen(isEditable)

  const { register, formState: { errors, isSubmitting }, handleSubmit, setFocus, reset } =
  useForm<PersonalInfoForm>({
    defaultValues: {
      name: profile.name,
      lastname: profile.lastname,
      age: profile.age,
      username: profile.username
    }
  })

  useEffect(() => {
    if (isEditable) setFocus(PERSONAL_INFO_FIELDS[0].name as keyof PersonalInfoForm)
    else reset()
  }, [isEditable]);

  const onSubmit = async (data: PersonalInfoForm) => {
    const result = await updateInfo(data)
    if (result.ok) {
      setIsEditable(false)
      reset(data)
      refetch()
    } else {
    }
  }

  return (
    <>
      <button
        type="button"
        className="cursor-pointer flex justify-center items-center gap-x-1 opacity-30 hover:opacity-60"
        onClick={() => setIsEditable(prev => !prev)}
      >
        <img
          src={isEditable ? deleteIcon : editIcon}
          alt="Edit"
          className=""
        />
        <span>
          Edit info
        </span>
      </button>

      <form action="" onSubmit={handleSubmit(onSubmit)}>
        {PERSONAL_INFO_FIELDS.map(field => (
          <InputGroup
            key={field.id}
            label={field.label}
            type={field.type}
            disabled={!isEditable || isSubmitting}
            register={register(field.name as keyof PersonalInfoForm, { required: true })}
            error={(errors[field.name as keyof PersonalInfoForm] !== undefined)}
          />
        ))}

        {render && (
          <div className={`w-60 ${show ? "scale-y-100" : "scale-y-0"} origin-top overflow-hidden duration-500`}>
            <SubmitButton text="Update" disabled={isSubmitting} />
          </div>
        )}
      </form>
    </>
  );
}

export default PersonalInfo;