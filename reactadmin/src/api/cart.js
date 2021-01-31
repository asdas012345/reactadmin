import request from './../utils/request'

export function getCartlist(){
    return request.get('/cart')
}