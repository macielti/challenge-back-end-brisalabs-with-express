import { EntityRepository, Repository } from "typeorm";
import { Transactions } from "../../../models";

@EntityRepository(Transactions)
class TransactionsRepository extends Repository<Transactions> {}

export { TransactionsRepository };
