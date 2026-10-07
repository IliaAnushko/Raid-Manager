<script setup>
import AuthCard from '@/components/ui/AuthCard.vue';
import LoginForm from '@/components/auth/LoginForm.vue';
</script>

<template>
  <AuthCard title="Вход в систему" subtitle="Управление составом и осадными событиями">
    <LoginForm />

    <template #footer>
      <span>Еще нет аккаунта?</span>
      <router-link to="/register">Зарегистрироваться</router-link>
    </template>
  </AuthCard>
</template>