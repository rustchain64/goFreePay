<template>
  <!-- DataService methods:
        get()
        update()
        delete()
        <div v-if="currentReferral" class="edit-form">
 -->
  <div  class="card m-3">
    <h4 class="card-header">Merchant Registration</h4>
    <div class="card-body">
      <div class="list row">
        <div class="col-md-8">
    <form>
      <div class="form-group" id="flex_row">
        <label for="title">Your Name</label>
        <input
          type="text"
          class="form-control"
          id="yourName"
          v-model="currentReferral.yourName"
        />
        <label for="title">Agent Code</label>
        <input
          type="text"
          class="form-control"
          id="yourName"
          v-model="currentReferral.agentCode"
        />
      </div>
      <div class="form-group">
        <label for="title">Referrals Name</label>
        <input
          type="text"
          class="form-control"
          id="referralName"
          v-model="currentReferral.referralsName"
        />
      </div>
      <div class="form-group">
        <label for="phone">Phone</label>
        <input
          type="text"
          class="form-control"
          id="phone"
          v-model="currentReferral.phone"
        />
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input
          type="text"
          class="form-control"
          id="email"
          v-model="currentReferral.email"
        />
      </div>
      <div class="form-group">
        <label for="ss">SS #</label>
        <input
          type="text"
          class="form-control"
          id="ss#"
          v-model="currentReferral.phone"
        />
      </div>
      <div class="form-group">
        <label for="bankName">Bank Name</label>
        <input
          type="text"
          class="form-control"
          id="bankName"
          v-model="currentReferral.bankName"
        />
      </div>
      <div class="form-group">
        <label for="routingNumber">Routing Number</label>
        <input
          type="text"
          class="form-control"
          id="routingNumber"
          v-model="currentReferral.routingNumber"
        />
      </div>
      <div class="form-group">
        <label for="accountNumber">Account Number</label>
        <input
          type="text"
          class="form-control"
          id="accountNumber"
          v-model="currentReferral.accountNumber"
        />
      </div>
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
  </div>
  </div>
  

  
    <!-- <button
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
    </button> -->

    <button
      class="badge badge-primary mr-2"
      v-if="currentReferral.published"
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
      currentReferral: "",
      message: "",
    };
  },
  methods: {
    getTutorial(id) {
      TutorialDataService.get(id)
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

      TutorialDataService.update(this.currentReferral.id, data)
        .then((response) => {
          console.log(response.data);
          this.currentReferral.published = status;
          this.message = "The status was updated successfully!";
        })
        .catch((e) => {
          console.log(e);
        });
    },

    updateTutorial() {
      TutorialDataService.update(this.currentReferral.id, this.currentReferral)
        .then((response) => {
          console.log(response.data);
          this.message = "The tutorial was updated successfully!";
        })
        .catch((e) => {
          console.log(e);
        });
    },

    deleteTutorial() {
      TutorialDataService.delete(this.currentReferral.id)
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

#flex_row {
  display: flex;
}
</style>
