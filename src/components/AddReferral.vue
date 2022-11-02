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
let title = 'Who would you like to refer?';
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
    yourName: Yup.string()
        .required('First Name is required'),
    refferlName: Yup.string()
        .required('Last Name is required'),
    title: Yup.string()
        .required('Username is required'),
    description: Yup.string()
        .required('Username is required'),
});
</script>

<template>
  <div class="bg"></div>
  <div class="bg bg2"></div>
  <div class="bg bg3"></div>
  <h2 class="card-header" id="header_bg">{{title}}</h2>
   <div id="opaque_bg">
    
  <div class="submit-form" id="form_bg">
    <div v-if="!submitted">
      <Form @submit="onSubmit" :validation-schema="schema" :initial-values="this.referralStore.users" v-slot="{ errors, isSubmitting }">
        <div class="form-row">
            <div class="form-group col">
                <label>Your Name</label>
                <Field name="yourName" type="text" v-model="tutorial.yourName" class="form-control" :class="{ 'is-invalid': errors.yourName }" />
                <div class="invalid-feedback">{{ errors.yourName }}</div>
            </div>
            <div class="form-group col">
                <label>Referral Name</label>
                <Field name="referralName" type="text" v-model="tutorial.referralName" class="form-control" :class="{ 'is-invalid': errors.referralName }" />
                <div class="invalid-feedback">{{ errors.referralName }}</div>
            </div>
        </div>
        <div class="form-row">
            <div class="form-group col">
                <label>Agent Name</label>
                <Field name="agentName" type="text" v-model="tutorial.agentName" class="form-control" :class="{ 'is-invalid': errors.agentName }" />
                <div class="invalid-feedback">{{ errors.agentName }}</div>
            </div>
            <div class="form-group col">
                <label>Agent Code</label>
                <Field name="agentCode" type="text" v-model="tutorial.agentCode" class="form-control" :class="{ 'is-invalid': errors.agentCode }" />
                <div class="invalid-feedback">{{ errors.agentCode }}</div>
            </div>
        </div>
        <div class="form-row">
            <div class="form-group col">
                <label>Business Name</label>
                <Field name="agentName" type="text" v-model="tutorial.buinsessName" class="form-control" :class="{ 'is-invalid': errors.agentName }" />
                <div class="invalid-feedback">{{ errors.agentName }}</div>
            </div>
            <div class="form-group col">
                <label>Phone</label>
                <Field name="agentCode" type="text" v-model="tutorial.phone" class="form-control" :class="{ 'is-invalid': errors.agentCode }" />
                <div class="invalid-feedback">{{ errors.agentCode }}</div>
            </div>
        </div>
        <div class="form-row">
            <div class="form-group col">
                <label>Note</label>
                <Field name="title" type="text" v-model="tutorial.title" class="form-control" :class="{ 'is-invalid': errors.title }" />
                <div class="invalid-feedback">{{ errors.title }}</div>
            </div>
            <div class="form-group col">
                <label>Description</label>
                <Field name="description" type="text" v-model="tutorial.description" class="form-control" :class="{ 'is-invalid': errors.description }" />
                <div class="invalid-feedback">{{ errors.description }}</div>
            </div>
        </div>

        <div v-if="referralStore.loggedIn==null">
          <button @click="redirect_to_login" class="btn btn-success" id="login_button">Login</button>
        </div>
        
        <div v-if="referralStore.loggedIn!==null">
          <button @click="saveTutorial" class="btn btn-success">Refer Now</button>
        </div>
      </Form>
      
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
        referralName: "",
        agentName: "",
        agentCode: "",
        buinsessName: "",
        phone: "",
        title: "",
        description: "",
        published: false
      },
      submitted: false
    };
  },
  mounted() {
    let formValues = this.referralStore.users
    console.log("FORMS VALUES formValues : ", formValues);
  },
  methods: {
    redirect_to_login(event) {
      console.log("COMMIT FORM VALUES TO STORE v-model : ",this.tutorial);
      //force a login in order to Submit Referral
      router.push('/account/login');
      // set loggedIn state
      let message;        
      message = 'User added';
      this.alertStore.success(message);
      this.referralStore.success(true);
      // commit form data
      this.referralStore.register(this.tutorial);

    },
    saveTutorial(values) {
      var data = {
        yourName: this.referralStore.users.yourName,
        referralName: this.referralStore.users.referralName,
        referralName: this.referralStore.users.referralName,
        agentName: this.referralStore.users.agentName,
        agentCode: this.referralStore.users.agentCode,
        buinsessName: this.referralStore.buinsessName,
        phone: this.referralStore.phone,
        title: this.referralStore.users.title,
        description: this.referralStore.users.description
      };
      // call the create function POST with data
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
      this.referralStore.clear();
    }
  }
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
#login_button {
  margin-bottom: 7%;
}
#opaque_bg {
  background-color: white;
  opacity: 0.6;
}
#form_bg {
  background-color: white;
  opacity: 0.6;
}
#header_bg {
  background-color: whitesmoke;
  opacity: 0.9;
}
label {
  opacity: 1.0;
}
.bg {
    animation:slide 3s ease-in-out infinite alternate;
    background-image: linear-gradient(-60deg, #6c3 50%, #09f 50%);
    bottom:0;
    left:-50%;
    opacity:.5;
    position:fixed;
    right:-50%;
    top:0;
    z-index:-1;
}
 
.bg2 {
    animation-direction:alternate-reverse;
    animation-duration:2s;
}
 
.bg3 {
    animation-duration:3s;
}
 
.content {
    background-color:rgba(255,255,255,.8);
    border-radius:.25em;
    box-shadow:0 0 .25em rgba(0,0,0,.25);
    box-sizing:border-box;
    left:50%;
    padding:10vmin;
    position:fixed;
    text-align:center;
    top:50%;
    transform:translate(-50%, -50%);
}
 
h1 {
    font-family:monospace;
}
 
@keyframes slide {
    0% {
        transform:translateX(-25%);
    }
 
    100% {
        transform:translateX(25%);
    }
}
</style>