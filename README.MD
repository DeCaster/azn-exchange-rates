
# AZN Exchange Rates Web Application
Onemli not: her iki packete npm install yaparak node_modules paketini indirmeniz gerek



This project is designed to manage AZN exchange rates and allow users to fetch rates by date and currency. The project consists of two parts: frontend and backend.

## Requirements
- Node.js
- MongoDB

## Environment Setup
Create a `.env` file and include the following information:

MONGO_URI = mongodb+srv://murad
@nodeexpressprojects.csweoyl.mongodb.net/azn-exchange-rates?retryWrites=true&w=majority&appName=NodeExpressProjects
JWT_SECRET="supersecret"

If the `.env` file does not work, you need to manually write your MONGO_URI.

## Starting the Backend
1. Open a terminal and navigate to the backend directory.
2. Run `cd src` to enter the source directory.
3. Start the backend server by running `nodemon server.js`.

## Starting the Frontend
1. Open a new terminal window and navigate to the frontend directory.
2. Run `cd azn-exchange-rates-frontend` to enter the frontend directory.
3. Start the frontend by running `npm start`.

## Usage
- The initial page will be the login page.
- If you have not previously logged in, go to the `Register` page to create a new user account.
- Then, return to the `Login` page, log in, and start using the web application.

---

# AZN Exchange Rates Web Tətbiqi

Bu layihə, AZN məzənnələrini idarə etmək və istifadəçilərin tarixə və valyutaya görə məzənnələri əldə etməsinə imkan vermək üçün hazırlanmışdır. Layihə iki hissədən ibarətdir: frontend və backend.

## Tələblər
- Node.js
- MongoDB

## Ətraf Mühitin Quraşdırılması
`.env` faylı yaradın və aşağıdakı məlumatları daxil edin:
MONGO_URI = mongodb+srv://murad:password@nodeexpressprojects.csweoyl.mongodb.net/azn-exchange-rates?retryWrites=true&w=majority&appName=NodeExpressProjects
JWT_SECRET="supersecret"

Əgər `.env` faylı işləmirsə, MONGO_URI-nizi əl ilə yazmalısınız.

## Backend-in İşə Salınması
1. Terminalı açın və backend-in olduğu qovluğa keçin.
2. `cd src` komutunu daxil edin.
3. Backend serverini işə salmaq üçün `nodemon server.js` komutunu daxil edin.

## Frontend-in İşə Salınması
1. Yeni bir terminal pəncərəsi açın və frontend qovluğuna keçin.
2. `cd azn-exchange-rates-frontend` komutunu daxil edin.
3. Frontendi işə salmaq üçün `npm start` komutunu daxil edin.

## İstifadə
- İlk səhifə olaraq login səhifəsi ilə qarşılaşacaqsınız.
- Əgər daha əvvəl istifadəçi girişi etməmisinizsə, `Register` səhifəsinə keçərək yeni bir istifadəçi hesabı yaradın.
- Daha sonra, `Login` səhifəsinə geri dönərək daxil olun və web tətbiqini istifadə etməyə başlayın.

