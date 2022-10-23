<script setup>
import { Form, Field } from 'vee-validate';
import * as Yup from 'yup';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';

import { useUsersStore, useAlertStore } from '@/stores';
import { router } from '@/router';

const usersStore = useUsersStore();
const alertStore = useAlertStore();
const route = useRoute();
const id = route.params.id;

let title = 'Add User';
let user = null;
if (id) {
    // edit mode
    title = 'Edit User';
    ({ user } = storeToRefs(usersStore));
    usersStore.getById(id);
}

const schema = Yup.object().shape({
    agentCode: Yup.string(),
    firstName: Yup.string()
        .required('First Name is required'),
    lastName: Yup.string()
        .required('Last Name is required'),
    username: Yup.string()
        .required('Username is required'),
    password: Yup.string()
        .transform(x => x === '' ? undefined : x)
        // password optional in edit mode
        .concat(user ? null : Yup.string().required('Password is required'))
        .min(6, 'Password must be at least 6 characters')
});

async function onSubmit(values) {
    console.log("ON SUBMIT USER VALUES AS VALUSES ", );
    try {
        let message;
        if (user) {
            await usersStore.update(user.value.id, values)
            message = 'User updated';
        } else {
            await usersStore.register(values);
            message = 'User added';
        }
        await router.push('/users');
        alertStore.success(message);
    } catch (error) {
        alertStore.error(error);
    }
}
</script>

<template>
    <div  class="card m-3">
        <h2 class="card-header"><h2>{{title}}</h2></h2>
    
    <div class="card-body">
    
    <template v-if="!(user?.loading || user?.error)">
        <Form @submit="onSubmit" :validation-schema="schema" :initial-values="user" v-slot="{ errors, isSubmitting }">
            <div class="form-row">
                <div class="form-group col">
                    <label>Persona Type</label><br>

                    <input  type="radio" id="zero" value="Zero" v-model="picked" />
                    <label for="zero" class="persona_label">Admin</label>

                    <input type="radio" id="one" value="One" v-model="picked" />
                    <label for="one" class="persona_label">Agent</label>

                    <input type="radio" id="two" value="Two" v-model="picked" />
                    <label for="two" class="persona_label">Merchant</label>

                    <div v-if="this.picked == 'Two'">
                        <Field name="persona" type="hidden" value="Merchant" class="form-control" :class="{ 'is-invalid': errors.firstName }" />
                    </div>
                    <div v-else-if="this.picked == 'Zero'">
                        <Field name="persona" type="hidden" value="Admin" class="form-control" :class="{ 'is-invalid': errors.firstName }" />
                    </div>
                    <div v-else>
                        <Field name="persona" type="hidden" value="Agent" class="form-control" :class="{ 'is-invalid': errors.firstName }" />
                    </div>
                </div>
                <div class="form-group col" v-if="this.picked == 'One'">
                    <label>Agent Code</label> 
                    <Field name="agentCode" type="text" class="form-control" :class="{ 'is-invalid': errors.agentCode }" />
                    <div class="invalid-feedback">{{ errors.agentCode }}</div>
                </div>
                <div class="form-group col" v-else>
                    <label><span .class="code_disabled">Agent Code</span></label> 
                    <Field name="agentCode" type="text" class="form-control" :class="{ 'is-invalid': errors.agentCode }" :disabled="1" />
                    
                </div>
            </div>
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
                    <label>Username</label>
                    <Field name="username" type="text" class="form-control" :class="{ 'is-invalid': errors.username }" />
                    <div class="invalid-feedback">{{ errors.username }}</div>
                </div>
                <div class="form-group col">
                    <label>
                        Password
                        <em v-if="user">(Leave blank to keep the same password)</em>
                    </label>
                    <Field name="password" type="password" class="form-control" :class="{ 'is-invalid': errors.password }" />
                    <div class="invalid-feedback">{{ errors.password }}</div>
                </div>
            </div>
            <div class="form-group">
                <button class="btn btn-primary" :disabled="isSubmitting">
                    <span v-show="isSubmitting" class="spinner-border spinner-border-sm mr-1"></span>
                    Save
                </button>
                <router-link to="/users" class="btn btn-link">Cancel</router-link>
            </div>
        </Form>
    </template>
    </div>
    </div>
    <template v-if="user?.loading">
        <div class="text-center m-5">
            <span class="spinner-border spinner-border-lg align-center"></span>
        </div>
    </template>
    <template v-if="user?.error">
        <div class="text-center m-5">
            <div class="text-danger">Error loading user: {{user.error}}</div>
        </div>
    </template>
</template>

<script>    
export default {
  name: "add-user",
  data: () => ({
    picked: ''
  }),
  methods: {
		setPicked(event) {
        this.picked = event.target.value;
    	console.log(event.target.value)
    }
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
</style>
