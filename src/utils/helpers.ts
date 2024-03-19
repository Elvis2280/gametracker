export const checkOldCurrentData = (oldData: any, currentData: any) => {
  if (JSON.stringify(oldData) === JSON.stringify(currentData)) {
    return true;
  }
  return false;
};
