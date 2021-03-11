import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("keys_pix")
class KeysPIX {
  @PrimaryColumn()
  readonly id: string;
  @Column()
  user_id: string;
  @Column()
  key: string;
  @CreateDateColumn()
  readonly created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { KeysPIX };
