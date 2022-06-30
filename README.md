# photo-share-api


## Mongo DB 실행

```shell
$ docker run -d \
      --name photo-share-mongodb \
      -v $(pwd)/data:/data/db \
      -p 27017:27017 \
      mongo
```
