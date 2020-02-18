import request from '@/utils/request'

const apiPath = '/admin/edu/teacher'

export default{
  list() {
    return request({
      url: `${apiPath}/list`,
      method: 'get'
    })
  },
  getPageList(page, limit, searchObj) {
    return request({
      url: `${apiPath}/list/${page}/${limit}`,
      method: 'get',
      params: searchObj
    })
  },
  removeById(id) {
    return request({
      url: `${apiPath}/remove/${id}`,
      method: 'delete'
    })
  },
  batchRemove(idList) {
    return request({
      url: `${apiPath}/batch-remove`,
      method: 'delete',
      data: idList
    })
  },
  save(teacher) {
    return request({
      url: `${apiPath}/save`,
      method: 'post',
      data: teacher
    })
  },
  getById(id) {
    return request({
      url: `${apiPath}/get/${id}`,
      method: 'get'
    })
  },
  updateById(teacher) {
    return request({
      url: `${apiPath}/update`,
      method: 'put',
      data: teacher
    })
  },
  selectNameListByKey(key) {
    return request({
      url: `${apiPath}/list/name/${key}`,
      method: 'get'
    })
  }
}
