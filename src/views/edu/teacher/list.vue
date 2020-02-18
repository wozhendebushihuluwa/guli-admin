
<!--- 讲师列表组件
  1.使用ajax获取数据：api模块
  2.展示数据
---->
<template>
  <div class="app-container">
    <!-----查询表单组件------>
    <el-form :inline="true" >
      <el-form-item label="讲师名">
        <!-- <el-input v-model="searchObj.name" placeholder="讲师名"/> -->
        <el-autocomplete
          v-model="searchObj.name"
          :fetch-suggestions="querySearch"
          :trigger-on-focus="false"
          value-key="name"
          class="inline-input"
          placeholder="讲师名"/></el-form-item>
      <el-form-item label="讲师头衔">
        <el-select v-model="searchObj.level" placeholder="请选择">
          <el-option label="高级讲师" value="1"/>
          <el-option label="首席讲师" value="2"/>
        </el-select>
      </el-form-item>
      <el-form-item label="入驻时间">
        <el-date-picker
          v-model="searchObj.joinDateBegin"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="开始时间"/>
      </el-form-item>
      至
      <el-form-item label="结束时间">
        <el-date-picker
          v-model="searchObj.joinDateEnd"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="开始时间"/>
      </el-form-item>
      <el-button type="primary" @click="fetchData()">查询</el-button>
      <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>
    <!--工具条--->
    <div style="margin-bottom:10px;">
      <el-button type="danger" size="mini" @click="batchRemove()" >批量删除</el-button>
    </div>
    <!-- 表格组件 -->
    <el-table
      :data="list"
      stripe
      border
      style="width: 100%"
      @selection-change="handleSecletionChange">
      <!-- 多选列 -->
      <el-table-column
        type="selection"
        width="55"/>
      <el-table-column
        label="序号"
        width="70"
        align="center">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column prop="name" label="名称" width="80" />

      <el-table-column label="头衔" width="90">
        <template slot-scope="scope">
          <span v-if="scope.row.level === 1">
            <el-tag type="success" size="mini">高级讲师</el-tag>
          </span>
          <span v-if="scope.row.level === 2">
            <el-tag size="mini">首席讲师</el-tag>
          </span>
        </template>
      </el-table-column>

      <el-table-column prop="intro" label="资历" />

      <el-table-column label="入驻时间" width="160">
        <template slot-scope="scope">
          {{ scope.row.joinDate }}
        </template>
      </el-table-column>

      <el-table-column prop="sort" label="排序" width="60" />

      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <router-link :to="'/edu/teacher/edit/'+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
          </router-link>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeById(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :total="total"
      :page-size="limit"
      :page-sizes="[5,10,15]"
      layout="sizes,prev, pager, next, jumper, ->, total"
      @size-change="changeSize"
      @current-change="changeCurrent"/>
  </div>
</template>

<script>
// 导入teacherapi的api组件
import teacherApi from '@/api/edu/teacher'
export default {

  data() {
    return {
      list: [],
      total: 0,
      page: 1,
      limit: 5,
      searchObj: {},
      multipleSelection: []
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    querySearch(key, cb) {
      teacherApi.selectNameListByKey(key).then(response => {
        // const results = [{ value: '张三' }, { value: '张思' }, { value: '张思源' }]
        const results = response.data.nameList
        console.log(results)
        // var restaurants = this.restaurants
        // var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
        // // 调用 callback 返回建议列表的数据
        cb(results)
      })
    },
    handleSecletionChange(selection) {
      console.log(selection)
      this.multipleSelection = selection
    },
    // 批量删除
    batchRemove() {
      console.log('batchRemove')
      if (this.multipleSelection.length === 0) {
        this.$message({
          message: '请选择要删除的记录',
          type: 'warning'
        })
        return
      }

      this.$confirm('您要删除这些记录么？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 执行删除api
        var idList = []
        this.multipleSelection.forEach(item => {
          idList.push(item.id)
        })
        return teacherApi.batchRemove(idList)
      }).then(response => {
        this.fetchData()
        this.$message({
          message: response.message,
          type: 'success'
        })
      }).catch(error => {
        console.log(error)
        if (error === 'cancel') {
          this.$message({
            message: '取消删除',
            type: 'warning'
          })
        }
      })
    },
    changeSize(size) {
      console.log('每页记录数改变' + size)
      this.limit = size
      this.fetchData()
    },
    changeCurrent(page) {
      console.log('当前页码' + page)
      this.page = page
      this.fetchData()
    },
    fetchData(page) {
      teacherApi.getPageList(this.page, this.limit, this.searchObj).then(response => {
        this.list = response.data.rows
        this.total = response.data.total
        console.log(response)
      })
    },
    removeById(teacherId) {
      console.log('teacherId', teacherId)
      this.$confirm('您要删除这条记录么？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 执行删除api
        console.log('执行删除api')
        return teacherApi.removeById(teacherId)
      }).then(response => {
        this.fetchData()
        this.$message({
          message: response.message,
          type: 'success'
        })
      }).catch(error => {
        console.log(error)
        if (error === 'cancel') {
          this.$message({
            message: '取消删除',
            type: 'warning'
          })
        }
      })
    },
    resetData() {
      this.searchObj = {}
      this.fetchData()
    }
  }
}
</script>
