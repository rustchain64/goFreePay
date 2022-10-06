<script setup>
import { RouterLink, RouterView } from "vue-router";
import HelloWorld from "./components/HelloWorld.vue";

import BarChart from "./components/charts/BarChart";
import { Nav, Alert } from '@/components';
import { useAuthStore } from '@/stores';

const authStore = useAuthStore();
</script>

<template>
  <header>
    <div class="wrapper">
      <!-- <HelloWorld msg="You did it!" /> -->
      <nav>
        <img
          alt="GoFree logo"
          class="logo"
          src="@/assets/go_free.png"
          width="125"
          height="125"
        />
        <RouterLink to="/" class="navbar-brand">Dashboard</RouterLink>
        <RouterLink to="/list" class="nav-link">Referrals</RouterLink>
        <RouterLink to="/referral">Referral</RouterLink>
        <RouterLink to="/add">Add</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <!-- <RouterLink to="/login">Sign in</RouterLink>
        <RouterLink to="/signup">Sign up</RouterLink> -->
        <div class="app-container" :class="authStore.user && 'bg-light'">
          <Nav />
          <Alert />
          <div class="container pt-4 pb-4">
              <router-view />
          </div>
      </div>
      </nav>
      <div>
        <BarChart />
      </div>
    </div>
  </header>
  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
