import request from '@/utils/request'
import axios from 'axios'
import { getToken } from '@/utils/auth'

// 获取消息列表
export function getMessageList(params) {
  return request({
    url: '/messagelist',
    method: 'get',
    params
  })
}

// 获取消息
export function getMessage(id) {
  return request({
    url: '/message',
    method: 'get',
    params: {
      id
    }
  })
}

// 删除消息
export function delMessageList(id) {
  return request({
    url: '/message',
    method: 'delete',
    params: {
      id
    }
  })
}

// 发布消息
export function postMessage(formData) {
  return axios.post('/TDS/message', formData, { headers: { 'X-Token': getToken() }})
}

// 获取区域
export function getArea() {
  return request({
    url: '/area',
    method: 'get'
  })
}

// 获取知识列表
export function getKnowledgeList(params) {
  return request({
    url: '/knowledgelist',
    method: 'get',
    params
  })
}

// 获取知识
export function getKnowledge(id) {
  return request({
    url: '/knowledge',
    method: 'get',
    params: {
      id
    }
  })
}

// 删除知识
export function delKnowledgeList(id) {
  return request({
    url: '/knowledge',
    method: 'delete',
    params: {
      id
    }
  })
}

// 发布知识
export function postKnowledge(formData) {
  return axios.post('/TDS/knowledge', formData, { headers: { 'X-Token': getToken() }})
}

// 获取问答列表
export function getQuestionList(params) {
  return request({
    url: '/questionlist',
    method: 'get',
    params
  })
}

// 获取问题
export function getQuestion(id) {
  return request({
    url: '/question',
    method: 'get',
    params: {
      id
    }
  })
}

// 获取回答
export function getAnswers(id) {
  return request({
    url: '/answers',
    method: 'get',
    params: {
      id
    }
  })
}

// 删除问答
export function delQuestionList(id) {
  return request({
    url: '/question',
    method: 'delete',
    params: {
      id
    }
  })
}

// 保存回答
export function saveAnswer(form) {
  return request({
    url: '/answer',
    method: 'post',
    params: {
      ...form
    }
  })
}

// 发布问题
export function postQuestion(formData) {
  return axios.post('/TDS/question', formData, { headers: { 'X-Token': getToken() }})
}

// 获取典型示范列表
export function getModelList(params) {
  return request({
    url: '/modellist',
    method: 'get',
    params
  })
}

// 获取典型示范
export function getModel(id) {
  return request({
    url: '/model',
    method: 'get',
    params: {
      id
    }
  })
}

// 删除典型示范
export function delModelList(id) {
  return request({
    url: '/model',
    method: 'delete',
    params: {
      id
    }
  })
}

// 发布典型示范
export function postModel(formData) {
  return axios.post('/TDS/model', formData, { headers: { 'X-Token': getToken() }})
}

// 获取用户列表
export function getUserList(params) {
  return request({
    url: '/user/userlist',
    method: 'get',
    params
  })
}

// 修改用户权限
export function postUserAuthority(id, roles) {
  return request({
    url: '/user/authority',
    method: 'post',
    params: {
      id,
      roles
    }
  })
}

// 获取系统消息列表
export function getSysMessageList(params) {
  return request({
    url: '/sysmessagelist',
    method: 'get',
    params
  })
}

// 获取系统消息
export function getSysMessage(id) {
  return request({
    url: '/sysmessage',
    method: 'get',
    params: {
      id
    }
  })
}

// 删除系统消息
export function delSysMessageList(id) {
  return request({
    url: '/sysmessage',
    method: 'delete',
    params: {
      id
    }
  })
}

// 发布系统消息
export function postSysMessage(formData) {
  return axios.post('/TDS/sysmessage', formData, { headers: { 'X-Token': getToken() }})
}

