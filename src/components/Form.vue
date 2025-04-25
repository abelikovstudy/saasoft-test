<script setup lang="ts">
import InfoIcon from './icons/InfoIcon.vue'
import DeleteIcon from './icons/DeleteIcon.vue'
import {defineStore} from 'pinia'

</script>

<template>
  <div class="max-w-4xl mx-auto flex flex-col h-screen items-center justify-center">
    <div class="flex gap-x-8 mb-4 align-middle items-center">
      <h1 class="text-xl font-bold text-gray-800">Учетные записи</h1>
      <button class="bg-blue-500 text-white text-lg px-4 py-2 rounded hover:bg-blue-600">+</button>
    </div>

    <div class="flex items-center mb-4 bg-gray-100">
      <InfoIcon></InfoIcon>
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
        <tbody>
          <tr>
            <td class="p-3">
                <input type="text" value="XXX" class="border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500" maxlength="50">
            </td>
            <td class="p-3">
                <select class="border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Локальная</option>
                    <option>LDAP</option>
                </select>
            </td>
            <td class="p-3">
                <input type="text" value="Значение" class="border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500" maxlength="100">
            </td>
            <td class="p-3">
                <input type="password" value="password" class="border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500" maxlength="100">
            </td>
            <td class="p-3">
                <button class="text-gray-500 hover:text-red-500">
                  <DeleteIcon></DeleteIcon>
                </button>
            </td>
          </tr>
          <tr>
            <td class="p-3">
                <input type="text" value="Значение" class="border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500" maxlength="50">
            </td>
            <td class="p-3">
                <select class="border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>LDAP</option>
                    <option>Локальная</option>
                </select>
            </td>
            <td class="p-3" colspan="2">
                <input type="text" value="Значение" class="border rounded p-2 size-full focus:outline-none focus:ring-2 focus:ring-blue-500" maxlength="100">
            </td>
            <td class="p-3">
                <button class="text-gray-500 hover:text-red-500">
                  <DeleteIcon></DeleteIcon>
                </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
</style>
