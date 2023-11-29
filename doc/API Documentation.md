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
    - `email`: Required email of the user.
    - `password`: Required name of the password.
    - `role`: Required role of the user.
- **Response**:
  - **Status codes**: 
    - `201 CREATED`: Successfully registered.
  - **Response body**:
    ```json
    {
        "_id": "<user._id>",
        "name": "<user.name>",
        "email": "<user.email>",
        "role": "<user.role>",
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
            "_id": "<user._id>",
            "name": "<user.name>",
            "email": "<user.email>",
            "password": "<user.hashedPassword>",
            "createdAt": "<user.createdAt>",
            "updatedAt": "<user.updatedAt>"
        },
        "token": "<accessToken>",
    }
    ```
### Endpoints: Current User
- **HTTP Method**: `GET`
- **Path**: `/users/current`
- **Description**: Get current login user informations.
- **Response**:
  - **Status codes**: 
    - `200 OK`: Successfully retrived user.
    - `404 NOT FOUND`: User not found.
  - **Response body**:
    ```json
    {
        "user": {
            "_id": "<user._id>",
            "name": "<user.name>",
            "email": "<user.email>",
            "password": "<user.hashedPassword>",
            "createdAt": "<user.createdAt>",
            "updatedAt": "<user.updatedAt>",
            "shipment_id": "<user.shipment_id>",
            "shipment":{
              "_id": "<shipment._id>",
              "user_id": "<user._id>",
              "first_name": "<shipment.first_name>",
              "last_name": "<shipment.last_name>",
              "address_1": "<shipment.address_1>",
              "address_2": "<shipment.address_2>",
              "state": "<shipment.state>",
              "city": "<shipment.city>",
              "zip_code": "<shipment.zip_code>",
              "createdAt": "<shipment.createdAt>",
              "updatedAt": "<shipment.updatedAt>",
            },
            "payment":{
              "_id": "<payment._id>",
              "card_type": "<payment.card_type>",
              "card_number": "<payment.card_number>",
              "bank_name": "<payment.bank_name>",
              "bill_address_1": "<payment.bill_address_1>",
              "bill_address_2": "<payment.bill_address_2>",
              "state": "<payment.state>",
              "city": "<payment.city>",
              "zip_code": "<payment.zip_code>",
              "createdAt": "<payment.createdAt>",
              "updatedAt": "<payment.updatedAt>"
            }
        },
        "token": "<accessToken>",
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
        "_id": "<order._id>",
        "user_id": "<user._id>",
        "groupOrder_id": "<groupOrder._id>",
        "name": "<order.name>",
        "weight": "<order.weight>",
        "price": "<order.price>",
        "status": "<order.status>",
        "createdAt": "<order.createdAt>",
        "updatedAt": "<order.updatedAt>"
      },
      ...
    ]
    ```

### Endpoint: Add a new order
- **HTTP Method**: `POST`
- **Path**: `/orders`
- **Description**: Add a new order to the system. The status is 0 as default.
- **Parameters**:
  - **Request body**:
    ```json
    {
      "name": "Required name of the order",
      "weight": "Required weight of the order",
      "price": "Required price of the order",
      "groupOrder_id": "Required group order ID of the order",
    }
    ```
- **Response**:
  - **Status codes**: 
    - `201 CREATED`: Successfully added the order.
    - `400 BAD REQUEST`: Invalid request body.
  - **Response body**:
    ```json
    {
        "_id": "<order._id>",
        "user_id": "<user._id>",
        "groupOrder_id": "<groupOrder._id>",
        "name": "<order.name>",
        "weight": "<order.weight>",
        "price": "<order.price>",
        "status": "<order.status>",
        "createdAt": "<order.createdAt>",
        "updatedAt": "<order.updatedAt>"
    }
    ```

### Endpoint: Get specific order by ID
- **HTTP Method**: `GET`
- **Path**: `/orders/:id`
- **Description**: Retrieve details of a specific order.
- **Parameters**:
  - **Path parameters**:
    - `id`: ID of the order to retrieve.
