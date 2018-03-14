FROM node:8.9.3

# Copy package.json and package-lock.json then install deps
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

RUN npm run build
CMD ["npm", "start"]