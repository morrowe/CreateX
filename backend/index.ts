import express, { type Request, type Response, type NextFunction } from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import { Pool } from 'pg';

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: '1234',
    port: 5432,
});

const port: number = 3000;

// ---------------------------------------------------------------------
// ТИПЫ
// ---------------------------------------------------------------------

interface RegisterBody {
    full_name?: string;
    email?: string;
    phone?: string;
    password?: string;
}

interface LoginBody {
    email?: string;
    password?: string;
}

interface UserRow {
    id: number;
    full_name: string;
    email: string;
    phone: string | null;
    password_hash: string;
    is_active: boolean;
    role: string;
}

interface SendCvBody {
    vacancy_id?: number;
    user_id?: number;
    office_id?: number;
    full_name?: string;
    phone?: string;
    email?: string;
    cover_letter?: string;
    cv_url?: string;
}

interface RegisterRequestBody {
    user_id?: number;
    service_id?: number;
    plan_id?: number;
    office_id?: number;
    name?: string;
    phone?: string;
    email?: string;
    message?: string;
    contact_method?: 'phone' | 'email' | 'viber';
}

interface SubscribeBody {
    email?: string;
    name?: string;
}

interface CommentBody {
    post_id?: number;
    user_id?: number;
    parent_id?: number;
    author_name?: string;
    email?: string;
    content?: string;
}

interface UserUpdateBody {
    role_id?: number;
    is_active?: boolean;
}

// ---------------------------------------------------------------------
// РЕГИСТРАЦИЯ И АВТОРИЗАЦИЯ
// ---------------------------------------------------------------------

app.post('/api/register', async (req: Request, res: Response) => {
    try {
        const { full_name, email, phone, password } = req.body as RegisterBody;

        if (!full_name || !email || !password) {
            res.status(400).json({ error: 'All fields are required' });
            return;
        }

        const exists = await pool.query(
            `SELECT id FROM users WHERE email = $1`,
            [email]
        );

        if (exists.rows.length > 0) {
            res.status(409).json({ error: 'Email already registered' });
            return;
        }

        const hash = await bcrypt.hash(password, 10);

        const result = await pool.query(
            `INSERT INTO users (full_name, email, phone, password_hash)
             VALUES ($1, $2, $3, $4)
             RETURNING id, full_name, email, phone, role_id`,
            [full_name, email, phone || null, hash]
        );

        res.status(201).json({
            success: true,
            user: { ...result.rows[0], role: 'user' }
        });

    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'database error' });
    }
});

app.post('/api/login', async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body as LoginBody;

        if (!email || !password) {
            res.status(400).json({ error: 'All fields are required' });
            return;
        }

        const result = await pool.query<UserRow>(
            `SELECT u.id, u.full_name, u.email, u.phone, u.password_hash, u.is_active,
                    r.name AS role
             FROM users u
             JOIN roles r ON r.id = u.role_id
             WHERE u.email = $1`,
            [email]
        );

        const user = result.rows[0];

        if (!user || !user.is_active) {
            res.status(401).json({ error: 'Wrong email or password' });
            return;
        }

        const ok = await bcrypt.compare(password, user.password_hash);

        if (!ok) {
            res.status(401).json({ error: 'Wrong email or password' });
            return;
        }

        const { password_hash: _hash, ...safeUser } = user;

        res.json({ success: true, user: safeUser });

    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'database error' });
    }
});

// проверка админа: react отправляет заголовок x-user-id
const adminOnly = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.headers['x-user-id']);

        if (!id) {
            res.status(401).json({ error: 'Login required' });
            return;
        }

        const result = await pool.query(
            `SELECT r.name
             FROM users u
             JOIN roles r ON r.id = u.role_id
             WHERE u.id = $1 AND u.is_active = TRUE`,
            [id]
        );

        if (result.rows.length === 0 || result.rows[0].name !== 'admin') {
            res.status(403).json({ error: 'Admin only' });
            return;
        }

        next();

    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'database error' });
    }
};

// ---------------------------------------------------------------------
// КОМПАНИЯ
// ---------------------------------------------------------------------

app.get('/api/offices', async (req: Request, res: Response) => {
    try {
        const result = await pool.query(
            `SELECT id, city, address, phone, email, schedule, is_head
             FROM offices
             ORDER BY id ASC`
        );
        res.json(result.rows);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'database error' });
    }
});

app.get('/api/team', async (req: Request, res: Response) => {
    try {
        const result = await pool.query(
            `SELECT id, full_name, position, photo_url, sort_order
             FROM team_members
             ORDER BY sort_order ASC`
        );
        res.json(result.rows);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'database error' });
    }
});

