# Build a Secure Node.js App with SQL Server

This is a sample application for the article [Build a Secure Node.js App with SQL Server](https://developer.okta.com/blog/2019/03/11/node-sql-server).

Built with love, using:

* [Node.js](https://nodejs.org/en/)
* [SQL Server](https://www.microsoft.com/en-us/sql-server/sql-server-2017)
* [hapi](https://hapijs.com/)
* [Vue.js](https://vuejs.org/)

## Requirements

* [Node.js](https://nodejs.org/en/) version 8.0 or higher
* [SQL Server](https://www.microsoft.com/en-us/sql-server/sql-server-2017) version 2012 or higher

If you don't already have access to SQL Server, you can install one locally for development and testing.

### Install SQL Server on Windows

Download and install [SQL Server Developer Edition](https://www.microsoft.com/en-us/sql-server/sql-server-downloads).

### Install SQL Server on Mac or Linux

1. Install [Docker](https://docs.docker.com/docker-for-mac/install/)
1. Run the following in a terminal. Change the values of `name_your_container` and `SA_PASSWORD=P@55w0rd` to what you desire.

```bash
docker pull microsoft/mssql-server-linux:2017-latest
docker run -d --name name_your_container -e 'ACCEPT_EULA=Y' -e 'SA_PASSWORD=P@55w0rd' -e 'MSSQL_PID=Developer' -p 1433:1433 microsoft/mssql-server-linux:2017-latest
```

> Note: For more information on running SQL Server for Linux, see [SQL Server Running on a Mac?!](https://medium.com/@reverentgeek/sql-server-running-on-a-mac-3efafda48861)

## Set Up Local Development Environment

1. Clone this repository (or download and extract the zip file)
2. Open a command prompt or terminal
3. Change to the directory that contains the project files
4. Run `npm install` to install all the dependencies
5. Copy `.env.sample` to `.env`, and modify the settings to match your environment

```bash
# hapi server configuration
PORT=8080
HOST=localhost
HOST_URL=http://localhost:8080
COOKIE_ENCRYPT_PWD=superAwesomePasswordStringThatIsAtLeast32CharactersLong!

# SQL Server connection
SQL_USER=dbuser
SQL_PASSWORD=P@55w0rd
SQL_DATABASE=calendar
SQL_SERVER=servername
# Change SQL_ENCRYPT=true if using Azure
SQL_ENCRYPT=false

# Okta configuration
OKTA_ORG_URL=https://{yourOktaDomain}
OKTA_CLIENT_ID={yourClientId}
OKTA_CLIENT_SECRET={yourClientSecret}
```

### Initialize Your SQL Database

You will need a SQL database to for this application. If you are running SQL Server locally and don't already have a database, you can create one with the following script. You can use a utility like [Azure Data Studio](https://docs.microsoft.com/en-us/sql/azure-data-studio/download?view=sql-server-2017) to connect to your instance to run this script.

```sql
USE master;
GO

CREATE DATABASE calendar; -- change this to whatever database name you desire
GO
```

Next you can run the following task at the command line or terminal to initialize your database. 

> Note: Make sure you have the correct server, database, user, and password configured in your `.env` file.

```bash
npm run tasks:initdb
```

### Easily Add Authentication to Your Applications with Okta

This application uses Okta for authentication. 

Before you begin, you'll need a free Okta developer account. Install the [Okta CLI](https://cli.okta.com) and run `okta register` to sign up for a new account. If you already have an account, run `okta login`.

Then, run `okta apps create`. Select the default app name, or change it as you see fit. Choose **Web** and press **Enter**.

Select **Other**. Then, change the Redirect URI to `http://localhost:8080/authorization-code/callback` and accept the default Logout Redirect URI of `http://localhost:8080`.

The Okta CLI will create an OIDC Web App in your Okta Org. It will add the redirect URIs you specified and grant access to the Everyone group. You will see output like the following when it's finished:

```
Okta application configuration has been written to: /path/to/app/.okta.env
```

Run `cat .okta.env` (or `type .okta.env` on Windows) to see the issuer and credentials for your app.

```bash
export OKTA_OAUTH2_ISSUER="https://dev-133337.okta.com/oauth2/default"
export OKTA_OAUTH2_CLIENT_ID="0oab8eb55Kb9jdMIr5d6"
export OKTA_OAUTH2_CLIENT_SECRET="NEVER-SHOW-SECRETS"
```

Your Okta domain is the first part of your issuer, before `/oauth2/default`.

NOTE: You can also use the Okta Admin Console to create your app. See [Create a Web App](https://developer.okta.com/docs/guides/sign-into-web-app/-/create-okta-application/) for more information.

Copy your Okta values into the `.env` file to replace the `{...}` placeholders.

```
OKTA_ORG_URL=https://{yourOktaDomain}
OKTA_CLIENT_ID={yourClientId}
OKTA_CLIENT_SECRET={yourClientSecret}
```

Next, enable self-service registration. This will allow new users to create their own account. Run `okta login` to get the URL for your Okta org. Open the result in your favorite browser and log in to the Okta Admin Console.

1. Click on the **Directory** menu and select **Self-Service Registration**.
2. Click on the **Enable Registration** button.
3. If you don't see this button, click **Edit** and change **Self-service registration** to *Enabled*.
4. Click the **Save** button at the bottom of the form.

### Run the Local Web Application

1. Run `npm run dev` to start the development server
1. Browse to `http://localhost:8080`

### Run the Tests

```bash
> npm run test
```

## Help

Please leave a commenent on this repo's [blog post](https://developer.okta.com/blog/2019/03/11/node-sql-server), [raise an issue](https://github.com/oktadeveloper/okta-node-sql-server-example/issues) if you find a problem with the example application, or visit our [Okta Developer Forums](https://devforum.okta.com/).

## License

Apache 2.0, see [LICENSE](LICENSE).
