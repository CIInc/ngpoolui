# Ngpoolui

Monero Pool frontend

Angular 5 based UI for nodejs-pool

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.6.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

If you have the node express app running, run the command with a proxy config file: `ng serve -proxy proxy.conf.json`

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Deploy

### Configure
Add Azure's SCM integration into the repository by running `git remote add azure https://CIAymeric@xmrpool.scm.azurewebsites.net/XMRPool.git`

### Deploy to Azure
Run `ng build  --prod --aot` to package the Angular app into 'dist' folder. 

Copy 'dist' folder into ftp://waws-prod-dm1-027.ftp.azurewebsites.windows.net/site/wwwroot/

Run `git push azure master --force` to package Express node app, generate web.config, integrate iisnode and deploy to Azure.

## Monitor

###Viewing Logs
Run `az webapp log tail --resource-group XMRPool --name XMRPool` to view (or "tail") the logs from the running Website. Any calls to console.log() in the site will be displayed in your terminal.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