app.get('/api/history', async (req: Request, res: Response) => {
    try {
        const result = await pool.query(
            `SELECT id, event_date, title, description
             FROM company_history
             ORDER BY event_date DESC`
        );
        res.json(result.rows);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'database error' });
    }
});

// /api/statistics?page=home или about
app.get('/api/statistics', async (req: Request, res: Response) => {
    try {
        const { page } = req.query;

        const result = page
            ? await pool.query(
                `SELECT id, page, value, label, sort_order
                 FROM statistics
                 WHERE page = $1
                 ORDER BY sort_order ASC`,
                [page]
            )
            : await pool.query(
                `SELECT id, page, value, label, sort_order
                 FROM statistics
                 ORDER BY page, sort_order ASC`
            );

        res.json(result.rows);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'database error' });
    }
});

// /api/advantages?section=core_value, benefit или employee_benefit
app.get('/api/advantages', async (req: Request, res: Response) => {
    try {
        const { section } = req.query;

        const result = section
            ? await pool.query(
                `SELECT id, section, title, description, icon_url, sort_order
                 FROM advantages
                 WHERE section = $1
                 ORDER BY sort_order ASC`,
                [section]
            )
            : await pool.query(
                `SELECT id, section, title, description, icon_url, sort_order
                 FROM advantages
                 ORDER BY section, sort_order ASC`
            );

        res.json(result.rows);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'database error' });
    }
});

app.get('/api/partners', async (req: Request, res: Response) => {
    try {
        const result = await pool.query(
            `SELECT id, name, logo_url FROM partners ORDER BY id ASC`
        );
        res.json(result.rows);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'database error' });
    }
});

app.get('/api/clients', async (req: Request, res: Response) => {
    try {
        const result = await pool.query(
            `SELECT id, name, logo_url FROM clients ORDER BY id ASC`
        );
        res.json(result.rows);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'database error' });
    }
});

app.get('/api/testimonials', async (req: Request, res: Response) => {
    try {
        const result = await pool.query(
            `SELECT id, project_id, author_name, position, company, text, photo_url
             FROM testimonials
             ORDER BY id ASC`
        );
        res.json(result.rows);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'database error' });
    }
});

// ---------------------------------------------------------------------
// УСЛУГИ И ЦЕНЫ
// ---------------------------------------------------------------------

app.get('/api/services', async (req: Request, res: Response) => {
    try {
        const result = await pool.query(
            `SELECT id, title, slug, short_text, description, image_url
             FROM services
             ORDER BY id ASC`
        );
        res.json(result.rows);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'database error' });
    }
});

// одна услуга: описание, "We offer", этапы, тарифы с составом
app.get('/api/services/:slug', async (req: Request, res: Response) => {
    try {
        const service = await pool.query(
            `SELECT id, title, slug, short_text, description, image_url
             FROM services
             WHERE slug = $1`,
            [req.params.slug]
        );

        if (service.rows.length === 0) {
            res.status(404).json({ error: 'not found' });
            return;
        }

        const serviceId = service.rows[0].id;

        const offers = await pool.query(
            `SELECT id, title, description
             FROM service_offers
             WHERE service_id = $1
             ORDER BY id ASC`,
            [serviceId]
        );

        const steps = await pool.query(
            `SELECT id, step_number, title, description
             FROM service_steps
             WHERE service_id = $1
             ORDER BY step_number ASC`,
            [serviceId]
        );

        const plans = await pool.query(
            `SELECT pl.id, pl.name, pl.price_per_m2, pl.term_days,
                    COALESCE(
                        json_agg(
                            json_build_object('id', f.id, 'name', f.name, 'note', pf.note)
                            ORDER BY f.id
                        ) FILTER (WHERE f.id IS NOT NULL),
                        '[]'
                    ) AS features
             FROM pricing_plans pl
             LEFT JOIN plan_features pf ON pf.plan_id = pl.id
             LEFT JOIN pricing_features f ON f.id = pf.feature_id
             WHERE pl.service_id = $1
             GROUP BY pl.id
             ORDER BY pl.price_per_m2 ASC`,
            [serviceId]
        );

        const features = await pool.query(
            `SELECT id, name FROM pricing_features ORDER BY id ASC`
        );

        res.json({
            ...service.rows[0],
            offers: offers.rows,
            steps: steps.rows,
            plans: plans.rows,
            features: features.rows
        });

    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'database error' });
    }
});

// ---------------------------------------------------------------------
// ПРОЕКТЫ
// ---------------------------------------------------------------------

