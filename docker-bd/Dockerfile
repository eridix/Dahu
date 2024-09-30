FROM mysql:latest
ADD ./data-dump/dump.sql /docker-entrypoint-initdb.d/
RUN chmod +r /docker-entrypoint-initdb.d/dump.sql
EXPOSE 3306
