<template>
  <main class="main-layout">
    <div class="header">
      公共头部
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
    <div class="footer">
      公共尾部
    </div>
  </main>
</template>
<script>
export default {
  name: 'Main'
}
</script>
