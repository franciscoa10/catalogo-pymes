# Usa una imagen oficial de Node.js (versión ligera)
FROM node:18-alpine

# Crea el directorio de trabajo
WORKDIR /app

# Copia los archivos de dependencias
COPY package*.json ./

# Instala dependencias
RUN npm install --production

# Copia el resto del proyecto
COPY . .

# Expone el puerto (ajústalo si usas otro)
EXPOSE 3000

# Comando para iniciar el servidor
CMD ["node", "server.js"]
