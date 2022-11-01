import { defineStore } from 'pinia'
import { fetchWrapper } from '@/helpers';
import { useAuthStore } from '@/stores';
import referralCodeGenerator from 'referral-code-generator'

//const baseUrl = `${import.meta.env.VITE_API_URL}/referrals`;


export const useAgentReferCodeStore = defineStore({
    id: 'agentReferralCodes',
    state: () => ({
        agentCodes: [],
    }),
  actions: {
    getAgentReferralCode() {
        console.log("GET AGENT CODE:: ,", this.agentCodes);

        return this.agentCodes.length;
    },
    getLength() {
        console.log("get Length,", this.agentCodes.length);

        return {code: this.agentCodes};
    },
    // generate 100 codes
    generateReferralCode() {        
        let newRefferalCode = referralCodeGenerator.alphaNumeric('uppercase', 5, 1);
        console.log("CODE,", newRefferalCode);
        this.agentCodes.push(newRefferalCode);
        console.log("return the Generated Code,", this.agentCodes);
        console.log("length of  agentCodes Array,", this.agentCodes.length);
        console.log("First Code of  agentCodes Array,", this.agentCodes[0]);
    },
    clearAgentCodes() {        
        this.agentCodes = [];
        console.log("CLEARING agentCodes,", this.agentCodes);
    }
  },
})



    //localStorage.setItem('referral', JSON.stringify(referral));