app.get('/api/project-categories', async (req: Request, res: Response) => {
    try {
        const result = await pool.query(
            `SELECT id, name FROM project_categories ORDER BY id ASC`
        );
        res.json(result.rows);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'database error' });
    }
});

// /api/projects?service=interior-design&category=3&limit=6&offset=0
app.get('/api/projects', async (req: Request, res: Response) => {
    try {
        const { service, category, limit, offset } = req.query;

        const params: unknown[] = [];
        const where: string[] = [];

        if (service) {
            params.push(service);
            where.push(`s.slug = $${params.length}`);
        }

        if (category) {
            params.push(category);
            where.push(`p.category_id = $${params.length}`);
        }

        let sql = `SELECT p.id, p.title, p.slug, p.image_url, p.completed_date,
                          s.title AS service, s.slug AS service_slug,
                          c.name AS category
                   FROM projects p
                   JOIN services s ON s.id = p.service_id
                   JOIN project_categories c ON c.id = p.category_id
                   ${where.length ? 'WHERE ' + where.join(' AND ') : ''}
                   ORDER BY p.completed_date DESC, p.id ASC`;

        if (limit) {
            params.push(Number(limit));
            sql += ` LIMIT $${params.length}`;
            params.push(Number(offset) || 0);
            sql += ` OFFSET $${params.length}`;
        }

        const result = await pool.query(sql, params);
        res.json(result.rows);

    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'database error' });
    }
});

// страница проекта: данные, решения, похожие проекты
app.get('/api/projects/:slug', async (req: Request, res: Response) => {
    try {
        const project = await pool.query(
            `SELECT p.id, p.title, p.slug, p.image_url, p.goal, p.description,
                    p.location, p.client_name, p.architect, p.size_sq_feet,
                    p.value_usd, p.completed_date, p.category_id,
                    s.title AS service, c.name AS category
             FROM projects p
             JOIN services s ON s.id = p.service_id
             JOIN project_categories c ON c.id = p.category_id
             WHERE p.slug = $1`,
            [req.params.slug]
        );

        if (project.rows.length === 0) {
            res.status(404).json({ error: 'not found' });
            return;
        }

        const item = project.rows[0];

        const solutions = await pool.query(
            `SELECT id, text
             FROM project_solutions
             WHERE project_id = $1
             ORDER BY id ASC`,
            [item.id]
        );

        const similar = await pool.query(
            `SELECT p.id, p.title, p.slug, p.image_url, c.name AS category
             FROM projects p
             JOIN project_categories c ON c.id = p.category_id
             WHERE p.category_id = $1 AND p.id <> $2
             ORDER BY p.completed_date DESC
             LIMIT 3`,
            [item.category_id, item.id]
        );

        res.json({
            ...item,
            solutions: solutions.rows,
            similar: similar.rows
        });

    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'database error' });
    }
});

// ---------------------------------------------------------------------
// ВАКАНСИИ И РЕЗЮМЕ
// ---------------------------------------------------------------------

app.get('/api/vacancies', async (req: Request, res: Response) => {
    try {
        const result = await pool.query(
            `SELECT v.id, v.title, v.employment_type, v.description, o.city
             FROM vacancies v
             JOIN offices o ON o.id = v.office_id
             WHERE v.is_active = TRUE
             ORDER BY v.id ASC`
        );
        res.json(result.rows);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'database error' });
    }
});

app.post('/api/send-cv', async (req: Request, res: Response) => {
    try {
        const { vacancy_id, user_id, office_id, full_name, phone, email, cover_letter, cv_url } = req.body as SendCvBody;

        if (!full_name || !phone || !email || !cv_url) {
            res.status(400).json({ error: 'All fields are required' });
            return;
        }

        const result = await pool.query(
            `INSERT INTO cv_applications
                (vacancy_id, user_id, office_id, full_name, phone, email, cover_letter, cv_url)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
             RETURNING id`,
            [vacancy_id || null, user_id || null, office_id || null,
             full_name, phone, email, cover_letter || null, cv_url]
        );

        res.status(201).json({
            success: true,
            cvId: result.rows[0].id
        });

    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'database error' });
    }
});

// ---------------------------------------------------------------------
// ЗАЯВКИ И ПОДПИСКА
// ---------------------------------------------------------------------

