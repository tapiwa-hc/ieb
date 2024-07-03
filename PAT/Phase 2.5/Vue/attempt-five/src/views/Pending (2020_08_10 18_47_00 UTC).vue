<template>
  <div>
    Pending Works!
    <PendingList />
  </div>
</template>

<script>
import PendingList from "../components/PendingList";

export default {
  name: "Pending",
  components: {
    PendingList,
  },
};
</script>

<style scoped>
div {
  width: 100%;
}
</style>