<template>
  <div>
    <h1>Todo List</h1>
    <!-- Todo input form -->
    <form @submit.prevent="addTodo()">
      <el-input placeholder="Todo" v-model="todo"></el-input>
    </form>
    
    <el-row :gutter="12">
      <TodoItem v-for="(todo, index) in todos" :key="index" :todo="todo" :index="index" @remove="removeTodo" />
      <TodoItem v-for="(issue, index) in issues" :key="issue.id" :issue="issue" :index="index" @remove="closeIssue" />
    </el-row>

  </div>
</template>

<script>
import TodoItem from '@/components/TodoItem';
import axios from 'axios';

const client = axios.create({
  baseURL: `${process.env.VUE_APP_GITHUB_ENDPOINT}`,
  headers: {
    'Authorization': `token ${process.env.VUE_APP_GITHUB_TOKEN}`,
    'Accept': 'application/vnd.github.v3+json',
    'Content-Type': 'application/json',
  },
})

export default {
  name: 'TodosIssues',
  components: {
    TodoItem
  },
  data () {
    return {
      todo: '',
      todos: [], // Array to store local todos
      issues: [] // Array to store GitHub issues
    }
  },
  methods: {
    addTodo() {
      this.todos.push(this.todo); // Adds a new todo to the local todos array
      this.todo = ''; // Clears the input field after adding
    },
    removeTodo(index) {
      this.todos.splice(index, 1); // Removes a todo from the local todos array
    },
    closeIssue(index) {
      const target = this.issues[index]; // Retrieves the targeted GitHub issue
      client.patch(`/issues/${target.number}`, {
        state: 'closed' // Sends a PATCH request to GitHub API to close the issue
      }).then(() => {
        this.issues.splice(index, 1); // Removes the closed issue from the issues array
      }).catch(error => {
        console.error('Error closing issue:', error); // Logs error if closing issue fails
      });
    },
    getIssues() {
      client.get('issues', {
        state: 'open' // Retrieves open issues from GitHub API
      })
        .then((res) => {
          this.issues = res.data; // Updates the issues array with fetched data
          console.log('Issues response:', res.data); // Logs the fetched issues
        })
        .catch(error => {
          console.error('Error fetching issues:', error); // Logs error if fetching issues fails
        });
    }
  },
  created() {
    this.getIssues(); // Calls getIssues method when component is created to fetch GitHub issues
  }
}
</script>