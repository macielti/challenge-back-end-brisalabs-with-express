import request from "supertest";
import { app } from "../../../app";
import createConnection from "../../../database";

describe("Users", () => {
  beforeAll(async () => {
    const connection = await createConnection();
    await connection.dropDatabase();
    await connection.runMigrations();
  });

  it("Should be able to create a new user", async () => {
    const response = await request(app).post("/users").send({
      name: "Bruno do Nascimento Maciel",
      cpf: "06934202198",
      balance: 100,
    });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
  });

  it("Should indicate that user already exists", async () => {
    const response = await request(app).post("/users").send({
      name: "Bruno do Nascimento Maciel",
      cpf: "06934202198",
      balance: 100,
    });
    expect(response.status).toBe(400);
  });
});

describe("Users", () => {
  it("Should not let you create a new user without passing the name param", async () => {
    const response = await request(app)
      .post("/users")
      .send({ cpf: "06934202198" });
    expect(response.status).toBe(400);
  });

  it("Should not let you create a new user without passing the cpf param", async () => {
    const response = await request(app)
      .post("/users")
      .send({ name: "Bruno do Nascimento Maciel" });
    expect(response.status).toBe(400);
  });
});

describe("Users - Param Validators on creation of a new one", async () => {
  it("Should not let you create a new user without passing the name param", async () => {
    const response = await request(app)
      .post("/users")
      .send({ cpf: "06934202198" });
    expect(response.status).toBe(400);
  });

  it("Should not let you create a new user without passing the cpf param", async () => {
    const response = await request(app)
      .post("/users")
      .send({ name: "Bruno do Nascimento Maciel" });
    expect(response.status).toBe(400);
  });

  it("Should point a invalid cpf document", async () => {
    const response = await request(app)
      .post("/users")
      .send({ name: "Bruno do Nascimento Maciel" });
    expect(response.status).toBe(400);
    expect(response.body.validation.body.message).toBe(`\"cpf\" is required`);
  });
});
