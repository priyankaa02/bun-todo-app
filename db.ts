import { Database } from 'bun:sqlite';

export interface Todo {
    id?: number;
    name: string;
}

export class TodoDatabase {
    private db: Database;

    constructor() {
        this.db = new Database('todos.db')
        //initialize the db here
        this.init()
            .then(() => console.log('database initialized'))
            .catch(console.error);
    }

    //get all todos
    async getTodos() {
        return this.db.query('SELECT * from todos').all();
    }

    //add a todo
    async addTodo(todo: Todo) {
        return this.db.query(`INSERT INTO todos (name) VALUES (?) RETURNING id`).get(todo.name) as Todo
    }

    //update a todo
    async updateTodo(id: number, todo: Todo) {
        return this.db.query(`UPDATE todos SET name = '${todo.name}' WHERE id=${id}`)
    }

    //delete a todo
    async deleteTodo(id: number) {
        return this.db.run(`DELETE FROM todos WHERE id = ${id}`)
    }

    //initialize the database
    async init() {
        return this.db.run('CREATE TABLE IF NOT EXISTS todos (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)');
    }
}