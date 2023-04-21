import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1682109096081 implements MigrationInterface {
    name = 'Init1682109096081'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "user" (
                "user_id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "username" text NOT NULL,
                "password" text NOT NULL,
                CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"),
                CONSTRAINT "PK_758b8ce7c18b9d347461b30228d" PRIMARY KEY ("user_id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "storage" (
                "file_id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "originalname" text NOT NULL,
                "deleted" TIMESTAMP,
                CONSTRAINT "PK_b227a0824aac2dd9136c5052d8a" PRIMARY KEY ("file_id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "author" (
                "author_id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" text NOT NULL,
                "date_of_birth" TIMESTAMP NOT NULL,
                "deleted" TIMESTAMP,
                CONSTRAINT "PK_c36fb987d8132c9bdb15916e619" PRIMARY KEY ("author_id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "genre" (
                "genre_id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" text NOT NULL,
                "deleted" TIMESTAMP,
                CONSTRAINT "PK_af0c9d11cb69b909fd91dd33009" PRIMARY KEY ("genre_id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "book" (
                "book_id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "title" text NOT NULL,
                "date_publication" TIMESTAMP NOT NULL,
                "editorial" text NOT NULL,
                "deleted" TIMESTAMP,
                "fileFileId" uuid,
                CONSTRAINT "REL_56e8d2bfc7307341b3ab2cf88d" UNIQUE ("fileFileId"),
                CONSTRAINT "PK_b66091a3d2edddc14f6b91fc606" PRIMARY KEY ("book_id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "book_genre_list_genre" (
                "bookBookId" uuid NOT NULL,
                "genreGenreId" uuid NOT NULL,
                CONSTRAINT "PK_973102357ddb21962942d3ef98f" PRIMARY KEY ("bookBookId", "genreGenreId")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_dd3102f0a6ff674d1b7c0db5e9" ON "book_genre_list_genre" ("bookBookId")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_f06d548f2e6e5efd639052a3e8" ON "book_genre_list_genre" ("genreGenreId")
        `);
        await queryRunner.query(`
            CREATE TABLE "book_author_list_author" (
                "bookBookId" uuid NOT NULL,
                "authorAuthorId" uuid NOT NULL,
                CONSTRAINT "PK_187092919ef92488987d941dc17" PRIMARY KEY ("bookBookId", "authorAuthorId")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_35e3758fd8349b30c54190d197" ON "book_author_list_author" ("bookBookId")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_672bdfbc20d860cda3040d34cc" ON "book_author_list_author" ("authorAuthorId")
        `);
        await queryRunner.query(`
            ALTER TABLE "book"
            ADD CONSTRAINT "FK_56e8d2bfc7307341b3ab2cf88d0" FOREIGN KEY ("fileFileId") REFERENCES "storage"("file_id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "book_genre_list_genre"
            ADD CONSTRAINT "FK_dd3102f0a6ff674d1b7c0db5e99" FOREIGN KEY ("bookBookId") REFERENCES "book"("book_id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "book_genre_list_genre"
            ADD CONSTRAINT "FK_f06d548f2e6e5efd639052a3e81" FOREIGN KEY ("genreGenreId") REFERENCES "genre"("genre_id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "book_author_list_author"
            ADD CONSTRAINT "FK_35e3758fd8349b30c54190d1972" FOREIGN KEY ("bookBookId") REFERENCES "book"("book_id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "book_author_list_author"
            ADD CONSTRAINT "FK_672bdfbc20d860cda3040d34cc1" FOREIGN KEY ("authorAuthorId") REFERENCES "author"("author_id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "book_author_list_author" DROP CONSTRAINT "FK_672bdfbc20d860cda3040d34cc1"
        `);
        await queryRunner.query(`
            ALTER TABLE "book_author_list_author" DROP CONSTRAINT "FK_35e3758fd8349b30c54190d1972"
        `);
        await queryRunner.query(`
            ALTER TABLE "book_genre_list_genre" DROP CONSTRAINT "FK_f06d548f2e6e5efd639052a3e81"
        `);
        await queryRunner.query(`
            ALTER TABLE "book_genre_list_genre" DROP CONSTRAINT "FK_dd3102f0a6ff674d1b7c0db5e99"
        `);
        await queryRunner.query(`
            ALTER TABLE "book" DROP CONSTRAINT "FK_56e8d2bfc7307341b3ab2cf88d0"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_672bdfbc20d860cda3040d34cc"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_35e3758fd8349b30c54190d197"
        `);
        await queryRunner.query(`
            DROP TABLE "book_author_list_author"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_f06d548f2e6e5efd639052a3e8"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_dd3102f0a6ff674d1b7c0db5e9"
        `);
        await queryRunner.query(`
            DROP TABLE "book_genre_list_genre"
        `);
        await queryRunner.query(`
            DROP TABLE "book"
        `);
        await queryRunner.query(`
            DROP TABLE "genre"
        `);
        await queryRunner.query(`
            DROP TABLE "author"
        `);
        await queryRunner.query(`
            DROP TABLE "storage"
        `);
        await queryRunner.query(`
            DROP TABLE "user"
        `);
    }

}
