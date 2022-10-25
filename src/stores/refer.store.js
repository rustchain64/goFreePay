import { defineStore } from 'pinia'
import { fetchWrapper } from '@/helpers';
import { useAuthStore } from '@/stores';

const baseUrl = `${import.meta.env.VITE_API_URL}/referrals`;


export const useReferStore = defineStore({
    id: 'users',
    state: () => ({
        users: {},
    }),
  actions: {
    async register(refferal) {
        
        console.log("REGISTER REFERRAL:: ",refferal);
        //await fetchWrapper.post(`${baseUrl}/register`, user);
        this.users = {...refferal};
        console.log("REGISTER this.users,", this.users);
        //localStorage.setItem('referralAttributes', JSON.stringify(refferal));
    },
    async update(id, params) {
        console.log("UPDATE REFERRAL:: ",refferal);
        await fetchWrapper.put(`${baseUrl}/${id}`, params);

        // update stored user if the logged in user updated their own record
        const authStore = useAuthStore();
        if (id === authStore.user.id) {
            // update local storage
            const user = { ...authStore.user, ...params };
            localStorage.setItem('user', JSON.stringify(user));

            // update auth user in pinia state
            authStore.user = user;
        }
    },
    deleteTodo(itemID) {
    console.log("DELETE AN ITEM,", itemID);
    console.log("DELETE this.todoList,", this.todoList);
    this.todoList = this.todoList.filter((object) => {
        
        return object.id !== itemID;
        });
    },
  },
})



    //localStorage.setItem('referral', JSON.stringify(referral));

