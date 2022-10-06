<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="title">Title</label>
        <input
          type="text"
          class="form-control"
          id="title"
          required
          v-model="referral.title"
          name="title"
        />
      </div>

      <div class="form-group">
        <label for="description">Description</label>
        <input
          class="form-control"
          id="description"
          required
          v-model="referral.description"
          name="description"
        />
      </div>

      <button @click="saveReferral" class="btn btn-success">Submit</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newReferral">Add</button>
    </div>
  </div>
</template>

<script>
import DataService from "../services/DataService";

export default {
  name: "add-referral",
  data() {
    return {
      referral: {
        id: null,
        title: "",
        description: "",
        published: false,
      },
      submitted: false,
    };
  },
  methods: {
    saveReferral() {
      var data = {
        title: this.referral.title,
        description: this.referral.description,
      };

      DataService.create(data)
        .then((response) => {
          this.referral.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    newReferral() {
      this.submitted = false;
      this.referral = {};
    },
  },
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>
