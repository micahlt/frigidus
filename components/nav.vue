<template>
  <nav>
    <img src="logo.svg" alt="Logo" />
    <h2>Frigidus</h2>
    <div class="spacer"></div>
    <a href="#">About</a>
    <a href="#">Categories</a>
    <a href="#" class="button">Write</a>
  </nav>
</template>

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
  margin-left: 3vw;
}

a.button {
  margin-right: 1.5rem;
  margin-left: calc(3vw - 0.5rem);
  border: 1px solid #ffffff;
  padding: 0.5rem 1rem;
  border-radius: 0.2rem;
}

a.button:hover {
  background: #ffffff;
  color: #0c343d;
  font-weight: 400;
}
</style>