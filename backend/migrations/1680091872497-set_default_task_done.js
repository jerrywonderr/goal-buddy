const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class setDefaultTaskDone1680091872497 {
    name = 'setDefaultTaskDone1680091872497'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "task" ALTER COLUMN "done" SET DEFAULT false`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "task" ALTER COLUMN "done" DROP DEFAULT`);
    }
}
