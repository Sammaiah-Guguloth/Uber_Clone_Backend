# BACKEND API's DOCUMENTATION

## User Registeration Endpoint

`POST /users/register`

## Description

This endpoint allows users to register by providing their email, first name, last name, and password.

## Request Body

The request body must be in JSON format and include the following fields:

- `email`: A valid email address (required).
- `fullName`: An object containing:
  - `firstName`: A string with a minimum length of 3 characters (required).
  - `lastName`: A string with a minimum length of 3 characters (optional).
- `password`: A string with a minimum length of 6 characters (required).

### Example Request

```json
{
  "email": "user@example.com",
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "password": "securepassword"
}
Response
201 Created: User successfully registered.

Response body:
{
  "user": {
    "firstName": "John",
    "lastName": "Doe",
    "email": "user@example.com"
  },
  "token": "generated_auth_token"
}
400 Bad Request: Validation errors occurred.

Response body:
{
  "errors": [
    {
      "msg": "Invalid Email",
      "param": "email"
    },
    {
      "msg": "First name should be min 3 characters long",
      "param": "fullName.firstName"
    },
    {
      "msg": "Password should be of min 6 characters",
      "param": "password"
    }
  ]
}
Status Codes
201: User created successfully.
400: Validation errors.
```

## User Login Endpoint

`POST /users/login`

## Description

This endpoint allows users to log in by providing their email and password.

## Request Body

The request body must be in JSON format and include the following fields:

- `email`: A valid email address (required).
- `password`: A string with a minimum length of 6 characters (required).

### Example Request

```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
Response
200 OK: User successfully logged in.

Response body:
{
  "user": {
    "firstName": "John",
    "lastName": "Doe",
    "email": "user@example.com"
  },
  "token": "generated_auth_token"
}
401 Unauthorized: Invalid email or password.

Response body:
{
  "message": "Invalid email or password"
}
400 Bad Request: Validation errors occurred.

Response body:
{
  "errors": [
    {
      "msg": "Invalid email",
      "param": "email"
    },
    {
      "msg": "Password should be of min 6 characters",
      "param": "password"
    }
  ]
}
Status Codes
200: User logged in successfully.
401: Invalid email or password.
400: Validation errors.
```

## User Profile Endpoint

`GET /user/profile`

## Description

This endpoint allows authenticated users to retrieve their profile information.

## Request

No request body is required for this endpoint. The user must be authenticated.

## Response

- **200 OK**: User profile retrieved successfully.

  - Response body:
    ```json
    {
      "user": {
        "firstName": "John",
        "lastName": "Doe",
        "email": "user@example.com"
      }
    }
    ```

- **401 Unauthorized**: User is not authenticated.

  - Response body:
    ```json
    {
      "message": "Unauthorized"
    }
    ```

- **500 Internal Server Error**: An error occurred while verifying the token.
  - Response body:
    ```json
    {
      "error": "Error message"
    }
    ```

## Status Codes

- **200**: User profile retrieved successfully.
- **401**: User is not authenticated.
- **500**: An error occurred while processing the request.
