<template>
  <!-- Contenedor principal de la lista de tareas -->
  <div>
    <!-- Título de la lista de tareas -->
    <h1>lista de tareas</h1>
    <!-- Formulario para agregar nuevas tareas -->
    <form @submit.prevent="addTodo()">
      <!-- Campo de entrada de texto vinculado a la propiedad 'todo' mediante v-model -->
      <input v-model="todo">
    </form>
    <!-- Diseño de filas utilizando ElementUI -->
    <el-row :gutter="12">
      <!-- Bucle para renderizar cada tarea en una tarjeta -->
      <el-col :span="12" v-for="( todo, index ) in todos" :key="index">
        <!-- Tarjeta de ElementUI con sombra y estilo específico -->
        <el-card class="box-card" shadow="hover" style="margin: 5px 0;">
          <!-- Diseño de filas para mostrar el contenido de la tarea y un botón para eliminar -->
          <el-row :gutter="12">
            <!-- Columna que muestra el contenido de la tarea -->
            <el-col :span="21">{{ todo }}</el-col>
            <!-- Columna con un botón para eliminar la tarea -->
            <el-col :span="3">
              <el-button @click="removeTodo(index)" type="success" icon="el-icon-check" circle></el-button>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  // Nombre del componente
  name: 'TodoList',
  // Datos iniciales del componente
  data() {
    return {
      todo: '', // Tarea actual
      todos: [] // Lista de tareas
    }
  },
  // Métodos del componente
  methods: {
    // Método para agregar una nueva tarea a la lista
    addTodo() {
      this.todos.push(this.todo);
      this.todo = ''; // Limpiar el campo de entrada después de agregar la tarea
    },
    // Método para eliminar una tarea de la lista
    removeTodo(index) {
      this.todos.splice(index, 1);
    }
  }
}
</script>