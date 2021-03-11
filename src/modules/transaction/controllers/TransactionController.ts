import { Request, Response } from "express";
import { getCustomRepository, getManager } from "typeorm";
import {
  TransactionsRepository,
  UserRepository,
  KeysPIXRepository,
} from "../repositories";

class TransactionController {
  async create(request: Request, response: Response) {
    const { pix_key_from, pix_key_to, value } = request.body;

    const userRepository = getCustomRepository(UserRepository);
    const pixKeyRepository = getCustomRepository(KeysPIXRepository);
    const transactionsRepository = getCustomRepository(TransactionsRepository);

    const pixKeyFrom = await pixKeyRepository.findOne({ key: pix_key_from });
    if (!pixKeyFrom) {
      return response.status(400).json({ error: "PIX Key sender not found!" });
    }

    const pixKeyTo = await pixKeyRepository.findOne({ key: pix_key_to });
    if (!pixKeyTo) {
      return response.status(400).json({
        error: "PIX Key receiver not found!",
      });
    }

    const userFrom = await userRepository.findOne({ id: pixKeyFrom.user_id });
    const userTo = await userRepository.findOne({ id: pixKeyTo.user_id });

    if (userFrom.balance < value) {
      return response.status(400).json({
        error:
          "The sender user don't have sufficient balance for this transaction!",
      });
    }

    const senderBalance = userFrom.balance;
    const receiverBalance = userTo.balance;
    userFrom.balance = senderBalance - value;
    userTo.balance = receiverBalance + value;

    const transaction = transactionsRepository.create({
      user_id_from: userFrom.id,
      user_id_to: userTo.id,
      value: value,
    });

    // using transactions to better data consistency
    await getManager().transaction(async (transactionalEntityManager) => {
      await transactionalEntityManager.save(userFrom);
      await transactionalEntityManager.save(userTo);
      await transactionalEntityManager.save(transaction);
    });

    return response.status(201).json(transaction);
  }
}

export { TransactionController };
