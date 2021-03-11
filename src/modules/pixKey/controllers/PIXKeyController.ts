import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { KeysPIXRepository, UserRepository } from "../repositories";

class PIXKeyController {
  async create(request: Request, response: Response) {
    const { cpf, key } = request.body;

    const userRepository = getCustomRepository(UserRepository);
    const pixKeyRepository = getCustomRepository(KeysPIXRepository);

    const pixKeyAlreadyExists = await pixKeyRepository.findOne({ key });
    if (pixKeyAlreadyExists) {
      return response.status(400).json({ error: "PIX Key already exists!" });
    }

    const userAlreadyExists = await userRepository.findOne({ cpf });
    if (!userAlreadyExists) {
      return response.status(400).json({ error: "Not found user!" });
    }

    const allPIXKeysFromThisUser = await pixKeyRepository.find({
      user_id: userAlreadyExists.id,
    });
    if (allPIXKeysFromThisUser.length >= 3) {
      return response
        .status(400)
        .json({ error: "You can't have more then 3 PIX Keys per user!" });
    }

    const pixKey = pixKeyRepository.create({
      user_id: userAlreadyExists.id,
      key,
    });

    await pixKeyRepository.save(pixKey);

    return response.status(201).json(pixKey);
  }
}

export { PIXKeyController };
