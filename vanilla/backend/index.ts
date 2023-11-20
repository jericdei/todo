import express from 'express'
import Database from 'bun:sqlite'

const db = new Database('./database.db', {
	create: true,
})

db.exec('CREATE TABLE IF NOT EXISTS todos (id INTEGER PRIMARY KEY, text TEXT, done INTEGER)')

const app = express()

app.use(express.json())

app.get('/todos', (req, res) => {
	const todos = db.query('SELECT * FROM todos').all()

	res.json(todos);
})

app.post('/todos', (req, res) => {
	const { text } = req.body
	
	if (!text) {
		res.status(400).json({
			error: 'Missing text',
		})

		return
	}

	const todo = db.prepare('INSERT INTO todos (text, done) VALUES (?, ?) RETURNING *', [text, 0]).get() as any

	res.json({
		message: "Todo created.",
		todo,
	})
})

app.listen(3000, () => {
	console.log('Listening on port 3000');
})