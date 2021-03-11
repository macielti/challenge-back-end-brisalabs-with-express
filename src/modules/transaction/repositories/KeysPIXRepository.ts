import { EntityRepository, Repository } from "typeorm";
import { KeysPIX } from "../../../models";

@EntityRepository(KeysPIX)
class KeysPIXRepository extends Repository<KeysPIX> {}

export { KeysPIXRepository };
