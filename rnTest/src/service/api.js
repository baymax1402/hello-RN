
import address from './address.js'

var headers = {
    'Accept' : 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;',
    'Content-Type' : 'text/plain;charset=UTF-8',
    'Host' : 'api.meituan.com'
};
var config = {
    method: 'GET',
    headers: headers
};

// 获取折扣促销
function getDiscounts(){
    return fetch(address.discount).then((response)=> response.json());
}



export default {
    getDiscounts: getDiscounts
}
