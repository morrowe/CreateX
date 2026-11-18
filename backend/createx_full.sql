-- =====================================================================
--  Createx Construction Bureau — база данных PostgreSQL (DBeaver)
--  Запуск: открыть файл в SQL-редакторе DBeaver и выполнить
--  как скрипт (Alt + X), а не как один запрос (Ctrl + Enter).
--  Скрипт можно запускать повторно: старые таблицы удаляются.
-- =====================================================================

-- Расширение для шифрования паролей (crypt / gen_salt)
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- ---------------------------------------------------------------------
--  0. Очистка (порядок: сначала зависимые таблицы)
-- ---------------------------------------------------------------------
DROP TABLE IF EXISTS
    comments, news_posts, news_categories,
    cv_applications, vacancies,
    requests, subscribers,
    plan_features, pricing_features, pricing_plans,
    project_solutions, testimonials, projects, project_categories,
    service_steps, service_offers, services,
    advantages, statistics, company_history, team_members,
    partners, clients, offices,
    users, roles
CASCADE;

-- =====================================================================
--  1. ПОЛЬЗОВАТЕЛИ: регистрация и авторизация
-- =====================================================================

-- Роли: обычный пользователь и администратор (админ-панель)
CREATE TABLE roles (
    id   SERIAL PRIMARY KEY,
    name VARCHAR(20) NOT NULL UNIQUE          -- 'user' | 'admin'
);

CREATE TABLE users (
    id            SERIAL PRIMARY KEY,
    role_id       INTEGER      NOT NULL DEFAULT 1 REFERENCES roles(id),
    full_name     VARCHAR(100) NOT NULL,
    email         VARCHAR(100) NOT NULL UNIQUE,   -- логин
    phone         VARCHAR(30),
    password_hash VARCHAR(100) NOT NULL,          -- хэш, не пароль!
    is_active     BOOLEAN      NOT NULL DEFAULT TRUE,
    created_at    TIMESTAMP    NOT NULL DEFAULT NOW()
);

-- =====================================================================
--  2. КОМПАНИЯ: офисы, команда, история, цифры, партнёры
-- =====================================================================

CREATE TABLE offices (
    id       SERIAL PRIMARY KEY,
    city     VARCHAR(50)  NOT NULL,
    address  VARCHAR(150) NOT NULL,
    phone    VARCHAR(30)  NOT NULL,
    email    VARCHAR(100) NOT NULL,
    schedule VARCHAR(60)  NOT NULL,
    is_head  BOOLEAN      NOT NULL DEFAULT FALSE
);

