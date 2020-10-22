const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
chai.use(chaiHttp);
const app = require("../server/server.js");
const knex = require("../server/db");

describe("GET /screen/ServingTickets", () => {
    beforeEach(async () => {
      await knex("ticket").del();
      await knex("service").del();
      await knex("ticket").insert({ SID: 1, Status: "S"});
      await knex("ticket").insert({ SID: 1, Status: "A" });
      await knex("ticket").insert({ SID: 2, Status: "S" });
      await knex("ticket").insert({ SID: 2, Status: "A" });
      await knex("ticket").insert({ SID: 2, Status: "C" });
      await knex("service").insert({ Type: "Shipping", Time: "10" });
      await knex("service").insert({ Type: "Money Transfer ", Time: "5" });
    });
    it("should return the list of serving tickets ", async () => {
      let res = await chai
        .request(app)
        .get("/screen/ServingTickets");
  
      expect(res.status).to.equal(200);
      expect(res.body.length).to.equal(2);
      expect(res.body[0].TID).to.equal(1); 
      expect(res.body[1].TID).to.equal(3); 
      expect(res.body[0].type).to.equal("Shipping"); 
      expect(res.body[1].type).to.equal("Money Transfer "); 
    });
  
    afterEach(async () => {
      await knex("ticket").del();
      await knex("service").del();
    });
  });
  
  describe("GET /screen/NumberPeoples", () => {
    beforeEach(async () => {
      await knex("ticket").del();
      await knex("service").del();
      await knex("ticket").insert({ SID: 1, Status: "S" });
      await knex("ticket").insert({ SID: 1, Status: "A" });
      await knex("ticket").insert({ SID: 2, Status: "S" });
      await knex("ticket").insert({ SID: 2, Status: "A" });
      await knex("ticket").insert({ SID: 2, Status: "C" });
      await knex("service").insert({ Type: "Shipping", Time: "10" });
      await knex("service").insert({ Type: "Money Transfer ", Time: "5" });
    });
    it("should return the number of peoples ", async () => {
      let res = await chai
        .request(app)
        .get("/screen/NumberPeoples");
  
      expect(res.status).to.equal(200);
      expect(res.body.length).to.equal(2);
      expect(res.body[0].type).to.equal("Money Transfer "); 
      expect(res.body[1].type).to.equal("Shipping"); 
      expect(res.body[0].n_people).to.equal(1); 
      expect(res.body[1].n_people).to.equal(1); 
    });
  
    afterEach(async () => {
      await knex("ticket").del();
      await knex("service").del();
    });
  });
  