# EXPRESS_JS project

This project is based on the express.js.

## How to run the application

1. Open the terminal and install the packages: `npm install`.
2. Run application `node app.js`.
3. Test Endpoints with Curl or Postman.

## Apis

### GET Block Endpoint

The web API contains a GET endpoint that responds to a request using a URL path with a block height parameter or properly handles an error if the height parameter is out of bounds.

URL: http://localhost:8000/block/0

### POST Block Endpoint

The web API contains a POST endpoint that allows posting a new block with the data payload option to add data to the block body. Block body should support a string of text.

URL: http://localhost:8000/block