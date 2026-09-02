<template>
  <ion-page>
    <ion-content fullscreen>
      <main class="register-shell">
        <router-link class="back-link" to="/login">← Voltar para entrar</router-link>
        <span class="eyebrow">primeiro passo</span>
        <h1>Crie seu espaço<br /><em>de memórias.</em></h1>
        <form class="register-form" @submit.prevent="register">
          <ion-input v-model="name" label="Seu nome" label-placement="stacked" fill="outline" placeholder="Como devemos chamar você?" required />
          <ion-input v-model="email" label="E-mail" label-placement="stacked" type="email" fill="outline" placeholder="voce@email.com" required />
          <ion-input v-model="password" label="Senha" label-placement="stacked" type="password" fill="outline" placeholder="Mínimo de 6 caracteres" :minlength="6" required />
          <ion-text v-if="error" color="danger"><p class="error-message">{{ error }}</p></ion-text>
          <ion-button class="primary-button" type="submit" expand="block">Criar minha conta</ion-button>
        </form>
      </main>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { IonButton, IonContent, IonInput, IonPage, IonText } from '@ionic/vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const name = ref('');
const email = ref('');
const password = ref('');
const error = ref('');

function register() {
  if (password.value.length < 6) { error.value = 'A senha precisa ter pelo menos 6 caracteres.'; return; }
  localStorage.setItem('albumfotos.account', JSON.stringify({ name: name.value, email: email.value, password: password.value }));
  localStorage.setItem('albumfotos.auth', 'true');
  router.replace('/tabs/tab1');
}
</script>

<style scoped>
.register-shell { max-width: 620px; margin: auto; padding: 8vh 22px; }
.back-link { display: block; color: var(--gallery-muted); text-decoration: none; margin-bottom: 12vh; }
h1 { font-family: Georgia, serif; font-size: clamp(3rem, 8vw, 6rem); line-height: .95; font-weight: 400; letter-spacing: -.04em; margin: 20px 0 42px; }
h1 em { color: var(--ion-color-primary); }
.register-form { background: var(--gallery-paper); border: 1px solid var(--gallery-line); border-radius: 20px; padding: 28px; display: grid; gap: 16px; }
.error-message { margin: 0; font-size: .9rem; }
</style>
