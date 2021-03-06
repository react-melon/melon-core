/**
 * @file 字符串相关的小工具
 * @author leon <ludafa@outlook.com>
 */

/**
 * @file 骆驼化
 * @author leon(ludafa@outlook.com)
 */

export function camelize(source) {

    if (!source) {
        return '';
    }

    return source.replace(
        /-([a-z])/g,
        function (match, alpha) {
            return alpha.toUpperCase();
        }
    );

}

export function pascalize(source) {

    if (!source) {
        return '';
    }

    /* eslint-disable fecs-max-calls-in-template */
    return `${source.charAt(0).toUpperCase()}${camelize(source.slice(1))}`;
    /* eslint-enable fecs-max-calls-in-template */

}

/**
 * 把一个XxxXxx格式的字符串转化成xxx-xxx的格式
 *
 * @param  {string} source 源字符串
 * @return {string}
 */
export function hyphenate(source) {
    return source
        .replace(/[A-Z]/g, $0 => `-${$0}`)
        .slice(1)
        .toLowerCase();
}
