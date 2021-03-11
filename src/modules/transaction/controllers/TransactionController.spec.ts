import request from "supertest";
import { app } from "../../../app";
import createConnection from "../../../database";

describe("PIXKeys", () => {
  beforeAll(async () => {
    const connection = await createConnection();
    await connection.dropDatabase();
    await connection.runMigrations();
  });

  it("Should let registry new user and add a PIX Key", async () => {
    const responseCreateNewUser = await request(app).post("/users").send({
      name: "Bruno do Nascimento Maciel",
      cpf: "06934202198",
      balance: 100,
    });
    expect(responseCreateNewUser.status).toBe(201);
    expect(responseCreateNewUser.body).toHaveProperty("id");

    const responseRegistryNewPIXKey = await request(app).post("/pixKey").send({
      cpf: "06934202198",
      key: "06934202198",
    });
    expect(responseRegistryNewPIXKey.status).toBe(201);
    expect(responseRegistryNewPIXKey.body).toHaveProperty("id");
  });

  it("Should let registry a second user and add a PIX Key", async () => {
    const responseCreateNewUser = await request(app).post("/users").send({
      name: "José Luis da Silva",
      cpf: "82666546039",
      balance: 100,
    });
    expect(responseCreateNewUser.status).toBe(201);
    expect(responseCreateNewUser.body).toHaveProperty("id");

    const responseRegistryNewPIXKey = await request(app).post("/pixKey").send({
      cpf: "82666546039",
      key: "82666546039",
    });
    expect(responseRegistryNewPIXKey.status).toBe(201);
    expect(responseRegistryNewPIXKey.body).toHaveProperty("id");
  });

  it("Should be able to send money from the first user to de second one and the money need to be discounted from the sender user account and added to receiver", async () => {
    const responseTransaction = await request(app).post("/transaction").send({
      pix_key_from: "06934202198",
      pix_key_to: "82666546039",
      value: 40,
    });
    expect(responseTransaction.status).toBe(201);
    expect(responseTransaction.body).toHaveProperty("id");

    let response = await request(app).get("/users/06934202198");
    expect(response.body.balance).toBe(60);
    response = await request(app).get("/users/82666546039");
    expect(response.body.balance).toBe(140);
  });

  it("Should not be able to transfer more money that the sender have in balance", async () => {
    const responseTransaction = await request(app).post("/transaction").send({
      pix_key_from: "06934202198",
      pix_key_to: "82666546039",
      value: 200,
    });
    expect(responseTransaction.status).toBe(400);
    expect(responseTransaction.body.error).toBe(
      "The sender user don't have sufficient balance for this transaction!"
    );
  });
});
