<template>
  <div class="top-navbar">
    <ul>
      <li><router-link to="/pending">Pending Notices</router-link></li>
      <li><router-link to="/groups">Notice Groups</router-link></li>
    </ul>
    <ul>
      <li><router-link to="/new">New Notice</router-link></li>
      <li><router-link to="/export">Export to PDF</router-link></li>
    </ul>
    <ul>
      <li><router-link to="/feed">MyDRO</router-link></li>
      <li><router-link to="/all">All Notices</router-link></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'TopNav'
}
</script>

<style scoped>
  .top-navbar {
    width: 100%;
    box-sizing:border-box;
    border: 1px solid black;
  }
</style>