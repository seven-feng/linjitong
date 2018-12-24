import request from '@/utils/request'
import axios from 'axios'

// 获取消息列表
export function getMessageList(params) {
  return request({
    url: '/messagelist',
    method: 'get',
    params
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
  return axios.post('/message', formData)
}

// 获取知识列表
export function getKnowledgeList(params) {
  return request({
    url: '/knowledgelist',
    method: 'get',
    params
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
  return axios.post('/knowledge', formData)
}

// 获取问答列表
export function getQuestionList(params) {
  return request({
    url: '/questionlist',
    method: 'get',
    params
  })
}

export function delQuestionList(id) {
  return request({
    url: '/question',
    method: 'delete',
    params: {
      id
    }
  })
}

export function saveAnswer(form) {
  return request({
    url: '/question',
    method: 'post',
    params: {
      form
    }
  })
}

