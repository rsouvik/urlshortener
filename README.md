# urlshortener
url shortener

Very basic url shortener. 
1. Clone repo
2. Set appropriate env in docker-compose.yml
3. Create db tables in pg as such:
   
   CREATE TABLE urls (
    id SERIAL PRIMARY KEY,
    originalurl VARCHAR(255),
    shorturl VARCHAR(10) UNIQUE
);

Then run,
$ docker compose up

For backend, this uses pg instance. Make appropriate changes to index.html to run client. The following graphics show redirect to original url for an endpoint like localhost:3000/shortUrl


![image](https://github.com/rsouvik/urlshortener/assets/1316614/6ba4d67b-de7c-44fe-abd4-bd07c98cdad7)


![image](https://github.com/rsouvik/urlshortener/assets/1316614/2ceea865-0e94-4987-a77b-57bd784be1f2)


![image](https://github.com/rsouvik/urlshortener/assets/1316614/86627f9a-2d87-444d-b0f1-93f98eff02e8)


![image](https://github.com/rsouvik/urlshortener/assets/1316614/9ee06704-0ca7-4b47-abc9-e59c4b7458aa)
