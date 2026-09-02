<template>
  <ion-page>
    <ion-header><ion-toolbar><ion-title>Sobre o albumfotos</ion-title></ion-toolbar></ion-header>
    <ion-content>
      <main class="about-shell">
        <span class="eyebrow">feito para guardar</span>
        <h1>Momentos simples.<br /><em>Para sempre.</em></h1>
        <p>O albumfotos é seu cantinho para reunir fotografias especiais, com leveza e privacidade.</p>
        <div class="about-note"><strong>Parte 1</strong><span>Uma galeria pessoal desenvolvida com Ionic e Capacitor.</span></div>
        <ion-button fill="outline" @click="logout">Sair da conta</ion-button>
      </main>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/vue';
import { useRouter } from 'vue-router';
const router = useRouter();
function logout() { localStorage.removeItem('albumfotos.auth'); router.replace('/login'); }
</script>

<style scoped>
.about-shell { max-width: 700px; margin: auto; padding: 12vh 24px; }
h1 { font-family: Georgia, serif; font-weight: 400; font-size: clamp(3rem, 8vw, 6rem); line-height: .95; letter-spacing: -.04em; margin: 24px 0; }
h1 em { color: var(--ion-color-primary); }
.about-shell > p { color: var(--gallery-muted); line-height: 1.7; max-width: 430px; font-size: 1.1rem; }
.about-note { border-top: 1px solid var(--gallery-line); border-bottom: 1px solid var(--gallery-line); padding: 20px 0; margin: 46px 0 28px; display: flex; gap: 18px; }
.about-note span { color: var(--gallery-muted); }
</style>
