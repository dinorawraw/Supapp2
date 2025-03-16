<template>
  <div>
    <Auth v-if="!user" @auth-success="handleAuthSuccess" />
    <div v-else>
      <nav class="bg-gray-800 text-white p-4">
        <div class="container mx-auto flex justify-between items-center">
          <h1 class="text-xl font-bold">Calculadora</h1>
          <button @click="handleLogout" class="bg-red-500 hover:bg-red-600 px-4 py-2 rounded">
            Sair
          </button>
        </div>
      </nav>
      
      <main class="container mx-auto p-4">
        <div class="bg-white p-6 rounded-lg shadow-lg">
          <h2 class="text-2xl font-bold mb-4">Bem-vindo, {{ user.email }}</h2>
          <!-- Aqui vai o conteúdo da sua calculadora -->
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import Auth from './components/Auth.vue'
import { fazerLogout, observarAuth } from './firebase/auth'

export default {
  name: 'App',
  components: {
    Auth
  },
  setup() {
    const user = ref(null)

    onMounted(() => {
      observarAuth((userData) => {
        user.value = userData
      })
    })

    const handleAuthSuccess = (userData) => {
      user.value = userData
    }

    const handleLogout = async () => {
      try {
        await fazerLogout()
        user.value = null
      } catch (error) {
        console.error('Erro ao fazer logout:', error)
      }
    }

    return {
      user,
      handleAuthSuccess,
      handleLogout
    }
  }
}
</script> 