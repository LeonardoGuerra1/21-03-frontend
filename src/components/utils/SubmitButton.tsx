import Loading from "./Loading";

interface SubmitButtonProps {
  text: string
  disabled: boolean
}

function SubmitButton({ text, disabled }: SubmitButtonProps) {
  return (
    <button
      type="submit"
      className="text-center text-lg w-full h-10 rounded-full font-bold cursor-pointer flex justify-center items-center gap-x-5 outline-0 bg-black border-0 border-white/70 hover:border-t-3 hover:border-r-3 focus:border-t-3 focus:border-r-3 duration-300 disabled:bg-white/20"
      disabled={disabled}
    >
      {!disabled && text}
      {disabled && <Loading size="small" />}
    </button>
  );
}

export default SubmitButton;