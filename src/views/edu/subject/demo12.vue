<template>
  <div class="app-container">
    <p>
      <el-input v-model="message" />
    </p>

    <p><!-----展示反转的字符串------>
      {{ reversedMessage }}
    </p>

  </div>
</template>

<script>
export default{
  data() {
    return {
      message: ''
    }
  },
  computed: {
    reversedMessage() {
      return this.message.split('').reverse().join('')
    }
  },
  methods: {

  }
}
</script>
