<template>
  <!-- TutorialDataService methods:
       getAll()
       deleteAll()
       findByTitle()
  -->
  <div class="card m-3">
  <h4 class="card-header">Manage Referrals</h4>
  <div class="card-body">
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
        <h4>Referrals List</h4>
        <ul class="list-group">
          <li
            class="list-group-item"
            :class="{ active: index == currentIndex }"
            v-for="(tutorial, index) in tutorials"
            :key="index"
            @click="setActiveReferral(tutorial, index)"
          >
            {{ tutorial.referralsName }}
          </li>
        </ul>        
      </div>
      <div class="col-md-6">
        <div v-if="currentTutorial">
          <h4>Referral ???</h4>
          <div>
            <label><strong>Merchant Name:</strong></label>
            {{ currentTutorial.yourName }}
          </div>
          <div>
            <label><strong>Referral Name:</strong></label>
            {{ currentTutorial.referralsName }}
          </div>
          <div>
            <label><strong>Phone:</strong></label>
            {{ currentTutorial.phone }}
          </div>
          <div>
            <label><strong>Email:</strong></label>
            {{ currentTutorial.email }}
          </div>
          <div>
            <label><strong>Title or Code:</strong></label>
            {{ currentTutorial.title }}
          </div>
          <div>
            <label><strong>Notes:</strong></label>
            {{ currentTutorial.description }}
          </div>
          <div>
            <label><strong>Status:</strong></label>
            {{ currentTutorial.published ? "Published" : "Pending" }}
          </div>
          
          <router-link
            :to="{ name: 'Referral', params: { id: currentTutorial.id }}"
            class="badge badge-primary"
            >
            Edit
            </router-link>
        </div>

        <div v-else>
          <br />
          <p>Please click on a Referral...</p>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import DataService from "../services/DataService";

export default {
  name: "tutorials-list",
  data() {
    return {
      tutorials: [],
      currentTutorial: null,
      currentIndex: -1,
      title: "",
    };
  },
  methods: {
    retrieveTutorials() {
      DataService.getAll()
        .then((response) => {
          this.tutorials = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveTutorials();
      this.currentTutorial = null;
      this.currentIndex = -1;
    },

    setActiveReferral(tutorial, index) {
      this.currentTutorial = tutorial;
      this.currentIndex = tutorial ? index : -1;
    },

    removeAllTutorials() {
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
          this.tutorials = response.data;
          this.setActiveReferral(null);
          console.log("SEARCH TITLE DATA ",response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.retrieveTutorials();
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
