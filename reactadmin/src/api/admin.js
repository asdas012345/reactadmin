import request from './../utils/request'

export function getAdminlist () {
  return request.get('/admin')
}

export function addAdmin (params) {
  return request.post('/admin/add', params)
}

export function deleteAdmin (params) {
  return request.post('/admin/delete', params)
}
export function updateAdmin (params) {
  return request.post('/admin/update', params)
}
export function login (params) {
  return request.post('/admin/login', params)
}