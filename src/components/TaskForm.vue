<template>
  <div class="task-form">
    <form @submit.prevent="submitTask">
      <input class="full-width" type="text" required v-model="title" :id="titleId" placeholder="Add new tasks...">
      <label :for="descriptionId">Description</label>
      <textarea class="full-width" name="Description" v-model="description" :id="descriptionId"></textarea>
      <div class="date-wrapper half-width">
        <label :for="dateId">Due date</label>        
       <input :show-current="false" type="date" :id="dateId" name="DueDate" v-model="date"
       :min="currentDate" >
      </div>
      <div class="priority-wrapper half-width">
        <label :for="priorityId">Priority</label>
        <select v-model="priority" @change="selectedValue" class="half-width" name="Priority" :id="priorityId">
          <option value="low">Low</option>
          <option value="normal" selected>Normal</option>
          <option value="high">High</option>
        </select>
      </div>
      <button class="full-width" type="submit">{{ submit }}</button>
       
    </form>
  </div>
</template>

<script>
export default {
  name: 'Task-form',
  data: function() {
    return {
      title: this.task ? this.task.title : '',
      description: this.task ? this.task.description : '',
      date: this.task ? this.task.date : (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      showCalendar: false,
      priority: this.task ? this.task.priority : 'normal',
      checked: this.task ? this.task.checked : false
    }
  },
  props: ['submit', 'task', 'id'],  
  computed: {   
    dateId() {
      return `DueDate--${this.id}`
    },    
    descriptionId() {
      return `Description--${this.id}`
    },
    priorityId() {
      return `Priority--${this.id}`
    },
     titleId() {
      return `Title--${this.id}`
    },
    
    currentDate() {
      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth()+1; //January is 0!
      var yyyy = today.getFullYear();
      if(dd<10){
              dd='0'+dd
          } 
          if(mm<10){
              mm='0'+mm
          } 

      today = yyyy+'-'+mm+'-'+dd;
      return today
    },
    dateNow() {
      return this.date
    }
   
  },
  methods: {
    changeDate(date) {
      var dd = date.getDate();
      var mm = date.getMonth()+1; //January is 0!
      var yyyy = date.getFullYear();
      if(dd<10){
              dd='0'+dd
          } 
          if(mm<10){
              mm='0'+mm
          } 

      date = yyyy+'-'+mm+'-'+dd;
      return date
    },
    toggleCalendar() {
      this.showCalendar = !this.showCalendar;
    },
    selectedValue(e) {
      this.priority = e.target.value
    },
    submitTask() {
      const newTask = {
        title: this.title,
        description: this.description,
        date: this.date,
        priority: this.priority,
        checked: this.checked
      }
      if (this.submit === 'add') {
        this.$store.state.tasks.push(newTask)
        this.title = ''
        this.description = ''
        this.date = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        this.priority = 'normal'
        this.checked = false  
      } else {
        this.task.title = this.title
        this.task.description = this.description
        this.task.date = this.date
        this.task.priority = this.priority
        this.task.checked = this.checked
      }
      this.$store.commit('sort')
      this.saveToLocalStorage()
    },
    saveToLocalStorage() {
      localStorage.setItem('tasks', JSON.stringify(this.$store.state.tasks))
    }
  }
}
</script>

<style lang="scss">
.task-form {
input { 
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
  label {
    text-transform: capitalize;
    font-family: 'Source Sans Pro';
    font-size: 12px;
    font-weight: bold;
    font-style: normal;
    text-decoration: none;
    margin: 15px 0 5px;
    display: block;
  }
  textarea {
    font-size: 12px;
    border: 1px solid #000000;
    height: 125px;
    padding: 10px
  }
  form {
    text-align: left;
  }
  button.full-width {
    text-transform: capitalize;
    background: #5CB85C;
    color: #fff;
    border-radius: 10px;
    border: none;
    font-family: Arimo;
    font-size: 15px;
    padding: 10px;
    margin-top: 70px;
  }
  .half-width {
    display: inline-block;
    input,
    select {
      border: 1px solid #000000;
      font-size: 12px;
      height: 31px;
      border-radius: 0;
      width: 100%;
    }
    
    & + .half-width {
     padding-left: 20px;
    }
  }
  .task-form {
      padding: 30px;
  }
  .v-date-picker-title {
    background: blue;
    padding: 20px;
  }
  .v-date-picker-table .v-btn.v-btn--active {
    color: blue;
  }
  form {
    padding: 30px;
  }
}
  
</style>