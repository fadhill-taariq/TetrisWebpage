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

## Bug Fixes
- **Score reset** — score was incorrectly reset to 0 after every line clear
- **Array mutation** — shallow copies of tetrominoes caused silent state corruption; fixed with deep copies
- **Rotation clipping** — pieces could rotate through walls; resolved with a 5-offset wall-kick system
- **Collision return value** — `MoveTetrominoDown` was calling `if(!undefined)` and always moving; rewritten with explicit `true`/`false` returns
- **jQuery dependency** — removed entirely so the game works offline and without a CDN
- **Game state flag** — replaced scattered `winOrLose` string comparisons with a clean `gameOver` boolean

## Tech Stack
- Vanilla JavaScript (ES6+)
- HTML5 Canvas API
- CSS3
- PHP + MySQL (login system and leaderboard)

## Project Structure
```
web dev cw final/
├── tetris.js        # Game logic and rendering
├── tetris.php       # Game page (PHP session handling)
├── Web_Dev.css      # Stylesheet
├── indexsite.php    # Login / landing page
├── leaderboard.php  # Score leaderboard
├── navbar.php       # Shared navigation
├── register.php     # User registration
├── db_conn.php      # Database connection
└── *.sql            # Database schema and seed files
```
