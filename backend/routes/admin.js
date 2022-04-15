const express = require('express');
const router = express.Router();
const adminController = require('../controller/adminController');
const paymentController = require('../controller/paymentController')
require('../db/connection');

const authenticate = require('../middleware/authenticate');
const authenticateRestaurant = require('../middleware/authenticateRestaurant');



router.post("/api/rzpOrder", paymentController.rzpOrder);

router.post("/api/rzpSuccess", paymentController.rzpSuccess);

router.post("/api/change-password", adminController.changePassword)

router.post("/api/forgot-password", adminController.forgotPassword)

router.post("/api/change-password-restaurant", adminController.changePasswordRestaurant)

router.post("/api/forgot-password-restaurant", adminController.forgotPasswordRestaurant)


router.post("/api/placeOrder", adminController.placeOrder)


router.post("/api/user-current-orders", adminController.userCurrentOrders)

router.post("/api/user-previous-orders", adminController.userPreviousOrders)


router.post("/api/restaurant-current-orders", adminController.restaurantCurrentOrders)


router.post("/api/restaurant-previous-orders", adminController.restaurantPreviousOrders)

router.post("/api/restaurantDetails", adminController.restaurantDetails)


router.get("/api/restaurants", adminController.restaurants)

router.get("/api/get-user-data", authenticate, adminController.getUserData)


router.get("/api/menu/:id", adminController.menu_id)


router.get("/api/restaurantprofile/:id", adminController.restaurantProfile_id)


router.get("/api/account", authenticate, adminController.account)

router.get("/api/account-restaurant", authenticateRestaurant, adminController.accountRestaurant)


router.post("/api/update-menu", adminController.updateMenu)


router.post("/api/update-account-restaurant", adminController.updateAccountRestaurant)


router.post("/api/update-account", adminController.updateAccount)



router.post("/api/order-received", adminController.orderReceived)


router.post("/api/orders", authenticateRestaurant, adminController.orders)


router.post("/api/signin", adminController.signin)


//register using async await
router.post("/api/register", adminController.register)
    
    
router.post("/api/signin-restaurant", adminController.signinRestaurant)


router.post("/api/register-restaurant", adminController.registerRestaurant)


router.get("/api/signout", adminController.signout)

router.get("/api/signout-restaurant", adminController.signoutRestaurant)


module.exports = router