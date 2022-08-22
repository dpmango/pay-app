FROM nginx
EXPOSE 80

COPY build /app
COPY nginx.conf /etc/nginx/conf.d/default.conf
