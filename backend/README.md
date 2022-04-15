# Node.js

Node.js is an open-source, cross-platform, JavaScript runtime environment.

For more information, visit [Node.js](https://nodejs.org) website.


## Installation

1. Go to the [Node.js](https://nodejs.org/en/) website and follow the instructions to install.
2. Verify installation. Open Powershell in your working folder and run:

```PowerShell
node -v
```
```
npm -v
```

## Windows

In Windows, execute Node and npm commands in Powershell as Administrator, inside the backend folder of our project.

## Start your Node Backend Server
You may follow any one of the below steps to start backend server (Using Nodemon is preferred).

### Using Nodemon Dependency
Start your server with the nodemon command followed by the name of the JavaScript file.

```PowerShell
nodemon app.js
```

### Traditional way
Start your server with the node command followed by the name of the JavaScript file.

<p>In this case, after any modification to the server logic, use CTRL-C to stop your server.
  Restart the server using the same node command to see your changes.</p>

```PowerShell
node app.js
```


## License

Node.js is available under the
[MIT license](https://opensource.org/licenses/MIT).
