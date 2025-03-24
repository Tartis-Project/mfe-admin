# Usar una imagen base de Node.js 20
FROM node:20-alpine as build

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar los archivos de configuración del proyecto
COPY package.json package-lock.json ./

# Instalar las dependencias del proyecto
RUN npm install
RUN npm install keycloak-angular --force

# Copiar el resto de los archivos del proyecto
COPY . .

# Compilar la aplicación Angular
RUN npm install sweetalert2
RUN npm i
RUN npm run build --prod

RUN ls -alt

# Usar una imagen base de Nginx para servir la aplicación
FROM nginx:alpine

# Copiar los archivos compilados de Angular al servidor Nginx
COPY --from=build /app/dist/mfe-admin/browser /usr/share/nginx/html
COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf

# Exponer el puerto 80
EXPOSE 80

# Comando para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
