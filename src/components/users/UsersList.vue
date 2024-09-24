<template>
  <ul>
    <user-item
      v-for="user in users"
      :key="user.id"
      :name="user.fullName"
      :role="user.role"
    ></user-item>
  </ul>
  <button @click="saveChanges">Save changes?</button>
</template>

<script>
import UserItem from './UserItem.vue';

export default {
  components: {
    UserItem,
  },

  data() {
    return {
      changesSaved: false,
    };
  },

  methods: {
    saveChanges() {
      this.changesSaved = true;
    },
  },

  inject: ['users'],
  beforeRouteEnter(to, from, next) {
    console.log('Users list component before route enter:', to, from);
    next();
  },

  beforeRouteLeave(to, from, next) {
    console.log('before route leave called', to, from);
    // this is called before the beforeEach and other navigation guards are called
    if (!this.changesSaved) {
      const confirmLeave = confirm(
        'Changes not saved. Are you sure to leave the page?'
      );
      next(confirmLeave);
    } else {
      next();
    }
  },

  unmounted() {
    //you can run code logic here before the user leaves this page.
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 2rem auto;
  max-width: 20rem;
  padding: 0;
}
</style>
