<template>
  <div class="to-do-wrapper">
   <div class="new-task-wrapper column">
     <h2 @click="toggleAccordeonOne">New task <span :class="{rotated: openAccordeonOne}">▼</span></h2>
    <TaskForm class="accordeon-body" :class="{active: openAccordeonOne}" :submit="add" id="newTask" />
   </div>
   <div class="to-do-list column">
     <div class="header">
     <h2 @click="toggleAccordeonTwo">To do list <span :class="{rotated: openAccordeonTwo}">▼</span></h2>
     <div class="accordeon-body" :class="{active: openAccordeonTwo}">
      <input type="text" @input="searchTasks" @keyup="searchTasks" class="search full-width" v-model="search" placeholder="Search...">
        <div  class="tasks-wrapper">
          <div class="task-card" v-for="(task, index) in tasks" :key="index">
            <TaskCard :id="index" :task="task" />
          </div>

        </div>
     <BulkActions />

     </div>
     
     </div>
     
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
      tasks: this.$store.state.tasks,
      openAccordeonOne: false,
      openAccordeonTwo: false

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
    },
    toggleAccordeonOne: function() {
      this.openAccordeonOne = !this.openAccordeonOne
    },
    toggleAccordeonTwo: function() {
      this.openAccordeonTwo = !this.openAccordeonTwo
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
.header {
  height: 100%;
  display: flex;
  flex-direction: column;

  .accordeon-body {    
    .tasks-wrapper {
      max-height: 78%;
      margin-top: 20px;
      overflow: scroll;
       -ms-overflow-style: none;  /* IE and Edge */
      scrollbar-width: none; 
      &::-webkit-scrollbar {
        display: none;
      }
    }
  }
  
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
  padding: 10px;
  position: relative;
}
.to-do-wrapper {
  h2 {
    font-family: 'Source Sans Pro', sans-serif;
    font-size: 18px;
    text-align: center;
    text-transform: capitalize;
    font-weight: 600;
    position: relative;
   span {
     transform: translateY(-50%);
     transform-origin: 50% 50%;
     display: inline-block;
     font-size: 15px;
    position: absolute;
    right: 15px;
    top: 50%;
    &.rotated {
     transform: translateY(-50%) rotate(180deg);
    }

   }
  }
  @media screen and (max-width: 748px) {
    height: 650px;  
    .accordeon-body {
      display: none;
      &.active {
        display: block;
      }
    }    
  }
  @media screen and (min-width: 749px) {
    display: flex;
    &>div {
      width: 50%;
    }
    h2 {
      margin-bottom: 50px;
      span {
        display: none;
      }
    }
    
  }
} 

.task-card {
  margin: 15px 0;
}

@media screen and (min-width: 749px)  {
  .column {
    padding: 50px;
  }
}

</style>
