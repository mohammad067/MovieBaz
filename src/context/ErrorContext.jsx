import { createContext, useContext, useState } from "react";

const ErrorContext = createContext(null);

export function ErrorProvider({ children }) {
  const [globalError, setGlobalError] = useState(null);

  const triggerError = (message) => setGlobalError({ message });
  const clearError = () => setGlobalError(null);

  return (
    <ErrorContext.Provider value={{ globalError, triggerError, clearError }}>
      {children}
    </ErrorContext.Provider>
  );
}

export function useError() {
  return useContext(ErrorContext);
}