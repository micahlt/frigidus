<template>
  <main>
    <div class="header">
      <h1>An aggregate of interesting articles from around the web</h1>
      <p>It's {{ date }}</p>
    </div>
    <div class="post-grid">
      <Thumb :id="id" />
    </div>
  </main>
</template>

<script>
export default {
  computed: {
    date() {
      return new Date().toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    },
  },
};
</script>

<style scoped>
.header {
  height: 40vh;
  padding-top: 2rem;
  max-height: 20rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.4);
  position: relative;
}

.header:before {
  height: 40vh;
  padding-top: 2rem;
  max-height: 20rem;
  width: 100%;
  content: "";
  position: absolute;
  background-color: #ff3a3a;
  background-image: url("background.png");
  background-size: cover;
  background-position: center;
  z-index: -1;
  top: 0;
  left: 0;
}

h1 {
  color: #ffffff;
  font-size: 3rem;
  max-width: 70vw;
  text-align: center;
  font-weight: 300;
}

p {
  margin-top: 1rem;
  color: #ffffff;
  opacity: 0.7;
}

.post-grid {
  padding: 1rem;
  display: grid;
  grid-template-columns: 1fr 0.5fr;
  max-width: 800px;
  margin: auto;
}
</style>