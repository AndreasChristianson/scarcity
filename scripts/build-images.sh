#! /bin/bash
docker login -u $DOCKER_USER -p $DOCKER_PASSWORD
export TAG=`if [ "$TRAVIS_BRANCH" == "master" ]; then echo "latest"; else echo $TRAVIS_BRANCH ; fi`
docker build -t $REPO:$COMMIT \
  --file docker/scarcity-dockerfile \
  .
  
docker tag $REPO:$COMMIT $REPO:$TAG
docker tag $REPO:$COMMIT $REPO:travis-$TRAVIS_BUILD_NUMBER

docker build -t $REPO:flyway-$COMMIT \
  --file docker/flyway-dockerfile \
  .

docker tag $REPO:flyway-$COMMIT $REPO:flyway-$TAG
docker tag $REPO:flyway-$COMMIT $REPO:flyway-travis-$TRAVIS_BUILD_NUMBER

docker push $REPO
