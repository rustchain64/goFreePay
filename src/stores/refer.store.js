import { defineStore } from 'pinia'
import { fetchWrapper } from '@/helpers';
import { useAuthStore } from '@/stores';

//const baseUrl = `${import.meta.env.VITE_API_URL}/referrals`;


export const useReferStore = defineStore({
    id: 'referrals',
    state: () => ({
        users: {},
        loggedIn: null,
    }),
  actions: {
    success(message) {
        this.loggedIn = { message, type: 'alert-success' };
    },
    async register(refferal) {        
        console.log(">>>>>> REGISTER REFERRAL:: ",refferal);
        //await fetchWrapper.post(`${baseUrl}/register`, user);
        this.users = {...refferal};
        console.log("REGISTER this.users,", this.users);
        //localStorage.setItem('referralAttributes', JSON.stringify(refferal));
    },
    // async update(id, params) {
    //     console.log("UPDATE REFERRAL:: ",refferal);
    //     await fetchWrapper.put(`${baseUrl}/${id}`, params);

    //     // update stored user if the logged in user updated their own record
    //     const authStore = useAuthStore();
    //     if (id === authStore.user.id) {
    //         // update local storage
    //         const user = { ...authStore.user, ...params };
    //         localStorage.setItem('user', JSON.stringify(user));

    //         // update auth user in pinia state
    //         authStore.user = user;
    //     }
    // }
  },
})



    //localStorage.setItem('referral', JSON.stringify(referral));

