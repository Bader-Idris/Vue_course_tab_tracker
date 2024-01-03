# vue full stack course from freeCodeCamp

this course has been uploaded 6 years from the moment of typing this paragraph in `Sunday, December 24, 2023 (GMT+2)`

so, it'll be developed, latest version is 3.6.xx now.

I take this [course](https://www.youtube.com/watch?v=Fa4cRMaTDUI&list=PLWKjhJtqVAbnadueQ-C5keMQQiQau_i0D&index=1), within 7 videos, as a full stack developer after finishing many courses and getting BE certificate from freeCodeCamp, the path was as: `html`, `css`, `vanillaJS`, `nodejs`, expressJs, `psql`, `mongoDB`, `redis`, `docker` and its many topics.

to skip prior parts, teacher **Cody Seibert** is giving a mock app, [here](https://github.com/codyseibert/tab-tracker)

## intro

the teacher installed [vue-cli](https://github.com/vuejs/vue-cli) from github as a template project to start with main components. with its command `npm i -g vue-cli`

check the docs for that template project that has many initial options as: `vue list` after creating a project with its name as doing with npx packages.

in client dir, do `npm i`

then he uses a new dev package to me, which is eslint, that catches bugs better than average coding, but it needs to be configured before running the BE server, via running init command into its dir as: `node ./node_modules/eslint/bin/eslint.js --init` **inside the server dir**, not the client one.

then he uses `use a popular style guide` => `standard` => `JS`.

then he starts the npm start,

> looks like eslint is similar to prettier, but more strict that makes you crazy 👹

then the teacher uses morgan as `app.use(morgan('combined'))` in the express app for logging specified details about http req from the client, chatGPT says it's a better logging approach than relying on nginx

then in client dir, he adds api.js && auth* inside ./src/services

## where vue designates api routes?

in our vue app it defaults to `router/index.js` where it saves the paths named as **components**

so he created a new path as:

```typescript
//🔴too important: add import for each component!!🔴
import Register from '@/components/Register'// you should declare it into components folder!🔴
exports default new Router({
  routes: [
    {/*prior default one*/},
    {
      path: '/resigner',
      name: 'resigner',
      component: Resigner
    }
    ]
})
```

then he basically Fu#ked it up, many new things together🤯
check `Register.vue` that we created in `/src/components/`
