# API Documentation
**Base URL**: `http://localhost:8080/api/`

## Users APIs
### Endpoints: Register
- **HTTP Method**: `POST`
- **Path**: `/users/register`
- **Description**: User registration.
- **Parameters**:
  - **Request body**:
    - `name`: Required name of the user.
    - `email`: Required name of the email.
    - `password`: Required name of the password.
- **Response**:
  - **Status codes**: 
    - `201 CREATED`: Successfully registered.
  - **Response body**:
    ```json
    {
        "_id": <user._id>,
        "name": <user.name>,
        "email": <user.email>,
    }
    ```
### Endpoints: Login
- **HTTP Method**: `POST`
- **Path**: `/users/login`
- **Description**: User login.
- **Parameters**:
  - **Request body**:
    - `email`: Required name of the email.
    - `password`: Required name of the password.
- **Response**:
  - **Status codes**: 
    - `200 OK`: Successfully login.
  - **Response body**:
    ```json
    {
        "user": {
            "_id": <user._id>,
            "name": <user.name>,
            "email": <user.email>,
            "password": <user.hashedPassword>,
            "createdAt": <user.createdAt>,
            "updatedAt": <user.updatedAt>
        },
        "token": <accessToken>,
    }
    ```

## Orders APIs
### Endpoint: List all orders
- **HTTP Method**: `GET`
- **Path**: `/orders`
- **Description**: Retrieve a list of all orders by current login user in the system.
- **Response**:
  - **Status codes**: 
    - `200 OK`: Successfully retrieved orders.
  - **Response body**:
    ```json
    [
      {
        "_id": <order._id>,
        "user_id": <user._id>,
        "name": <order.name>,
        "weight": <order.weight>,
        "price": <order.price>,
        "status": <order.status>,
        "createdAt": <order.createdAt>,
        "updatedAt": <order.updatedAt>
      },
      ...
    ]
    ```

### Endpoint: Get specific order by ID
- **HTTP Method**: `GET`
- **Path**: `/orders/:id`
- **Description**: Retrieve details pf a specific order.
- **Parameters**:
  - **Path parameters**:
    - `id`: ID of the order to retrieve.
- **Response**:
  - **Status codes**: 
    - `200 OK`: Successfully retrieved the order.
    - `404 NOT FOUND`: Order with the given ID does not exist.
    - `403 NOT FOUND`: Current user doesn't have permission to access the order.
  - **Response body**:
    ```json
    {
        "_id": <order._id>,
        "user_id": <user._id>,
        "name": <order.name>,
        "weight": <order.weight>,
        "price": <order.price>,
        "status": <order.status>,
        "createdAt": <order.createdAt>,
        "updatedAt": <order.updatedAt>
    }
    ```

### Endpoint: Add a new order
- **HTTP Method**: `POST`
- **Path**: `/orders`
- **Description**: Add a new order to the system.
- **Parameters**:
  - **Request body**:
    ```json
    {
      "name": "Required name of the order",
      "weight": "Required weight of the order",
      "price": "Required price of the order"
    }
    ```
- **Response**:
  - **Status codes**: 
    - `201 CREATED`: Successfully added the order.
    - `400 BAD REQUEST`: Invalid request body.
  - **Response body**:
    ```json
    {
        "_id": <order._id>,
        "user_id": <user._id>,
        "name": <order.name>,
        "weight": <order.weight>,
        "price": <order.price>,
        "status": <order.status>,
        "createdAt": <order.createdAt>,
        "updatedAt": <order.updatedAt>
    }
    ```

## GroupOrders APIs
### Endpoint: List all group orders
- **HTTP Method**: `GET`
- **Path**: `/groupOrders`
- **Description**: Retrieve a list of all group orders by current login user in the system.
- **Response**:
  - **Status codes**: 
    - `200 OK`: Successfully retrieved group orders.
  - **Response body**:
    ```json
    [
      {
        "_id": <groupOrder._id>,
        "manager_id": <user._id>,
        "name": <groupOrder.name>,
        "country": <groupOrder.country>,
        "deadline": <groupOrder.deadline>,
        "order_ids": [
            <order._id>
            ...
        ],
        "createdAt": <groupOrder.createdAt>,
        "updatedAt": <groupOrder.updatedAt>
      },
      ...
    ]
    ```

### Endpoint: Get specific group order by ID
- **HTTP Method**: `GET`
- **Path**: `/groupOrders/:id`
- **Description**: Retrieve details pf a specific group order.
- **Parameters**:
  - **Path parameters**:
    - `id`: ID of the group order to retrieve.
- **Response**:
  - **Status codes**: 
    - `200 OK`: Successfully retrieved the group order.
    - `404 NOT FOUND`: Group order with the given ID does not exist.
    - `403 NOT FOUND`: Current user doesn't have permission to access the group order.
  - **Response body**:
    ```json
    {
        "_id": <groupOrder._id>,
        "manager_id": <user._id>,
        "name": <groupOrder.name>,
        "country": <groupOrder.country>,
        "deadline": <groupOrder.deadline>,
        "order_ids": [
            <order._id>
            ...
        ],
        "createdAt": <groupOrder.createdAt>,
        "updatedAt": <groupOrder.updatedAt>
    },
    ```

### Endpoint: Add a new group order
- **HTTP Method**: `POST`
- **Path**: `/groupOrders`
- **Description**: Add a new group order to the system.
- **Parameters**:
  - **Request body**:
    ```json
    {
      "name": "Required name of the group order",
      "country": "Required country of the group order",
      "deadline": "Optional deadline of the group order"
    }
    ```
- **Response**:
  - **Status codes**: 
    - `201 CREATED`: Successfully added the group order.
    - `400 BAD REQUEST`: Invalid request body.
  - **Response body**:
    ```json
    {
        "_id": <groupOrder._id>,
        "manager_id": <user._id>,
        "name": <groupOrder.name>,
        "country": <groupOrder.country>,
        "deadline": <groupOrder.deadline>,
        "order_ids": [],
        "createdAt": <groupOrder.createdAt>,
        "updatedAt": <groupOrder.updatedAt>
    },
    ```

## Errors
- `500 SERVER ERROR`: Internal Server Error.