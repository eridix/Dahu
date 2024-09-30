# SAE5-DAHU
Cloner le projet

1ère console lancement backend
cd backend/api-platform/api-dahu/
composer update
mkdir migrations
php bin/console make:migration
php bin/console doctrine:migrations:migrate
symfony server:start

2eme console lancement base de donée mysql sur un docker
cd docker-bd/
docker-compose up -d

3eme console lancement front-end
cd Front\ end/dahu/
npm i
npm update
ng serve --open

Lancer les tests cypress
cd Front\ end/dahu/
npx cypress open

Lancer application mobile android
Ouvrir Android Studio seulement avec le dosier Front\ end/dahu/android
Executer (normalemnt il y a rien besoin de faire d'autre)

Rebuild application mobile android
npm install @capacitor/cli --save-dev
npm install @capacitor/ios @capacitor/android
npx cap add android
ng build && npx cap sync

# PS:
Install dependance Angular:
npm list :

├── @angular-devkit/build-angular@17.0.2
├── @angular/animations@17.0.4
├── @angular/cdk@16.2.12
├── @angular/cli@17.0.2
├── @angular/common@17.0.4
├── @angular/compiler-cli@17.0.4
├── @angular/compiler@17.0.4
├── @angular/core@17.0.4
├── @angular/forms@17.0.4
├── @angular/material@16.2.12
├── @angular/platform-browser-dynamic@17.0.4
├── @angular/platform-browser@17.0.4
├── @angular/router@17.0.4
├── @types/crypto-js@4.2.1
├── @types/jasmine@4.3.6
├── bootstrap-icons@1.11.1
├── bootstrap@5.3.2
├── crypto-js@4.2.0
├── jasmine-core@4.6.0
├── jquery@3.7.1
├── karma-chrome-launcher@3.2.0
├── karma-coverage@2.2.1
├── karma-jasmine-html-reporter@2.1.0
├── karma-jasmine@5.1.0
├── karma@6.4.2
├── ngx-cookie-service@17.0.0
├── rxjs@7.8.1
├── tslib@2.6.2
├── typescript@5.2.2
└── zone.js@0.14.2


## Application mobile
npm install @capacitor/cli --save-dev
npm install @capacitor/ios @capacitor/android
npx cap add android
ng build && npx cap sync
