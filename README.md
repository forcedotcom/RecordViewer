# Record Viewer
Record Viewer is a node.js app that demonstrates how to use [User Interface API](https://developer.salesforce.com/docs/atlas.en-us.uiapi.meta/uiapi/ui_api_get_started.htm) to view, create, update, and delete Salesforce records.


## Set Up Docker
1. Set up [Docker](https://www.docker.com/)
2. Create the SSL cert and key in the `nginx` folder. Follow the [SSL Setup](#ssl-setup) instructions.
3. Run this Docker Compose command to build and start the servers

    ```
    docker-compose build && docker-compose up -d
    ```
4. After Docker finishes building and starts the containers, the web application is available at the following address.

    ```
    https://localhost:8443/
    ```

    ### Forward Ports
    If you're running docker in a VM, forward the ports exposed in your containers. This script forwards any open ports in the boot2docker-VM.

      ```
        for i in {49000..49900}; do
          VBoxManage modifyvm "boot2docker-vm" --natpf1 "tcp-port$i,tcp,,$i,,$i";
          VBoxManage modifyvm "boot2docker-vm" --natpf1 "udp-port$i,udp,,$i,,$i";
        done
      ```

## [Set Up SSL](#ssl-setup)
OAuth authentication requires SSL. The server expects SSL key information in the files `/nginx/ssl.crt` and `/nginx/ssl.key` within the project directory. To create a self-signed SSL key, follow these steps. 

1. `cd recordviewer/nginx`
2. `openssl genrsa -des3 -passout pass:x -out server.pass.key 2048`
3. `openssl rsa -passin pass:x -in server.pass.key -out ssl.key`
4. `openssl req -new -key ssl.key -out server.csr`

    When prompted for a 'challenge password', press return, leaving the password empty.

5. `openssl x509 -req -days 365 -in server.csr -signkey ssl.key -out ssl.crt`

For more details about creating a self-signed SSL key, see these [instructions](https://devcenter.heroku.com/articles/ssl-certificate-self).

## Deploy to Heroku

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

## Deploy to Heroku using Docker
These instructions assume that you're within the root of the project directory.

1. Install the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)
2. Log in to Heroku through the command line.

    ```
    heroku login
    ```
3. Log in to the Heroku container registry.

    ```
    heroku container:login
    ```
4. Create the Heroku application.

    ```
    heroku create
    ```
5. Build the image and push to the Heroku container registry.

    ```
    heroku container:push web
    ```
6. Open the app in a browser. 

    ```
    heroku open
    ```

### (Optional) Set the Default Login URL and Consumer Key
After creating the Connected App in Salesforce, follow these steps to set the default Login URL and Consumer Key on the default page.

1. Run this command to set the Login URL.

    ```
    heroku config:set LOGIN_URL={url}
    ```
    where `{url}` is the URL of the server that the org is on.

2. Run this command to set the Consumer Key.

    ```
    heroku config:set CONSUMER_KEY={key}
    ```
    where `{key}` is the value from the Consumer Key field in Connected App details.
