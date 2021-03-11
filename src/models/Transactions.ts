import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("transactions")
class Transactions {
  @PrimaryColumn()
  readonly id: string;
  @Column()
  readonly user_id_from: string;
  @Column()
  readonly user_id_to: string;
  @Column()
  readonly value: number;
  @CreateDateColumn()
  readonly created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { Transactions };
