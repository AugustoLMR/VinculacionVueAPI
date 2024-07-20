<template>
  <div>
    <h1>Todo List</h1>
    <!-- Todo input form -->
    <form @submit.prevent="addTodo()">
      <el-input placeholder="Todo" v-model="todo"></el-input>
    </form>
    
    <!-- Todo display area -->
    <el-row :gutter="12">
      <TodoItem v-for="(todo, index) in todos" :key="index" :todo="todo" :index="index" @remove="removeTodo" />
    </el-row>
    
    <!-- GitHub Issues display area -->
    <el-row :gutter="12">
      <el-col :span="12" v-for="(issue, index) in issues" :key="issue.id">
        <el-card class="box-card" shadow="hover" style="margin: 5px 0;">
          <el-row :gutter="12">
            <el-col :span="21">{{ issue.title }}</el-col>
            <el-col :span="3">
              <el-button @click="closeIssue(index)" type="success" icon="el-icon-check" circle></el-button>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
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
    'Content-Type':'application/json',
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
      todos: [],
      issues: []
    }
  },
  methods: {
    addTodo() {
      this.todos.push(this.todo);
      this.todo = '';
    },
    removeTodo(index) {
      this.todos.splice(index, 1);
    },
    closeIssue(index) {
      const target = this.issues[index];
      client.patch(`/issues/${target.number}`, {
        state: 'closed'
      }).then(() => {
        this.issues.splice(index, 1);
      }).catch(error => {
        console.error('Error closing issue:', error);
      });
    },
    getIssues() {
      client.get('issues', {
        state: 'open'
      })
        .then((res) => {
          this.issues = res.data;
          console.log('Issues response:', res.data);
        })
        .catch(error => {
          console.error('Error fetching issues:', error);
        });
    }
  },
  created() {
    this.getIssues();
  }
}
</script>