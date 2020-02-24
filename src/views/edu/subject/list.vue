<template>
  <div class="app-container">

    <el-input v-model="filterTest" />

    <el-tree
      ref="subjectTree"
      :data="subjectList"
      :props="defaultProps"
      :filter-node-method="filterNode"

    />

  </div>
</template>
<script>
import subjectApi from '@/api/edu/subject'
export default {
  data() {
    return {
      filterTest: '', // 过滤文本
      subjectList: [],
      defaultProps: {
        children: 'children',
        label: 'title'
      }
    }
  },
  watch: {
    filterTest(val) {
      console.log('val', val)
      this.$refs.subjectTree.filter(val)
    }
  },
  created() {
    this.fetchNodeList()
  },
  methods: {
    fetchNodeList() {
      subjectApi.getNestedList().then(response => {
        this.subjectList = response.data.items
      })
    },
    filterNode(value, data) {
      if (!value) return true
      return data.title.toLowerCase().indexOf(value.toLowerCase()) !== -1
    }
  }
}
</script>
