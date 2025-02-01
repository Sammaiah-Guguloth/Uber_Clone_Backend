# BACKEND API's DOCUMENTATION

## Endpoint

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
