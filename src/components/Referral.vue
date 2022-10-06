<template>
  <!-- DataService methods:
        get()
        update()
        delete()
 -->
  <div v-if="currentReferral" class="edit-form">
    <h4>REFERRAL</h4>
    <form>
      <div class="form-group">
        <label for="title">Title</label>
        <input
          type="text"
          class="form-control"
          id="title"
          v-model="currentReferral.title"
        />
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <input
          type="text"
          class="form-control"
          id="description"
          v-model="currentReferral.description"
        />
      </div>

      <div class="form-group">
        <label><strong>Status:</strong></label>
        {{ currentReferral.published ? "Published" : "Pending" }}
      </div>
    </form>

    <button
      class="badge badge-primary mr-2"
      v-if="currentReferral.published"
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
    </button>

    <button class="badge badge-danger mr-2" @click="deleteReferral">
      Delete
    </button>

    <button type="submit" class="badge badge-success" @click="updateReferral">
      Update
    </button>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Please click on a Referral...</p>
  </div>
</template>

<script>
import DataService from "../services/DataService";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "tutorial",
  data() {
    return {
      currentReferral: null,
      message: "",
    };
  },
  methods: {
    getReferral(id) {
      DataService.get(id)
        .then((response) => {
          this.currentReferral = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    updatePublished(status) {
      var data = {
        id: this.currentReferral.id,
        title: this.currentReferral.title,
        description: this.currentReferral.description,
        published: status,
      };

      DataService.update(this.currentReferral.id, data)
        .then((response) => {
          console.log(response.data);
          this.currentReferral.published = status;
          this.message = "The status was updated successfully!";
        })
        .catch((e) => {
          console.log(e);
        });
    },

    updateReferral() {
      DataService.update(this.currentReferral.id, this.currentReferral)
        .then((response) => {
          console.log(response.data);
          this.message = "The referral was updated successfully!";
        })
        .catch((e) => {
          console.log(e);
        });
    },

    deleteReferral() {
      DataService.delete(this.currentReferral.id)
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
    this.getReferral(this.$route.params.id);
  },
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
