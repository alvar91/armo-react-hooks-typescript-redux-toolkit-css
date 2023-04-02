### Установка

- Установите [Docker](https://www.simplilearn.com/tutorials/docker-tutorial/how-to-install-docker-on-ubuntu)

### Запуск

- Откройте терминал в контексте проекта
- Создайте Docker-образ путем ввода в терминал: `sudo docker build -t armo .`
- Запустите контейнер путем ввода в терминал: `sudo docker run --rm -ti -p 80:80 armo` (убедитесь, что порт 80 не занят)
- Запущенный контейнер будет доступен по: `http://localhost:80`
