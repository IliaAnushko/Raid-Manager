<script setup>
import AuthCard from '@/components/ui/AuthCard.vue';
import RegisterForm from '@/components/auth/RegisterForm.vue';
</script>

<template>
  <AuthCard title="Создание аккаунта" subtitle="Присоединяйтесь к управлению гильдией">
    <RegisterForm />

    <template #footer>
      <span>Уже есть аккаунт?</span>
      <router-link to="/login">Войти</router-link>
    </template>
  </AuthCard>
</template>