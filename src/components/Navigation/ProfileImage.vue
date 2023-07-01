<template>
  <img
    :src="imgLink"
    alt="Profile Image"
    class="h-8 w-8 rounded-3xl object-contain" />
</template>

<script>
export default {
  name: "ProfileIMage",
  data() {
    return {
      imgLink:
        "https://www.pngitem.com/pimgs/m/487-4876417_link-head-png-toon-link-face-png-transparent.png",
    };
  },
};
</script>
