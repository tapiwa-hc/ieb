<template>
  <div class="home">
    <NavHeader></NavHeader>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import NavHeader from '../components/NavHeader.vue'

export default {
  name: 'Home',
  components: {
    // HelloWorld
    NavHeader
  }
}
</script>
