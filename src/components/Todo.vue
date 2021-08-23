<template>
  <div class="to-do-wrapper">
   <div class="new-task-wrapper column">
     <h2>New task</h2>
    <TaskForm :submit="add" />
   </div>
   <div class="to-do-list column">
     <h2>To do list</h2>
   </div>
  </div>
</template>

<script>
import TaskForm from './TaskForm.vue'
export default {
  name: 'To-do',
  data() {
    return {
      add: 'add',
      update: 'update'
    }
  },
  components: {
    TaskForm
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
* {
  box-sizing: border-box;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.full-width {
  width: 100%;
}
.half-width {
  width: 50%;
}
.column {
  border: 1px solid #000;
  padding: 50px;
}
.to-do-wrapper {
  h2 {
    font-family: 'Source Sans Pro', sans-serif;
    font-size: 18px;
    text-align: center;
    text-transform: capitalize;
    margin-bottom: 50px;
    font-weight: 600;
  }
  @media screen and (min-width: 749px) {
    display: flex;
    &>div {
      width: 50%;
    }
    
  }
} 
</style>
