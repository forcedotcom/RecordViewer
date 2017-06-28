FROM nginx

# replace the default Nginx configuration file
# with the configuration file from the current directory
RUN rm -v /etc/nginx/nginx.conf
ADD nginx.conf /etc/nginx/

ADD ssl.crt /etc/nginx/cert.crt
ADD ssl.key /etc/nginx/cert.key

EXPOSE 443
EXPOSE 80
