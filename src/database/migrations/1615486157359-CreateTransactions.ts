import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTransactions1615486157359 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "transactions",
        columns: [
          { name: "id", type: "uuid", isPrimary: true },
          { name: "user_id_from", type: "uuid" },
          { name: "user_id_to", type: "uuid" },
          { name: "value", type: "int" },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
        ],
        foreignKeys: [
          {
            name: "FKUserFrom",
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            columnNames: ["user_id_from"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
          {
            name: "FKUserTo",
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            columnNames: ["user_id_to"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("transactions");
  }
}
