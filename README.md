# nested-table

## Description

Fetches nested JSON data from the server and shows the structure
with tables. API simply returns the given JSON data.
Uses `mobx`(`mobx-react-lite`).

## 1. Directory structure

```
├── README.md: you're reading it now 👀
├── components: root directory of components that render data
│   ├── modules
│   └── templates 
├── next-env.d.ts: makes next.js types readable by the TypeScript compiler and must not be deleted
├── package.json
├── models: root directory of data model
│   ├── Record.ts: Record class
│   └── RecordType.ts: interface of the Record class
├── pages: root directory of pages
│   └── api
│   │   └── data.ts: mock the server thanks to next.js
│   ├── _app.tsx: see next.js
│   └── index.tsx: page showing the nested table
├── store: root directory of mobx store
│   ├── store.tsx: mobx store
│   └── StoreProvider.tsx: has a store instance and custom Context of the store
├── styles
│   └── global.css
├── tsconfig.json
└── yarn.lock

```

## 2. How to run

This project uses `yarn` package manager.

1. Clone
2. Install all dependency packages (`yarn pre`)
3. Run and go to local:3000 in your browser
