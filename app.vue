<template>
  <div>
    <Nav :stickied="stickied" />
    <NuxtPage />
  </div>
</template>

<script>
export default {
  data() {
    return {
      stickied: false,
    };
  },
  mounted() {
    window.addEventListener("scroll", (e) => {
      if (window.scrollY > window.innerHeight / 6) {
        this.stickied = true;
      } else {
        this.stickied = false;
      }
    });
  },
  created() {
    useHead({
      title: "Frigidus by Micah Lindley",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          hid: "description",
          name: "description",
          content:
            "An aggregate of interesting tech and science articles from around the web",
        },
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.png" },
      {rel: "preload", as: "fetch", href: "/api/get?page=1"}],
    });
  },
};
</script>

<style>
@font-face {
  font-family: "Inter";
  src: url("/Inter.woff2") format("woff2-variations");
  font-weight: 200 950;
  font-style: normal;
}

* {
  margin: 0;
  padding: 0;
}

body {
  font-family: "Inter", sans-serif;
}

::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 10px;
  border: 2px solid white;
}

::-webkit-scrollbar-thumb:hover {
  background: #9e9e9e;
}
</style>