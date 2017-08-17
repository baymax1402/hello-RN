
import address from './address.js'

// 获取折扣促销
function getDiscounts(){
    return fetch(address.discount).then((response)=> response.json());
}

// 获取推荐的团购
function getRecommend(){
    return fetch(address.recommend).then((response)=> response.json());
}


export default {
    getDiscounts: getDiscounts,
    getRecommend: getRecommend
}
