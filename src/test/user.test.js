/** @format */

const db = require("../test/db");
const { userSignup } = require("../controller/user");
const { userSignin } = require("../controller/user");
const { getUser } = require("../controller/user");
// Setup connection to the database
beforeAll(async () => await db.connect());
afterAll(async () => await db.clear());
afterAll(async () => await db.close());

const mockResponce = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
};

// user signup
describe("Test with user sign up", () => {
  it("it should create a new user", async () => {
    let req = {
      body: {
        name: "shubhangis",
        dateOfbirth: "31/12/1999",
        address: "pune",
        password: "shubhangi",
        description: "Learner",
      },
    };
    const res = mockResponce();
    await userSignup(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
  });
});
// user signin
describe("Test with user login", () => {
  it("it should be user signin", async () => {
    let req = {
      body: {
        name: "shubhangis",
        password: "shubhangi",
      },
    };
    const res = mockResponce();
    await userSignin(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
       
  });
});
describe("Test with get user with status 404", () => {
  it("it should be a get user info", async () => {
      let req = {
        user: { id: "60f9998ba71c41d8ec3848b7" },
      };
    const res = mockResponce();
    await getUser(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
    
  });
});
