import request from '@/utils/request'

const apiPath = '/admin/edu/course'

export default {
  saveCourseInfo(courseInfo) {
    return request({
      url: `${apiPath}/save-course-info`,
      method: 'post',
      data: courseInfo
    })
  }
}
