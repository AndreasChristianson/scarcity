[![Build Status](https://travis-ci.org/AndreasChristianson/scarcity.svg?branch=master)](https://travis-ci.org/AndreasChristianson/scarcity)

## local dev
### requirements
- docker
- docker-compose
- node
- npm

### light
In this mode postgres and redis are started in background containers. You must *remember to run `docker-compose down`* when you are done. This mode allows fast hapi rebuild/restart without waiting for backend services to come back up.
Note that you must restart the postgres instance before new flyway migrations are picked up.
Note that this script is untested in a windows environment.
- npm run dev
You can now browse `http://localhost:8080`.


### heavy
In this mode multiple instances of the app are spun up along with back end services and a load balancer.
- npm dev:heavy
You can now browse `http://localhost:80`.

## deployed: http://scarcity.pessimistic-it.com
