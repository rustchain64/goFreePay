<script setup>
import { storeToRefs } from 'pinia';
import { Agent_Nav, Alert } from '@/components';
import { useAuthStore } from '@/stores';
import Merchant_Nav from './components/Merchant_Nav.vue';

const authStore = useAuthStore();
//const { user } = storeToRefs(authStore);
</script>

<template>
    <div class="wrapper">
      <!-- <HelloWorld msg="You did it!" /> -->
      <nav v-show="authStore.user" class="navbar navbar-expand navbar-light bg-light">
        <img
          alt="GoFree logo"
          class="logo"
          src="@/assets/image/pie_io_clr_slgn_white.jpg"
          height="80"
        />
        <div class="navbar-nav">
            <RouterLink to="/agentDashboard" class="nav-item nav-link">Dashboard</RouterLink>
            <RouterLink to="/referrals" class="nav-link">Referrals</RouterLink>
            <RouterLink to="/users" class="nav-item nav-link">Users</RouterLink>
            <!-- <RouterLink to="/" class="navbar-brand">Dashboard</RouterLink> -->
            <!-- <RouterLink to="/list" class="nav-link">Referrals</RouterLink> -->
            <RouterLink to="/referral" class="nav-item nav-link">Referral</RouterLink>
            <RouterLink to="/add" class="nav-item nav-link">Add</RouterLink>
            <!-- <RouterLink to="/about">About</RouterLink> -->
            <!-- <RouterLink to="/login" class="nav-item nav-link">Sign in</RouterLink>
            <RouterLink to="/signup" class="nav-item nav-link">Sign up</RouterLink> -->
    
            <button @click="authStore.logout()" class="btn btn-link nav-item nav-link">Logout</button>
        </div>
      </nav>
        
        <div class="app-container" :class="authStore.user && 'bg-light'">
          <div class="container pt-4 pb-4">
              <router-view />
          </div>
          <!-- <Agent_Nav /> -->
      </div>
     
    </div>
 
  
</template>

<style scoped>
@import '@/assets/base.css';
@import '@/assets/main.css';
</style>