app.post('/api/register-request', async (req: Request, res: Response) => {
    try {
        const { user_id, service_id, plan_id, office_id, name, phone, email, message, contact_method } = req.body as RegisterRequestBody;

        if (!name || !phone || !message) {
            res.status(400).json({ error: 'All fields are required' });
            return;
        }

        const result = await pool.query(
            `INSERT INTO requests
                (user_id, service_id, plan_id, office_id, name, phone, email, message, contact_method)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
             RETURNING id`,
            [user_id || null, service_id || null, plan_id || null, office_id || null,
             name, phone, email || null, message, contact_method || 'phone']
        );

        res.status(201).json({
            success: true,
            requestId: result.rows[0].id
        });

    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'database error' });
    }
});

app.post('/api/subscribe', async (req: Request, res: Response) => {
    try {
        const { email, name } = req.body as SubscribeBody;

        if (!email) {
            res.status(400).json({ error: 'All fields are required' });
            return;
        }

        await pool.query(
            `INSERT INTO subscribers (email, name)
             VALUES ($1, $2)
             ON CONFLICT (email) DO NOTHING`,
            [email, name || null]
        );

        res.status(201).json({ success: true });

    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'database error' });
    }
});

// ---------------------------------------------------------------------
// НОВОСТИ И КОММЕНТАРИИ
// ---------------------------------------------------------------------

app.get('/api/news-categories', async (req: Request, res: Response) => {
    try {
        const result = await pool.query(
            `SELECT id, name FROM news_categories ORDER BY id ASC`
        );
        res.json(result.rows);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'database error' });
    }
});

// /api/news-posts?category=4&page=1&limit=6
app.get('/api/news-posts', async (req: Request, res: Response) => {
    try {
        const { category } = req.query;
        const limit = Number(req.query.limit) || 6;
        const page = Number(req.query.page) || 1;

        const params: unknown[] = [];
        let where = '';

        if (category) {
            params.push(category);
            where = `WHERE n.category_id = $1`;
        }

        const total = await pool.query(
            `SELECT COUNT(*) FROM news_posts n ${where}`,
            params
        );

        params.push(limit, (page - 1) * limit);

        const result = await pool.query(
            `SELECT n.id, n.title, n.slug, n.preview_text, n.image_url, n.published_at,
                    c.name AS category,
                    COUNT(cm.id)::int AS comments_count
             FROM news_posts n
             JOIN news_categories c ON c.id = n.category_id
             LEFT JOIN comments cm ON cm.post_id = n.id
             ${where}
             GROUP BY n.id, c.name
             ORDER BY n.published_at DESC
             LIMIT $${params.length - 1} OFFSET $${params.length}`,
            params
        );

        const count = Number(total.rows[0].count);

        res.json({
            items: result.rows,
            total: count,
            pages: Math.ceil(count / limit)
        });

    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'database error' });
    }
});

app.get('/api/news-posts/:slug', async (req: Request, res: Response) => {
    try {
        const result = await pool.query(
            `SELECT n.id, n.title, n.slug, n.preview_text, n.content, n.image_url,
                    n.published_at, c.name AS category, u.full_name AS author,
                    (SELECT COUNT(*)::int FROM comments WHERE post_id = n.id) AS comments_count
             FROM news_posts n
             JOIN news_categories c ON c.id = n.category_id
             LEFT JOIN users u ON u.id = n.author_id
             WHERE n.slug = $1`,
            [req.params.slug]
        );

        if (result.rows.length === 0) {
            res.status(404).json({ error: 'not found' });
            return;
        }

        res.json(result.rows[0]);

    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'database error' });
    }
});

app.get('/api/comments/:postId', async (req: Request, res: Response) => {
    try {
        const result = await pool.query(
            `SELECT cm.id, cm.parent_id, cm.content, cm.created_at,
                    COALESCE(u.full_name, cm.author_name) AS author
             FROM comments cm
             LEFT JOIN users u ON u.id = cm.user_id
             WHERE cm.post_id = $1
             ORDER BY cm.created_at DESC`,
            [req.params.postId]
        );
        res.json(result.rows);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'database error' });
    }
});

app.post('/api/comments', async (req: Request, res: Response) => {
    try {
        const { post_id, user_id, parent_id, author_name, email, content } = req.body as CommentBody;

        if (!post_id || !content || (!user_id && !author_name)) {
            res.status(400).json({ error: 'All fields are required' });
            return;
        }

        const result = await pool.query(
            `INSERT INTO comments (post_id, user_id, parent_id, author_name, email, content)
             VALUES ($1, $2, $3, $4, $5, $6)
             RETURNING id`,
            [post_id, user_id || null, parent_id || null, author_name || null, email || null, content]
        );

        res.status(201).json({
            success: true,
            commentId: result.rows[0].id
        });

    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'database error' });
    }
});

