import { transform, isEqual, isArray, isObject } from "lodash";
import { isSameDay } from "date-fns";

export default {
  methods: {
    objectDifference(origObj, newObj) {
      function changes(newObj, origObj) {
        let arrayIndexCounter = 0;
        return transform(newObj, function(result, value, key) {
          if (
            value instanceof Date &&
            !isSameDay(new Date(value), new Date(origObj[key]))
          ) {
            let resultKey = isArray(origObj) ? arrayIndexCounter++ : key;
            result[resultKey] = value;
          } else if (
            !(value instanceof Date) &&
            !isEqual(value, origObj[key])
          ) {
            let resultKey = isArray(origObj) ? arrayIndexCounter++ : key;
            result[resultKey] =
              isObject(value) && isObject(origObj[key])
                ? changes(value, origObj[key])
                : value;
          }
        });
      }
      return changes(newObj, origObj);
    },
  },
};
