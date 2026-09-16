<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>albumfotos</ion-title>
        <ion-buttons slot="end">
          <ion-button aria-label="Sobre" fill="clear" @click="goToAbout">Sobre</ion-button>
          <ion-button aria-label="Sair" fill="clear" @click="logout">Sair</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <main class="gallery-shell">
        <section class="gallery-heading">
          <div>
            <span class="eyebrow">minha coleção</span>
            <h1>Olá, {{ userName }}.</h1>
            <p>{{ photos.length }} {{ photos.length === 1 ? 'memória guardada' : 'memórias guardadas' }}</p>
          </div>
          <ion-button class="primary-button add-button" @click="addPhoto">
            <ion-icon slot="start" :icon="addOutline" /> Adicionar foto
          </ion-button>
        </section>
        <ion-text v-if="message" color="danger"><p class="error-message">{{ message }}</p></ion-text>
        <section v-if="photos.length" class="photo-grid" aria-label="Suas fotos">
          <figure v-for="(photo, index) in photos" :key="photo" class="photo-card">
            <img :src="photo" :alt="`Memória ${index + 1}`" />
            <ion-button class="remove-button" fill="clear" aria-label="Remover foto" @click="removePhoto(index)">
              <ion-icon :icon="closeOutline" />
            </ion-button>
          </figure>
        </section>
        <section v-else class="empty-state">
          <ion-icon :icon="imagesOutline" />
          <h2>Sua galeria começa aqui.</h2>
          <p>Escolha uma foto da sua galeria ou registre um novo momento com a câmera.</p>
          <ion-button fill="outline" @click="addPhoto">Escolher primeira foto</ion-button>
        </section>
      </main>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonPage, IonText, IonTitle, IonToolbar } from '@ionic/vue';
import { addOutline, closeOutline, imagesOutline } from 'ionicons/icons';
import { useRouter } from 'vue-router';
import { addPhoto as savePhoto, getPhotos, removePhoto as deletePhoto } from '../services/appStorage';

const router = useRouter();
const photos = ref<string[]>([]);
const message = ref('');
const userName = ref('visitante');

onMounted(async () => {
  photos.value = await getPhotos();
  const account = JSON.parse(localStorage.getItem('albumfotos.account') || 'null');
  userName.value = account?.name?.split(' ')[0] || 'visitante';
});

async function addPhoto() {
  message.value = '';
  try {
    await Camera.requestPermissions({ permissions: ['camera', 'photos'] });
    const photo = await Camera.getPhoto({ quality: 90, resultType: CameraResultType.DataUrl, source: CameraSource.Prompt, promptLabelHeader: 'Adicionar memória', promptLabelPhoto: 'Escolher da galeria', promptLabelPicture: 'Tirar foto' });
    if (photo.dataUrl) {
      photos.value.unshift(photo.dataUrl);
      await savePhoto(photo.dataUrl);
    }
  } catch {
    message.value = 'Não foi possível acessar a câmera ou a galeria.';
  }
}

async function removePhoto(index: number) {
  photos.value.splice(index, 1);
  await deletePhoto(index);
}

function logout() { localStorage.removeItem('albumfotos.auth'); router.replace('/login'); }
function goToAbout() { router.push('/sobre'); }
</script>

<style scoped>
.gallery-shell { max-width: 1120px; margin: auto; padding: 44px 24px 60px; }
.gallery-heading { display: flex; align-items: end; justify-content: space-between; gap: 24px; margin-bottom: 36px; }
h1 { font-family: Georgia, serif; font-size: clamp(2.8rem, 6vw, 5.8rem); font-weight: 400; letter-spacing: -.05em; line-height: .95; margin: 16px 0 10px; }
.gallery-heading p { color: var(--gallery-muted); margin: 0; }
.add-button { min-width: 185px; }
.photo-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }
.photo-card { aspect-ratio: 1; margin: 0; overflow: hidden; position: relative; background: #e5ddd2; }
.photo-card img { width: 100%; height: 100%; object-fit: cover; display: block; }
.remove-button { --color: white; --background: rgba(38, 37, 33, .7); --border-radius: 50%; position: absolute; top: 8px; right: 8px; width: 32px; height: 32px; margin: 0; }
.remove-button ion-icon { font-size: 18px; }
.empty-state { border: 1px dashed #cfc4b5; text-align: center; padding: 90px 24px; color: var(--gallery-muted); }
.empty-state > ion-icon { font-size: 52px; color: var(--ion-color-primary); }
.empty-state h2 { color: var(--gallery-ink); font-family: Georgia, serif; font-size: 2rem; font-weight: 400; margin: 20px 0 8px; }
.empty-state p { max-width: 380px; margin: 0 auto 24px; line-height: 1.5; }
.error-message { margin: 0 0 18px; }
@media (max-width: 700px) { .gallery-heading { display: block; } .add-button { margin-top: 24px; } .photo-grid { grid-template-columns: repeat(2, 1fr); gap: 9px; } }
</style>
