<template>
  <!-- TutorialDataService methods:
        get()
        update()
        delete()
        <div v-if="currentTutorial" class="edit-form">
 -->
  <div  class="card m-3">
    <h4 class="card-header">Update and Edit Referral</h4>
    <div class="card-body">
      <div class="list row">
        <div class="col-md-8">
    <form>
      <div class="form-group">
        <label for="title">Your Name</label>
        <input
          type="text"
          class="form-control"
          id="title"
          v-model="currentTutorial.yourName"
        />
      </div>
      <div class="form-group">
        <label for="title">Referrals Name</label>
        <input
          type="text"
          class="form-control"
          id="title"
          v-model="currentTutorial.referralsName"
        />
      </div>
      <div class="form-group">
        <label for="title">Phone</label>
        <input
          type="text"
          class="form-control"
          id="title"
          v-model="currentTutorial.phone"
        />
      </div>
      <div class="form-group">
        <label for="title">Email</label>
        <input
          type="text"
          class="form-control"
          id="title"
          v-model="currentTutorial.email"
        />
      </div>
      <div class="form-group">
        <label for="title">Title</label>
        <input
          type="text"
          class="form-control"
          id="title"
          v-model="currentTutorial.title"
        />
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <input
          type="text"
          class="form-control"
          id="description"
          v-model="currentTutorial.description"
        />
      </div>

      <div class="form-group">
        <label><strong>Status:</strong></label>
        {{ currentTutorial.published ? "Published" : "Pending" }}
      </div>
    </form>
  </div>
  </div>
  

  
    <!-- <button
      class="badge badge-primary mr-2"
      v-if="currentTutorial.published"
      @click="updatePublished(false)"
    >
      UnPublish
    </button>
    <button
      v-else
      class="badge badge-primary mr-2"
      @click="updatePublished(true)"
    >
      Publish
    </button> -->

    <button
      class="badge badge-primary mr-2"
      v-if="currentTutorial.published"
      @click="updatePublished(false)"
    >
      Is Active
    </button>
    <button
      v-else
      class="badge badge-primary mr-2"
      @click="updatePublished(true)"
    >
      Not Active
    </button>

    <button class="badge badge-danger mr-2" @click="deleteTutorial">
      Delete
    </button>

    <button type="submit" class="badge badge-success" @click="updateTutorial">
      Update
    </button>
    <p>{{ message }}</p>
  </div>
</div>
</template>

<script>
import TutorialDataService from "../services/DataService";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "referral",
  data() {
    return {
      currentTutorial: "",
      message: "",
    };
  },
  methods: {
    getTutorial(id) {
      TutorialDataService.get(id)
        .then((response) => {
          this.currentTutorial = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    updatePublished(status) {
      var data = {
        id: this.currentTutorial.id,
        title: this.currentTutorial.title,
        description: this.currentTutorial.description,
        published: status,
      };

      TutorialDataService.update(this.currentTutorial.id, data)
        .then((response) => {
          console.log(response.data);
          this.currentTutorial.published = status;
          this.message = "The status was updated successfully!";
        })
        .catch((e) => {
          console.log(e);
        });
    },

    updateTutorial() {
      TutorialDataService.update(this.currentTutorial.id, this.currentTutorial)
        .then((response) => {
          console.log(response.data);
          this.message = "The tutorial was updated successfully!";
        })
        .catch((e) => {
          console.log(e);
        });
    },

    deleteTutorial() {
      TutorialDataService.delete(this.currentTutorial.id)
        .then((response) => {
          console.log(response.data);
          this.$router.push({ name: "tutorials" });
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.message = "";
    this.getTutorial(this.$route.params.id);
  },
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
