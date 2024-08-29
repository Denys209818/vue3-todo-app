<script>
    export default {
        data() {
            return {
                text: '',
            };
        },
        methods: {
            hide() {
                this.text = '';
            },
            show(text) {
                this.text = text;
            }
        }
    }
</script>

<template>
    <article
    class="message is-danger"
    :class="{ 'message--hidden': !text }"
  >
    <div class="message-header">
        <slot name="header"></slot>
        <button class="delete" @click="hide"></button>
    </div>

    <div class="message-body">
      <slot :text="text"></slot>
    </div>
  </article>
</template>

<style>
    .message--hidden {
        opacity: 0;
    }
</style>