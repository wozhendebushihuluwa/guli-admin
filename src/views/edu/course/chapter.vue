<template>

  <div class="app-container">

    <h2 style="text-align: center;">发布新课程</h2>

    <el-steps :active="active" finish-status="success" align-center style="margin-bottom: 40px;">
      <el-step title="填写课程基本信息"/>
      <el-step title="创建课程大纲"/>
      <el-step title="发布课程"/>
    </el-steps>

    <!--课程章节列表 TODO-->

    <div style="text-align:center">
      <el-button @click="previous">上一步</el-button>
      <el-button :disabled="saveBtnDisabled" type="primary" @click="next">下一步</el-button>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      active: 1,
      saveBtnDisabled: false // 保存按钮是否禁用
    }
  },

  created() {
    console.log('chapter created')
  },

  methods: {
    previous() {
      console.log('previous')
      this.$router.push({ path: '/edu/course/info/1' })
    },

    next() {
      console.log('next')
      this.$router.push({ path: '/edu/course/publish/1' })
    }
  }
}
</script>
