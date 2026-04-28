import { useState } from 'react'

function App() {
  const [todos, setTodos] = useState([])
  const [input, setInput] = useState("")
  const [editId, setEditId] = useState(null)
  const [editText, setEditText] = useState("")

  const addTodo = () => {
    if (!input.trim()) return
    setTodos([...todos, { id: Date.now(), text: input }])
    setInput("")
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter((t) => t.id !== id))
  }

  const startEdit = (todo) => {
    setEditId(todo.id)
    setEditText(todo.text)
  }

  const saveEdit = () => {
    setTodos(todos.map((t) => t.id === editId ? { ...t, text: editText } : t))
    setEditId(null)
    setEditText("")
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">📝 TODO App</h1>

        <div className="flex gap-2 mb-6">
          <input
            className="border rounded-lg px-4 py-2 flex-1 outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Görev yaz..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTodo()}
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            onClick={addTodo}
          >
            Ekle
          </button>
        </div>

        {todos.length === 0 && (
          <p className="text-center text-gray-400">Henüz görev yok.</p>
        )}

        <ul className="space-y-3">
          {todos.map((todo) => (
            <li key={todo.id} className="flex items-center gap-2 bg-gray-50 rounded-lg px-4 py-3">
              {editId === todo.id ? (
                <>
                  <input
                    className="border rounded px-2 py-1 flex-1 outline-none focus:ring-2 focus:ring-green-400"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                  />
                  <button
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                    onClick={saveEdit}
                  >
                    Kaydet
                  </button>
                </>
              ) : (
                <>
                  <span className="flex-1">{todo.text}</span>
                  <button
                    className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500"
                    onClick={() => startEdit(todo)}
                  >
                    Düzenle
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    onClick={() => deleteTodo(todo.id)}
                  >
                    Sil
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default App