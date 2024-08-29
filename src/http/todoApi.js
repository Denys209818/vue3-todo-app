import { client } from "./httpClient"

export const getTodos = () => {
    return client.get('/todos?userId=761');
}

export const createTodo = (todo) => {
    return client.post('/todos', todo);
}

export const editTodo = (todo) => {
    return client.patch('/todos/' + todo.id, todo);
}

export const deleteTodo = (todoId) => {
    return client.delete('/todos/' + todoId);
}