<template>
  <ion-page>
    <ion-content fullscreen>
      <main class="auth-layout">
        <section class="auth-intro">
          <span class="eyebrow">albumfotos</span>
          <h1>Suas memórias,<br /><em>do seu jeito.</em></h1>
          <p>Guarde os momentos que fazem a vida valer a pena.</p>
        </section>

        <form class="auth-form" @submit.prevent="login">
          <div>
            <h2>Entrar</h2>
            <p class="form-hint">Acesse sua galeria pessoal.</p>
          </div>
          <ion-input v-model="email" label="E-mail" label-placement="stacked" type="email" fill="outline" placeholder="voce@email.com" required />
          <ion-input v-model="password" label="Senha" label-placement="stacked" type="password" fill="outline" placeholder="Sua senha" required />
          <ion-text v-if="error" color="danger"><p class="error-message">{{ error }}</p></ion-text>
          <ion-button class="primary-button" type="submit" expand="block">Entrar na galeria</ion-button>
          <p class="switch-auth">Ainda não tem uma conta? <router-link to="/cadastro">Criar cadastro</router-link></p>
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
const email = ref('');
const password = ref('');
const error = ref('');

function login() {
  const account = JSON.parse(localStorage.getItem('albumfotos.account') || 'null');
  if (!account || account.email !== email.value || account.password !== password.value) {
    error.value = 'E-mail ou senha incorretos.';
    return;
  }
  localStorage.setItem('albumfotos.auth', 'true');
  router.replace('/tabs/tab1');
}
</script>

<style scoped>
.auth-layout { min-height: 100%; max-width: 1080px; margin: auto; display: grid; grid-template-columns: 1fr 0.85fr; gap: 8vw; align-items: center; padding: 9vh 8vw; }
.auth-intro h1 { font-family: Georgia, serif; font-size: clamp(3rem, 7vw, 6.5rem); line-height: .95; font-weight: 400; margin: 22px 0; letter-spacing: -0.04em; }
.auth-intro h1 em { color: var(--ion-color-primary); }
.auth-intro p { color: var(--gallery-muted); font-size: 1.1rem; max-width: 300px; line-height: 1.5; }
.auth-form { background: var(--gallery-paper); border: 1px solid var(--gallery-line); border-radius: 20px; padding: 30px; display: grid; gap: 16px; box-shadow: 0 18px 55px rgba(68, 49, 27, .08); }
.auth-form h2 { margin: 0; font-size: 1.7rem; }
.form-hint, .switch-auth { color: var(--gallery-muted); margin: 5px 0 8px; }
.switch-auth { text-align: center; font-size: .9rem; margin: 8px 0 0; }
a { color: var(--ion-color-primary); font-weight: 700; text-decoration: none; }
.error-message { margin: 0; font-size: .9rem; }
@media (max-width: 700px) { .auth-layout { display: block; padding: 12vh 22px 30px; } .auth-intro { margin-bottom: 42px; } .auth-intro h1 { font-size: 3.7rem; } }
</style>
