# albumfotos

Aplicativo de galeria de fotos desenvolvido com Ionic Vue e Capacitor.

## Funcionalidades

- Tela de login com sessão local.
- Tela de cadastro de usuário.
- Home protegida por autenticação.
- Galeria com seleção de fotos e remoção de memórias.
- Solicitação de permissão para câmera e galeria no Android.
- Tela Sobre com opção de sair da conta.

> Esta Parte 1 usa `localStorage` para demonstrar o fluxo sem um backend.

## Como executar

```bash
npm install
npm run dev
```

Para validar a versão de produção:

```bash
npm run build
```

## Android

Com o Android Studio e o SDK Android configurados:

```bash
npm run build
npx cap add android
npx cap sync android
npx cap open android
```

Depois, execute o app em um emulador ou dispositivo pelo Android Studio. Ao tocar em **Adicionar foto**, o app solicita acesso à câmera e às fotos; o usuário pode escolher a galeria ou tirar uma nova foto.

## Tecnologias

- Ionic 9
- Vue 3
- TypeScript
- Capacitor 8
- Vite
