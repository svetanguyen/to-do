<template>
  <div class="to-do-wrapper">
   <div class="new-task-wrapper column">
     <h2>New task</h2>
    <TaskForm :submit="add" id="newTask" />
   </div>
   <div class="to-do-list column">
     <div class="header">
     <h2>To do list</h2>
      <input type="text" @input="searchTasks" @keyup="searchTasks" class="search full-width" v-model="search" placeholder="Search...">
      <div class="tasks-wrapper">
        <div class="task-card" v-for="(task, index) in tasks" :key="index">
          <TaskCard :id="index" :task="task" />
        </div>
      </div>
     </div>
     
     <BulkActions />
   </div>
  </div>
</template>

<script>
import TaskForm from './TaskForm.vue'
import TaskCard from './TaskCard.vue'
import BulkActions from './BulkAction.vue'
export default {
  name: 'To-do',
  data() {
    return {
      add: 'add',
      update: 'update',
      search: '',
      tasks: this.$store.state.tasks

    }
  },
  components: {
    TaskForm,
    TaskCard,
    BulkActions
  },
  methods: {
    searchTasks: function() {
      this.tasks = this.$store.state.tasks.filter(item => item.title.toLowerCase().includes(this.search.toLowerCase()))
      .sort(function(a, b) {
        if (Date.parse(a.date) > Date.parse(b.date)) {
          return 1;
        }
        if (Date.parse(a.date) < Date.parse(b.date)) {
          return -11;
        }
        return 0
      })
    }
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
.to-do-list {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.search {
   color: #000000;
    font-family: 'Source Sans Pro', sans-serif;
    font-size: 12px;
    font-weight: normal;
    font-style: normal;
    border: 1px solid #BDBDBD;
    padding: 10px;
    border-radius: 5px;
    &::placeholder {
      color: #000000;
      font-family: 'Source Sans Pro', sans-serif;
      font-size: 12px;
      font-weight: normal;
      font-style: normal;
    }
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

.task-card {
  margin: 15px 0;
}

</style>
