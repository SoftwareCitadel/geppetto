# Geppetto

> Geppetto writes code for you.

## Approach

Geppetto aims for backend-first fullstack web frameworks, such as AdonisJS, Laravel, Ruby on Rails, Django, Phoenix, etc. It should be able to generate the basic structure of a new application, including models, controllers, views, and routes.

## Frameworks

- [x] AdonisJS (WIP)
- [ ] Laravel
- [ ] Ruby on Rails
- [ ] Django
- [ ] Phoenix

## Requirements

- Node.js & npm
- Bun
- some OpenAI API key

## Instructions

To install dependencies:

```bash
bun install
```

To set up the OpenAI API key:

```bash
cp .env.example .env.local
```

Then, edit `.env` and add your OpenAI API key.

To run:

```bash
bun run index.ts
```

### Example prompt:

```
Create a new Adonis application with the name '2d6', that allows to register characters for a role-playing game.
Each character should have the following attributes: name: (string); nationality: (string); age: (number) ; gender: (string).
```
