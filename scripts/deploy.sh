#! /bin/bash

if [ "$TRAVIS_BRANCH" = "master" ] && [ "$TRAVIS_PULL_REQUEST" = "false" ]; then

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
  awk 'FNR==1 && NR!=1 {print "---"}{print}' k8s/prod/* \
    | envsubst \
    | kubectl apply --validate=true -f -
fi

kubectl rollout status deployment/scarcity-app
