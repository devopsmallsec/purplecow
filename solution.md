# Project Purple Cow

## Requirement Checklist

- ReSTFUL Web application API that is served on port 3000 (done)
- items api (done)
- user must be able to create item (done)
- user must be able to list items (done)
- user must be able to delete items (done)
- json payload (done)
- object should have two properties \_id / name (done)
- persist in memory while application is running (done)
- Includes a Dockerfile that will run and serve the web application (done)
- Runs locally with a single startup command (done)
- Includes a solution.md that provides relevant documentation (see below) and how to
  build/run the solution (done)

## To Do

- no need: express for this simple app.
- use async hooks via express middleware

## Installation

### Manual

1. git clone https://github.com/leslyrevenge/purplecow.git
2. npm install
3. run application

- with nodemon: npm run dev
- without nodemon: npm start

## API

### Requests

- /api/items/create/
- /api/items/list/?name=name_here&&\_id=id_here
- /api/items/read/?name=name_here&&\_id=id_here
- /api/items/drop/

#### /api/items/create/

- type: post
- payload: { name: String }
- output: { \_id: String, name: String }

#### /api/items/list/?name=name_here&&\_id=id_here

- type: get
- query: ?name=searched_name_here&&\_id=searched_id_here
- output: [{ \_id: String, name: String }]

#### /api/items/read/?name=name_here&&\_id=id_here

- type: get
- query: ?name=searched_name_here&&\_id=searched_id_here
- output: { \_id: String, name: String }

#### /api/items/drop/

- type: delete
- output: []

#### Adding new routes

this process is used to manage API files via God View for applications that must be maintained by the organization who create it.

- categorize routes in folders
- add a file and include your api request
- include the file in the routes dictionary (dict)
