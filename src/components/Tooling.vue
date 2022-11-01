<script setup>
import referralCodeGenerator from 'referral-code-generator'

import { useAgentReferCodeStore } from '@/stores';

const agentReferStore = useAgentReferCodeStore();


</script>

<template>
    
            <h2>Admin Tools : Generate Referral Codes</h2>
            <div class="tool_actions">
                <h3>Generate Batch Code</h3>
                <h4>{{this.title}}</h4>
                <!-- <button @click="agentReferStore.generateReferralCode" class="btn btn-success">Generate</button> -->
                <button @click="generateCode" class="btn btn-primary">Generate Code</button>
                Code: {{this.agentCode}}
                <span><button @click="commitAgentCode" class="btn btn-success">Commit Code</button></span>
                <span>Commited Code: {{this.agentCode}}</span>
            </div>
           
            <div>Agent Referral Code Array length</div>
         
</template>

<script>
import AgentCodeDataService from "../services/AgentCodeDataService";

export default {
  name: "tooling-genrateAgentCode",
  data() {
    return {
        id: null,
        title: ' NO NO',
        agnetCode: '',      
    };
  },
  methods: {
    generateCode() {
        let newRefferalCode = referralCodeGenerator.alphaNumeric('uppercase', 5, 1);
        console.log("TOOLING GENERATED CODE,", newRefferalCode);
        this.agentCode = newRefferalCode;
        console.log("TOOLING GENERATED CODE,", this.agentCode);
    },
    commitAgentCode(values) {
      var data = {
        agentCode: this.agentCode,
      };
      console.log("SAVE THIS AGENT CODE ", this.agentCode)
      // call the create function POST with data
      AgentCodeDataService.create(data)
        .then(response => {
          //this.agentCode.id = response.data.id;
          console.log("RESPONSE .DATA.id : ", response.data.id);
          console.log("RESPONSE .DATA.agentCode : ", response.data.agentCode);
          this.agentCode = response.data.agentCode;
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });
    },    
  }
};
</script>

<style scoped>
@import '@/assets/base.css';
@import '@/assets/main.css';

.tool_actions_row {
    display: flex;
    flex-direction: column;
}
.tool_actions {
    display: flex;
    flex-direction: column;
}
.tool_actions button {
    width: 20vw;
    justify-content: center;
}
</style>

