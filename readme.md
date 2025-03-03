# Your Comfort


| ![Your Comfort](assets/logo.png) | ![Your Comfort](/image.png) |
|----------------------------------|-----------------------------|


## Descripción

Your Comfort es una aplicación móvil desarrollada con React Native y Expo que permite a los usuarios buscar cuartos o casas en renta. La aplicación incluye características como autenticación con Google, carga de imágenes, y manejo de suscripciones.

## Características

- **Autenticación con Google**: Los usuarios pueden iniciar sesión utilizando sus cuentas de Google.
- **Carga de Imágenes**: Los usuarios pueden cargar imágenes para promocionar los cuartos en renta.
- **Gestión de Suscripciones**: Los usuarios pueden ver y gestionar sus suscripciones.
- **Navegación Intuitiva**: La aplicación utiliza `react-navigation` para una navegación fluida.

## Instalación

1. Clona el repositorio:
    ```sh
    git clone https://github.com/your-user/your-comfort.git
    cd your-comfort
    ```

2. Instala las dependencias:
    ```sh
    npm install
    ```

3. Configura las variables de entorno:
    Crea un archivo [.env](http://_vscodecontentref_/0) en la raíz del proyecto y añade tus claves:
    ```env
    ANDROID_CLIENT_ID=google-key-android
    IOS_CLIENT_ID=google-key-ios
    WEB_CLIENT_ID=google-maps-web-client
    PUBLISHABLE_KEY=stripe-api-key
    GOOGLE_MAPS_KEY=google-maps-key
    CLOUD_NAME=cloudinary_name
    ```

1. Inicia la aplicación:
    ```sh
    npx expo start
    ```

## Uso

1. Abre la aplicación en tu dispositivo o emulador.
2. Inicia sesión con tu cuenta de Google.
3. Explora las diferentes funcionalidades como la carga de imágenes y la gestión de suscripciones.

## Scripts Disponibles

- `npm start`: Inicia el servidor de desarrollo.
- `npm run android`: Compila y ejecuta la aplicación en un dispositivo Android.
- `npm run ios`: Compila y ejecuta la aplicación en un dispositivo iOS.
- `npm run web`: Inicia la aplicación en el navegador.
- `npm test`: Ejecuta las pruebas.

## Estructura del Proyecto

```plaintext
.
├── android/
├── assets/
├── ios/
├── src/
│   ├── components/
│   ├── context/
│   ├── hooks/
│   ├── navigation/
│   ├── screens/
│   ├── services/
│   ├── utils/
│   └── App.tsx
├── tests/
├── .env
├── app.json
├── babel.config.js
├── package.json
├── readme.md
└── tsconfig.json
```

