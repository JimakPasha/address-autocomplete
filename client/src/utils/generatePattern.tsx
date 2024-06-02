export const generatePattern = (list: string[]) =>
  list.map((value) => `^${value}$`).join("|");
