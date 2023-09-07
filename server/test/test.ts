let servers = require("../server.ts");
let chais = require("chai");
let chaiHttp = require("chai-http");
let expect = chais.expect;
chais.use(chaiHttp);

describe("/POST login", () => {
  it("it should not login user without username and password", async (done) => {
    let data = {
      username: "",
      password: "",
    };
    console.log(data);
    await chais
      .request(servers)
      .post("/auth/login")
      .set("Accept", "application/json")
      .set("Content-Type", "application/json")
      .send(data)
      .expect(404)
      .expect("Content-Type", "json")
      .expect(function (response) {
        expect(response.body).not.to.be.empty;
        expect(response.body).to.be.an("object");
        done();
      })
      .end(done, function (err) {
        console.log("hello");
        done();
      });
  }).timeout(5000);
});
