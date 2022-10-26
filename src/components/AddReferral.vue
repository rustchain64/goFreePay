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

function redirect_to_login() {
    //this.terms = false;
    router.push('/account/login');
    
    referralStore.success(true);
}
</script>

<template>
    <div  class="card m-3">
        <h2 class="card-header"><h2>{{title}}</h2></h2>
    
    <div class="card-body">
    <div v-if="!submitted">
    <template v-if="!(referral?.loading || referral?.error)">
        <Form @submit="onSubmit" :validation-schema="schema" :initial-values="referralStore.users" v-slot="{ errors, isSubmitting }">
            <div class="form-row">
                <div class="form-group col">
                    <label>First Name</label>
                    <Field name="firstName" type="text" class="form-control" :class="{ 'is-invalid': errors.firstName }" />
                    <div class="invalid-feedback">{{ errors.firstName }}</div>
                </div>
                <div class="form-group col">
                    <label>Last Name</label>
                    <Field name="lastName" type="text" class="form-control" :class="{ 'is-invalid': errors.lastName }" />
                    <div class="invalid-feedback">{{ errors.lastName }}</div>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col">
                    <label>Agent Name</label>
                    <Field name="agentName" type="text" class="form-control" :class="{ 'is-invalid': errors.firstName }" />
                    <div class="invalid-feedback">{{ errors.firstName }}</div>
                </div>
                <div class="form-group col">
                    <label>Agent Code</label>
                    <Field name="lastName" type="text" class="form-control" :class="{ 'is-invalid': errors.lastName }" />
                    <div class="invalid-feedback">{{ errors.lastName }}</div>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col">
                    <label>Phone</label>
                    <Field name="phone" type="text" class="form-control" :class="{ 'is-invalid': errors.phone }" />
                    <div class="invalid-feedback">{{ errors.phone }}</div>
                </div>
                <div class="form-group col">
                    <label>Email</label>
                    <Field name="email" type="text" class="form-control" :class="{ 'is-invalid': errors.email }" />
                    <div class="invalid-feedback">{{ errors.email }}</div>
                </div>
            </div>
            <div class="form-group">
            <label for="title">Notes</label>
            <Field name="title" type="text" class="form-control" :class="{ 'is-invalid': errors.title }" />

          </div>

          <div class="form-group">
            <label for="description">Description</label>
            <Field name="description" type="text" class="form-control" :class="{ 'is-invalid': errors.description }" />

          </div>
            <div class="form-group">
              <div class="refer_login">
                <div v-if="referralStore.loggedIn==null">
                <button class="btn btn-success" id="spread-right" :disabled="isSubmitting">
                    <span v-show="isSubmitting" class="spinner-border spinner-border-sm mr-1"></span>
                    Login
                </button>
                </div>
                <div v-if="referralStore.loggedIn!==null">{{referralStore.loggedIn}}Show me</div>
                <!-- <button @click="redirect_to_login" class="btn btn-success spread">Login</button> -->
                <button @click="saveReferral" class="btn btn-success" id="spread-left" >Refer Now</button>          
                
              </div>
                <!-- <router-link to="/referral" class="btn btn-link">Cancel</router-link> -->
            </div>
        </Form>
    </template>
    </div>
    <div v-else>
      <h4>You submitted successfully!</h4>
      <!-- <h4>{{this.referral.yourName}}Thanks!</h4> -->
      <!-- need to call for Agents name from table with agents code -->
      <!-- <h4>{{this.referral.referralsName}}Will be contacted by Your Agent: {{this.referral.agentsName}}!</h4> -->
      <button class="btn btn-success" @click="newReferral">Add Another Referral</button>
    </div>


    </div>
    </div>
    <template v-if="referral?.loading">
        <div class="text-center m-5">
            <span class="spinner-border spinner-border-lg align-center"></span>
        </div>
    </template>
    <template v-if="referral?.error">
        <div class="text-center m-5">
            <div class="text-danger">Error loading referral: {{referral.error}}</div>
        </div>
    </template>
</template>

<script>    
import DataService from "../services/DataService";

export default {
  name: "add-referral",
  data: () => ({
    terms: false
  }),
  methods: { 
    isDisabled: function(){
    	return !this.terms;
    },
    saveReferral() {
      if(useAuthStore.user){
        console.log('THERE IS A USER. login ', authStore.user)
      }
      // if(this.login==false){
      //   console.log('login is false')
      // }
      // if(!useAuthStore.user){
      //   console.log('THERE IS NO USER,Z')
      // } 
      // if(this.login==true) {
      //   console.log('THERE IS A SUER .LOGIN');
      //console.log("After login, SAVE REFERRAL ", this.authStore.user);
      var data = {
        yourName: this.referral.yourName,
        referralsName: this.referral.referralsName,
        agentsName: this.referral.agentsName,
        agentsCode: this.referral.agentsCode,
        phone: this.referral.phone,
        email: this.referral.email,
        title: this.referral.title,
        description: this.referral.description,
      };

      DataService.create(data)
        .then((response) => {
         // this.tutorial.id = response.data.id;
          this.referral.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch((e) => {
          console.log(e);
        });
      // } else {
      //   console.log("STOP YOU NEED TO LOGIN FIRST");
      // }
    },
  }, 
};
</script>

<style scoped>
.persona_label {
    margin-right: 5%;
    margin-left: 1%;
  }

  .code_disabled {
    color: silver;
  }

#spread-right {
  margin-right: 10px;
}
#spread-left {
  margin-right: 10px;
}
</style>
