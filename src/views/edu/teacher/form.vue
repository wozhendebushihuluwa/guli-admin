<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-form-item label="讲师名称">
        <el-input v-model="teacher.name"/>
      </el-form-item>
      <el-form-item label="入驻时间">
        <el-date-picker
          v-model="teacher.joinDate"
          type="date"
          placeholder="选择入驻时间"
          value-format="yyyy-MM-dd"
        />
      </el-form-item>
      <el-form-item label="讲师排序">
        <el-input-number v-model="teacher.sort" :min="0" controls-position="right"/>
      </el-form-item>
      <el-form-item label="讲师头衔">
        <el-select v-model="teacher.level" clearable placeholder="请选择">
          <!--
            数据类型一定要和取出的json中的一致，否则没法回填
            因此，这里value使用动态绑定的值，保证其数据类型是number
          -->
          <el-option :value="1" label="高级讲师"/>
          <el-option :value="2" label="首席讲师"/>
        </el-select>
      </el-form-item>
      <el-form-item label="讲师资历">
        <el-input v-model="teacher.career"/>
      </el-form-item>
      <el-form-item label="讲师简介">
        <el-input v-model="teacher.intro" :rows="10" type="textarea"/>
      </el-form-item>

      <!-- 讲师头像：TODO -->
      <el-form-item label="讲师头像">

        <!---头像预览--->
        <pan-thumb :image="teacher.avatar"/>
        <!---上传按钮--->
        <el-button type="primary" icon="upload" style="position: absolute;bottom: 15px;margin-left: 40px;" @click="imagecropperShow=true">上传头像
        </el-button>
        <!---上传组件--->
        <image-cropper
          v-show="imagecropperShow"
          :width="300"
          :height="300"
          :key="imagecropperKey"
          :field="'file'"
          url="http://localhost:8120/admin/oss/file/upload?module=avatar"
          lang-type="zh"
          @close="close"
          @crop-upload-success="cropSuccess"/>
      </el-form-item>
      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import teacherApi from '@/api/edu/teacher'
import ImageCropper from '@/components/ImageCropper'
import PanThumb from '@/components/PanThumb'
export default {
  components: { ImageCropper, PanThumb },
  data() {
    return {
      saveBtnDisabled: false,
      teacher: {},
      imagecropperKey: 0, // 防止组件重用
      imagecropperShow: false
    }
  },
  watch: {
    $route(newValue, oldValue) {
      console.log(newValue)
      console.log(oldValue)
      this.init()
    }
  },
  created() {
    // if (this.$route.params && this.$route.params.id) {
    //   this.fetchDataById(this.$route.params.id)
    // }
    this.init()
  },
  methods: {
    init() {
      if (this.$route.params && this.$route.params.id) {
        this.fetchDataById(this.$route.params.id)
      } else {
        this.teacher = {
          sort: 10,
          level: 1,
          avatar: 'https://online-teacher-file-190805.oss-cn-beijing.aliyuncs.com/avatar/default.jpg'
        }
      }
    },
    fetchDataById(id) {
      teacherApi.getById(id).then(response => {
        this.teacher = response.data.item
      })
    },
    // 点击保存按钮
    saveOrUpdate() {
      console.log('saveOrUpdate')
      this.saveBtnDisabled = true
      if (!this.teacher.id) {
        this.saveData()
      } else {
        this.updateData()
      }
    },
    // 新增数据
    saveData() {
      teacherApi.save(this.teacher).then(response => {
        this.$message({
          type: 'success',
          message: response.message
        })
        this.$router.push({ path: '/edu/teacher' })
      })
    },

    // 修改数据
    updateData() {
      teacherApi.updateById(this.teacher).then(response => {
        this.$message({
          type: 'success',
          message: response.message
        })
        this.$router.push({ path: '/edu/teacher' })
      })
    },
    cropSuccess(resData) {
      console.log('resData', resData)
      // 讲师头像回显
      this.teacher.avatar = resData.url
      // 关闭上传组件
      this.imagecropperShow = false
      this.imagecropperKey++
    },
    // 关闭上传组件
    close() {
      this.imagecropperShow = false
      this.imagecropperKey++
    }
  }
}
</script>
