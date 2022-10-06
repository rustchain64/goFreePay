<template>
  <!-- DataService methods:
       getAll()
       deleteAll()
       findByTitle()
  -->
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input
          type="text"
          class="form-control"
          placeholder="Search by title"
          v-model="title"
        />
        <div class="input-group-append">
          <button
            class="btn btn-outline-secondary"
            type="button"
            @click="searchTitle"
          >
            Search
          </button>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <h4>Referral List</h4>
      <ul class="list-group">
        <li
          class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(referral, index) in referrals"
          :key="index"
          @click="setActiveReferral(referrals, index)"
        >
          {{ referrals.title }}
        </li>
      </ul>

      <button class="m-3 btn btn-sm btn-danger" @click="removeAllReferrals">
        Remove All
      </button>
    </div>
    <div class="col-md-6">
      <div v-if="currentReferral">
        <h4>Referral</h4>
        <div>
          <label><strong>Title:</strong></label> {{ currentReferral.title }}
        </div>
        <div>
          <label><strong>Description:</strong></label>
          {{ currentReferral.description }}
        </div>
        <div>
          <label><strong>Status:</strong></label>
          {{ currentReferral.published ? "Published" : "Pending" }}
        </div>

        <router-link
          :to="'/referrals/' + currentReferral.id"
          class="badge badge-warning"
          >Edit</router-link
        >
      </div>
      <div v-else>
        <br />
        <p>Please click on a Referral...</p>
      </div>
    </div>
  </div>
</template>

<script>
import DataService from "../services/DataService";

export default {
  name: "referrals-list",
  data() {
    return {
      referrals: [],
      currentReferral: null,
      currentIndex: -1,
      title: "",
    };
  },
  methods: {
    retrieveReferrals() {
      DataService.getAll()
        .then((response) => {
          this.referrals = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveReferrals();
      this.currentReferral = null;
      this.currentIndex = -1;
    },

    setActiveReferral(tutorial, index) {
      this.currentReferral = tutorial;
      this.currentIndex = tutorial ? index : -1;
    },

    removeAllReferrals() {
      DataService.deleteAll()
        .then((response) => {
          console.log(response.data);
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    searchTitle() {
      DataService.findByTitle(this.title)
        .then((response) => {
          this.referrals = response.data;
          this.setActiveReferral(null);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.retrieveReferrals();
  },
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>
