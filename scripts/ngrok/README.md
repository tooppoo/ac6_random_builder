# ABOUT

OGPなど、外部サービスからのリクエストが必要な内容をローカルで確認したいことがある.
そのため、ngrokを使って外部からのリクエストをトンネルする.

```
外部 -> ngrok(docker) -> application(docker)
```

# 初期設定

```shell
docker compose build
docker compose run --rm app npm ci
```

# 起動

```shell
docker compose up
```