- **Response**:
  - **Status codes**: 
    - `200 OK`: Successfully retrieved the order.
    - `404 NOT FOUND`: Order with the given ID does not exist.
    - `403 FORBIDDEN`: Current user doesn't have permission to access the order.
  - **Response body**:
    ```json
    {
        "_id": "<order._id>",
        "user_id": "<user._id>",
        "groupOrder_id": "<groupOrder._id>",
        "name": "<order.name>",
        "weight": "<order.weight>",
        "price": "<order.price>",
        "status": "<order.status>",
        "createdAt": "<order.createdAt>",
        "updatedAt": "<order.updatedAt>"
    }
    ```

### Endpoint: Update an order
- **HTTP Method**: `PUT`
- **Path**: `/orders/:id`
- **Description**: Update an order to the system.
- **Parameters**:
  - **Request body**:
    ```json
    {
      "name": "Optional name of the order",
      "weight": "Optional weight of the order",
      "price": "Optional price of the order",
    }
    ```
- **Response**:
  - **Status codes**: 
    - `200 OK`: Successfully updated the order.
    - `400 BAD REQUEST`: Invalid request body.
  - **Response body**:
    ```json
    {
        "_id": "<order._id>",
        "user_id": "<user._id>",
        "groupOrder_id": "<groupOrder._id>",
        "name": "<order.name>",
        "weight": "<order.weight>",
        "price": "<order.price>",
        "status": "<order.status>",
        "createdAt": "<order.createdAt>",
        "updatedAt": "<order.updatedAt>"
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
        "_id": "<groupOrder._id>",
        "manager_id": "<user._id>",
        "name": "<groupOrder.name>",
        "country": "<groupOrder.country>",
        "deadline": "<groupOrder.deadline>",
        "status": "<groupOrder.status>",
        "order_ids": [
          "<order._id>",
          "..."
        ],
        "createdAt": "<groupOrder.createdAt>",
        "updatedAt": "<groupOrder.updatedAt>"
      },
      ...
    ]
    ```

### Endpoint: Add a new group order
- **HTTP Method**: `POST`
- **Path**: `/groupOrders`
- **Description**: Add a new group order to the system. The status is 0 as default.
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
      "_id": "<groupOrder._id>",
      "manager_id": "<user._id>",
      "name": "<groupOrder.name>",
      "country": "<groupOrder.country>",
      "deadline": "<groupOrder.deadline>",
      "status": 0,
      "order_ids": [],
      "createdAt": "<groupOrder.createdAt>",
      "updatedAt": "<groupOrder.updatedAt>"
    },
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
    - `403 FORBIDDEN`: Current user doesn't have permission to access the group order.
  - **Response body**:
    ```json
    {
      "_id": "<groupOrder._id>",
      "manager": [
        {
          "_id": "<user._id>",
          "name": "<user.name>",
          "email": "<user.email>"
        }
      ],
      "name": "<groupOrder.name>",
      "country": "<groupOrder.country>",
      "deadline": "<groupOrder.deadline>",
      "createdAt": "<groupOrder.createdAt>",
      "updatedAt": "<groupOrder.updatedAt>",
      "orders": [
        {
          "_id": "<order._id>",
          "user_id": "<user._id>",
          "groupOrder_id": "<groupOrder._id>",
          "name": "<order.name>",
          "weight": "<order.weight>",
          "price": "<order.price>",
          "status": "<order.status>",
          "createdAt": "<order.createdAt>",
          "updatedAt": "<order.updatedAt>"
        },
        // ... other orders
      ]
    },
    ```

### Endpoint: Update an group order
- **HTTP Method**: `PUT`
- **Path**: `/groupOrders/:id`
- **Description**: Update an group order to the system.
- **Parameters**:
  - **Request body**:
    ```json
    {
      "name": "Optional name of the order",
      "country": "Optional country of the order",
      "deadline": "Optional deadline of the order",
    }
    ```
