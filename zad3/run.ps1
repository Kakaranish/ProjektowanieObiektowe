docker run -it `
    -v $PSScriptRoot/app:/home/kprzystalski/app `
    -u root `
    -p 21370:8000 `
    --name proj_obj3 `
    kprzystalski/projobj3