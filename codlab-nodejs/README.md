# mysql (docker)
- `docker run -d -p 3306:3306 -e MYSQL_ROOT_PASSWORD="pass" --name node_mysql mysql:5.7`
- `docker exec -it node_mysql bash`
- `mysql -u root -p`
- `create database node_api_codelab_test;`
- `create database node_api_codelab_dev;`

# folder

```
/app: 서버 기능
  /api: api 로직을 담당
  /config: 서버가 구동하기 위한 환경 변수 정의 (상수)
  /models: 데이터베이스 모델링
/bin: 서버 구동을 위한 코드
  /www.js: 서버 구동
  /sync-database: 디비 싱크
```