- **Response**:
  - **Status codes**: 
    - `200 OK`: Successfully updated the group order.
    - `400 BAD REQUEST`: Invalid request body.
  - **Response body**:
    ```json
    {
        "_id": "<groupOrder._id>",
        "manager_id": "<user._id>",
        "name": "<groupOrder.name>",
        "country": "<groupOrder.country>",
        "deadline": "<groupOrder.deadline>",
        "order_ids": [
          "<order._id>",
          ...
        ],
        "createdAt": "<order.createdAt>",
        "updatedAt": "<order.updatedAt>"
    }
    ```

## Shipments APIs
### Endpoints: Add a new shipment
- **HTTP Method**: `POST`
- **Path**: `/shipments`
- **Description**: Add a new shipment to an exist user.
- **Parameters**:
  - **Request body**:
    - `firstName`: Required first name of the shipment.
    - `lastName`: Required last name of the shipment.
    - `address1`: Required first line of address of the shipment.
    - `address2`: Optional second line of address of the shipment.
    - `state`: Required state of the shipment.
    - `city`: Required city of the shipment.
    - `zipCode`: Required zip code of the shipment.
- **Response**:
  - **Status codes**: 
    - `201 CREATED`: Successfully added the shipment.
    - `400 BAD REQUEST`: Invalid request body.
  - **Response body**:
    ```json
    {
      "_id": "<shipment._id>",
      "first_name": "<shipment.first_name>",
      "last_name": "<shipment.last_name>",
      "address_1": "<shipment.address_1>",
      "address_2": "<shipment.address_2>",
      "state": "<shipment.state>",
      "city": "<shipment.city>",
      "zip_code": "<shipment.zip_code>",
      "createdAt": "<shipment.createdAt>",
      "updatedAt": "<shipment.updatedAt>"
    }
    ```

### Endpoints: Upsert shipment to user
- **HTTP Method**: `POST`
- **Path**: `/shipments/upsert`
- **Description**: Create or update shipment to an exist user.
- **Parameters**:
  - **Request body**:
    - `firstName`: Required first name of the shipment.
    - `lastName`: Required last name of the shipment.
    - `address1`: Required first line of address of the shipment.
    - `address2`: Optional second line of address of the shipment.
    - `state`: Required state of the shipment.
    - `city`: Required city of the shipment.
    - `zipCode`: Required zip code of the shipment.
- **Response**:
  - **Status codes**: 
    - `201 CREATED`: Successfully added the shipment.
    - `400 BAD REQUEST`: Invalid request body.
  - **Response body**:
    ```json
    {
      "_id": "<shipment._id>",
      "first_name": "<shipment.first_name>",
      "last_name": "<shipment.last_name>",
      "address_1": "<shipment.address_1>",
      "address_2": "<shipment.address_2>",
      "state": "<shipment.state>",
      "city": "<shipment.city>",
      "zip_code": "<shipment.zip_code>",
      "createdAt": "<shipment.createdAt>",
      "updatedAt": "<shipment.updatedAt>"
    }
    ```

## Payments APIs
### Endpoints: Get Payment Information
- **HTTP Method**: `GET`
- **Path**: `/payments`
- **Description**: Retrieves payment information for the current user.
- **Parameters**: None
- **Response**:
  - **Status Codes**:
    - `200 OK`: Successfully retrieved the payment information.
    - `404 NOT FOUND`: Payment information not found for the user.
    - `500 INTERNAL SERVER ERROR`: An error occurred on the server.
  - **Response Body**:
    ```json
    {
        "_id": "<payment._id>",
        "card_type": "<payment.card_type>",
        "card_number": "<payment.card_number>",
        "bank_name": "<payment.bank_name>",
        "bill_address_1": "<payment.bill_address_1>",
        "bill_address_2": "<payment.bill_address_2>",
        "state": "<payment.state>",
        "city": "<payment.city>",
        "zip_code": "<payment.zip_code>",
        "createdAt": "<payment.createdAt>",
        "updatedAt": "<payment.updatedAt>"
    }
    ```