CREATE TABLE team_members (
    id         SERIAL PRIMARY KEY,
    full_name  VARCHAR(100) NOT NULL,
    position   VARCHAR(100) NOT NULL,
    photo_url  VARCHAR(255),
    sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE company_history (
    id          SERIAL PRIMARY KEY,
    event_date  DATE         NOT NULL,
    title       VARCHAR(150) NOT NULL,
    description TEXT
);

-- Цифры и факты (главная и "About us")
CREATE TABLE statistics (
    id         SERIAL PRIMARY KEY,
    page       VARCHAR(20)  NOT NULL CHECK (page IN ('home', 'about')),
    value      VARCHAR(20)  NOT NULL,
    label      VARCHAR(100) NOT NULL,
    sort_order INTEGER NOT NULL DEFAULT 0
);

-- Ценности (Quality, Safety, Comfort), преимущества и бонусы сотрудников
CREATE TABLE advantages (
    id          SERIAL PRIMARY KEY,
    section     VARCHAR(20)  NOT NULL
                CHECK (section IN ('core_value', 'benefit', 'employee_benefit')),
    title       VARCHAR(100) NOT NULL,
    description TEXT,
    icon_url    VARCHAR(255),
    sort_order  INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE partners (
    id       SERIAL PRIMARY KEY,
    name     VARCHAR(100) NOT NULL,
    logo_url VARCHAR(255)
);

CREATE TABLE clients (
    id       SERIAL PRIMARY KEY,
    name     VARCHAR(100) NOT NULL,
    logo_url VARCHAR(255)
);

-- =====================================================================
--  3. УСЛУГИ и ЦЕНЫ
-- =====================================================================

CREATE TABLE services (
    id          SERIAL PRIMARY KEY,
    title       VARCHAR(100) NOT NULL UNIQUE,
    slug        VARCHAR(100) NOT NULL UNIQUE,
    short_text  TEXT,
    description TEXT,
    image_url   VARCHAR(255)
);

-- "We offer" на странице услуги
CREATE TABLE service_offers (
    id          SERIAL PRIMARY KEY,
    service_id  INTEGER      NOT NULL REFERENCES services(id) ON DELETE CASCADE,
    title       VARCHAR(150) NOT NULL,
    description TEXT
);

-- "That's how we do it" — этапы работы
CREATE TABLE service_steps (
    id          SERIAL PRIMARY KEY,
    service_id  INTEGER      NOT NULL REFERENCES services(id) ON DELETE CASCADE,
    step_number INTEGER      NOT NULL,
    title       VARCHAR(100) NOT NULL,
    description TEXT
);

-- Тарифы (Basic / Standard / Business) принадлежат услуге
CREATE TABLE pricing_plans (
    id           SERIAL PRIMARY KEY,
    service_id   INTEGER      NOT NULL REFERENCES services(id) ON DELETE CASCADE,
    name         VARCHAR(30)  NOT NULL,
    price_per_m2 NUMERIC(8,2) NOT NULL,
    term_days    INTEGER      NOT NULL
);

-- Что входит в тариф (строки таблицы цен)
CREATE TABLE pricing_features (
    id   SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL UNIQUE
);

-- Связь многие-ко-многим: тариф <-> пункт; note = 'simplified' и т.п.
CREATE TABLE plan_features (
    plan_id    INTEGER NOT NULL REFERENCES pricing_plans(id)    ON DELETE CASCADE,
    feature_id INTEGER NOT NULL REFERENCES pricing_features(id) ON DELETE CASCADE,
    note       VARCHAR(50),
    PRIMARY KEY (plan_id, feature_id)
);

-- =====================================================================
--  4. ПРОЕКТЫ (Work)
-- =====================================================================

-- Business Centers, Apartments & flats, Private houses, Stores & Malls
CREATE TABLE project_categories (
    id   SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE projects (
    id             SERIAL PRIMARY KEY,
    service_id     INTEGER      NOT NULL REFERENCES services(id),           -- вкладки фильтра
    category_id    INTEGER      NOT NULL REFERENCES project_categories(id),
    title          VARCHAR(150) NOT NULL,
    slug           VARCHAR(150) NOT NULL UNIQUE,
    image_url      VARCHAR(255),
    goal           TEXT,
    description    TEXT,
    location       VARCHAR(150),
    client_name    VARCHAR(100),
    architect      VARCHAR(100),
    size_sq_feet   INTEGER,
    value_usd      NUMERIC(14,2),
    completed_date DATE
);

-- "Constructive decisions" — список решений проекта
CREATE TABLE project_solutions (
    id         SERIAL PRIMARY KEY,
    project_id INTEGER NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    text       TEXT    NOT NULL
);

-- Отзывы клиентов (можно привязать к проекту)
CREATE TABLE testimonials (
    id          SERIAL PRIMARY KEY,
    project_id  INTEGER REFERENCES projects(id) ON DELETE SET NULL,
    author_name VARCHAR(100) NOT NULL,
    position    VARCHAR(100),
    company     VARCHAR(100),
    text        TEXT         NOT NULL,
    photo_url   VARCHAR(255)
);

-- =====================================================================
--  5. КАРЬЕРА: вакансии и резюме
-- =====================================================================

CREATE TABLE vacancies (
    id              SERIAL PRIMARY KEY,
    office_id       INTEGER      NOT NULL REFERENCES offices(id),
    title           VARCHAR(150) NOT NULL,
    employment_type VARCHAR(20)  NOT NULL CHECK (employment_type IN ('Full Time', 'Part Time')),
    description     TEXT,
    is_active       BOOLEAN      NOT NULL DEFAULT TRUE,
    created_at      TIMESTAMP    NOT NULL DEFAULT NOW()
);

-- Форма "Send your CV" (vacancy_id пустой = общее резюме)
CREATE TABLE cv_applications (
    id           SERIAL PRIMARY KEY,
    vacancy_id   INTEGER REFERENCES vacancies(id) ON DELETE SET NULL,
    user_id      INTEGER REFERENCES users(id)     ON DELETE SET NULL,
    office_id    INTEGER REFERENCES offices(id),            -- поле Location
    full_name    VARCHAR(100) NOT NULL,
    phone        VARCHAR(30)  NOT NULL,
    email        VARCHAR(100) NOT NULL,
    cover_letter TEXT,
    cv_url       VARCHAR(255) NOT NULL,                      -- ссылка на файл
    status       VARCHAR(20)  NOT NULL DEFAULT 'new'
                 CHECK (status IN ('new', 'viewed', 'invited', 'rejected')),
    created_at   TIMESTAMP    NOT NULL DEFAULT NOW()
);

-- =====================================================================
--  6. ЗАЯВКИ и ПОДПИСКА
-- =====================================================================

-- Форма "A quick way to discuss details" и форма на странице Contacts
CREATE TABLE requests (
    id             SERIAL PRIMARY KEY,
    user_id        INTEGER REFERENCES users(id)           ON DELETE SET NULL,  -- если вошёл в аккаунт
    service_id     INTEGER REFERENCES services(id)        ON DELETE SET NULL,  -- "I am interested in"
    plan_id        INTEGER REFERENCES pricing_plans(id)   ON DELETE SET NULL,  -- заявка с тарифа
    office_id      INTEGER REFERENCES offices(id)         ON DELETE SET NULL,  -- Location
    name           VARCHAR(100) NOT NULL,
    phone          VARCHAR(30)  NOT NULL,
    email          VARCHAR(100),
    message        TEXT         NOT NULL,
    contact_method VARCHAR(10)  NOT NULL DEFAULT 'phone'
                   CHECK (contact_method IN ('phone', 'email', 'viber')),
    agreed         BOOLEAN      NOT NULL DEFAULT TRUE,
    status         VARCHAR(20)  NOT NULL DEFAULT 'new'
                   CHECK (status IN ('new', 'in_progress', 'done')),
    created_at     TIMESTAMP    NOT NULL DEFAULT NOW()
);

CREATE TABLE subscribers (
    id         SERIAL PRIMARY KEY,
    email      VARCHAR(100) NOT NULL UNIQUE,
    name       VARCHAR(100),
    created_at TIMESTAMP    NOT NULL DEFAULT NOW()
);

-- =====================================================================
--  7. НОВОСТИ и КОММЕНТАРИИ
-- =====================================================================

CREATE TABLE news_categories (
    id   SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE news_posts (
    id           SERIAL PRIMARY KEY,
    category_id  INTEGER      NOT NULL REFERENCES news_categories(id),
    author_id    INTEGER      REFERENCES users(id) ON DELETE SET NULL,  -- кто добавил (админ)
    title        VARCHAR(200) NOT NULL,
    slug         VARCHAR(200) NOT NULL UNIQUE,
    preview_text TEXT,
    content      TEXT,
    image_url    VARCHAR(255),
    published_at DATE         NOT NULL DEFAULT CURRENT_DATE
);

-- parent_id = ответ на другой комментарий (кнопка Reply)
-- user_id пустой = гость (тогда обязательно имя)
CREATE TABLE comments (
    id          SERIAL PRIMARY KEY,
    post_id     INTEGER NOT NULL REFERENCES news_posts(id) ON DELETE CASCADE,
    user_id     INTEGER REFERENCES users(id)     ON DELETE SET NULL,
    parent_id   INTEGER REFERENCES comments(id)  ON DELETE CASCADE,
    author_name VARCHAR(100),
    email       VARCHAR(100),
    content     TEXT      NOT NULL,
    created_at  TIMESTAMP NOT NULL DEFAULT NOW(),
    CHECK (user_id IS NOT NULL OR author_name IS NOT NULL)
);

-- =====================================================================
--  ТЕСТОВЫЕ ДАННЫЕ
-- =====================================================================

-- Роли и пользователи -------------------------------------------------
INSERT INTO roles (name) VALUES ('user'), ('admin');

-- Пароли: admin -> admin123, остальные -> user123
INSERT INTO users (role_id, full_name, email, phone, password_hash) VALUES
(2, 'Администратор',  'admin@createx.com',  '(405) 555-0128', crypt('admin123', gen_salt('bf'))),
(1, 'Devon Lane',     'devon@mail.com',     '(405) 555-0101', crypt('user123',  gen_salt('bf'))),
(1, 'Annette Black',  'annette@mail.com',   '(405) 555-0102', crypt('user123',  gen_salt('bf'))),
(1, 'Albert Flores',  'albert@mail.com',    '(405) 555-0103', crypt('user123',  gen_salt('bf')));

-- contacts ---------------------------------------------------------------
INSERT INTO offices (city, address, phone, email, schedule, is_head) VALUES
('New York',      '8502 Preston Rd. Inglewood, New York 98380',      '(405) 555-0128', 'hello@createx.com', 'Mon - Fri 9:00 - 18:00',  TRUE),
('New Jersey',    '2464 Royal Ln. Mesa, New Jersey 45463',           '(808) 555-0111', 'hello@createx.com', 'Mon - Fri 9:00 - 18:00',  FALSE),
('San Francisco', '8502 Preston Rd. Inglewood, San Francisco 98380', '(505) 555-0125', 'hello@createx.com', 'Mon - Fri 10:00 - 19:00', FALSE);

-- about us -------------------------------------------------------------
INSERT INTO team_members (full_name, position, photo_url, sort_order) VALUES
('Courtney Alexander', 'CEO, Co-Founder',             '/src/assets/courtney.png', 1),
('Calvin Fox',         'CTO, Co-Founder',             '/src/assets/calvin.png',   2),
('Johnny Lane',        'Commercial Manager',          '/src/assets/johnny.png',   3),
('Diane Mccoy',        'Director of Human Resources', '/src/assets/diane.png',    4),
('Judith Warren',      'Lead Accountant',             '/src/assets/judith.png',   5),
('Floyd Simmmons',     'Financial Director',          '/src/assets/floyd.png',    6),
('Serenity Edwards',   'Director of Marketing',       '/src/assets/serenity.png', 7),
('Shawn Edwards',      'Tech Lead',                   '/src/assets/shawn.png',    8);

-- about us -------------------------------------------------------------
INSERT INTO company_history (event_date, title, description) VALUES
('2000-06-01', 'Company founded',        'Createx Construction Bureau starts operating in the USA.'),
('2001-10-01', 'First big contract',     'First large commercial contract completed.'),
('2004-05-01', 'Own design department',  'Interior design department opened.'),
('2007-02-01', 'New York office',        'Head office opens in New York.'),
('2010-08-01', '500 projects',           'Company passes 500 completed projects.'),
('2015-07-01', 'New Jersey office',      'Second office opens in New Jersey.'),
('2018-11-01', 'San Francisco office',   'Expansion to the West Coast.'),
('2019-03-01', 'Industry award',         'Recognized among the best construction companies in the USA.'),
('2020-06-01', 'Present',                '20 years of experience in construction.');

-- home about us ---------------------------------------------------------------
INSERT INTO statistics (page, value, label, sort_order) VALUES
('home',  '98%',      'Totally satisfied clients',              1),
('home',  '20',       'Years of experience',                    2),
('home',  '9452',     'Working hours spent',                    3),
('home',  '100%',     'Succeeded projects',                     4),
('about', '60%',      'Clients on the recommendation of friends', 1),
('about', '2400+',    'Apartments renovated',                   2),
('about', '670',      'Qualified specialists',                  3),
('about', '150000+ m2', 'Finishing work was carried out',       4);

-- home service avaible -----------------------------------
INSERT INTO advantages (section, title, description, icon_url, sort_order) VALUES
('core_value',       'Quality',               'Culpa nostrud commodo ea consequat aliquip reprehenderit.', '/src/assets/like2.png', 1),
('core_value',       'Safety',                'Anim reprehenderit sint voluptate exercitation adipisicing laborum.', '/src/assets/hand.png', 2),
('core_value',       'Comfort',               'Sit veniam aute dolore adipisicing nulla sit culpa.', '/src/assets/slippers.png', 3),
('benefit',          'Fixed Terms & Cost',    'Culpa nostrud commodo ea consequat aliquip reprehenderit.', '/src/assets/project1.png', 1),
('benefit',          'Qualified Workers',     'Anim reprehenderit sint voluptate exercitation adipisicing laborum.', '/src/assets/project2.png', 2),
('benefit',          'Supervision & Control', 'Sit veniam aute dolore adipisicing nulla sit culpa.', '/src/assets/project3.png', 3),
('employee_benefit', 'Training',              'Culpa nostrud commodo ea consequat aliquip reprehenderit.', '/src/assets/brain.png', 1),
('employee_benefit', 'Professional Growth',   'Anim reprehenderit sint voluptate exercitation adipisicing laborum.', '/src/assets/success.png', 2),
('employee_benefit', 'Growing Salary',        'Sit veniam aute dolore adipisicing nulla sit culpa.', '/src/assets/budget.png', 3);

-- Партнёры и клиенты --------------------------------------------------
INSERT INTO partners (name, logo_url) VALUES
('BuildCorp',      '/src/assets/1.png'),
('Urban Council',  '/src/assets/2.png'),
('Industry Media', '/src/assets/3.png'),
('Eco Builders',   '/src/assets/4.png');

INSERT INTO clients (name, logo_url) VALUES
('Skyline Group', '/img/clients/1.png'),
('Metro Estates', '/img/clients/2.png'),
('Green Homes',   '/img/clients/3.png');

-- services --------------------------------------------------------------
INSERT INTO services (title, slug, short_text, description, image_url) VALUES
('Construction',        'construction',        'Full-cycle construction of buildings.',      'Sapien, feugiat faucibus orci arcu, vulputate. Tristique varius consectetur vulputate arcu.', '/src/assets/construction.png'),
('Project Development', 'project-development', 'Design and planning of your project.',      'Volutpat tellus mauris sit sit. Posuere ut sit vestibulum amet viverra in.',                 '/src/assets/project.png'),
('Interior Design',     'interior-design',     'Interior design for apartments and houses.', 'Eleifend orci massa et facilisis orci feugiat ac. Congue in ut lacus, turpis accumsan gravida.', '/src/assets/interior.png'),
('Repairs',             'repairs',             'Repairs of any complexity.',                 'Facilisis cursus feugiat sit pulvinar amet. Ac facilisi dictum commodo, tortor gravida.',     '/src/assets/repairs.png');

INSERT INTO service_offers (service_id, title, description) VALUES
(3, 'Interior design of apartments',     'Adipiscing nunc arcu enim elit mattis eu placerat proin. Imperdiet elementum faucibus dignissim purus. Fusce parturient diam magna ullamcorper morbi semper massa ac facilisis.'),
(3, 'Interior design of private houses', '');

INSERT INTO service_steps (service_id, step_number, title, description) VALUES
(3, 1, 'Work Estimate',        'Culpa nostrud commodo ea consequat aliquip reprehenderit.'),
(3, 2, 'Contract',             'Laoreet ultrices curabitur luctus quisque consequat.'),
(3, 3, 'Mobilization',         'Odio massa scelerisque purus arcu sed velit eleifend cursus leo.'),
(3, 4, 'Construction Work',    'Adipisicing esse aliqua aliquip qui amet.');

--  не буду Тарифы Interior Design ---------------------------------------------
INSERT INTO pricing_plans (service_id, name, price_per_m2, term_days) VALUES
(3, 'BASIC',    20, 10),
(3, 'STANDARD', 30, 20),
(3, 'BUSINESS', 40, 30);

INSERT INTO pricing_features (name) VALUES
('Installation plan'),                       -- 1
('Planning solutions (2-3 options)'),        -- 2
('Lighting plan'),                           -- 3
('Flooring plan'),                           -- 4
('Heating floor laying scheme'),             -- 5
('Air conditioner zones layout'),            -- 6
('3D visualization of all rooms'),           -- 7
('Visualization of each room (3-4 angles)'); -- 8

INSERT INTO plan_features (plan_id, feature_id, note) VALUES
-- BASIC
(1, 1, NULL), (1, 2, NULL), (1, 3, NULL), (1, 4, NULL), (1, 7, 'simplified'),
-- STANDARD
(2, 1, NULL), (2, 2, NULL), (2, 3, NULL), (2, 4, NULL), (2, 5, NULL), (2, 6, NULL), (2, 7, NULL),
-- BUSINESS
(3, 1, NULL), (3, 2, NULL), (3, 3, NULL), (3, 4, NULL), (3, 5, NULL), (3, 6, NULL), (3, 7, NULL), (3, 8, NULL);

-- portfolio --------------------------------------------------
INSERT INTO project_categories (name) VALUES
('Business Centers'),   -- 1
('Apartments & flats'), -- 2
('Private houses'),     -- 3
('Stores & Malls');     -- 4  

-- Проекты (service_id: 1 Construction, 2 Project Dev., 3 Interior, 4 Repairs)
INSERT INTO projects
    (service_id, category_id, title, slug, image_url, goal, location, client_name, architect, size_sq_feet, value_usd, completed_date)
VALUES
(1, 1, 'Cubes Building',               'cubes-building',        '/img/projects/cubes.jpg',     'Business center with modern offices.',           'New York',                     'Metro Estates',     'HIK Architecture', 12000, 15000000, '2019-09-01'),
(1, 1, 'Red Finger Building',          'red-finger-building',   '/img/projects/red.jpg',       'Business center in the city centre.',            'New York',                     'Skyline Group',     'HIK Architecture',  9000, 11000000, '2018-04-01'),
(1, 4, 'The Pencil Building',          'the-pencil-building',   '/img/projects/pencil.jpg',    'Shopping mall with a distinctive shape.',        'San Francisco',                'Green Homes',       'HIK Architecture',  7000,  8000000, '2017-11-01'),
(1, 3, 'Modern Cottage',               'modern-cottage',        '/img/projects/cottage.jpg',   'Build a private house 840 sq. feet with a large living room, three bedrooms, two bathrooms, a terrace, a pool and a garage for two cars.', '2464 Royal Ln. Mesa, New Jersey', 'Darlene Robertson', 'HIK Architecture',   840,  2000000, '2020-05-01'),
(2, 3, 'Luxury Beach House',           'luxury-beach-house',    '/img/projects/beach.jpg',     'Design a house on the beach.',                   'New Jersey',                   'Metro Estates',     'HIK Architecture',  1500,  3500000, '2019-06-01'),
(3, 2, 'Modern Double Bedroom',        'modern-double-bedroom', '/img/projects/bedroom.jpg',   'Interior of a double bedroom.',                  'New York',                     'Skyline Group',     NULL,                 300,    40000, '2020-02-01'),
(3, 2, 'Kids Bedroom With Decorations','kids-bedroom',          '/img/projects/kids.jpg',      'Cozy bedroom for kids.',                         'New York',                     'Green Homes',       NULL,                 250,    30000, '2019-12-01'),
(3, 3, 'Scandinavian Style Interior',  'scandinavian-interior', '/img/projects/scandi.jpg',    'Scandinavian interior for a private house.',     'San Francisco',                'Metro Estates',     NULL,                1200,   90000, '2020-03-01'),
(4, 3, 'Brown and Gray Painted House', 'brown-gray-house',      '/img/projects/brown.jpg',     'Full repair and repainting of a house.',         'New Jersey',                   'Green Homes',       NULL,                1000,   60000, '2019-08-01');

INSERT INTO project_solutions (project_id, text) VALUES
(4, 'Vitae ultrices ornare eu sed in est quisque duis id.'),
(4, 'A fermentum in morbi pretium aliquam adipiscing donec tempus.'),
(4, 'Mauris odio pellentesque commodo, diam.'),
(4, 'Fermentum vestibulum est fermentum, egestas gravida scelerisque quis.'),
(4, 'At pharetra libero blandit risus, fringilla sed commodo diam.'),
(4, 'Integer ultricies viverra ut enim viverra ut.');

INSERT INTO testimonials (project_id, author_name, position, company, text) VALUES
(4, 'Shawn Edwards', 'Position', 'Company name', 'Ipsum aute sunt aliquip aute et occaecat. Anim minim do cillum eiusmod enim. Consectetur magna cillum consequat minim laboris cillum laboris voluptate minim proident exercitation ullamco.'),
(NULL, 'Darlene Robertson', 'Owner', 'Private client', 'Great team, everything was finished on time and within the budget.');

-- avaible ------------------------------------------------------------
INSERT INTO vacancies (office_id, title, employment_type) VALUES
(1, 'Heavy Equipment Operator',    'Full Time'),
(3, 'Financial Compliance Analyst','Full Time'),
(2, 'Project Manager - Buildings', 'Full Time'),
(1, 'Environment Specialist',      'Part Time'),
(1, 'Accountant',                  'Full Time');

INSERT INTO cv_applications (vacancy_id, user_id, office_id, full_name, phone, email, cover_letter, cv_url) VALUES
(5, 2, 1, 'Devon Lane', '(405) 555-0101', 'devon@mail.com', 'I would like to join your team.', '/uploads/cv/devon_lane.pdf');

-- Заявки и подписка ---------------------------------------------------
INSERT INTO requests (user_id, service_id, plan_id, office_id, name, phone, email, message, contact_method) VALUES
(2,    3,    2,    1, 'Devon Lane', '(405) 555-0101', 'devon@mail.com', 'Interested in the STANDARD plan for my apartment.', 'email'),
(NULL, 1, NULL,    2, 'John Smith', '(405) 555-0199', NULL,            'Please call me about house construction.',          'phone');

INSERT INTO subscribers (email, name) VALUES
('subscriber1@mail.com', 'Anna'),
('subscriber2@mail.com', NULL);

-- Новости -------------------------------------------------------------
INSERT INTO news_categories (name) VALUES
('Company News'),   -- 1
('Innovation'),     -- 2
('Industry News'),  -- 3
('Expert Tips'),    -- 4
('Marketing');      -- 5

INSERT INTO news_posts (category_id, author_id, title, slug, preview_text, content, image_url, published_at) VALUES
(3, 1, 'How to Build Climate Change-Resilient Infrastructure', 'climate-resilient-infrastructure',
    'Ipsum aliquet nisi, hendrerit rhoncus quam tortor, maecenas faucibus. Tincidunt aliquet sit vel, venenatis nulla...',
    'Vulputate vitae pellentesque scelerisque luctus consequat mattis pellentesque dui odio. Interdum aenean sit malesuada ornare sed gravida rhoncus, congue.',
    '/img/news/1.jpg', '2020-06-24'),
(2, 1, 'How Construction Can Help Itself', 'how-construction-can-help-itself',
    'Porta habitant vitae quam interdum. Leo viverra non volutpat rhoncus placerat vitae scelerisque...',
    'Porta habitant vitae quam interdum. Leo viverra non volutpat rhoncus placerat vitae scelerisque.',
    '/img/news/2.jpg', '2020-06-12'),
(4, 1, 'The Difference Between a Digger and an Excavator', 'digger-vs-excavator',
    'Cras est nisi purus velit facilisi vitae, dolor. Lorem scelerisque integer duis et nulla lobortis cursus...',
    'Cras est nisi purus velit facilisi vitae, dolor. Lorem scelerisque integer duis et nulla lobortis cursus.',
    '/img/news/3.jpg', '2020-05-16'),
(4, 1, 'Building Construction Hand Tools', 'building-construction-hand-tools',
    'Tellus quis aliquet volutpat nunc pulvinar donec sed sapien. Vitae elit id dolor, tristique massa...',
    'Tellus quis aliquet volutpat nunc pulvinar donec sed sapien.',
    '/img/news/4.jpg', '2020-02-25'),
(3, 1, 'Top 10 Construction Trends', 'top-10-construction-trends',
    'Dignissim sed enim, eleifend morbi condimentum. Congue id quis vulputate dignissim eget...',
    'Dignissim sed enim, eleifend morbi condimentum. Congue id quis vulputate dignissim eget.',
    '/img/news/5.jpg', '2020-01-14'),
(1, 1, 'Types of Flooring Materials', 'types-of-flooring-materials',
    'Maecenas donec lacinia nunc, quam sit magnis mauris. Neque bibendum et mauris, aenean...',
    'Maecenas donec lacinia nunc, quam sit magnis mauris.',
    '/img/news/6.jpg', '2019-12-01');

-- Комментарии (4 к первой статье, 1 к четвёртой) ----------------------
INSERT INTO comments (post_id, user_id, parent_id, author_name, email, content, created_at) VALUES
(1, 2,    NULL, NULL,              NULL,               'Phasellus varius faucibus ultrices odio in. Massa neque dictum natoque ornare rutrum.',      '2020-07-15 10:00'),
(1, 3,    1,    NULL,              NULL,               '@Devon Lane Egestas fermentum natoque sollicitudin mauris.',                                 '2020-07-16 09:30'),
(1, 4,    NULL, NULL,              NULL,               'Libero commodo sit dui ac proin. Penatibus ultricies at adipiscing mauris nunc.',            '2020-07-07 12:00'),
(1, NULL, NULL, 'Marvin McKinney', 'marvin@mail.com',  'Ullamcorper nibh sed ac ipsum nunc imperdiet rhoncus. Quam donec habitant nibh sit.',        '2020-06-28 15:20'),
(4, 3,    NULL, NULL,              NULL,               'Useful list of tools, thanks!',                                                              '2020-03-01 11:00');

-- =====================================================================
--  ПРИМЕРЫ ЗАПРОСОВ ДЛЯ САЙТА
-- =====================================================================

-- РЕГИСТРАЦИЯ (пароль шифруется на лету)
-- INSERT INTO users (full_name, email, phone, password_hash)
-- VALUES ('Новый Клиент', 'new@mail.com', '(405) 555-0150', crypt('mypassword', gen_salt('bf')));

-- АВТОРИЗАЦИЯ: вернёт строку, если email и пароль верные (иначе 0 строк)
-- SELECT u.id, u.full_name, u.email, r.name AS role
-- FROM users u JOIN roles r ON r.id = u.role_id
-- WHERE u.email = 'admin@createx.com'
--   AND u.password_hash = crypt('admin123', u.password_hash)
--   AND u.is_active = TRUE;

-- Проекты с фильтром по услуге и категории
-- SELECT p.title, s.title AS service, c.name AS category
-- FROM projects p
-- JOIN services s ON s.id = p.service_id
-- JOIN project_categories c ON c.id = p.category_id
-- WHERE s.slug = 'interior-design';

-- Новости с количеством комментариев
-- SELECT n.title, c.name AS category, n.published_at, COUNT(cm.id) AS comments
-- FROM news_posts n
-- JOIN news_categories c ON c.id = n.category_id
-- LEFT JOIN comments cm ON cm.post_id = n.id
-- GROUP BY n.id, c.name ORDER BY n.published_at DESC;

-- Таблица цен: тариф -> что входит
-- SELECT pl.name, pl.price_per_m2, f.name AS feature, pf.note
-- FROM pricing_plans pl
-- JOIN plan_features pf ON pf.plan_id = pl.id
-- JOIN pricing_features f ON f.id = pf.feature_id
-- ORDER BY pl.price_per_m2, f.id;

-- Вакансии с городом офиса
-- SELECT v.title, v.employment_type, o.city
-- FROM vacancies v JOIN offices o ON o.id = v.office_id WHERE v.is_active;
