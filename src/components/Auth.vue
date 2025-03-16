<template>
  <div>
    <Login v-if="!isCadastro" @login-success="handleLoginSuccess" @toggle-form="toggleForm" />
    <Cadastro v-else @cadastro-success="handleCadastroSuccess" @toggle-form="toggleForm" />
  </div>
</template>

<script>
import { ref } from 'vue'
import Login from './Login.vue'
import Cadastro from './Cadastro.vue'

export default {
  name: 'Auth',
  components: {
    Login,
    Cadastro
  },
  setup(props, { emit }) {
    const isCadastro = ref(false)

    const toggleForm = () => {
      isCadastro.value = !isCadastro.value
    }

    const handleLoginSuccess = (user) => {
      emit('auth-success', user)
    }

    const handleCadastroSuccess = (user) => {
      emit('auth-success', user)
    }

    return {
      isCadastro,
      toggleForm,
      handleLoginSuccess,
      handleCadastroSuccess
    }
  }
}
</script> 