import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: '/user/login',
    method: 'post',
    params: {
      username,
      password
    }
  })
}

export function register(userInfo) {
  return request({
    url: '/user/register',
    method: 'post',
    params: {
      ...userInfo
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

// 发送验证码
export function postVerification(phone) {
  debugger
  return request({
    url: '/user/verification',
    method: 'post',
    params: {
      phone
    }
  })
}
