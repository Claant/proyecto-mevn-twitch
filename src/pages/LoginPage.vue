<template>
  <h3>Login {{ token }}</h3>
</template>

<script setup>
import { useUserStore } from 'src/stores/user-store';

//destructuracion
const {token} = useUserStore();
</script>
