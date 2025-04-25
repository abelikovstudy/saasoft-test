<script setup lang="ts">
import Info from './icons/Info.vue'
</script>

<template>
  <div class="max-w-4xl mx-auto flex flex-col h-screen items-center justify-center">
    <div class="flex gap-x-8 mb-4 align-middle items-center">
      <h1 class="text-xl font-bold text-gray-800">Учетные записи</h1>
      <button class="bg-blue-500 text-white text-lg px-4 py-2 rounded hover:bg-blue-600">+</button>
    </div>

    <div class="flex items-center mb-4 bg-gray-100">
      <Info></Info>
      <p>Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;</p>
    </div>
    <div class="bg-white shadow rounded-lg overflow-hidden">
      <table class="w-full text-left">
      <thead>
        <tr class="bg-gray-200 text-gray-600">
            <th class="p-3">Метки</th>
            <th class="p-3">Тип записи</th>
            <th class="p-3">Поля</th>
            <th class="p-3">Пароль</th>
            <th class="p-3"></th>
        </tr>
      </thead>
      </table>
    </div>
  </div>
</template>

<style scoped>
</style>
