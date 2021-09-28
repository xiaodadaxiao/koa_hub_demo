
/* 
 检查参数
 checkParam(参数,{
     type:'number',
     minLength:0,
     max:10,
     min:1
 })
 与参数符合返回true
*/

const checkParam = (param, options) => {
    if (!param) return false;

    //类型检查
    if (typeof param !== options.type) return false;

    //检查长度
    if (options.minLength && param.length < options.minLength) return false;
    //字符串
    if (options.type == 'string' && param.trim() === '') return false;
    //最大
    if (options.max || options.max === 0) {
        if (typeof param === 'number' && param > options.max) return false;

        if (typeof param === 'string' && !isNaN(Number(param))) {

            if (Number(param) > options.max) return false;
        } else {
            return false;
        }
    }
    //最小
    if (options.min || options.min === 0) {

        if (typeof param === 'number' && param < options.max) return false;
        if (typeof param === 'string' && !isNaN(Number(param))) {
            if (Number(param) < options.min) return false;
        } else {
            return false;
        }
    }
    return true
}
module.exports = { checkParam }