export const handleError = (error: unknown): Error => {
  if (error instanceof Error) throw Error(error.message);
  else throw new Error("An unknown error occurred");
};
