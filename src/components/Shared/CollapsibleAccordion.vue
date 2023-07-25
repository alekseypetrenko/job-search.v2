<template>
  <div class="border-b border-solid border-brand-gray-2 py-5">
    <div
      class="flex flex-wrap items-center justify-between cursor-pointer"
      @click="open">
      <h3 class="text-base font-semibold">Organizations</h3>
      <font-awesome-icon :icon="caretIcon" />
    </div>
    <div v-if="isOpen" class="mt-5 w-full">Child</div>
  </div>
</template>

<script>
export default {
  name: "CollapsibleAccordion",
  data() {
    return {
      isOpen: false,
    };
  },
  computed: {
    caretIcon() {
      return this.isOpen ? ["fas", "angle-up"] : ["fas", "angle-down"];
    },
  },
  methods: {
    open() {
      this.isOpen = !this.isOpen;
    },
  },
};
</script>

<style lang="scss" scoped></style>
