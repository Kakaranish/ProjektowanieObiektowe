Build custom image
```
cd custom_image
./build.sh
```

Inside container start app with:
```
cd /home/kprzystalski/transit/vaporapp
vapor run migrate # Apply db migrations
vapor run serve --hostname 0.0.0.0 --port 8080
```