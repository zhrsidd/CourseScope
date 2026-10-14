# Self-hosted fonts

Latin subsets (woff2) of three families, all licensed under the SIL Open Font
License 1.1. They were taken from the Fontsource builds of each family and are
served from this repository, so the app makes no request to a font CDN.

| File | Family | Use |
| --- | --- | --- |
| `instrument-serif-latin-400-normal.woff2` | Instrument Serif 400 | Editorial display headings |
| `instrument-serif-latin-400-italic.woff2` | Instrument Serif 400 italic | Display emphasis |
| `geist-latin-wght-normal.woff2` | Geist (variable, 100–900) | Interface and academic information |
| `geist-mono-latin-wght-normal.woff2` | Geist Mono (variable, 100–900) | UCAS codes and technical data |

Instrument Serif ships only at weight 400. Never apply `font-bold` or
`font-semibold` to it: the browser would synthesise a bold. Use Geist for
anything that needs weight.
