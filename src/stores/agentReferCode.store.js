import { defineStore } from 'pinia'
import { fetchWrapper } from '@/helpers';
import { useAuthStore } from '@/stores';

//const baseUrl = `${import.meta.env.VITE_API_URL}/referrals`;


export const useAgentReferCodeStore = defineStore({
    id: 'agentReferralCodes',
    state: () => ({
        agentCodes: [],
    }),
  actions: {
    getAgentReferralCode() {
        return agentCodes;
    },
    getLength() {
        return agentCodes.length;
    },
    // generate 100 codes
    generateCodeBatch(refferal) {        
        this.users = {...refferal};
        console.log("REGISTER BACK UP DATA,", this.users);
    },
    clearAgentCodes() {        
        this.agentCodes = [];
        console.log("CLEARING OUT FORM VALUES,", this.users);
    }
  },
})



    //localStorage.setItem('referral', JSON.stringify(referral));

