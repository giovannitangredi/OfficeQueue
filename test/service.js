const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
chai.use(chaiHttp);
const app = require("../server/server.js");

describe("GET /service/allservice", () => {
  it("should return 3 results with status 200", async () => {
    let res = await chai.request(app).get("/service/allservice").send();

    expect(res.status).to.equal(200);
    expect(res.body.length).to.equal(3);
  });
});
