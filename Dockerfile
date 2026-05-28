FROM nginx:alpine
COPY deploy/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY . /usr/share/nginx/html
