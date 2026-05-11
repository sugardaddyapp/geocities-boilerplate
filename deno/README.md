# create-geocities-app (Deno / JSR)

Scaffold a 1990s Geocities-themed static website in seconds.

## Run without installing

```bash
deno run --allow-read --allow-write jsr:@geocities/create-app my-site
```

## Compile to a native binary

```bash
deno compile --allow-read --allow-write --output create-geocities-app jsr:@geocities/create-app
./create-geocities-app my-site
```

## Run from source

```bash
deno task run my-site
# or
deno run --allow-read --allow-write main.ts my-site
```

## Options

```
main.ts [output-dir] [-y/--yes]
```

| flag | meaning |
|------|---------|
| `output-dir` | Directory to create (default: `my-geocities-site`) |
| `-y / --yes` | Skip all prompts, use defaults |

## Themes

Neon · Space · Candy · Forest · Windows 95

## Requirements

Deno 1.40+
