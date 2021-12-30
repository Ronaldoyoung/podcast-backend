export const returnFalseWithErrorMessage = (errorMessage: string) => {
  return {
    ok: false,
    error: errorMessage,
  };
};
