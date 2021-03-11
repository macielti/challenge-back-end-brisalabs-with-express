import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { UserRepository } from "../repositories/UserRepository";

class UserController {
  async create(request: Request, response: Response) {
    const { name, cpf, balance } = request.body;

    const userRepository = getCustomRepository(UserRepository);

    const userAlreadyExists = await userRepository.findOne({ cpf });

    if (userAlreadyExists) {
      return response.status(400).json({ error: "User already exists!" });
    }

    const user = userRepository.create({
      name,
      cpf,
      balance,
    });

    await userRepository.save(user);

    return response.status(201).json(user);
  }

  async show(request: Request, response: Response) {
    const { cpf } = request.params;

    const userRepository = getCustomRepository(UserRepository);

    const user = await userRepository.findOne({ cpf });
    if (!user) {
      return response.status(404).json({ error: "User not found!" });
    }

    return response.json(user);
  }
}

export { UserController };
