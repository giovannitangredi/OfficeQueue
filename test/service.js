const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
chai.use(chaiHttp);
const app = require("../server/server.js");
const knex = require("../server/db");

describe("GET /service/allservice", () => {
  beforeEach(async () => {
    await knex("service").del();
    await knex("service").insert({ Type: "Shipping", Time: "10" });
    await knex("service").insert({ Type: "Money Transfer ", Time: "5" });
  });
  it("should return 3 results with status 200", async () => {
    let res = await chai.request(app).get("/service/allservice").send();

    expect(res.status).to.equal(200);
    expect(res.body.length).to.equal(2);
  });
  afterEach(async () => {
    await knex("service").del();
  });
});

describe("GET /service/serviceticket", () => {
  it("should return 'related Service.' with status 200", async () => {
    res = await chai
      .request(app)
      .get("/service/serviceticket")
      .query({ SID: 1 });

    expect(res.status).to.equal(200);
    expect(res.body.length).to.equal(1);
  });
});