### Endpoints: Create Payment Information
- **HTTP Method**: `POST`
- **Path**: `/payments`
- **Description**: Creates new payment information for the current user.
- **Parameters**:
  - **Request Body**:
    - `cardType`: Required card type of the payment.
    - `cardNumber`: Required card number of the payment.
    - `bankName`: Required bank name associated with the payment.
    - `billAddress1`: Required billing address line 1 of the payment.
    - `billAddress2`: Optional billing address line 2 of the payment.
    - `state`: Required state for the billing address.
    - `city`: Required city for the billing address.
    - `zipCode`: Required ZIP code for the billing address.
- **Response**:
  - **Status Codes**:
    - `201 CREATED`: Successfully created the payment information.
    - `442 UNPROCESSABLE ENTITY`: Failed to create payment information.
    - `500 INTERNAL SERVER ERROR`: An error occurred on the server.
  - **Response Body**:
    ```json
    {
        "_id": "<payment._id>",
        "card_type": "<payment.card_type>",
        "card_number": "<payment.card_number>",
        "bank_name": "<payment.bank_name>",
        "bill_address_1": "<payment.bill_address_1>",
        "bill_address_2": "<payment.bill_address_2>",
        "state": "<payment.state>",
        "city": "<payment.city>",
        "zip_code": "<payment.zip_code>",
        "createdAt": "<payment.createdAt>",
        "updatedAt": "<payment.updatedAt>"
    }
    ```

### Endpoints: Update Payment Information
- **HTTP Method**: `PUT`
- **Path**: `/payments`
- **Description**: Updates existing payment information for the current user.
- **Parameters**:
  - **Request Body**: Same as "Create Payment Information."
- **Response**:
  - **Status Codes**:
    - `200 OK`: Successfully updated the payment information.
    - `404 NOT FOUND`: Payment information not found for the user.
    - `500 INTERNAL SERVER ERROR`: An error occurred on the server.
  - **Response Body**:
    ```json
    {
        "_id": "<payment._id>",
        "card_type": "<payment.card_type>",
        "card_number": "<payment.card_number>",
        "bank_name": "<payment.bank_name>",
        "bill_address_1": "<payment.bill_address_1>",
        "bill_address_2": "<payment.bill_address_2>",
        "state": "<payment.state>",
        "city": "<payment.city>",
        "zip_code": "<payment.zip_code>",
        "createdAt": "<payment.createdAt>",
        "updatedAt": "<payment.updatedAt>"
    }
    ```

### Endpoints: Upsert Payment Information
- **HTTP Method**: `POST`
- **Path**: `/payments/upsert`
- **Description**: Creates or updates payment information for the current user.
- **Parameters**:
  - **Request Body**: Same as "Create Payment Information."
- **Response**:
  - **Status Codes**:
    - `200 OK`: Successfully upserted the payment information.
    - `500 INTERNAL SERVER ERROR`: An error occurred on the server.
  - **Response Body**:
    ```json
    {
        "_id": "<payment._id>",
        "card_type": "<payment.card_type>",
        "card_number": "<payment.card_number>",
        "bank_name": "<payment.bank_name>",
        "bill_address_1": "<payment.bill_address_1>",
        "bill_address_2": "<payment.bill_address_2>",
        "state": "<payment.state>",
        "city": "<payment.city>",
        "zip_code": "<payment.zip_code>",
        "createdAt": "<payment.createdAt>",
        "updatedAt": "<payment.updatedAt>"
    }
    ```

## Errors
- `400 BAD REQUEST`: Invalid request body.
- `403 FORBIDDEN`: User has no permission to access the resource.
- `404 NOT FOUND`: Cannot find the requested resource.
- `500 SERVER ERROR`: Internal server error.