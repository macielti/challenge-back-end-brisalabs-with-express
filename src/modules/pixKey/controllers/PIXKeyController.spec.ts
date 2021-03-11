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
    const responseCreateNewUser = await request(app)
      .post("/users")
      .send({
        name: "Bruno do Nascimento Maciel",
        cpf: "06934202198",
        balance: 100,
      });
    expect(responseCreateNewUser.status).toBe(201);
    expect(responseCreateNewUser.body).toHaveProperty("id");
  });

  it("Should be able to registry a new PIX Key", async () => {
    const responseRegistryNewPIXKey = await request(app).post("/pixKey").send({
      cpf: "06934202198",
      key: "brunodonascimentomaciel@gmail.com",
    });
    expect(responseRegistryNewPIXKey.status).toBe(201);
    expect(responseRegistryNewPIXKey.body).toHaveProperty("id");
  });

  it("Should be able to registry a second PIX Key", async () => {
    const responseRegistryNewPIXKey = await request(app).post("/pixKey").send({
      cpf: "06934202198",
      key: "06934202198",
    });
    expect(responseRegistryNewPIXKey.status).toBe(201);
    expect(responseRegistryNewPIXKey.body).toHaveProperty("id");
  });

  it("Should be able to registry a third PIX Key", async () => {
    const responseRegistryNewPIXKey = await request(app).post("/pixKey").send({
      cpf: "06934202198",
      key: "ICarneMyoPeneGUinEmelPhotENTAntE",
    });
    expect(responseRegistryNewPIXKey.status).toBe(201);
    expect(responseRegistryNewPIXKey.body).toHaveProperty("id");
  });
  it("Should be able to registry a fourth PIX Key", async () => {
    const responseRegistryNewPIXKey = await request(app).post("/pixKey").send({
      cpf: "06934202198",
      key: "EablEgINTiACiliGHoreStimItRiNeMo",
    });
    expect(responseRegistryNewPIXKey.status).toBe(400);
    expect(responseRegistryNewPIXKey.body.error).toBe(
      "You can't have more then 3 PIX Keys per user!"
    );
  });

  it("Should not be able to add a PIX key that already exists", async () => {
    const responseRegistryNewPIXKey = await request(app).post("/pixKey").send({
      cpf: "06934202198",
      key: "brunodonascimentomaciel@gmail.com",
    });
    expect(responseRegistryNewPIXKey.status).toBe(400);
    expect(responseRegistryNewPIXKey.body.error).toBe(
      "PIX Key already exists!"
    );
  });
});
