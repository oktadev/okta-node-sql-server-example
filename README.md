# Build a Secure Node.js with SQL Server

This is a sample application for the article [Build a Secure Node.js with SQL Server]().

Built with love, using:

* [Node.js](https://nodejs.org/en/)
* [SQL Server](https://www.microsoft.com/en-us/sql-server/sql-server-2017)
* [hapi](https://hapijs.com/)

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

Note: For more information on running SQL Server for Linux, see [SQL Server Running on a Mac?!](https://medium.com/@reverentgeek/sql-server-running-on-a-mac-3efafda48861)

## Set Up Local Development Environment

1. Clone this repository (or download and extract the zip file)
2. Open a command prompt or terminal
3. Change to the directory that contains the project files
4. Run `npm install` to install all the dependencies
5. Copy `.env.sample` to `.env`, and modify the settings to match your environment

```bash
# Hapi Server Configuration
PORT=8080
HOST=localhost
HOST_URL=http://localhost:8080
COOKIE_ENCRYPT_PWD=superAwesomePasswordStringThatIsAtLeast32CharactersLong!

# SQL Server Connection Configuration
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

### Easily Add Authentication to Your Applications with Okta

This application uses Okta for authentication. To complete your development set up, you'll need an Okta developer account. Go to the [Okta Developer Portal](https://developer.okta.com/) and sign up for a forever free Okta account.

![](docs/add-application-00.jpg)

![](docs/add-application-01.jpg)

![](docs/add-application-02.jpg)

![](docs/add-application-03.jpg)

![](docs/add-application-04.jpg)

![](docs/self-service-registration-01.jpg)

![](docs/self-service-registration-02.jpg)

![](docs/your-org-url.png)

### Run the Local Web Application

1. Run `npm run dev` to start the development server
1. Browse to `http://localhost:8080`

### Run the Tests

```bash
> npm run test
```

