# api-server

REST API built using Express, Sequelize, and SQL.


Thunder Client Responses: 

POST: http://localhost:3001/food 
JSON CONTENT (BODY):
 {
  "name": "Pizza",
  "category": "Dinner",
  "calories": 800
}

RESPONSE:
 {
  "id": 1,
  "name": "Pizza",
  "category": "Dinner",
  "calories": 800,
  "updatedAt": "2026-09-16T20:18:09.286Z",
  "createdAt": "2026-09-16T20:18:09.286Z"
}

GET: RESPONSE:   {
    "id": 1,
    "name": "Pizza",
    "category": "Dinner",
    "calories": 800,
    "createdAt": "2026-09-16T20:18:09.286Z",
    "updatedAt": "2026-09-16T20:18:09.286Z"
  }


DELETE: null 

## Tests

Tests were created using Jest and Supertest.

Testing includes:

- 404 bad route
- 404 bad method
- Create
- Read All
- Read One
- Update
- Delete


* PR link: https://github.com/Naomi0585/api-server/pull/2 
* Deployed site: https://api-server-wp74.onrender.com