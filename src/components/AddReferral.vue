<template>
  <div class="card m-3">
    <span class="card-header">
        <strong class="who">Add Referral: Who would you like to refer?</strong>
      <span class="flex-header">
        <label for="agentsCode" >Enter Agents Code</label>
          <input
            type="text"          
            id="agentsCode"          
            placeholder="CCI0276"
            required
            v-model="referral.agentsCode"
            name="agentsCode"
          />
      </span>
        
      
    </span>
    <div class="card-body">
      <!-- <div class="submit-form"> -->
        <div v-if="!submitted">
          <div class="form-group">
            <label for="yourName">Your Name</label>
            <input
              type="text"
              class="form-control"
              id="yourName"
              required
              v-model="referral.yourName"
              name="yourName"
            />
          </div>

          <div class="form-group">
            <label for="referralsName">Referrals Name</label>
            <input
              type="text"
              class="form-control"
              id="referralsName"
              required
              v-model="referral.referralsName"
              name="referralsName"
            />
          </div>

          <div class="form-group">
            <label for="phone">Phone</label>
            <input
              type="text"
              class="form-control"
              id="phone"
              required
              v-model="referral.phone"
              name="phone"
            />
          </div>

          <div class="form-group">
            <label for="email">Email</label>
            <input
              type="text"
              class="form-control"
              id="email"
              required
              v-model="referral.email"
              name="email"
            />
          </div>

          <div class="form-group">
            <label for="title">Title</label>
            <input
              type="text"
              class="form-control"
              id="title"
              required
              v-model="tutorial.title"
              name="title"
            />
          </div>

          <div class="form-group">
            <label for="description">Description</label>
            <input
              class="form-control"
              id="description"
              required
              v-model="tutorial.description"
              name="description"
            />
          </div>

          <button @click="saveReferral" class="btn btn-success">Refer Now</button>
        </div>

        <div v-else>
          <h4>You submitted successfully!</h4>
          <!-- <h4>{{this.referral.yourName}}Thanks!</h4> -->
          <!-- need to call for Agents name from table with agents code -->
          <!-- <h4>{{this.referral.referralsName}}Will be contacted by Your Agent: {{this.referral.agentsName}}!</h4> -->
          <button class="btn btn-success" @click="newReferral">Add Another Referral</button>
        </div>
      <!-- </div> -->
    </div>
  </div>
</template>

<script>
import DataService from "../services/DataService";

export default {
  name: "add-tutorial",
  data() {
    return {
      tutorial: {
        id: null,
        title: "",
        description: "",
        published: false,
      },
      referral: {
        id: null,
        yourName: "",
        referralsName: "",
        agentsName: "",
        agentsCode: "",        
        phone: "",
        email: "",
        published: false,
      },
      submitted: false,
    };
  },
  methods: {
    saveReferral() {
      var data = {
        yourName: this.referral.yourName,
        referralsName: this.referral.referralsName,
        agentsName: this.referral.agentsName,
        agentsCode: this.referral.agentsCode,
        phone: this.referral.phone,
        email: this.referral.email,
        title: this.tutorial.title,
        description: this.tutorial.description,
      };

      DataService.create(data)
        .then((response) => {
          this.tutorial.id = response.data.id;
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
      this.tutorial = {};
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

.flex-header {
  float:right;
  flex-direction: row;
}
.flex-header,label {
  font-weight: bold;
  margin-right: 15px;
}

.who {
  font-size: 1.3rem;
}
</style>
