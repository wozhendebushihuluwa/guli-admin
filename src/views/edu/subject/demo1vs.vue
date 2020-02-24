<template>
  <div class="app-container">
    <p>
      message: <el-input v-model="message" />
    </p>
    <p>
      otherMessage: <el-input v-model="otherMessage"/>
    </p>
    <p>
      message: {{ message }}
    </p>
    <p>
      otherMessage: {{ otherMessage }}
    </p>
    <p><!-----展示反转的字符串------>
      计算属性： {{ reversedMessage }}
    </p>

    <p><!-----展示反转的字符串------>
      方法：  {{ reversedMessage2() }}
    </p>

  </div>
</template>

<script>
export default{
  data() {
    return {
      message: '',
      otherMessage: ''
    }
  },
  computed: {
    reversedMessage() {
      console.log('reversedMessage')
      return this.message.split('').reverse().join('')
    }
  },
  methods: {
    reversedMessage2() {
      console.log('reversedMessage2')
      return this.message.split('').reverse().join('')
    }
  }
}
</script>
