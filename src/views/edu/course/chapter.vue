<template>

  <div class="app-container">

    <h2 style="text-align: center;">发布新课程</h2>

    <el-steps :active="active" finish-status="success" align-center style="margin-bottom: 40px;">
      <el-step title="填写课程基本信息"/>
      <el-step title="创建课程大纲"/>
      <el-step title="发布课程"/>
    </el-steps>

    <!--课程章节列表-->

    <!------章节嵌套列表：列表、删除章节、删除课时-------->
    <chapter-list :course-id="courseId"/>

    <!-------章节表单：增加、修改，回显------->

    <!--------课时表单：增加、修改、回显、上传视频、删除视频------>

    <div style="text-align:center">
      <el-button @click="previous">上一步</el-button>
      <el-button :disabled="saveBtnDisabled" type="primary" @click="next">下一步</el-button>
    </div>
  </div>
</template>

<script>
import ChapterList from '@/views/edu/course/components/ChapterList'

export default {
  components: { ChapterList },
  data() {
    return {
      active: 1,
      saveBtnDisabled: false, // 保存按钮是否禁用
      courseId: '' // 所属的课程id
    }
  },

  created() {
    console.log('chapter created')
    this.init()
  },

  methods: {
    init() {
      if (this.$route.params && this.$route.params.id) {
        this.courseId = this.$route.params.id
      }
    },
    previous() {
      console.log('previous')
      this.$router.push({ path: '/edu/course/info/' + this.courseId })
    },

    next() {
      console.log('next')
      this.$router.push({ path: '/edu/course/publish/' + this.courseId })
    }
  }
}
</script>
