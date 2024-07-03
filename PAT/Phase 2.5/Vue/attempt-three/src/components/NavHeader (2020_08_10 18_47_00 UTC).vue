<template>
  <div>
    <ul>
      <li>
        <div class="dropdown">
          <button class="dropbtn">Manage</button>
          <div class="drop-content">
            <router-link to="/pending">Pending Notices</router-link>
            <router-link to="/groups">Notice Groups</router-link>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "NavHeader"
}
</script>

<style scoped>
  ul {
    margin-left: 60px;
    display: inline-block;
  }
  li {
    border: 1px solid grey;
    padding: 20px;
    display: inline-block;
  }
</style>