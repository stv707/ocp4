FROM docker.io/library/node:10

USER root

# Install app dependencies and mssql-tools for sqlcmd
COPY package.json .
COPY package-lock.json .
RUN npm install --only=production

# Bundle app source
COPY . .
EXPOSE 8080

# Use entrypoint to run app.js
ENTRYPOINT ["node", "app.js"]
