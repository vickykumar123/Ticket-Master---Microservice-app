FROM node:alpine

WORKDIR /app

# Copy both package.json and package-lock.json to leverage caching
COPY package*.json ./

# Clear npm cache and install dependencies with --no-optional for faster installs
RUN npm cache clean --force && npm install --no-optional --omit=dev

# Copy the rest of the application files
COPY . .


# Start the app
CMD ["npm", "start"]
