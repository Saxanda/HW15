import { MigrationInterface, QueryRunner } from 'typeorm';


export class UpdatePostsAndUsers1713610000000 implements MigrationInterface {
    name = 'UpdatePostsAndUsers1713610000000';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE users
            ADD COLUMN IF NOT EXISTS deleted boolean NOT NULL DEFAULT false
        `);

        await queryRunner.query(`
            ALTER TABLE posts
            ADD COLUMN IF NOT EXISTS deleted boolean NOT NULL DEFAULT false
        `);

        await queryRunner.query(`
            ALTER TABLE posts
            ALTER COLUMN "createDate" SET DEFAULT now()
        `);

        await queryRunner.query(`
            DO $$
            BEGIN
                IF EXISTS (
                    SELECT 1
                    FROM information_schema.columns
                    WHERE table_name = 'posts' AND column_name = 'title'
                ) THEN
                    ALTER TABLE posts RENAME COLUMN title TO header;
                END IF;
            END
            $$;
        `);

        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS IDX_USERS_EMAIL ON users(email)
        `);

        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS IDX_USERS_DELETED ON users(deleted)
        `);

        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS IDX_POSTS_HEADER ON posts(header)
        `);

        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS IDX_POSTS_AUTHOR_ID ON posts("authorId")
        `);

        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS IDX_POSTS_DELETED ON posts(deleted)
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX IF EXISTS IDX_POSTS_DELETED`);
        await queryRunner.query(`DROP INDEX IF EXISTS IDX_POSTS_AUTHOR_ID`);
        await queryRunner.query(`DROP INDEX IF EXISTS IDX_POSTS_HEADER`);
        await queryRunner.query(`DROP INDEX IF EXISTS IDX_USERS_DELETED`);
        await queryRunner.query(`DROP INDEX IF EXISTS IDX_USERS_EMAIL`);

        await queryRunner.query(`
            DO $$
            BEGIN
                IF EXISTS (
                    SELECT 1
                    FROM information_schema.columns
                    WHERE table_name = 'posts' AND column_name = 'header'
                ) THEN
                    ALTER TABLE posts RENAME COLUMN header TO title;
                END IF;
            END
            $$;
        `);

        await queryRunner.query(`
            ALTER TABLE posts
            ALTER COLUMN "createDate" DROP DEFAULT
        `);

        await queryRunner.query(`
            ALTER TABLE posts
            DROP COLUMN IF EXISTS deleted
        `);

        await queryRunner.query(`
            ALTER TABLE users
            DROP COLUMN IF EXISTS deleted
        `);
    }
}
export class UpdatePostsAndUsers implements MigrationInterface {
    name = 'UpdatePostsAndUsers';

    public async up(queryRunner: QueryRunner): Promise<void> {
        console.log('🔥 UpdatePostsAndUsers migration is running');

        await queryRunner.query(`
            ALTER TABLE users
                ADD COLUMN IF NOT EXISTS deleted boolean NOT NULL DEFAULT false
        `);

        await queryRunner.query(`
            ALTER TABLE posts
                ADD COLUMN IF NOT EXISTS deleted boolean NOT NULL DEFAULT false
        `);

        await queryRunner.query(`
            ALTER TABLE posts
                ALTER COLUMN "createDate" SET DEFAULT now()
        `);

        await queryRunner.query(`
        DO $$
        BEGIN
            IF EXISTS (
                SELECT 1
                FROM information_schema.columns
                WHERE table_name = 'posts' AND column_name = 'title'
            ) THEN
                ALTER TABLE posts RENAME COLUMN title TO header;
            END IF;
        END
        $$;
    `);

        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS IDX_USERS_EMAIL ON users(email)
        `);

        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS IDX_USERS_DELETED ON users(deleted)
        `);

        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS IDX_POSTS_HEADER ON posts(header)
        `);

        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS IDX_POSTS_AUTHOR_ID ON posts("authorId")
        `);

        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS IDX_POSTS_DELETED ON posts(deleted)
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX IF EXISTS IDX_POSTS_DELETED`);
        await queryRunner.query(`DROP INDEX IF EXISTS IDX_POSTS_AUTHOR_ID`);
        await queryRunner.query(`DROP INDEX IF EXISTS IDX_POSTS_HEADER`);
        await queryRunner.query(`DROP INDEX IF EXISTS IDX_USERS_DELETED`);
        await queryRunner.query(`DROP INDEX IF EXISTS IDX_USERS_EMAIL`);

        await queryRunner.query(`
            DO $$
            BEGIN
                IF EXISTS (
                    SELECT 1
                    FROM information_schema.columns
                    WHERE table_name = 'posts' AND column_name = 'header'
                ) THEN
                    ALTER TABLE posts RENAME COLUMN header TO title;
                END IF;
            END
            $$;
        `);

        await queryRunner.query(`
            ALTER TABLE posts
            ALTER COLUMN "createDate" DROP DEFAULT
        `);

        await queryRunner.query(`
            ALTER TABLE posts
            DROP COLUMN IF EXISTS deleted
        `);

        await queryRunner.query(`
            ALTER TABLE users
            DROP COLUMN IF EXISTS deleted
        `);
    }
}