#! /bin/bash
docker login -u $DOCKER_USER -p $DOCKER_PASSWORD
export REPO=andreaschristianson/scarcity
export TAG=`if [ "$TRAVIS_BRANCH" == "master" ]; then echo "latest"; else echo $TRAVIS_BRANCH ; fi`
docker build -t $REPO:$COMMIT .
docker tag $REPO:$COMMIT $REPO:$TAG
docker tag $REPO:$COMMIT $REPO:travis-$TRAVIS_BUILD_NUMBER
docker push $REPO


if [ "$TRAVIS_BRANCH" = "master" ] && [ "$TRAVIS_PULL_REQUEST" = "false" ]; then
  if [ ! -d "$HOME/google-cloud-sdk/bin" ]; then
    rm -rf $HOME/google-cloud-sdk;
    export CLOUDSDK_CORE_DISABLE_PROMPTS=1;
    curl https://sdk.cloud.google.com | bash;
  fi
  # Add gcloud to $PATH
  source /home/travis/google-cloud-sdk/path.bash.inc
  openssl aes-256-cbc -K $encrypted_2b873ca40715_key -iv $encrypted_2b873ca40715_iv -in scarcity-project.json.enc -out scarcity-project.json -d
  export GOOGLE_APPLICATION_CREDENTIALS="$TRAVIS_BUILD_DIR/scarcity-project.json"
  gcloud auth activate-service-account --key-file scarcity-project.json
  # ssh-keygen -f ~/.ssh/google_compute_engine -N ""

  gcloud components update kubectl

  #todo: extract these
  gcloud config set project scarcity-project
  gcloud config set compute/zone us-central1-a


  gcloud container clusters get-credentials $GCLOUD_CLUSTER_NAME

  envsubst < k8s/deploy.yml | kubectl apply -f - 
fi
