export const isEmptyObject = (object) => {
  return (
    object === null ||
    (object && // null and undefined check
      Object.keys(object).length === 0 &&
      Object.getPrototypeOf(object) === Object.prototype)
  );
};

import moment from "moment";
export const toUnix = (time) => {
  let momentTime = moment(time.date);
  return momentTime.unix();
};
