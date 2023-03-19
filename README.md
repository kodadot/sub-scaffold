# 🏗 Sub-Scaffold

> everything you need to build on Substrate! 🚀

🧪 Quickly experiment with Substrate using a frontend - [Viki Val](https://github.com/vikiival)

## 🏄‍♂️ Quick Start

Prerequisites: [Node (v16 LTS)](https://nodejs.org/en/download/) plus [pnpm](https://pnpm.io)

> clone/fork 🏗 sub-scaffold

```bash
git clone https://github.com/kodadot/sub-scaffold.git
```

> Make sure to install the dependencies:

```bash
# pnpm
pnpm install --shamefully-hoist
```

> Start the development server on <http://localhost:3000>

```bash
pnpm dev -o
```

## Type generation

If you want to generate types from some node, you first need to generate the edgeware JSON

```bash
CHAIN_WS="ws://your.node:port" pnpm generate:edgeware 
```

Then you can generate the types

```bash
pnpm generate:defs && pnpm generate:meta
```

## Production

Build the application for production:

```bash
pnpm build
```

Locally preview production build:

```bash
pnpm preview
```

Checkout the [deployment documentation](https://v3.nuxtjs.org/guide/deploy/presets) for more information.

## Testing

All tests should be placed in `tests` directory

```bash
pnpm test:unit 
```

## Contributors

Thanks goes to all wonderful people <3

## Sponsors

[![paraspell](https://user-images.githubusercontent.com/55763425/197985791-fc7afa52-061d-413a-bbe9-bf1123f16a50.png)](https://github.com/paraspell)
