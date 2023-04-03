const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class linkGroupmemberRelationToTasks1680536716576 {
    name = 'linkGroupmemberRelationToTasks1680536716576'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "task" ADD "groupMemberId" uuid`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_1424939d8b363d04a53e4b96ea1" FOREIGN KEY ("groupMemberId") REFERENCES "group_member"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_1424939d8b363d04a53e4b96ea1"`);
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "groupMemberId"`);
    }
}
