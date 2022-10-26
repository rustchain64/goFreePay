<script setup>
import { Form, Field } from 'vee-validate';
import * as Yup from 'yup';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores';
import { useReferStore, useAlertStore } from '@/stores';
import { router } from '@/router';
import { reactive } from "vue";
const authStore = useAuthStore();
const { user } = storeToRefs(authStore);
const referralStore = useReferStore();
const { refferal } = storeToRefs(referralStore);
const alertStore = useAlertStore();
const route = useRoute();
const id = route.params.id;
const terms = reactive({});
let title = 'Add Referral';
let referral = null;
let isDisabled = true;
if (id) {
    // edit mode
    title = 'Edit User';
    ({ referral } = storeToRefs(referralStore));
    referralStore.getById(id);
}
const schema = Yup.object().shape({
    agentCode: Yup.string(),
    firstName: Yup.string()
        .required('First Name is required'),
    lastName: Yup.string()
        .required('Last Name is required'),
    phone: Yup.string()
        .required('Username is required'),
    email: Yup.string()
        .required('Username is required'),
});
async function onSubmit(values) {
    try {
        let message;
        if (referral) {
            await referralStore.update(referral.value.id, values)
            message = 'User updated';
        } else {
            await referralStore.register(values);
            message = 'User added';
        }
        //await router.push('/referrals');
        alertStore.success(message);
    } catch (error) {
        alertStore.error(error);
    }
    redirect_to_login();
}

</script>

<template>
   <div  class="card m-3">
        <h2 class="card-header">{{title}}</h2>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="yourName">Your Name</label>
        <input
          type="text"
          class="form-control"
          id="yourName"
          required
          v-model="tutorial.yourName"
          name="yourName"
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

      <div v-if="referralStore.loggedIn==null">
        <button @click="redirect_to_login" class="btn btn-success">Login</button>
      </div>
      
      <div v-if="referralStore.loggedIn!==null">
        <button @click="saveTutorial" class="btn btn-success">Refer Now</button>
      </div>
      
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newTutorial">Add</button>
    </div>
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
        yourName: "",
        title: "",
        description: "",
        published: false
      },
      submitted: false
    };
  },
  methods: {
    redirect_to_login(event) {
      console.log("COMMIT FORM VALUES TO STORE : ",event.target.value);
      //force a login in order to Submit Referral
      router.push('/account/login');
      // set loggedIn state
      let message;        
      message = 'User added';
      this.alertStore.success(message);
      this.referralStore.success(true);
      // commit form data
      this.referralStore.register(event);

    },
    saveTutorial(values) {         
          

      var data = {
        yourName: this.tutorial.yourName,
        title: this.tutorial.title,
        description: this.tutorial.description
      };

      DataService.create(data)
        .then(response => {
          this.tutorial.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    newTutorial() {
      this.submitted = false;
      this.tutorial = {};
    }
  }
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>