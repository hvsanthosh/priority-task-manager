# Priority-task-manager

## Installation Guide

### Requirements
- [Nodejs](https://nodejs.org/en/download)

 ```shell
git clone https://github.com/hvsanthosh/priority-task-manager
```
- Next you want some credentials from twilio to start. Follow this guide for step-by-step-process.
-[Twilio Voice](https://www.twilio.com/docs/voice/make-calls)

-Now install the dependencies.
```shell
npm i
```
-Add .env file in the root folder and your twilio credentials.
```shell
PORT=8080
MONGO_URI=
JWT_SECRET=
twil=
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_PHONE_NUMBER=
```
-We are almost done, Now just start the  server using this command.
```shell
npm start
```

