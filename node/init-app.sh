wget https://chupinohostingbucket.nyc3.cdn.digitaloceanspaces.com/backend_config/serviceAccountKey.json
mv serviceAccountKey.json ./config
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
npm run start