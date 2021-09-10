<template>

  <el-row class="tac">
    <el-col :span="1">
      <nav-menu></nav-menu>
    </el-col>

    <el-col :span="2">
      <router-view/>
    </el-col>

  </el-row>
</template>

<script>
  import NavMenu from './common/NavMenu'

  export default {
    name: 'Home',
    components: {NavMenu}
  }
</script>

<style scoped>

</style>

