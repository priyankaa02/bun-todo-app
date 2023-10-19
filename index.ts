import { Elysia, t } from 'elysia';
import { TodoDatabase } from './db';
import { html } from '@elysiajs/html';

new Elysia()
    .use(html())
    .decorate("db", new TodoDatabase())
    .get("/", () => Bun.file("index.html").text())
    .get("/script.js", () => Bun.file("script.js").text())
    .get("/todos", ({ db }) => db.getTodos())
    .post(
        "/todos",
        async ({db, body}) => {
            const id = (await db.addTodo(body)).id
            return { success: true, id };
        },
        {
            schema: {
                body: t.Object({
                    name: t.String()
                })
            }
        }
    )
    .put(
        "/todos/:id",
        async ({db, params, body}) => {
           try {
             db.updateTodo(parseInt(params.id), body)
             return { success: true } 
           } catch(e) {
             return { success: false }
           }
        },
        {
            schema: {
                body: t.Object({
                    name: t.String()
                })
            }
        }
    )
    .delete(
        "/todos/:id",
        async ({db, params}) => {
           try {
             db.deleteTodo(parseInt(params.id))
             return { success: true } 
           } catch(e) {
             return { success: false }
           }
        },
    ).listen(3000);