# RecordViewer&mdash;Node.js
This Node.js app shows you how easy it is to use the Salesforce [User Interface API](https://developer.salesforce.com/docs/atlas.en-us.uiapi.meta/uiapi) to create, read, update, and delete Salesforce records.

Salesforce uses User Interface API to build the Salesforce1 and Lightning Experience apps. Not only do you get data and metadata in a single response, but the response matches metadata changes made to the org by Salesforce admins. You don’t have to worry about layouts, picklists, field-level security, or sharing&mdash;all you have to do is build an app that users love.

## Set Up the App

1. To authenticate Record Viewer with a Salesforce org, in the org, [configure a connected app](https://help.salesforce.com/articleView?id=connected_app_overview.htm).
    * For the Callback URL, enter `https://localhost:8443/oauth-redirect`. If you deploy the app to Heroku, Heroku will provide a different callback URL. Create a new Connected App using the Heroku callback URL.
    * Make a note of the OAuth consumer key to enter on the home page of the Record Viewer app.
1. To allow the app to make cross-domain requests to Salesforce, in the org, choose Setup > CORS.
   1. Click New.
   1. For Origin URL Pattern, enter `https://localhost:8443`. If you're deploying to heroku, enter `https://*.herokuapp.com` or `https://some-domain.herokuapp.com`. 
1. Clone the RecordViewer repository.
1. Set up [Docker](https://www.docker.com/).
1. To build and start the servers, run this Docker Compose command.
    ```sh
    docker-compose build && docker-compose up -d
    ```
1. After Docker finishes building and starts the containers, the web application is available at `https://localhost:8443/`.


### Forward Ports

If you're running docker in a VM, be sure to forward the ports exposed in your containers. This script forwards open ports in the `boot2docker-VM`.

```sh
for i in {49000..49900}; do
    VBoxManage modifyvm "boot2docker-vm" --natpf1 "tcp-port$i,tcp,,$i,,$i";
    VBoxManage modifyvm "boot2docker-vm" --natpf1 "udp-port$i,udp,,$i,,$i";
done
```

## Use the Record Viewer App
 
To view a record, click a record in the Recent Items list.
This list contains recently used items. If you don't see any records, go to your Salesforce org and select a record or two, then return to the Record Viewer app.
 
When viewing a record, you can click to Edit, Delete, or Clone the record. 
 
To create a record, navigate to the app's home page and select an object from the dropdown. 
User Interface API supports all custom objects and some standard objects. If you select an unsupported object, the app will let you know.

To see the response from User Interface API that the app uses to build the page, click Show JSON.

## (Optional) Deploy to Heroku

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

### Deploy to Heroku Using Docker

All of the instructions below assume that you are within the root of the project directory.

1. Install the [Heroku CLI](https://toolbelt.heroku.com/)
1. Log into Heroku through the command line

    ```sh
    heroku login
    ```
1. Log into the Heroku Container Registry

    ```sh
    heroku container:login
    ```
1. The Heroku application must be created

    ```sh
    heroku create
    ```
1. Deploy the application

    ```sh
    heroku container:push web
    ```

### (Optional) Set the Default Login URL and Consumer Key

After creating the Connected App in Salesforce, follow these steps to set the default Login URL and Consumer Key on the default page.

1. To set the Login URL, run this command.

    ```sh
    heroku config:set LOGIN_URL={url}
    ```
    Substitute `{url}` with the URL of the server that the org is on.

1. To set the Consumer Key, run this command.

    ```sh
    heroku config:set CONSUMER_KEY={key}
    ```
    Substitute `{key}` with the value from the Consumer Key field in the Connected App details.
 

 
