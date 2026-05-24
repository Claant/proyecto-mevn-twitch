<template>
  <q-page padding>
    <q-btn @click="access">Ingresar</q-btn>
  </q-page>
</template>


<script setup>
import { api } from 'src/boot/axios'
const access = async () => {
  try {
    const res = await api.post('http://localhost:5000/api/v1/auth/login', {
      email: 'tono@alumno.com',
      password: '123123',
    })
    console.log(res.data)
  } catch (error) {
    console.log(error)
  }
}
</script>



