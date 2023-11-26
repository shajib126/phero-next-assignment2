- [x] create user
- [x] Retrieve a list of all users
- [x] Retrieve a specific user by ID
- [x] Update user information
- [x] Delete a User
- [x] Create Order
- [x] Retrieve All Orders for specific User
- [x] Calculate Total price of orders for a specific user
- [x] Error Handling in a specific format
- [x] response data as required
- [x] validation implemented 

# APIs

## to run server
```
npm run start:dev
```
## for typescript change
```
tsc -w
```

## Create User
```
METHOD POST api:  http://localhost:5000/api/users
```

## Gel All user
```
METHOD GET api:  http://localhost:5000/api/users
```
## Gel single user by id
```
METHOD GET api:  http://localhost:5000/api/users/userID
```
## Update user information
```
METHOD GET api:  http://localhost:5000/api/users/userId
```
## delete single user by id
```
METHOD GET api:  http://localhost:5000/api/users/userId
```
## update order by user id
```
METHOD GET api:  http://localhost:5000/api/users/userId/orders
```

## Gel order  by user id
```
METHOD GET api:  http://localhost:5000/api/users/userId/orders
```
## Total Price
```
METHOD GET api:  http://localhost:5000/api/users/userId/total-price
```

**Note:** Fetching challange to show response as requirement and updating order array of objet, but learned a lot by this assignment .