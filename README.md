# Математика по шагам

Интерактивный сайт для детей 3–4 классов: примеры, задачи, подсказки и подробные решения. Сложность повышается после трёх верных ответов по выбранной теме.

## Скачать и запустить

Нужны Git и Docker с поддержкой Compose. Выполните в терминале:

```sh
git clone https://github.com/stxdcgit/matematika-po-shagam.git
cd matematika-po-shagam
docker compose up -d
```

Откройте [http://localhost:18080](http://localhost:18080). Готовый образ загружается из GitHub Container Registry.

Остановить контейнер:

```sh
docker compose down
```

Прогресс сохраняется в браузере на этом устройстве.

## Portainer на TrueNAS SCALE

1. Откройте **Stacks → Add stack** и задайте имя `matematika-po-shagam`.
2. Выберите **Repository**, укажите `https://github.com/stxdcgit/matematika-po-shagam.git`, ветку `main` и путь к файлу `compose.yaml`.
3. Нажмите **Deploy the stack**. Portainer загрузит готовый образ, сборка внутри Portainer больше не требуется.
4. Откройте `http://IP-АДРЕС-TRUENAS:18080`. Если порт 18080 занят, измените левое число в разделе `ports` файла `compose.yaml` в своей копии репозитория.

При обновлении ветки `main` GitHub Actions публикует новый образ `ghcr.io/stxdcgit/matematika-po-shagam:latest`. Для обновления стека в Portainer выберите повторную загрузку образа (**Pull latest image**).
