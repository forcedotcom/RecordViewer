# recordviewer
UI API record view node.js test tool


## Setup
1. Setup [Docker](https://www.docker.com/)
2. Create the SSL cert and key in the `nginx` folder. See the SSL Setup instructions below.
3. Run the following Docker Compose command to build and start the servers

    ```
    docker-compose build && docker-compose up -d
    ```
4. After Docker finishes building and starts the containers, the web application should be available at the following address.

    ```
    https://localhost:8443/
    ```

    ### Port Forwarding
    If you're running docker in a VM, be sure to forward the ports exposed in your containers. The following script will forward any open ports in the boot2docker-VM.

      ```
        for i in {49000..49900}; do
          VBoxManage modifyvm "boot2docker-vm" --natpf1 "tcp-port$i,tcp,,$i,,$i";
          VBoxManage modifyvm "boot2docker-vm" --natpf1 "udp-port$i,udp,,$i,,$i";
        done
      ```

## SSL Setup
In order for OAuth authentication, SSL must be used. The server is expecting SSL key information in files `/nginx/ssl.crt` and `/nginx/ssl.key` within the project directory. Below are instructions on how to create a self-signed SSL key. See these [instructions](https://devcenter.heroku.com/articles/ssl-certificate-self) for more details.

1. `cd recordviewer/nginx`
2. `openssl genrsa -des3 -passout pass:x -out server.pass.key 2048`
3. `openssl rsa -passin pass:x -in server.pass.key -out ssl.key`
4. `openssl req -new -key ssl.key -out server.csr`

    when prompted for a 'challenge password', press return, leaving the password empty

5. `openssl x509 -req -days 365 -in server.csr -signkey ssl.key -out ssl.crt`


## Deploy to Heroku
All of the instructions below assume that you are within the root of the project directory.

1. Install the [Heroku Toolbelt](https://toolbelt.heroku.com/)
2. Log into Heroku through the command line

    ```
    heroku login
    ```
3. The Docker add-on must be installed

    ```
    heroku plugins:install heroku-docker
    ```
4. The Heroku application must be created

    ```
    heroku create
    ```
5. Deploy the application

    ```
    heroku docker:release
    ```


### (Optional) Setting the Default Login URL and Consumer Key
After creating the Connected App in Salesforce, the following steps can be used to set the default Login URL and Consumer Key on the default page.

1. Run the following command to set the Login URL

    ```
    heroku config:set LOGIN_URL={url}
    ```
    where `{url}` is the URL of the server that the org is on.

2. Run the following command to set the Consumer Key

    ```
    heroku config:set CONSUMER_KEY={key}
    ```
    where `{key}` is the value from the Consumer Key field in Connected App details.
