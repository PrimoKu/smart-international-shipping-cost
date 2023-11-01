# Enums Documentation

## UserRole Enum

### `UserRole`
Defines different user roles within the system.

- `NORMAL`: Represents a regular user with standard privileges (value: 0).
- `SHIPPER`: Represents a user with shipping privileges or responsibilities (value: 1).

### `UserRoleList`
An array of objects representing user roles. Each object in the list has the following structure:
- `text`: A human-readable label for the role (e.g., 'Normal', 'Shipper').
- `name`: A lower-cased string identifier for the role (e.g., 'normal', 'shipper').
- `value`: The numerical value associated with the role, matching the `UserRole` enum.


## OrderStatus Enum

### `OrderStatus`
Defines the various statuses an order can have in the system.

- `PENDING`: Indicates an order that is awaiting processing or approval (value: 0).
- `APPROVED`: Represents an order that has been approved and is possibly in the process of being fulfilled (value: 1).
- `CANCELED`: Denotes an order that has been canceled and is no longer active (value: 2).

### `OrderStatusList`
An array of objects, each detailing a specific order status. The structure of each object is:
- `text`: The text description of the order status (e.g., 'Pending', 'Approved', 'Canceled').
- `name`: A lower-cased string identifier for the status (e.g., 'pending', 'approved', 'canceled').
- `value`: The numerical value corresponding to the status, as defined in `OrderStatus`.


## GroupOrderStatus Enum

### `GroupOrderStatus`
Describes the various stages or statuses that a group order can have.

- `CANCELED`: The group order has been canceled (value: 0).
- `PENDING`: The group order is pending and awaiting further actions or decisions (value: 1).
- `SUBMITTED`: Indicates that the group order has been submitted and is under review or processing (value: 2).
- `SHIPPING`: The group order is in the shipping process (value: 3).
- `DELIVERED`: The group order has been successfully delivered (value: 4).

### `GroupOrderStatusList`
A collection of objects, each representing a status of a group order. Each object includes:
- `text`: A readable label for the status (e.g., 'Canceled', 'Pending', etc.).
- `name`: A name identifier in lower-case (e.g., 'canceled', 'pending', etc.).
- `value`: The numeric value that corresponds to each status in the `GroupOrderStatus` enum.


## USStates Enum

### `USStates`
Represents the abbreviation for each state in the United States.

- Each state is represented by its commonly used two-letter abbreviation (e.g., `AL` for Alabama, `AK` for Alaska, etc.).

### `USStatesList`
A list containing objects for each U.S. state. The structure of each object in the list is as follows:
- `text`: The full, human-readable name of the state (e.g., 'Alabama', 'Alaska').
- `name`: A lower-cased string identifier for the state (e.g., 'alabama', 'alaska').
- `value`: The two-letter abbreviation for the state, as defined in the `USStates` enum.
