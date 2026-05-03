const express = require('express');
const { Pool } = require('pg');
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const session = require('express-session');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json'); // We will generate this next

const app = express();
app.use(express.json());

// --- DATABASE CONNECTION (PostgreSQL) ---
const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

pool.connect()
    .then(() => console.log('✅ Connected to PostgreSQL Database'))
    .catch(err => console.error('❌ Database connection error', err.stack));

// --- AUTHENTICATION (GitHub OAuth) ---
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    // Here we would upsert the user into our PostgreSQL database
    return done(null, profile);
  }
));

// Auth Routes
app.get('/auth/github', passport.authenticate('github', { scope: [ 'user:email' ] }));
app.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  (req, res) => res.redirect('/dashboard') // Successful auth
);

// --- MODULAR REST API ENDPOINTS ---

// GET /api/v1/transit
app.get('/api/v1/transit', async (req, res) => {
    try {
        // Example DB Query pulling dynamic data
        const { rows } = await pool.query('SELECT * FROM transit_schedules WHERE active = true ORDER BY departure_time ASC');
        res.status(200).json({ success: true, count: rows.length, data: rows });
    } catch (err) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
});

// GET /api/v1/dining/today
app.get('/api/v1/dining/today', async (req, res) => {
    try {
        const todayId = new Date().getDay();
        const { rows } = await pool.query('SELECT * FROM dining_menus WHERE day_id = $1', [todayId]);
        res.status(200).json({ success: true, data: rows[0] });
    } catch (err) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
});

// --- API DOCUMENTATION ---
// Auto-generated docs available at /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// --- SERVER INITIALIZATION ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Scholar OS Backend running in ${process.env.NODE_ENV} mode on port ${PORT}`);
    console.log(`📚 API Documentation available at http://localhost:${PORT}/api-docs`);
});
