<script>
export default {
    data() {
        return {
            editing: false,
            newTitle: '',
        };
    },
    props: ['todo'],
    emits: ['update', 'remove'],
    watch: {
        editing() {
            if (this.editing) {
                this.newTitle = this.todo.title;

                this.$nextTick(() => {
                    this.$refs['form-input'].focus();
                });
            } else {
                this.newTitle = '';
            }
        }
    },
    methods: {
        updateTodo() {
            this.$emit('update', {
                ...this.todo,
                completed: !this.todo.completed
            });
        },
        removeTodo() {
            this.$emit('remove');
        },
        rename() {
            if (!this.editing) {
                return;
            }

            this.$emit('update', {
                ...this.todo,
                title: this.newTitle
            });

            this.editing = false;
        }
    }
}
</script>

<template>
    <div 
        data-cy="Todo" 
        class="todo"
        :class="{ 'completed': todo.completed }" 
      >
        <label class="todo__status-label">
          <input
            data-cy="TodoStatus"
            type="checkbox"
            class="todo__status"
            :checked="this.todo.completed"
            @change="updateTodo"
          />
        </label>

        <form v-if="editing" @submit.prevent="rename">
          <input
            data-cy="TodoTitleField"
            type="text"
            class="todo__title-field"
            placeholder="Empty todo will be deleted"
            v-model="newTitle"
            ref="form-input"
            @keyup.esc="editing = false"
            @blur="rename"
          />
        </form>

        <template v-else>
          <span data-cy="TodoTitle" class="todo__title" @dblclick="editing = true">
            {{ todo.title }}
          </span>

          <button 
            type="button" 
            class="todo__remove" 
            data-cy="TodoDelete" 
            @click="removeTodo"
          >
            ×
          </button>
        </template>
    </div>
</template>

<stlyes>

</stlyes>