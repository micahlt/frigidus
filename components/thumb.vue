<template>
  <a
    :class="{ thumb: true, big: isPrimary }"
    :href="data.Url"
    target="_blank"
    rel="noreferrer"
  >
    <img :src="openGraphImage" />
    <h3>{{ data.Name }}</h3>
    <p class="info">
      {{ host }} | {{ new Date(data.DateAdded).toLocaleDateString() }}
    </p>
  </a>
</template>

<script>
export default {
  props: {
    data: Object,
    isPrimary: {
      default: false,
      type: Boolean,
    },
  },
  data() {
    return {
      openGraphImage: null,
    };
  },
  mounted() {
    fetch(`/api/og?url=${encodeURIComponent(this.data.Url)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.image) {
          this.openGraphImage = data.image;
        }
      });
  },
  computed: {
    host() {
      return new URL(this.data.Url).hostname;
    },
  },
};
</script>

<style scoped>
h3 {
  font-size: 1.4rem;
  transition: 200ms;
  margin-right: 5%;
}

.big h3 {
  font-size: 1.75rem;
}

img {
  width: 100%;
  object-fit: cover;
  border-radius: 0.5rem;
  aspect-ratio: 4 / 2.5;
  overflow: hidden;
  font-family: "Helvetica";
  font-weight: 300;
  line-height: 2;
  text-align: center;
  display: block;
  position: relative;
  margin-bottom: 1rem;
  transition: 200ms;
  will-change: filter;
}

img::before {
  content: "";
  display: block;
  position: absolute;
  top: -10px;
  left: 0;
  height: calc(100% + 10px);
  width: 100%;
  background-color: rgb(230, 230, 230);
}

img::after {
  content: "";
  display: block;
  position: absolute;
  height: 100%;
  width: 40%;
  background: lightgray;
  background: linear-gradient(
    to right,
    rgba(255, 255, 255, 0),
    rgba(255, 255, 255, 0.85),
    rgba(255, 255, 255, 0)
  );
  top: 0;
  left: 0;
  animation: loader 2s infinite;
}

@keyframes loader {
  0% {
    left: -40%;
  }
  100% {
    left: 140%;
  }
}

.thumb {
  width: 29%;
  padding: 1rem;
  min-width: 300px;
  display: block;
  color: initial;
  text-decoration: none;
}

.thumb.big {
  width: 47%;
}

.thumb:hover h3 {
  color: #ff3a3a;
}

.thumb:hover img {
  filter: saturate(0.4);
}

.info {
  opacity: 0.8;
  text-transform: uppercase;
  font-size: 0.8rem;
  margin-top: 0.25rem;
}

@media only screen and (max-width: 1200px) {
  .thumb.big {
    width: 29%;
  }

  .big h3 {
    font-size: 1.4rem;
  }
}
</style>