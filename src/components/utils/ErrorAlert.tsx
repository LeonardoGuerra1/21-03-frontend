import warningIcon from "../../assets/icons/warning.svg"

interface ErrorProps {
  message: string
}

function ErrorAlert({ message }: ErrorProps) {
  return (
    <div className="text-red-100 px-10 h-fit w-fit py-2 rounded-lg bg-red-900/40 flex justify-center items-center gap-x-2">
      <img src={warningIcon} alt="Alert" className="" />
      <div className="text-xl font-semibold">{message}</div>
    </div>
  ) 
}

export default ErrorAlert;