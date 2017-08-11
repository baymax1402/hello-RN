
import address from './address.js'

// 获取折扣促销
function getDiscounts(){
    return fetch(address.discount);
}



export default {
    getDiscounts: getDiscounts
}
