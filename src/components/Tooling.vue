<script setup>
import { useAgentReferCodeStore } from '@/stores';

const agentReferStore = useAgentReferCodeStore();
</script>

<template>
    
            <h2>Admin Tools : Generate Referral Codes</h2>
            <div>
                <h3>Generate Batch Code</h3><button>Generate</button>
            </div>
           
            <dvi>Agent Referral Code Array length {{agentReferStore.getLength}}</dvi>
         
</template>

<style scoped>
@import '@/assets/base.css';
@import '@/assets/main.css';

</style>

