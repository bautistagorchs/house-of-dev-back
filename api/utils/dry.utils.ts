export const handleError = (error: unknown): Error => {
  if (error instanceof Error) return new Error(error.message);
  else return new Error("An unknown error occurred");
};
