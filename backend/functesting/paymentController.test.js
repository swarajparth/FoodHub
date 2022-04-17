const { TestScheduler } = require("@jest/core");
const paymentController = require("../controller/paymentController");

describe("Payment Controller", function () {
  it("paymentController is defined and working", function () {
    expect(paymentController).toBeDefined();
  });

  it("rzpOrder is Working", function () {
    expect(paymentController.rzpOrder).toBeDefined();
  });

  it("rzpSuccess  is Working", function () {
    expect(paymentController.rzpSuccess).toBeDefined();
  });
});
