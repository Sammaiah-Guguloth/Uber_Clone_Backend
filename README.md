# API's DOCUMENTATION

## Users Registration Endpoint

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
```

## Response

- **201 Created**: User successfully registered.

  - Response body:
    ```json
    {
      "user": {
        "firstName": "John",
        "lastName": "Doe",
        "email": "user@example.com"
      },
      "token": "generated_auth_token"
    }
    ```

- **400 Bad Request**: Validation errors occurred.
  - Response body:
    ```json
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
    ```

## Status Codes

- **201**: User created successfully.
- **400**: Validation errors.

## Users Login Endpoint

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
```

## Response

- **200 OK**: User successfully logged in.

  - Response body:
    ```json
    {
      "user": {
        "firstName": "John",
        "lastName": "Doe",
        "email": "user@example.com"
      },
      "token": "generated_auth_token"
    }
    ```

- **401 Unauthorized**: Invalid email or password.

  - Response body:
    ```json
    {
      "message": "Invalid email or password"
    }
    ```

- **400 Bad Request**: Validation errors occurred.
  - Response body:
    ```json
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
    ```

## Status Codes

- **200**: User logged in successfully.
- **401**: Invalid email or password.
- **400**: Validation errors.

## Users Logout Endpoint

`GET /users/logout`

## Description

This endpoint allows authenticated users to log out by invalidating their authentication token.

## Request

No request body is required for this endpoint. The user must be authenticated.

## Response

- **200 OK**: User logged out successfully.

  - Response body:
    ```json
    {
      "message": "User logged out successfully"
    }
    ```

- **401 Unauthorized**: User is not authenticated.

  - Response body:
    ```json
    {
      "message": "Unauthorized"
    }
    ```

- **500 Internal Server Error**: An error occurred while processing the logout.
  - Response body:
    ```json
    {
      "error": "Error message"
    }
    ```

## Status Codes

- **200**: User logged out successfully.
- **401**: User is not authenticated.
- **500**: An error occurred while processing the request.

## Users Profile Endpoint

`GET /users/profile`

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

## Captains Registration Endpoint

`POST /captains/register`

## Description

This endpoint allows a new captain to register in the system. It validates the input data and creates a new captain record if the data is valid and the captain does not already exist.

## Request

- **Method**: POST
- **URL**: `/captains/register`

### Request Body

The request body must be a JSON object containing the following fields:

```json
{
  "fullName": {
    "firstName": "string (min: 3 characters)",
    "lastName": "string (min: 3 characters)"
  },
  "email": "string (valid email address)",
  "password": "string (min: 6 characters)",
  "vehicle": {
    "color": "string (min: 3 characters)",
    "plate": "string (min: 3 characters)",
    "capacity": "integer (min: 1)",
    "type": "string (must be one of: car, motorcycle, auto)"
  }
}
```

### Validation Rules

- `fullName.firstName`: Must be at least 3 characters long.
- `fullName.lastName`: Must be at least 3 characters long.
- `email`: Must be a valid email address.
- `password`: Must be at least 6 characters long.
- `vehicle.color`: Must be at least 3 characters long.
- `vehicle.plate`: Must be at least 3 characters long.
- `vehicle.capacity`: Must be an integer with a minimum value of 1.
- `vehicle.type`: Must be one of the following: "car", "motorcycle", "auto".

## Response

On success, the response will be a JSON object with the following structure:

```json
{
  "message": "captain created",
  "captain": {
    "firstName": "string",
    "lastName": "string",
    "email": "string",
    "vehicle": {
      "color": "string",
      "plate": "string",
      "capacity": "integer",
      "type": "string"
    }
  },
  "token": "string (JWT token)"
}
```

### Possible Error Responses

- **400 Bad Request**: If validation fails or if the captain already exists.
  - Example:
  ```json
  {
    "errors": [
      {
        "msg": "First name must be at least 3 characters long",
        "param": "fullName.firstName",
        "location": "body"
      }
    ]
  }
  ```
- **500 Internal Server Error**: If an unexpected error occurs during registration.
  - Example:
  ```json
  {
    "error": "Error message"
  }
  ```

## Notes

Ensure that all required fields are provided and valid to successfully register a captain.
