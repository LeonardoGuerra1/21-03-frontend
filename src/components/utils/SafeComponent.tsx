import { ReactNode, Suspense } from "react";
import { ErrorBoundary } from "./ErrorBoundary";
import ErrorAlert from "./ErrorAlert";
import Loading, { LoadingSize } from "./Loading";

interface SafeComponentProps {
  errorMessage: string
  loadingSize: LoadingSize
  children: ReactNode
}

function SafeComponent({ errorMessage, loadingSize, children }: SafeComponentProps) {
  return (
    <ErrorBoundary fallback={<ErrorAlert message={errorMessage} />} >
      <Suspense fallback={<Loading size={loadingSize} />} >
        {children}
      </Suspense>
    </ErrorBoundary>
  );
}

export default SafeComponent;