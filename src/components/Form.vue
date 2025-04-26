<script setup lang="ts">
import InfoIcon from './icons/InfoIcon.vue'
import DeleteIcon from './icons/DeleteIcon.vue'
import { useFieldsStore } from '@/stores/fieldsDataStore'
import type { FieldData, FieldDataState } from './utils/types.ts'
import { computed, onMounted, ref } from 'vue'
import type { Mark } from '@/utils/types.ts'

const store = useFieldsStore()
const allFields = computed(() => store.allFields)
const localFields = computed(() => store.localFields)
const ldapFields = computed(() => store.ldapFields)
const showField = ref(false)
const isLocal = ref(true)
const fieldData = ref({
  marks: "",
  login: "",
  password: ""
})

const fieldValidation = ref({
  marks: true,
  login: false,
  password: false
})
function addNewField(item : FieldData) {
  store.addField(item)
}

function removeField(id: number) {
  store.removeField(id)
}
function onselect(event : Event){
  if(event.target.value === "local"){
    isLocal.value = true
  }
  else{
    isLocal.value = false
  }
  console.log(isLocal.value)
}
function parseMarks(input_string : string) : Mark[]{
  return input_string.split(';').map(el => ({text: el}));
}
function onBlur(input_type: string){
  switch(input_type){
    case "login":
      if(fieldData.value.login.length < 50 && fieldData.value.login.length > 0){
        fieldValidation.value.login = true;
      }
      else{
        fieldValidation.value.login = false;
        break;
      }
    case "password":
      if(fieldData.value.password.length < 50 && fieldData.value.password.length > 0){
        fieldValidation.value.password = true;
      }
      else{
        fieldValidation.value.password = false;
      }
    case "marks":
      if(fieldData.value.marks.length < 100){
        fieldValidation.value.marks = true;
      } 
      else{
        fieldValidation.value.marks = false;
        break;
      }
    default:
      if(!isLocal.value) fieldValidation.value.password = true;
      if(fieldValidation.value.marks && fieldValidation.value.login && fieldValidation.value.password){
        if(isLocal.value){
          addNewField({
          marks: parseMarks(fieldData.value.marks),
          local: true,
          login: fieldData.value.login,
          password: fieldData.value.password
        })
        }
        else{
          addNewField({
          marks: parseMarks(fieldData.value.marks),
          local: false,
          login: fieldData.value.login
        })
        }

        showField.value = false
        isLocal.value = true
        fieldData.value.marks = ""
        fieldData.value.login = ""
        fieldData.value.password = ""
        fieldValidation.value.marks = true;
        fieldValidation.value.login = false;
         fieldValidation.value.password = false;
      }

  }
}
</script>

<template>
  <div class="max-w-4xl mx-auto flex flex-col h-screen items-center justify-center">
    <div class="flex gap-x-8 mb-4 align-middle items-center">
      <h1 class="text-xl font-bold text-gray-800">Учетные записи</h1>
      <button class="bg-blue-500 text-white text-lg px-4 py-2 rounded hover:bg-blue-600" @click="showField = true">+</button>
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
          <tr v-for="field in allFields" :key="field.id">
            <td class="p-3">
              <div v-if="field.marks.length">
                <span v-for="mark in field.marks" class="px-2 m-0.5 bg-blue-200 text-blue-800 rounded">{{mark.text}}</span>
              </div>
              <div v-else>
                <span>Метки отсутствуют</span>
              </div>
            </td>
            <td class="p-3">
              <span> {{ field.local ? "Локальная" : "LDAP" }}</span>
            </td>
            <td class="p-3">
              <span> {{ field.login}}</span>
            </td>
            <td class="p-3">
              <span> {{ field.password ? field.password : "Пароль не предусмотрен" }}</span>
            </td>
            <td class="p-3">
                <button @click="removeField(field.id)" class="text-gray-500 hover:text-red-500">
                  <DeleteIcon></DeleteIcon>
                </button>
            </td>
          </tr>
          <tr v-if="showField">
            <td class="p-3">
                <input id="marks" type="text" v-model="fieldData.marks" :class="{ 'error-input': !fieldValidation.marks }" @blur="onBlur(`marks`)" class="border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500">
            </td>
            <td class="p-3">
                <select @change="onselect" class="border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="local">Локальная</option>
                    <option value="ldap">LDAP</option>
                </select>
            </td>

            <template v-if="isLocal">
            <td class="p-3" >
              <input id="login" type="text" v-model="fieldData.login" @blur="onBlur(`login`)" :class="{ 'error-input': !fieldValidation.login }" class="border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500">
            </td>
            <td class="p-3" >
              <input id="password" type="password" v-model="fieldData.password" @blur="onBlur(`password`)" :class="{ 'error-input': !fieldValidation.password }" class="border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500">
            </td>
            </template>
            <td class="p-3" colspan="2" v-else>
                <input id="login" type="text" v-model="fieldData.login" @blur="onBlur(`login`)" :class="{ 'error-input': !fieldValidation.login }" class="border rounded p-2 size-full focus:outline-none focus:ring-2 focus:ring-blue-500" maxlength="100">
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
.error-input {
  background-color: #ffdddd;
  border: 1px solid red;
}
</style>

<!--           <tr>
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
          </tr>-->