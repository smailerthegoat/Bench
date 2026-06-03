# Bench — interaction lab

Eleven interaction patterns, each one hand-written in vanilla JS, each one linked
to the sibling site that actually ships it.

**Live:** https://smailerthegoat.github.io/website1/

## Why it exists

Most "award site" templates are four or five reusable mechanics stacked on an
ordinary page. This is the parts bin: every pattern isolated, in a panel you can
hover, drag or scroll, with the cost written next to it and a link to the build
that uses it in anger.

## The patterns

| # | Pattern | Shipped in |
|---|---------|-----------|
| 01 | Magnetic field | [Sideways](https://github.com/smailerthegoat/website2) |
| 02 | Decode on hover | [Index](https://github.com/smailerthegoat/website5) |
| 03 | Sampled particles | [Teardown](https://github.com/smailerthegoat/website3) |
| 04 | Sliced & shifted | [Index](https://github.com/smailerthegoat/website5) |
| 05 | Velocity marquee | [Sideways](https://github.com/smailerthegoat/website2) |
| 06 | Pinned horizontal | [Sideways](https://github.com/smailerthegoat/website2) |
| 07 | Stacking deck | [Teardown](https://github.com/smailerthegoat/website3) |
| 08 | Throw & settle | [Coverlab](https://github.com/smailerthegoat/website4) |
| 09 | Tilt & glare | [Coverlab](https://github.com/smailerthegoat/website4) |
| 10 | Gooey merge | [Index](https://github.com/smailerthegoat/website5) |
| 11 | Column wipe | [Teardown](https://github.com/smailerthegoat/website3) |

## Structure

```
css/    tokens → base → mast → spec → demos → kit   (loaded in that order)
js/     util.js first, then one file per pattern
```

`js/util.js` exposes `window.Lab` — `lerp`, `clamp`, `reduced`, and a `loop()`
that only runs a rAF callback while its element is near the viewport. Nothing
else is shared.

## Running it

No build step, no dependencies. Open `index.html`, or:

```bash
python3 -m http.server 8000
```
