<template>
  <div>
    <table>
      <tr>
        <th>Date</th>
        <th>Group</th>
        <th>Title</th>
        <th>Description</th>
        <th>User</th>
      </tr>
      <tr v-for="notice in notices" :notice="notice" :key="notice.notice_id">
        <td>{{ notice.display_date }} </td>
        <td>{{ notice.name }} </td>
        <td>{{ notice.title }} </td>
        <td>{{ notice.description }} </td>
        <td>{{ notice.user }} </td>
      </tr>
    </table>
  </div>
</template>

<script>

import NoticeService from '../services/NoticeService';

export default {
  name: 'PendingList',
  data() {
    return {
      notice: {},
      notices: []
    };
  },
  methods: {
    async getPendingData() {
      NoticeService.getPending()
      .then(
        (notices => {
          this.$set(this, "notices", notices);
        }).bind(this)
      );
    }
  },
  created() {
    this.getPendingData();
  }
}
</script>

<style scoped>

</style>