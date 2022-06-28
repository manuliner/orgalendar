export const isEmptyObject = (object) => {
  return (
    object === null ||
    (object && // null and undefined check
      Object.keys(object).length === 0 &&
      Object.getPrototypeOf(object) === Object.prototype)
  );
};
