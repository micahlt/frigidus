<template>
  <main>
    <div class="header">
      <h1>An aggregate of interesting articles from around the web</h1>
      <p>It's {{ date }}</p>
    </div>
    <div class="post-grid" v-if="posts">
      <Thumb :data="posts[0]" :isPrimary="true" />
      <Thumb :data="posts[1]" :isPrimary="true" />
      <Thumb v-for="post in posts.slice(2)" :data="post" :key="post.Id" />
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      posts: null,
      page: 1,
    };
  },
  mounted() {
    fetch(`/api/get?page=${this.page}`)
      .then((res) => res.json())
      .then((data) => {
        this.posts = data;
      });
  },
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
  background-image: url("/background.png");
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
  display: flex;
  max-width: 1200px;
  width: 90vw;
  margin: auto;
  flex-wrap: wrap;
  justify-content: center;
}

@media only screen and (max-width: 800px) {
  h1 {
    font-size: 1.75rem;
  }
}
</style>