const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class initialSetup1680007638751 {
    name = 'initialSetup1680007638751'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "task" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(200) NOT NULL, "done" boolean NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "deadline" date NOT NULL, "notes" text NOT NULL, "groupId" uuid, "userId" uuid, CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying(200) NOT NULL, "username" character varying(200) NOT NULL, "password" character varying(200) NOT NULL, "joined" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."group_member_role_enum" AS ENUM('moderator', 'regular')`);
        await queryRunner.query(`CREATE TABLE "group_member" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "role" "public"."group_member_role_enum" NOT NULL DEFAULT 'regular', "groupId" uuid, "userId" uuid, CONSTRAINT "PK_65634517a244b69a8ef338d03c3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "group" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(200) NOT NULL, "task_perm" integer NOT NULL, "group_perm" integer NOT NULL, "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), "creatorId" uuid, CONSTRAINT "PK_256aa0fda9b1de1a73ee0b7106b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_b8e1728a46f2cbb7b937011ae4f" FOREIGN KEY ("groupId") REFERENCES "group"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_f316d3fe53497d4d8a2957db8b9" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "group_member" ADD CONSTRAINT "FK_44c8964c097cf7f71434d6d1122" FOREIGN KEY ("groupId") REFERENCES "group"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "group_member" ADD CONSTRAINT "FK_9f209c217eef89b8c32bd077903" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "group" ADD CONSTRAINT "FK_af184d5494395694865868b13c9" FOREIGN KEY ("creatorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "group" DROP CONSTRAINT "FK_af184d5494395694865868b13c9"`);
        await queryRunner.query(`ALTER TABLE "group_member" DROP CONSTRAINT "FK_9f209c217eef89b8c32bd077903"`);
        await queryRunner.query(`ALTER TABLE "group_member" DROP CONSTRAINT "FK_44c8964c097cf7f71434d6d1122"`);
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_f316d3fe53497d4d8a2957db8b9"`);
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_b8e1728a46f2cbb7b937011ae4f"`);
        await queryRunner.query(`DROP TABLE "group"`);
        await queryRunner.query(`DROP TABLE "group_member"`);
        await queryRunner.query(`DROP TYPE "public"."group_member_role_enum"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "task"`);
    }
}
