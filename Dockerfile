# Specify the base image
FROM node:20

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

RUN  npm i -g @nestjs/cli


# Copy the rest of your application code
COPY . .

# Expose the port your app runs on
EXPOSE 3000
RUN chmod 777 -R ./

# Command to run your app
CMD ["npm", "run", "start:dev"]
