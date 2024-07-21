<template>
  <div v-if="todo || issue">
    <!-- Display todo -->
    <el-col :span="12">
      <el-card class="box-card" shadow="hover" style="margin: 5px 0;">
        <el-row :gutter="12">
          <el-col :span="21">{{ todo }}</el-col>
          <el-col :span="21">{{ issue.title }}</el-col>
          <el-col :span="3">
            <el-button @click="handleRemove" type="success" icon="el-icon-check" circle></el-button>
          </el-col>
        </el-row>
      </el-card>
    </el-col>
  </div>
</template>


<script>
export default {
  name: 'TodoItem',
  props: {
    todo: {
      type: String,
      required: false
    },
    issue: {
      type: Object,
      required: false,
      default: () => ({})
    },
    index: {
      type: Number,
      required: true
    }
  },
  methods: {
    handleRemove() {
      this.$emit('remove', this.index);
    }
  }
}
</script>
