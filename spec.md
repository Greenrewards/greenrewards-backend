# GreenRewards API Specification

The GreenRewards API provides endpoints to manage user authentication, recycling centers, recycling activities, and token rewards. This specification outlines the routes, request formats, and response formats for the API.

## Authentication

### Register a User

- **Endpoint:** `/users/sign-up`
- **Method:** POST
- **Request Body:**
  ```json
  {
    "fullName": "Your full name",
    "email": "Your email address",
    "password": "secured password",
    "countryOfResidence": "Your country of residence",
    "recyclingHabits": "Choose your recycling habits",
    "signupOption": "choose your signup option"
  }
  ```
- **Response:**
  - Status Code: 201 Created
  - Body: `{"message": "User registered successfully"}`

### Login

- **Endpoint:** `/users/login`
- **Method:** POST
- **Request Body:**
  ```json
  {
    "email": "your email address",
    "password": "secretpassword"
  }
  ```
- **Response:**
  - Status Code: 200 OK
  - Body: `{"token": "your-generated-jwt-token"}`

## Recycling Centers

### List Recycling Centers

- **Endpoint:** `/api/recycling/centers`
- **Method:** GET
- **Response:**
  - Status Code: 200 OK
  - Body: Array of recycling center objects

## Recycling Activities

### Submit Proof of Recycling

- **Endpoint:** `/api/recycling/submit-proof`
- **Method:** POST
- **Headers:** Authorization: Bearer \<your-jwt-token\>
- **Request Body:**
  ```json
  {
    "userId": "user-id",
    "proofDetails": "Proof details"
  }
  ```
- **Response:**
  - Status Code: 201 Created
  - Body: `{"message": "Recycling proof submitted successfully"}`

## Token Rewards

### Exchange Tokens

- **Endpoint:** `/api/tokens/exchange`
- **Method:** POST
- **Headers:** Authorization: Bearer \<your-jwt-token\>
- **Request Body:**
  ```json
  {
    "userId": "user-id",
    "tokens": 10
  }
  ```
- **Response:**
  - Status Code: 200 OK
  - Body: `{"message": "Tokens exchanged successfully"}`

## Error Responses

- Status Code: 400 Bad Request

  - Body: `{"error": "Bad request"}`

- Status Code: 401 Unauthorized

  - Body: `{"error": "Unauthorized"}`

- Status Code: 404 Not Found

  - Body: `{"error": "Resource not found"}`

- Status Code: 500 Internal Server Error
  - Body: `{"error": "Internal server error"}`

## Data Models

- User:

  ```json
  {
    "id": "user-id",
    "username": "user123"
  }
  ```

- Recycling Center:

  ```json
  {
    "id": "center-id",
    "name": "Example Recycling Center"
  }
  ```

- Recycling Activity:

  ```json
  {
    "id": "activity-id",
    "userId": "user-id",
    "proofDetails": "Proof details"
  }
  ```

- Token Exchange:
  ```json
  {
    "userId": "user-id",
    "tokens": 10
  }
  ```

## License

This API specification is provided under the [MIT License](LICENSE).


