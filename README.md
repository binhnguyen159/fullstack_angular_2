Setting project:
1. create a postgres local
name: postgres, username:postgres, password: binh
2. create .env file and put all enviroment variable to it
3. yarn install
4. yarn dev

#Environment variable

PORT=3000
BCRYPT_PASSWORD=secret-password
SALT_ROUND=10
JWT_SECRET=secret-token
DB_HOST=localhost
DB_USERNAME=postgres
DB_PASSWORD=binh
DB_DATABASE=postgres
ENV=DEV