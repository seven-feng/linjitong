import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/table/list',
    method: 'get',
    params
  })
}

// 获取消息列表
export function getMessageList(params) {
  return request({
    url: '/messagelist',
    method: 'get',
    params
  })
}

export function delMessageList(id) {
  return request({
    url: '/message',
    method: 'delete',
    params: {
      id
    }
  })
}

export function postMessage(formData) {
  debugger
  return request({
    url: '/message',
    method: 'post',
    params: {
      ...formData
    }
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

export function delKnowledgeList(id) {
  return request({
    url: '/knowledge',
    method: 'delete',
    params: {
      id
    }
  })
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

