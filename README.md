# Barra Al-Salfa

Everyone knows the secret word except one. Find the outsider before they figure it out.

A pass-and-play party game for 4–12 players on one phone. Play it at https://sad-cpu141.github.io/barra-al-salfa/ (part of [Game Night](https://sad-cpu141.github.io/)).

## How to play

1. **Pass the phone.** Everyone secretly sees the same word and its category, except the outsider, who only sees the category.
2. **Ask around.** The phone says who asks whom. Be vague enough to fool the outsider, specific enough to prove you know the word.
3. **Vote.** Point at who you think the outsider is, then tap them.
4. **Last chance.** A caught outsider can still win points by picking the word from 8 options.

**Points:** outsider not caught +3 · caught but guesses the word +2 · caught and guesses wrong: every insider +1.

Options: pick categories, 1 or 2 outsiders (2 from 7 players), and a question timer (off, 3, 5 or 8 min). Players and scores are saved on the phone, and the game works offline once it's been opened.

## Files

- `index.html`: the whole game (styles, word packs and logic).
- `sw.js`: offline support. Bump `VERSION` when you change the game so phones pick up the update.
- `manifest.webmanifest`, `icons/`: home-screen install.

Fonts are borrowed from the Khatfa site on the same domain.

## Changing things

- **Rename the game:** change `GAME_NAME` near the top of the script in `index.html`, plus `<title>`, `name`/`short_name` in `manifest.webmanifest`, and the card on the Game Night hub.
- **Words:** edit `PACKS` in `index.html`. Each category needs at least 8 words.
