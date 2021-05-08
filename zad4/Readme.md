## How to run app?
Outside container
1) Build app docker image with `scripts/bash/build-custom-img.sh`
2) Start app docker image with `init.sh` and then `start.sh`

Inside container
1) Go to `/app/auth.di`
2) Run command `./gradlew bootRun`