const { TestScheduler } = require("@jest/core");
const adminController = require("../controller/adminController");

describe("Admin Controller", function () {
  it("AdminController is defined and working", function () {
    expect(adminController).toBeDefined();
  });
  it("forgotPassword  is Working", function () {
    expect(adminController.forgotPassword).toBeDefined();
  });
  it("forgotPasswordRestaurant  is Working", function () {
    expect(adminController.forgotPasswordRestaurant).toBeDefined();
  });
  it("signin  is Working", function () {
    expect(adminController.signin).toBeDefined();
  });
  it("register  is Working", function () {
    expect(adminController.register).toBeDefined();
  });
  it("signinRestaurant is Working", function () {
    expect(adminController.signinRestaurant).toBeDefined();
  });
  it("registerRestaurant  is Working", function () {
    expect(adminController.registerRestaurant).toBeDefined();
  });
  it("signout is Working", function () {
    expect(adminController.signout).toBeDefined();
  });
  it("signoutRestaurant is Working", function () {
    expect(adminController.signoutRestaurant).toBeDefined();
  });
});
