# Tetris Webpage

A fully-featured Tetris game built with vanilla JavaScript and HTML5 Canvas, originally developed as a web development coursework project and progressively improved with bug fixes, new gameplay features, and a complete visual overhaul.

## Features

### Gameplay
- **Ghost piece** — translucent outline shows exactly where the active piece will land
- **Next piece preview** — displays the upcoming tetromino in the sidebar
- **Hard drop** — instantly slam a piece to the bottom with `Space`
- **Pause** — toggle with `P`, with a colour-coded status indicator
- **Level progression** — game speeds up every 10 lines cleared
- **Standard Tetris scoring** — 100 / 300 / 500 / 800 × level for 1 / 2 / 3 / 4 lines cleared
- **Lines cleared counter** — tracked and displayed in the sidebar
- **Wall-kick system** — pieces try 5 rotation offsets before giving up, preventing wall clipping

### Controls
| Key | Action |
|-----|--------|
| `A` / `←` | Move left |
| `D` / `→` | Move right |
| `S` / `↓` | Move down |
| `E` / `↑` | Rotate |
| `Space` | Hard drop |
| `P` | Pause / Resume |

### Visuals
- Dark navy / charcoal theme with red accent (`#e94560`)
- Beveled cells with highlight and shadow edges for a 3D effect
- Subtle grid overlay on the board
- Glowing canvas border
- Sidebar with monospace labels and colour-coded status indicator
- Responsive canvas scaling on smaller screens

### Accounts and leaderboard
- **Registration and login** — passwords are hashed with `password_hash`; all queries use prepared statements
- **Score saving** — the final score is saved automatically when the game ends (players must be logged in to play)
- **Leaderboard** — shows the top 10 scores of players who opted in at registration

## Bug Fixes
- **Score reset** — score was incorrectly reset to 0 after every line clear
- **Array mutation** — shallow copies of tetrominoes caused silent state corruption; fixed with deep copies
- **Rotation clipping** — pieces could rotate through walls; resolved with a 5-offset wall-kick system
- **Collision return value** — `MoveTetrominoDown` was calling `if(!undefined)` and always moving; rewritten with explicit `true`/`false` returns
- **jQuery dependency** — removed entirely so the game works offline and without a CDN
- **Game state flag** — replaced scattered `winOrLose` string comparisons with a clean `gameOver` boolean

## Running It Locally

**You need:** PHP 7 or newer with the `mysqli` extension, and MySQL or MariaDB. XAMPP, WAMP and MAMP all include both.

1. **Create the database.** From the repo folder run:
   ```
   mysql -u root -p < "web dev cw final/create-db.sql"
   ```
   This creates a `tetris` database with the `Users` and `Scores` tables. (The other `.sql` files are example queries, not setup scripts.)

2. **Tell the app how to connect.** `db_conn.php` reads these environment variables and falls back to `localhost`, `root`, an empty password and `tetris`:

   | Variable | Default |
   |----------|---------|
   | `DB_HOST` | `localhost` |
   | `DB_USER` | `root` |
   | `DB_PASS` | *(empty)* |
   | `DB_NAME` | `tetris` |

   With a default XAMPP install (root, no password) you can skip this step. Otherwise set them before starting the server, for example `export DB_PASS=yourpassword` in a Unix shell or `$env:DB_PASS="yourpassword"` in PowerShell.

3. **Start the site.** Either copy the `web dev cw final` folder into your web server's document root (`htdocs` for XAMPP), or use PHP's built-in server:
   ```
   php -S localhost:8000 -t "web dev cw final"
   ```

4. **Play.** Open `http://localhost:8000/indexsite.php`, create an account on the register page, log in and press play. Your score is saved when the game ends, and the leaderboard page lists the top 10 of players who opted in.

**Notes**
- Accounts created by older versions of this project stored plain-text passwords and will not work; register again.
- Scores are sent from the browser, so the leaderboard is fine for a coursework project but not tamper-proof.

## Tech Stack
- Vanilla JavaScript (ES6+)
- HTML5 Canvas API
- CSS3
- PHP + MySQL (login system and leaderboard)

## Project Structure
```
web dev cw final/
├── tetris.js        # Game logic and rendering
├── tetris.php       # Game page (requires login, handles logout)
├── Web_Dev.css      # Stylesheet
├── indexsite.php    # Login / landing page
├── leaderboard.php  # Top 10 scores of opted-in players
├── submit-score.php # Saves the final score for the logged-in player
├── navbar.php       # Shared navigation
├── register.php     # User registration (hashed passwords)
├── db_conn.php      # Database connection
├── create-db.sql    # Database schema (run this first)
└── *.sql            # Example queries
```
