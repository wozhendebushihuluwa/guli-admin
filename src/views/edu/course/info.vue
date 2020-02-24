<template>

  <div class="app-container">

    <h2 style="text-align: center;">发布新课程</h2>

    <el-steps :active="active" finish-status="success" align-center style="margin-bottom: 40px;">
      <el-step title="填写课程基本信息"/>
      <el-step title="创建课程大纲"/>
      <el-step title="发布课程"/>
    </el-steps>

    <!-- 课程信息表单 -->
    <el-form label-width="120px">

      <el-form-item label="课程标题">
        <el-input v-model="courseInfo.title" placeholder=" 示例：机器学习项目课：从基础到搭建项目视频课程。专业名称注意大小写"/>
      </el-form-item>

      <!-- 所属分类 TODO -->

      <!-- 课程讲师 TODO -->

      <el-form-item label="总课时">
        <el-input-number :min="0" v-model="courseInfo.lessonNum" controls-position="right" placeholder="请填写课程的总课时数"/>
      </el-form-item>

      <!-- 课程简介 TODO -->

      <!-- 课程封面 TODO -->

      <el-form-item label="课程价格">
        <el-input-number :min="0" v-model="courseInfo.price" controls-position="right" placeholder="免费课程请设置为0元"/> 元
      </el-form-item>
    </el-form>

    <div style="text-align:center">
      <el-button :disabled="saveBtnDisabled" type="primary" @click="next()">保存并下一步</el-button>
    </div>
  </div>
</template>
<script>
import courseApi from '@/api/edu/course'
export default {

  data() {
    return {
      active: 0,
      saveBtnDisabled: false, // 保存按钮是否禁用
      courseInfo: {// 表单数据
        price: 0,
        lessonNum: 0,
        // 以下解决表单数据不全时insert语句非空校验
        teacherId: '',
        subjectId: '',
        subjectParentId: '',
        cover: '',
        description: ''
      }
    }
  },

  created() {
    console.log('info created')
  },

  methods: {

    next() {
      console.log('next')
      this.saveBtnDisabled = true
      this.saveData()
    },

    // 保存
    saveData() {
      courseApi.saveCourseInfo(this.courseInfo).then(response => {
        this.$message({
          type: 'success',
          message: '保存成功'
        })
        this.$router.push({ path: '/edu/course/chapter/' + response.data.courseId })
      })
    },

    updateData() {
      this.$router.push({ path: '/edu/course/chapter/1' })
    }
  }
}
</script>
