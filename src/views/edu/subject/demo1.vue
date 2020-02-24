<template>
  <div class="app-container">
    <p>
      <el-input v-model="message" />
    </p>

    <p><!-----展示反转的字符串------>
      {{ message.split('').reverse().join('') }}
    </p>

  </div>
</template>

<script>
export default{
  data() {
    return {
      message: ''
    }
  }
}
</script>
