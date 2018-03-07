FROM nginx

# replace the default Nginx configuration file
# with the configuration file from the current directory
RUN rm -v /etc/nginx/nginx.conf
ADD nginx.conf /etc/nginx/

RUN apt-get update && \
    apt-get install -y openssl && \
    cd /etc/nginx && \
    openssl genrsa -des3 -passout pass:password1 -out cert.pass.key 2048 && \
    openssl rsa -passin pass:password1 -in cert.pass.key -out cert.key && \
    rm cert.pass.key && \
    openssl req -new -key cert.key -out cert.csr \
        -subj "/C=US/ST=California/L=San Francisco/O=Example/OU=Example/CN=example.com" && \
    openssl x509 -req -days 365 -in cert.csr -signkey cert.key -out cert.crt

EXPOSE 443
EXPOSE 80
