import loadingIcon from "../../assets/icons/loading.svg"

export type LoadingSize = "small" | "medium" | "large"
interface LoadingProps {
  size: LoadingSize
}

function Loading({ size }: LoadingProps) {
  const className =
    size === "small" ? "w-10"
    : size === "medium" ? "w-25"
    : size === "large" ? "w-50"
    : undefined
  return <img src={loadingIcon} className={className} />
}

export default Loading;