# Items List - monorepo

## To start the server and the client

> Setup Lerna on your machine

```sh
npm i -g lerna
lerna run start
```

> This boots up backend on <http://localhost:3001>
> and frontend on <http://localhost:3000>

## Backend routes

```http
GET /list/:token
```

Description
> Gets the list based on the token id passed

Reponse
> {
> "_id": "1234",
> "items": [
> {
> "content": "This is item 1"
> },
> {
> "content": "This is item 2"
> },
> {
> "content": "This is item 3"
> },
> {
> "content": "This is item 4"
> },
> {
> "content": "This is item 5"
> }
> ]
> }

```http
POST /list/:token
```

Description
> Post a new item to the list

Request
> {
> "item": "This is some item"
> }

Response
> Success Response: 201 Created

```http
DELETE /list/:token/:item
```

Description
> Delete an item from the list

Response
> Success Response: 202 Accepted

```http
DELETE /list/:token
```

Description
> Reset a list

Response
> Success Response: 202 Accepted

```http
PATCH /list/:token/:item
```

Description
> Update an item in the list

Request
> {
> "content": "This is item 2.1"
> }

Response
> Success Response: 202 Accepted

## Tests

To run the unit tests on the backend (list-service):

```bash
lerna run test --scope @varunsikka/list-service
```

### Code Coverage

Running the above tests will generate the code coverage for the backend tests
To view the code coverage, go to the Root folder and open the file packages/list-service/coverage/index.html

## Deployment

Deployment using Docker:

```sh
docker build --tags list-node-react-test
docker run -p 3001:3001 -p 3000:3000 list-node-react-test
```
