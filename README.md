# For You — a small love website

A single-page site: an envelope you open with a wax seal, a greeting with a
song, a photo gallery, a garden of little notes, and a closing letter.

It's plain HTML/CSS/JS — no build step, no server, no dependencies.

## 1. Personalize it

Open `script.js` and edit the `CONFIG` object at the top. Everything on the
page — her name, the greeting text, photo captions, the six flower notes,
and the letter — comes from there. You don't need to touch the HTML or CSS
to customize the words.

## 2. Add your photos and song

- Drop 2–8 photos into `assets/photos/` and list their filenames in
  `CONFIG.photos` in `script.js`. Any photo not found yet shows a soft
  placeholder frame instead of breaking, so you can launch before they're ready.
- Drop an MP3 into `assets/song/` named `our-song.mp3` (or update the path
  in `index.html`'s `<audio>` tag).

## 3. Run it locally (optional)

Just open `index.html` in a browser. For the audio autoplay policies to
behave, it's easiest to serve it locally:

```bash
cd girlfriends-day
python3 -m http.server 8000
# visit http://localhost:8000
```

## 4. Deploy on Render (free)

1. Push this folder to a GitHub repo (or a new one just for this site).
2. In Render: **New +** → **Static Site**.
3. Connect the repo.
4. Settings:
   - **Build Command:** leave blank
   - **Publish directory:** `.` (the repo root, since `index.html` is at the top)
5. Click **Create Static Site**. Render will give you a live `.onrender.com` URL in about a minute.

That's it — no environment variables, no database, nothing else to configure.

## Notes

- If you'd rather use a password gate, that needs a tiny bit of server logic
  (static sites can't truly password-protect content) — ask and I can add a
  simple client-side lock or a small backend for it.
- Everything is one page; sections are `#greeting`, `#gallery`, `#garden`,
  `#letter-section` in `index.html` if you want to reorder or extend it.
"# for-her" 
