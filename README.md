<p align="center">
  <img src="src/assets/imagenparking.png" alt="AutoParking" width="200">
</p>

#  AutoParking - Frontend del Sistema de Gestión de Estacionamiento

**Versión:** 1.0  
📅 _Última actualización: Marzo 2025_  
👨‍💻 _Desarrollado por:_ [Abdón Hernández Perera, Alberto Gonzalez Obreo, Rodrigo Gonzalez Domínguez]

---

## 📌 Índice
1. [Descripción del Proyecto](#-descripción-del-proyecto)
2. [Características](#-características)
3. [Tecnologías Utilizadas](#-tecnologías-utilizadas)
4. [Instalación](#-instalación)
5. [Configuración](#-configuración)
6. [Uso](#-uso)
7. [Autenticación con Keycloak](#-autenticación-con-keycloak)
8. [Estructura del Proyecto](#-estructura-del-proyecto)
9. [Endpoints API](#-endpoints-api)

---

## 🏢 Descripción del Proyecto
Es una aplicación web para la **gestión de un parking** que permite administrar plazas de parking, monitorear vehículos y gestionar accesos en tiempo real.

🔹 **Objetivo**: Automatizar la gestión de estacionamientos con sensores, control de accesos y autenticación con **Keycloak**.

---

## ✨ Características
✔️ Gestión de plazas de estacionamiento  
✔️ Administración de vehículos 
✔️ Monitoreo en tiempo real de entradas y salidas  
✔️ Integración con **Keycloak** para autenticación y control de roles  
✔️ Alertas de confirmación y errores 

---

## 🛠 Tecnologías Utilizadas
### **Frontend**:
- ✅ Angular 18 (Standalone Components)
- ✅ Angular Material + Bootstrap
- ✅ RxJS (Manejo de estados y observables)
- ✅ Keycloak Angular (Autenticación)

### **Backend (simulado)**:
- ✅ json-server (Simulación de API en desarrollo)

---

## 🛠 Instalación
### 🔹 **Requisitos Previos**
🔹 **Node.js 20.17.0+**  
🔹 **npm 11.0.0+**  
🔹 **Angular CLI 18**  
🔹 **Docker**

### 📦 **Instalar dependencias**
```bash
cd frontend
npm install
npm install sweetalert2
```

---

## 🚀 Uso
### 🔹 **Ejecutar Frontend**
```bash
ng serve
```

### 🔹 **Ejecutar Backend**
```bash
npm run json-server server
```

---


## 📁 Estructura del Proyecto
```bash
frontend/
├── src/
│   ├── app/
│   │   ├── core/
│   │   │   ├── guards/
│   │   │   │   ├── auth.guard.ts
│   │   │   ├── interceptors/
│   │   │   │   ├── notification.interceptor.ts
│   │   │   ├── pipes/
│   │   │   │   ├── euro-currency.pipe.ts
│   │   │   │   ├── search-vehicle.pipe.ts
│   │   │   ├── validators/
│   │   │   │   ├── greater-than-zero-fixed3.validator.ts
│   │   │   │   ├── greater-than-zero.validator.ts
│   │   ├── material/
│   │   │   ├── material.module.ts
│   │   ├── pages/
│   │   │   ├── home/
│   │   │   │   ├── home.component.html
│   │   │   │   ├── home.component.scss
│   │   │   │   ├── home.component.spec.ts
│   │   │   │   ├── home.component.ts
│   │   │   ├── parking/
│   │   │   │   ├── interfaces/
│   │   │   │   │   ├── floor.model.ts
│   │   │   │   │   ├── parkingSpot.model.ts
│   │   │   │   ├── pages/
│   │   │   │   │   ├──parking/
│   │   │   │   │   │   ├── parking.component.html
│   │   │   │   │   │   ├── parking.component.scss
│   │   │   │   │   │   ├── parking.component.spec.ts
│   │   │   │   │   │   ├── parking.component.ts
│   │   │   │   ├── services/
│   │   │   │   │   ├── parking.service.ts
│   │   │   │   │   ├── parkingSpot.service.ts
│   │   │   │   ├── shared/
│   │   │   │   │   ├──parking-form/
│   │   │   │   │   │   ├── parking-form.component.html
│   │   │   │   │   │   ├── parking-form.component.scss
│   │   │   │   │   │   ├── parking-form.component.spec.ts
│   │   │   │   │   │   ├── parking-form.component.ts
│   │   │   ├── rates/
│   │   │   │   ├── interfaces/
│   │   │   │   │   ├── rates.model.ts
│   │   │   │   ├── pages/
│   │   │   │   │   ├──rates/
│   │   │   │   │   │   ├── rates.component.html
│   │   │   │   │   │   ├── rates.component.scss
│   │   │   │   │   │   ├── rates.component.spec.ts
│   │   │   │   │   │   ├── rates.component.ts
│   │   │   │   ├── services/
│   │   │   │   │   ├── rates.service.ts
│   │   │   │   ├── shared/
│   │   │   │   │   ├──rates-form/
│   │   │   │   │   │   ├── rates-form.component.html
│   │   │   │   │   │   ├── rates-form.component.scss
│   │   │   │   │   │   ├── rates-form.component.spec.ts
│   │   │   │   │   │   ├── rates-form.component.ts
│   │   │   ├── vehicles/
│   │   │   │   ├── interfaces/
│   │   │   │   │   ├── vehicle.model.ts
│   │   │   │   ├── pages/
│   │   │   │   │   ├── vehicle-detail/
│   │   │   │   │   ├── vehicle-list/
│   │   │   │   ├── services/
│   │   │   │   │   ├── vehicle.service.ts
│   │   │   │   ├── shared/
│   │   │   │   │   ├──vehicles-form/
│   │   │   │   │   │   ├── vehicles-form.component.html
│   │   │   │   │   │   ├── vehicles-form.component.scss
│   │   │   │   │   │   ├── vehicles-form.component.spec.ts
│   │   │   │   │   │   ├── vehicles-form.component.ts
│   │   │   │   │   │   ├── vehicles.routes.ts
│   │   ├── shared/
│   │   │   ├── cards/
│   │   │   │   ├── card-detail/
│   │   │   │   │   ├── card-detail.component.html
│   │   │   │   │   ├── card-detail.component.scss
│   │   │   │   │   ├── card-detail.component.spec.ts
│   │   │   │   │   ├── card-detail.component.ts
│   │   │   │   ├── card-form/
│   │   │   │   │   ├── card-form.component.html
│   │   │   │   │   ├── card-form.component.scss
│   │   │   │   │   ├── card-form.component.spec.ts
│   │   │   │   │   ├── card-form.component.ts
│   │   │   │   ├── card-view/
│   │   │   │   │   ├── card-view.component.html
│   │   │   │   │   ├── card-view.component.scss
│   │   │   │   │   ├── card-view.component.spec.ts
│   │   │   │   │   ├── card-view.component.ts
│   │   │   ├── confirm-dialog/
│   │   │   │   ├── confirm-dialog.component.html
│   │   │   │   ├── confirm-dialog.component.scss
│   │   │   │   ├── confirm-dialog.component.ts
│   │   │   ├── navbar/
│   │   │   │   ├── navbar.component.html
│   │   │   │   ├── navbar.component.scss
│   │   │   │   ├── navbar.component.spec.ts
│   │   │   │   ├── navbar.component.ts
│   │   ├── registry/
│   │   │   ├── interfaces/
│   │   │   │   ├── registry.model.ts
│   │   │   ├── services/
│   │   │   │   ├── registry.service.ts
│   ├── app.component.html
│   ├── app.component.scss
│   ├── app.component.spec.ts
│   ├── app.component.ts
│   ├── app.config.ts
│   ├── app.routes.ts
│   ├── keycloak-init.ts
│   ├── assets/
│   │   ├── imagenparking.png
│   ├── environments/
│   │   ├── environment.ts
│   ├── index.html
│   ├── main.ts
│   ├── styles.scss
│   ├── .dockerignore
│   ├── .editorconfig
│   ├── .gitignore
│   ├── angular.json
│   ├── db.json
│   ├── Dockerfile
│   ├── nginx.conf
│   ├── package-lock.json
│   ├── package.json
│   ├── README.md
│   ├── tsconfig.app.json
│   ├── tsconfig.json
│   ├── tsconfig.spec.json

```

---

## 📡 Endpoints API
### 🔹 **Tarifas
- **GET** `/apiUrl/rates`: Listar tarifas
- **POST** `/apiUrl/rates`: Crear tarifa
- **PUT** `/apiUrl/rates/:id`: Actualizar tarifa
- **DELETE** `/apiUrl/rates/:id`: Eliminar tarifa

### 🔹 **Plantas del parking
- **GET** `/apiUrl/spots`: Listar plantas
- **POST** `/apiUrl/spots`: Crear planta
- **PUT** `/apiUrl/spots/:id`: Actualizar planta
- **DELETE** `/apiUrl/spots/:id`: Eliminar planta

### 🔹 **Plazas de las plantas
- **GET** `/apiUrl/spots`: Listar plazas
- **POST** `/apiUrl/spots`: Crear plaza
- **PUT** `/apiUrl/spots/:id`: Actualizar plaza
- **DELETE** `/apiUrl/spots/:id`: Eliminar plaza

### 🔹 **Vehículos
- **GET** `/apiUrl/vehicles`: Listar vehículos
- **POST** `/apiUrl/vehicles`: Crear vehículo
- **PUT** `/apiUrl/vehicles/:id`: Actualizar vehículo
- **DELETE** `/apiUrl/vehicles/:id`: Eliminar vehículo

### 🔹 **Registros
- **GET** `/apiUrl/registries`: Listar registros
- **POST** `/apiUrl/registries`: Crear registro
- **PUT** `/apiUrl/registries/:id`: Actualizar registro
- **DELETE** `/apiUrl/registries/:id`: Eliminar registro

---

## 🎯 Próximas Mejoras
- Tener acceso a la descarga de un fichero con los registros de vehículos en el mismo día.
- Generación de QR que accede al frontend con información de entrada/salida para usuarios.
- Implementación de un sistema de pago mediante la pantalla con información de salida que genera el QR.
- Implementación de usuarios con roles y permisos.
- Implementación de reservas de plazas de parking.

📌 _©️ AutoParking - 2025_
