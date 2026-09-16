<template>
  <ion-app>
    <ion-toast :is-open="!isOnline" message="Você está offline. Algumas funções podem não estar disponíveis." color="warning" :duration="0" position="top" />
    <ion-router-outlet />
  </ion-app>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { IonApp, IonRouterOutlet, IonToast } from '@ionic/vue';
import { Network } from '@capacitor/network';
import { getTheme } from './services/appStorage';

const isOnline = ref(true);

onMounted(async () => {
  document.documentElement.classList.toggle('ion-palette-dark', (await getTheme()) === 'dark');
  isOnline.value = (await Network.getStatus()).connected;
  Network.addListener('networkStatusChange', (status) => { isOnline.value = status.connected; });
});
</script>
