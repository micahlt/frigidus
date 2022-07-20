<template>
  <nav :class="{ stickied }">
    <NuxtLink to="/" class="logo">
      <img src="/logo.svg" alt="Logo" />
      <h2 @click="$router.push('/')">Frigidus</h2>
    </NuxtLink>
    <div class="spacer"></div>
    <NuxtLink to="admin">Admin</NuxtLink>
    <a href="https://micahlindley.com/" class="button" target="_blank">More</a>
  </nav>
</template>

<script>
export default {
  props: {
    stickied: Boolean,
  },
};
</script>

<style scoped>
nav {
  position: fixed;
  color: #ffffff;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.5),
    rgba(0, 0, 0, 0.3),
    rgba(0, 0, 0, 0)
  );
  width: 100%;
  padding-top: 1rem;
  padding-bottom: 1rem;
  display: flex;
  align-items: center;
  z-index: 999;
  transition: 0.2s;
}

.stickied {
  background: #ff3a3a;
}

img {
  height: 2rem;
  margin-left: 1.5rem;
  margin-right: 0.5rem;
}

.spacer {
  flex-grow: 1;
}

a {
  color: #ffffff;
  font-weight: 300;
  text-decoration: none;
  opacity: 0.8;
  transition: 200ms;
  margin-left: 1rem;
}

a.button {
  margin-right: 1.5rem;
  margin-left: 1.5rem;
  border: 1px solid #ffffff;
  padding: 0.5rem 1rem;
  border-radius: 0.2rem;
}

a.button:hover {
  background: #ffffff;
  color: #0c343d;
  font-weight: 400;
}

.logo {
  margin-left: 0;
  opacity: 1;
  display: flex;
  align-items: center;
}

@media only screen and (max-width: 800px) {
  .logo h2 {
    display: none;
  }
}
</style>