docker run -it `
    -v $PSScriptRoot\transit:/home/kprzystalski/transit `
    -u root `
    -p 21370:8080 `
    --name proj_obj2 `
    kprzystalski/projobj2_modified