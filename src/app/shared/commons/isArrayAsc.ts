export const isIArrayAsc = (arr?: any) => {
  if (!Array.isArray(arr) || arr.length < 2)
    return false;
  return arr.every(
    (curVal, curIndex, arr) => !Number.isNaN(curVal) && (!curIndex || (curVal >= arr[curIndex - 1]))
  );
};
