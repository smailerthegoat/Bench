# Bench

Eleven interaction patterns, each one hand-written in vanilla JS and isolated in
a panel you can operate.

**Live:** https://smailerthegoat.github.io/Bench/

## Why it exists

Most "award site" templates are four or five reusable mechanics stacked on an
ordinary page. This is the parts bin: every pattern on its own, with the cost
written next to it, so you can take the mechanic without taking the layout.

## The patterns

Cursor and pointer: magnetic field, throw and settle, tilt and glare.
Type and image: decode on hover, sliced and shifted, sampled particles.
Scroll: velocity marquee, pinned horizontal, stacking deck.
Everything else: gooey merge, column wipe.

Each panel names the build that ships the pattern, and links to its source where
that repository is public. Sideways is private, so it is named without a link.

## Structure

```
css/    tokens, base, mast, spec, demos, kit   (loaded in that order)
js/     util.js first, then one file per pattern
```

`js/util.js` exposes `window.Lab` with `lerp`, `clamp`, `reduced`, and a `loop()`
that only runs a rAF callback while its element is near the viewport. Nothing
else is shared.

## Running it

No build step, no dependencies. Open `index.html`, or:

```bash
python3 -m http.server 8000
```
