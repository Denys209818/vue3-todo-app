<script>
import Message from './components/Message.vue';
import StatusFilter from './components/StatusFilter.vue';
import Todo from './components/Todo.vue';
import { createTodo, deleteTodo, editTodo, getTodos } from './http/todoApi';

export default {
  components: {
    StatusFilter,
    Message,
    Todo,
  },
  data() {
    return {
      todos: [],
      title: '',
      status: 'all',
    }
  },
  computed: {
    activeTodos() {
      return this.todos.filter(x => !x.completed)
    },
    visibleTodos() {
      switch (this.status) {
        case 'active': {
          return this.todos.filter(x => !x.completed);
        }

        case 'completed': {
          return this.todos.filter(x => x.completed);
        }

        default: {
          return this.todos;
        }
      }
    }
  },
  mounted() {
    getTodos()
      .then(({ data }) => {
        this.todos = data;
      })
      .catch(() => {
        this.$refs.messageError.show('Unable to load todos');
      });
  },
  methods: {
    submitForm() {
      createTodo({
        title: this.title,
        completed: false,
        userId: 761,
      }).then(({ data }) => {
        this.todos = [...this.todos, data]
        this.title = '';
      });
    },
    edit(newTodo) {
      editTodo(newTodo)
        .then(({ data }) => {
          this.todos = [...this.todos.map(el => {
            if (el.id !== data.id) {
              return el;
            }

            return data;
          })];
        });
    },
    deleteServer(todoId) {
      deleteTodo(todoId)
        .then(() => {
          this.todos = this.todos.filter(x => x.id !== todoId);
        });
    }
  },
  // watch: {
  //   todos: {
  //     deep: true,
  //     handler() {
  //       localStorage.setItem('todos', JSON.stringify(this.todos));
  //     }
  //   }
  // }
}
</script>


<template>
  <div class="todoapp">
    <h1 class="todoapp__title">todos</h1>

    <div class="todoapp__content">
      <header class="todoapp__header">
        <button
          type="button"
          class="todoapp__toggle-all"
          :class="{ active: activeTodos.length !== 0 }"
          data-cy="ToggleAllButton"

        ></button>

        <form @submit.prevent="submitForm">
          <input
            data-cy="NewTodoField"
            type="text"
            class="todoapp__new-todo"
            placeholder="What needs to be done?"
            v-model="title"
          />
        </form>
      </header>

      <TransitionGroup class="todoapp__main" name="list" tag="section" >
        <Todo
          v-for="todo of visibleTodos" 
          :key="todo.id"
          :todo="todo"
          @update="edit"
          @remove="deleteServer(todo.id)"
        />
      </TransitionGroup>

      <footer class="todoapp__footer" data-cy="Footer">
          <span class="todo-count" data-cy="TodosCounter">
            {{ activeTodos.length }} items left
          </span>

          <StatusFilter v-model="status" />

          <button
            type="button"
            class="todoapp__clear-completed"
            data-cy="ClearCompletedButton"
            :disabled="activeTodos.length === todos.length"
          >
            Clear completed
          </button>
      </footer>
    </div>

    <Message ref="messageError">
      <template #header>
        <p>Server Error</p>
      </template>

      <template #default="{ text }">
        {{ text }}
      </template>
    </Message>
  </div>
</template>

<style>
  .list-enter-active,
  .list-leave-active {
    max-height: 60px;
    transition: all 0.5s ease;
  }
  .list-enter-from,
  .list-leave-to {
    opacity: 0;
    max-height: 0;
    transform: scaleY(0);
  }
</style>