<template>
  <div>
    <hero></hero>
    <features></features>
  </div>
</template>

<script>
import Features from "./Features.vue";
import Hero from "./Hero.vue";

export default {
  name: "HomeView",
  components: { Features, Hero },
};
</script>
