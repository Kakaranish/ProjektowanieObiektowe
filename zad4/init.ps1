docker run -it `
    -v $PSScriptRoot/app:/app `
    -u root `
    -p 21370:8080 `
    --name proj_obj4 `
    projobj4_custom