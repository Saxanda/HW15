-- 1. Create database
CREATE DATABASE homework15;

-- 2. Users table
CREATE TABLE IF NOT EXISTS "users" (
                                       id SERIAL PRIMARY KEY,
                                       email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
    );

-- 3. Newspost table
CREATE TABLE IF NOT EXISTS posts (
                                     id SERIAL PRIMARY KEY,
                                     title TEXT NOT NULL,
                                     text TEXT NOT NULL,
                                     "createDate" TIMESTAMP NOT NULL,
                                     "authorId" INTEGER NOT NULL,
                                     CONSTRAINT fk_newspost_author
                                     FOREIGN KEY ("authorId")
    REFERENCES "users"(id)
    ON DELETE CASCADE
    );

-- 4. Insert default user
INSERT INTO "users" (id, email, password)
VALUES (
           1,
           'testuser@yopmail.com',
           '18138372fad4b94533cd4881f03dc6c69296dd897234e0cee83f727e2e6b1f63'
       )
    ON CONFLICT (id) DO NOTHING;
-- enough to step to work with homebase14 for migration and fake news



-- 5. Insert news posts
INSERT INTO posts (id, title, text, "createDate", "authorId")
VALUES
    (
        1,
        'У зоопарку Чернігова лисичка народила лисеня',
        'В Чернігівському зоопарку сталася чудова подія! Лисичка на ім''я Руда народила чудове лисенятко! Тож поспішайте навідатись та подивитись на це миле створіння!',
        '2026-03-25T20:56:20.746Z',
        1
    ),
    (
        2,
        'У зоопарку Львова ведмедик з''їв мед призначений для дітей',
        'У Львові в місцевому зоопарку сталася дивна подія! Ведмедик на ім''я Міка зміг скоштувати всю партію меду, яка зберігалась в приміщенні складу!',
        '2026-03-26T20:56:20.746Z',
        1
    ),
    (
        3,
        'У Києві відкрили новий парк для відпочинку',
        'У столиці України відкрили сучасний парк з зонами для спорту, відпочинку та дитячими майданчиками. Мешканці вже активно відвідують нову зелену зону.',
        '2026-03-27T18:00:00.000Z',
        1
    ),
    (
        4,
        'У Харкові запустили нову лінію метро',
        'Нова лінія метро в Харкові значно покращить транспортне сполучення між районами міста та зменшить навантаження на наземний транспорт.',
        '2026-03-27T18:05:00.000Z',
        1
    ),
    (
        5,
        'У Дніпрі провели фестиваль вуличної їжі',
        'У Дніпрі відбувся масштабний фестиваль вуличної їжі, де відвідувачі могли скуштувати страви з різних кухонь світу.',
        '2026-03-27T18:10:00.000Z',
        1
    ),
    (
        6,
        'В Одесі пройшов міжнародний кінофестиваль',
        'В Одесі відбувся щорічний кінофестиваль, на якому були представлені фільми з усього світу та проведені зустрічі з режисерами.',
        '2026-03-27T18:15:00.000Z',
        1
    );
ALTER TABLE users
    ADD COLUMN IF NOT EXISTS deleted boolean NOT NULL DEFAULT false;

ALTER TABLE posts
    ADD COLUMN IF NOT EXISTS deleted boolean NOT NULL DEFAULT false;
ALTER TABLE posts
    ALTER COLUMN "createDate" SET DEFAULT now();
ALTER TABLE posts
    RENAME COLUMN title TO header;

CREATE INDEX IF NOT EXISTS IDX_USERS_EMAIL ON users(email);
CREATE INDEX IF NOT EXISTS IDX_USERS_DELETED ON users(deleted);
CREATE INDEX IF NOT EXISTS IDX_POSTS_HEADER ON posts(title);
CREATE INDEX IF NOT EXISTS IDX_POSTS_AUTHOR_ID ON posts("authorId");
CREATE INDEX IF NOT EXISTS IDX_POSTS_DELETED ON posts(deleted);
-- 6. Fix sequences after manual IDs
SELECT setval(pg_get_serial_sequence('"users"', 'id'), COALESCE((SELECT MAX(id) FROM "users"), 1));
SELECT setval(pg_get_serial_sequence('posts', 'id'), COALESCE((SELECT MAX(id) FROM posts), 1));