// ---------------------------------------------------------------------
// АДМИН-ПАНЕЛЬ (нужен заголовок x-user-id администратора)
// ---------------------------------------------------------------------

const adminTables: string[] = [
    'services', 'service_offers', 'service_steps',
    'pricing_plans', 'pricing_features',
    'project_categories', 'projects', 'project_solutions', 'testimonials',
    'news_categories', 'news_posts', 'comments',
    'offices', 'vacancies', 'team_members', 'company_history',
    'statistics', 'advantages', 'partners', 'clients',
    'requests', 'cv_applications', 'subscribers'
];

// колонки таблицы берём из базы, чтобы нельзя было передать лишние поля
const getColumns = async (table: string): Promise<string[]> => {
    const result = await pool.query(
        `SELECT column_name
         FROM information_schema.columns
         WHERE table_schema = 'public' AND table_name = $1`,
        [table]
    );
    return result.rows.map((r: { column_name: string }) => r.column_name).filter((c: string) => c !== 'id');
};

const checkTable = (req: Request, res: Response, next: NextFunction): void => {
    if (!adminTables.includes(req.params.table)) {
        res.status(404).json({ error: 'table not found' });
        return;
    }
    next();
};

app.get('/api/admin/users', adminOnly, async (req: Request, res: Response) => {
    try {
        const result = await pool.query(
            `SELECT u.id, u.full_name, u.email, u.phone, u.is_active, u.created_at,
                    u.role_id, r.name AS role
             FROM users u
             JOIN roles r ON r.id = u.role_id
             ORDER BY u.id ASC`
        );
        res.json(result.rows);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'database error' });
    }
});

// выдать роль админа или заблокировать пользователя
app.put('/api/admin/users/:id', adminOnly, async (req: Request, res: Response) => {
    try {
        const { role_id, is_active } = req.body as UserUpdateBody;

        const result = await pool.query(
            `UPDATE users
             SET role_id = COALESCE($1, role_id),
                 is_active = COALESCE($2, is_active)
             WHERE id = $3
             RETURNING id, full_name, email, role_id, is_active`,
            [role_id ?? null, is_active ?? null, req.params.id]
        );

        res.json(result.rows[0]);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'database error' });
    }
});

app.delete('/api/admin/users/:id', adminOnly, async (req: Request, res: Response) => {
    try {
        await pool.query(`DELETE FROM users WHERE id = $1`, [req.params.id]);
        res.json({ success: true });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'database error' });
    }
});

app.get('/api/admin/:table', adminOnly, checkTable, async (req: Request, res: Response) => {
    try {
        const result = await pool.query(
            `SELECT * FROM ${req.params.table} ORDER BY id ASC`
        );
        res.json(result.rows);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'database error' });
    }
});

app.post('/api/admin/:table', adminOnly, checkTable, async (req: Request, res: Response) => {
    try {
        const table = req.params.table;
        const columns = await getColumns(table);
        const keys = Object.keys(req.body).filter((k: string) => columns.includes(k));

        if (keys.length === 0) {
            res.status(400).json({ error: 'No data' });
            return;
        }

        const result = await pool.query(
            `INSERT INTO ${table} (${keys.join(', ')})
             VALUES (${keys.map((_k, i) => '$' + (i + 1)).join(', ')})
             RETURNING *`,
            keys.map((k: string) => req.body[k])
        );

        res.status(201).json(result.rows[0]);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'database error' });
    }
});

app.put('/api/admin/:table/:id', adminOnly, checkTable, async (req: Request, res: Response) => {
    try {
        const table = req.params.table;
        const columns = await getColumns(table);
        const keys = Object.keys(req.body).filter((k: string) => columns.includes(k));

        if (keys.length === 0) {
            res.status(400).json({ error: 'No data' });
            return;
        }

        const result = await pool.query(
            `UPDATE ${table}
             SET ${keys.map((k, i) => `${k} = $${i + 1}`).join(', ')}
             WHERE id = $${keys.length + 1}
             RETURNING *`,
            [...keys.map((k: string) => req.body[k]), req.params.id]
        );

        if (result.rows.length === 0) {
            res.status(404).json({ error: 'not found' });
            return;
        }

        res.json(result.rows[0]);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'database error' });
    }
});

app.delete('/api/admin/:table/:id', adminOnly, checkTable, async (req: Request, res: Response) => {
    try {
        await pool.query(
            `DELETE FROM ${req.params.table} WHERE id = $1`,
            [req.params.id]
        );
        res.json({ success: true });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'database error' });
    }
});

app.listen(port, () => console.log(`Server running on port ${port}`));
