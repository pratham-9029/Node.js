# CLAUDE.md — Blog Project

## Project Overview

This is a **Node.js blog application** with an admin panel, built using Express 5, EJS templating, MongoDB (via Mongoose), and Passport.js for authentication. The application uses ES Modules (`"type": "module"` in package.json).

## Commands

### Development

```bash
npm run dev        # Start with nodemon (auto-restart on file changes)
npm start          # Start with node (production)
```

### Server Info

- **Default Port**: `8081` (configurable via `.env`)
- **URL**: `http://localhost:8081`

### Dependencies

```bash
npm install        # Install all dependencies
```

## Project Structure

```
Day-14-Blog-Project/
├── index.js                          # App entry point — Express setup, middleware, server start
├── config/
│   ├── databse.js                    # MongoDB connection via Mongoose (NOTE: filename typo is intentional)
│   └── dotenv.js                     # Environment variable loader — exports envConfig
├── controllers/
│   └── adminPane.controller.js       # Admin panel controller — dashboard, login, register, logout, view users
├── middleware/
│   ├── auth.js                       # Authentication guard — redirects unauthenticated users to /login
│   └── passport.js                   # Passport.js local strategy config — bcrypt password verification
├── model/
│   └── userModel.js                  # Mongoose User schema (username, email, password)
├── routes/
│   ├── index.js                      # Root router — mounts all sub-routers
│   └── adminPanel.route.js           # Admin routes — /admin, /login, /register, /logout, /view-registered-users
├── views/
│   ├── index.ejs                     # Main admin dashboard page
│   ├── pages/
│   │   ├── login.ejs                 # Login page
│   │   ├── register.ejs              # Registration page
│   │   ├── my-blogs.ejs              # User's blogs page
│   │   └── view-registered-users.ejs # View all registered users
│   └── partials/
│       ├── header.ejs                # Shared header/nav partial
│       └── footer.ejs                # Shared footer partial
├── public/
│   ├── assets/                       # Static assets (images, icons, etc.)
│   └── dist/                         # Compiled/bundled frontend assets (CSS, JS)
├── .env                              # Environment variables (PORT, MONGODB_URL) — DO NOT COMMIT
├── .env.example                      # Template for required env vars
└── package.json                      # Project metadata and dependencies
```

## Architecture & Patterns

### Module System

- **ES Modules** (`import`/`export`) — NOT CommonJS. All files use `.js` extension in imports.

### Routing

- Routes are defined in `routes/` and mounted in `routes/index.js` (the root router).
- The root router is imported by `index.js` (app entry point) as `router`.

### Authentication

- **Passport.js** with `passport-local` strategy.
- Passwords are hashed with **bcrypt** (salt rounds: 10).
- Sessions managed via `express-session` (1-hour cookie TTL).
- Auth middleware (`middleware/auth.js`) checks `req.isAuthenticated()` and sets `res.locals.user`.

### Database

- **MongoDB Atlas** via Mongoose.
- Connection string is read from `MONGODB_URL` in `.env`.
- The database connection is established immediately on import of `config/databse.js`.

### View Engine

- **EJS** templates in `views/`.
- Partials (`header.ejs`, `footer.ejs`) are included in pages.
- Render paths use relative references from `views/` (e.g., `./pages/login`).

## Key Routes

| Method | Path                     | Auth | Description               |
| ------ | ------------------------ | ---- | ------------------------- |
| GET    | `/admin`                 | Yes  | Admin dashboard           |
| GET    | `/login`                 | No   | Login page                |
| POST   | `/login`                 | No   | Login via Passport local  |
| GET    | `/register`              | No   | Registration page         |
| POST   | `/register`              | No   | Create new user           |
| GET    | `/logout`                | No   | Log out and redirect      |
| GET    | `/view-registered-users` | Yes  | List all registered users |

## Environment Variables

| Variable      | Description               | Example                               |
| ------------- | ------------------------- | ------------------------------------- |
| `PORT`        | Server port               | `8081`                                |
| `MONGODB_URL` | MongoDB connection string | `mongodb+srv://user:pass@host/dbname` |

## Coding Conventions

- Use **ES Module** syntax (`import`/`export`), never `require()`.
- Controllers are plain objects with method functions, exported as default.
- Models use Mongoose schemas, exported as default model instances.
- Middleware functions follow the `(req, res, next)` signature.
- Route files export an Express `Router` instance.
- File naming: `camelCase` with descriptive suffixes (e.g., `.controller.js`, `.route.js`, `Model.js`).
- Views use `.ejs` extension and are organized into `pages/` and `partials/` subdirectories.

## Known Issues / Notes

- `config/databse.js` has a typo in the filename (missing 'a' in "database") — keep it as-is to avoid breaking imports.
- The `loginUser` method in `adminPane.controller.js` is not currently used (Passport handles `/login` POST directly).
- The `logoutUser` controller references `next` but doesn't include it in the function signature — potential bug.
- Session secret is hardcoded as `'key'` in `index.js` — should be moved to `.env` for production.
