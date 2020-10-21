const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
chai.use(chaiHttp);
const app = require("../server/server.js");
const knex = require("../server/db");

describe("POST /tickets/createticket", () => {
  beforeEach(async () => {
    await knex("ticket").del();
  });
  it("should return 'Ticket created.' with status 200", async () => {
    let res = await chai
      .request(app)
      .post("/tickets/createticket")
      .send({ SID: 1, Status: "A" });

    expect(res.status).to.equal(200);
    expect(res.body.message).to.equal("Ticket created.");

    res = await chai
      .request(app)
      .post("/tickets/createticket")
      .send({ SID: 1, Status: "A" });

    expect(res.status).to.equal(200);
    expect(res.body.message).to.equal("Ticket created.");

    res = await chai
      .request(app)
      .get("/tickets/filterticket")
      .query({ SID: 1, Status: "A" });

    expect(res.status).to.equal(200);
    expect(res.body.length).to.equal(2);
  });

  afterEach(async () => {
    await knex("ticket").del();
  });
});


describe("POST /tickets/updateticket", () => {
  beforeEach(async () => {
    await knex("ticket").del();
    await knex("ticket").insert({ SID: 1, Status: "A" });
    await knex("ticket").insert({ SID: 1, Status: "A" });
    await knex("ticket").insert({ SID: 1, Status: "A" });
    await knex("ticket").insert({ SID: 1, Status: "A" });
    await knex("ticket").insert({ SID: 2, Status: "A" });
    await knex("ticket").insert({ SID: 2, Status: "A" });
    await knex("ticket").insert({ SID: 2, Status: "A" });
  });
  it("should return 'Ticket updated.' with status 200", async () => {
    let res = await chai
      .request(app)
      .post("/tickets/updateticket")
      .send({ TID: 1, CID: 1, Status: "C" });

    expect(res.status).to.equal(200);
    expect(res.body.message).to.equal("Ticket updated.");

    res = await chai
      .request(app)
      .post("/tickets/updateticket")
      .send({ TID: 2, CID: 3, Status: "C" });

    expect(res.status).to.equal(200);
    expect(res.body.message).to.equal("Ticket updated.");

    res = await chai
    .request(app)
    .post("/tickets/updateticket")
    .send({ TID: 6, CID: 3, Status: "C" });

  expect(res.status).to.equal(200);
  expect(res.body.message).to.equal("Ticket updated.");

    expect(res.status).to.equal(200);

    res = await chai
      .request(app)
      .get("/tickets/filterticket")
      .query({ SID: 1, Status: "C" });

    expect(res.status).to.equal(200);
    expect(res.body.length).to.equal(2);

  });

  afterEach(async () => {
    await knex("ticket").del();
  });
});



describe("GET /tickets/nextperson", () => {
  beforeEach(async () => {
    await knex("ticket").del();
    await knex("service").del();
    await knex("ticket").insert({ SID: 1, Status: "A" });
    await knex("ticket").insert({ SID: 1, Status: "A" });
    await knex("ticket").insert({ SID: 1, Status: "A" });
    await knex("ticket").insert({ SID: 1, Status: "A" });
    await knex("ticket").insert({ SID: 2, Status: "A" });
    await knex("ticket").insert({ SID: 2, Status: "A" });
    await knex("ticket").insert({ SID: 2, Status: "C" });
    await knex("service").insert({ Type: "Shipping", Time: "10"})
    await knex("service").insert({ Type: "Money Transfer ", Time: "5"})
  });
  it("should return the right ticket for next customer", async () => {
    let res = await chai
      .request(app)
      .get("/tickets/nextperson")
      .query({ CID: 1 });

    expect(res.status).to.equal(200);
    expect(res.body.length).to.equal(1);
    expect(res.body[0].TID).to.equal(1);  //ticket 1 extracted

    res = await chai
    .request(app)
    .post("/tickets/updateticket")
    .send({ TID: 1, CID: 1, Status: "C" });

    res = await chai
      .request(app)
      .get("/tickets/nextperson")
      .query({ CID: 1 });

    expect(res.status).to.equal(200);
    expect(res.body.length).to.equal(1);
    expect(res.body[0].TID).to.equal(2);  //ticket 2 extracted

    res = await chai
    .request(app)
    .post("/tickets/updateticket")
    .send({ TID: 2, CID: 1, Status: "C" });
    
    res = await chai
      .request(app)
      .get("/tickets/nextperson")
      .query({ CID: 1 });

    expect(res.status).to.equal(200);
    expect(res.body[0].TID).to.equal(5);  //ticket 5 extracted (lowest service)
    
    

  });

  afterEach(async () => {
    await knex("ticket").del();
    await knex("service").del();
  });
});



describe("GET /tickets/filterticket", () => {
  beforeEach(async () => {
    await knex("ticket").del();
    await knex("ticket").insert({ SID: 1, Status: "A" });
    await knex("ticket").insert({ SID: 1, Status: "C" });
    await knex("ticket").insert({ SID: 1, Status: "C" });
    await knex("ticket").insert({ SID: 1, Status: "C" });
    await knex("ticket").insert({ SID: 2, Status: "A" });
    await knex("ticket").insert({ SID: 2, Status: "A" });
    await knex("ticket").insert({ SID: 2, Status: "C" });
  });
  it("should return the right number of filtered tickets", async () => {
    let res = await chai
      .request(app)
      .get("/tickets/filterticket")
      .query({ SID: 1, Status: "A" });

    expect(res.status).to.equal(200);
    expect(res.body.length).to.equal(1);
    res = await chai
      .request(app)
      .get("/tickets/filterticket")
      .query({ SID: 1, Status: "C" });

    expect(res.status).to.equal(200);
    expect(res.body.length).to.equal(3);
    res = await chai
      .request(app)
      .get("/tickets/filterticket")
      .query({ SID: 2, Status: "A" });

    expect(res.status).to.equal(200);
    expect(res.body.length).to.equal(2);
    res = await chai
      .request(app)
      .get("/tickets/filterticket")
      .query({ SID: 2, Status: "C" });

    expect(res.status).to.equal(200);
    expect(res.body.length).to.equal(1);
  });

  afterEach(async () => {
    await knex("ticket").del();
  });
});
