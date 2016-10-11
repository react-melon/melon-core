/**
 * @file shallowEqual
 * @see https://github.com/dashed/shallowequal/blob/master/src/index.js
 * @author leon <ludafa@outlook.com>
 */

const hasOwn = Object.prototype.hasOwnProperty;

export default function shallowEqual(objA, objB, compare, compareContext = null) {

    const ret = compare ? compare.call(compareContext, objA, objB) : void 0;

    if (ret !== void 0) {
        return !!ret;
    }

    if (objA === objB) {
        return true;
    }

    if (
        typeof objA !== 'object' || objA === null
        || typeof objB !== 'object' || objB === null
    ) {
        return false;
    }

    const keysA = Object.keys(objA);
    const keysB = Object.keys(objB);

    const len = keysA.length;

    if (len !== keysB.length) {
        return false;
    }

    // Test for A's keys different from B.

    for (let i = 0; i < len; i++) {

        const key = keysA[i];

        if (!hasOwn.call(objB, key)) {
            return false;
        }

        const valueA = objA[key];
        const valueB = objB[key];

        const ret = compare
            ? compare.call(compareContext, valueA, valueB, key)
            : void 0;

        if (ret === false || ret === void 0 && valueA !== valueB) {
            return false;
        }

    }

    return true;
}
