# Angular UniversalStarter
Version Angular 8.X.X

# Renaming Project
The very first thing you might want to rename the project and give it your own name,
To do so - make sure you are checking them at following files
`packages.json` <br>
`angular.json`<br>
`server.ts`<br>
`app.module.ts`<br>
`karma.conf.js`<br>

Also packages.lock.json file also contains the name, you might want to remove your packages.lock.json
as it will be created automatically on next npm install. Search and replace would be also a good option, 
When node module is not already installed


## Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build
Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Angular Universal: server-side rendering Build  and serve
- 1. Build: `npm run build:ssr`
- 2. Serve: `npm run serve:ssr`

## Production Build
Run `ng build --prod` for a production build. 
## Production Serve
Run `ng serve --prod` for a production Serve. 

# NOTE
To use ng commands with extended memory:
 `node --max_old_space_size=8000 ./node_modules/@angular/cli/bin/ng <br>
 Read more ; https://stackoverflow.com/questions/26094420/fatal-error-call-and-retry-last-allocation-failed-process-out-of-memory/48895989#48895989

## Code scaffolding
Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Running unit tests
Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests
Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help
To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

###  Installing Docker
####Option 1 
- Install Docker From Snap and Enable Access file in home folder permission, It can be done by opening ubuntu software center.

####Option 2
 - Manual Installation - https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-18-04


If you want to avoid typing sudo whenever you run the docker command, add your username to the docker group: - 

`````sudo usermod -aG docker ${USER}`````

To apply the new group membership, log out of the server and back in, or type the following:

```su - ${USER}```

If you need to add a user to the docker group that you’re not logged in as, declare that username explicitly using:
`sudo usermod -aG docker username`


Create network
# network create 
`````
docker network create \
  --driver=bridge \
  --subnet=172.28.0.0/16 \
  --ip-range=172.28.5.0/24 \
  --internal=false\
  --gateway=172.28.5.254 \
  --attachable=true \
  local-network
`````

### Finally
`docker-compose build`

### Before `docker-compose up -d` add `npm i` in command before ng serve
```sh
    docker-compose up -d
    docker exec -it ng-universal-starter npm install
