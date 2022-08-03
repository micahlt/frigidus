<template>
  <main>
    <div class="header">
      <h1>Admin Panel</h1>
    </div>
    <div class="content">
      <div class="login" v-if="!isAuthed">
        <h3>Login</h3>
        <input
          type="password"
          name="password"
          v-model="password"
          placeholder="Admin password"
          @keyup.enter="logIn"
        /><br />
        <button @click="logIn">Sign In</button>
      </div>
      <div class="manager" v-else>
        <table>
          <thead>
            <th>ID</th>
            <th>Name</th>
            <th>URL</th>
            <th>Date Added</th>
            <th></th>
          </thead>
          <tbody>
            <tr>
              <td>{{ (items[items.length - 1]?.Id || 0) + 1 }}</td>
              <td>
                <input type="text" name="name" v-model="inputName" />
              </td>
              <td>
                <input type="url" name="url" v-model="inputURL" />
              </td>
              <td>{{ new Date().toLocaleDateString() }}</td>
              <td>
                <button @click="submitNew">Submit</button>
              </td>
            </tr>
            <tr v-for="item in items" :key="item.Id">
              <td>{{ item.Id }}</td>
              <td>{{ item.Name }}</td>
              <td>
                <a :href="item.Url" target="_blank"
                  >{{ item.Url.slice(0, 30) }}...</a
                >
              </td>
              <td>{{ new Date(item.DateAdded).toLocaleDateString() }}</td>
              <td>
                <button @click="deleteItem(item.Id)">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: "admin",
  data() {
    return {
      token: null,
      isAuthed: false,
      password: "",
      items: [],
      page: 1,
      inputURL: "",
      inputName: "",
    };
  },
  mounted() {
    this.token = localStorage.getItem("token");
    this.checkIsLoggedIn();
  },
  methods: {
    checkIsLoggedIn() {
      if (this.token) {
        this.isAuthed = true;
        fetch(`/api/get?page=${this.page}`)
          .then((res) => res.json())
          .then((data) => {
            this.items = [...this.items, ...data];
          });
      }
    },
    logIn() {
      fetch(`/api/auth`, {
        headers: {
          "X-Password": this.password,
        },
      })
        .then((res) => res.text())
        .then((data) => {
          if (data == "false") {
            alert("Try again.");
          } else {
            window.localStorage.setItem("token", data);
            this.isAuthed = true;
            this.token = data;
            this.checkIsLoggedIn();
          }
        });
    },
    submitNew() {
      fetch(
        `/api/create?name=${encodeURIComponent(
          this.inputName
        )}&url=${encodeURIComponent(this.inputURL)}`,
        {
          headers: {
            "X-Token": this.token,
          },
        }
      )
        .then((res) => res.text())
        .then((data) => {
          console.log("Data", data);
          if (data == "false") {
            alert("Try again.");
          } else {
            window.location.reload();
          }
        });
    },
    deleteItem(id) {
      fetch(`/api/delete?id=${id}`, {
        headers: {
          "X-Token": this.token,
        },
      })
        .then((res) => res.text())
        .then((data) => {
          if (data == false) {
            alert("Try again.");
          } else {
            window.location.reload();
          }
        });
    },
  },
};
</script>

<style scoped>
.manager {
  max-width: 100vw;
  overflow-y: auto;
  padding: 1rem;
}
.header {
  height: 20vh;
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
  height: 20vh;
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

.content {
  width: 100%;
  min-height: calc(80vh - 2rem);
  display: flex;
  align-items: center;
  justify-content: center;
}

.login {
  display: block;
  text-align: center;
  padding: 2rem;
  border: 1px solid #808080;
  border-radius: 0.2rem;
}

input[type="password"] {
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  border: 1px solid #808080;
  border-radius: 0.2rem;
  padding: 0.75em 1em;
}

input::placeholder {
  font-family: "Inter", sans-serif;
}

button {
  background-color: #ff3a3a;
  padding: 0.75em 1em;
  border: none;
  border-radius: 0.2rem;
  color: white;
  font-family: inherit;
  font-weight: 200;
  cursor: pointer;
}

table,
th,
td {
  border: 1px solid black;
  border-collapse: collapse;
}

th,
td {
  padding: 0.5rem;
}

td:last-child {
  text-align: center;
}

@media only screen and (max-width: 800px) {
  h1 {
    font-size: 1.75rem;
  }
}
</style>