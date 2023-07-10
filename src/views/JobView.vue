<template>
  <div>Job is {{ currentJob }}</div>
</template>

<script>
export default {
  name: "JobView",
  computed: {
    currentJob() {
      return this.$route.params.id;
    },
  },
};
</script>

<style lang="scss" scoped></style>
