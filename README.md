# MFE-Admin

## Descripción
MFE-Admin proporciona las vistas necesarias para gestionar las plantas, tarifas y vehículos. Permite a los administradores realizar las siguientes funciones:
- **Gestión de plantas**: Crear, editar o eliminar plantas de estacionamiento.
- **Gestión de tarifas**: Crear, editar o eliminar tarifas.
- **Gestión de vehículos**: editar, ver o eliminar vehículos en el sistema.

## Instalación

### Requisitos Previos
- **Node**: Requiere versión ^18  
  Verifica tu versión de Node ejecutando:  
  ```bash
  node -v
  ```
- **Angular**: Requiere versión ^18.2.0  
  Instala la versión adecuada de Angular CLI ejecutando:  
  ```bash
  npm install -g @angular/cli@18.2.14
  ```

### Clonar el Repositorio
Clona el repositorio del microfrontend utilizando el siguiente comando:  
```bash
git clone https://github.com/Tartis-Project/mfe-admin.git
```

### Instalar Dependencias
Dirígete a la carpeta del proyecto y ejecuta el siguiente comando para instalar las dependencias necesarias:  
```bash
cd mfe-admin
npm install
```

## Desarrollo

### Levantar y Compilar el Proyecto
Para iniciar el servidor de desarrollo y compilar el proyecto, ejecuta el siguiente comando:  
```bash
ng serve
```

El servidor estará disponible en [http://localhost:4203](http://localhost:4203) por defecto.

## Testing
Este microfrontend utiliza **Jasmine** y **Karma** para realizar pruebas unitarias. Para ejecutar los tests, utiliza el siguiente comando:  
```bash
ng test
```

## Dependencias
Este microfrontend depende de las siguientes librerías y paquetes:

- **Angular**: Framework principal
- **RxJS**: Librería para manejo de programación reactiva
- **Angular Material**: Para componentes UI
- **SweetAlert2**: Para mostrar alertas y diálogos modales interactivos

# Changelog

## [2.0.0] - 27/03/2025

### 🚀 Nuevas características añadidas
- Gestión de plantas
- Gestión de tarifas
- Vista y modificación de vehiculos
- Vista principal con datos de registros y plantas en tiempo real
- Lista de todos los administradores

### 🛠 Correcciones de errores (Bug Fixes)
- N/A

### 📈 Mejoras de rendimiento o cambios internos
- Se ha añadido en la home la carga de datos con SSE

### ⚠️ Deprecaciones o eliminaciones de funciones
- Se ha eliminado la opción de crear tarifas
- Se ha eliminado la opción de eliminar tarifas

## [1.0.0] - 14/03/2025

### 🚀 Nuevas características añadidas
- Gestión de plantas
- Gestión de tarifas
- Vista y modificación de vehiculos
- Vista principal con datos de registros y plantas en tiempo real
- Lista de todos los administradores

### 🛠 Correcciones de errores (Bug Fixes)
- N/A

### 📈 Mejoras de rendimiento o cambios internos
- N/A

### ⚠️ Deprecaciones o eliminaciones de funciones
- N/A
