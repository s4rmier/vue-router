<template>
  <section>
    <h2>{{ teamName }}</h2>
    <ul>
      <user-item
        v-for="member in members"
        :key="member.id"
        :name="member.fullName"
        :role="member.role"
      ></user-item>
    </ul>
    <router-link to="/teams/t2">Go to Team 2</router-link>
  </section>
</template>

<script>
import UserItem from '../users/UserItem.vue';

export default {
  inject: ['users', 'teams'],
  props: ['teamId'],
  components: {
    UserItem,
  },

  data() {
    return {
      teamName: '',
      members: [],
    };
  },

  methods: {
    loadTeamMembers(teamId) {
      // const teamId = route.params.teamId;
      // console.log('Route params: ' + route.params);
      const selectedTeam = this.teams.find((team) => team.id == teamId);
      const members = selectedTeam.members;
      const selectedMembers = [];
      for (const member of members) {
        const selectedUser = this.users.find((user) => user.id === member);
        selectedMembers.push(selectedUser);
      }
      this.members = selectedMembers;
      this.teamName = selectedTeam.name;
    },
  },

  created() {
    this.loadTeamMembers(this.teamId);
    // console.log(this.$route.query); //query parameters are provided to TeamMembers by it's parent component
  },

  beforeRouteUpdate(to, from, next) {
    console.log('Team members beforeRouteUpdate', to, from);
    next();
  },
  // this is a navigation guard used for reused components. this is called when a component is about to be reused but with new data

  watch: {
    teamId(newId) {
      //newId is up to you but it's the new value of the teamId you're watching
      this.loadTeamMembers(newId);
    },
  },
};
</script>

<style scoped>
section {
  margin: 2rem auto;
  max-width: 40rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 1rem;
  border-radius: 12px;
}

h2 {
  margin: 0.5rem 0;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>
