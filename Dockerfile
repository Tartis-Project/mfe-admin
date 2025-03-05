# Usar una imagen base de Node.js 20
FROM node:20-alpine

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar los archivos del proyecto
COPY package.json package-lock.json ./
RUN npm install
COPY . .

# Exponer el puerto 4200
EXPOSE 4200

# Ejecutar Angular en modo desarrollo
CMD ["npm", "run", "start"]
