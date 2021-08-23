<template>
  <div class="task-form">
    <form>
      <input class="full-width" type="text" required v-model="title" id="Title" placeholder="Add new tasks...">
      <label for="Description">Description</label>
      <textarea class="full-width" name="Description" v-model="description" id="Description"></textarea>
      <div class="date-wrapper half-width">
        <label for="DueDate">Due date</label>
        <input type="date" id="DueDate" name="DueDate"
       v-model="dueDate"
       :min="currentDate">
      </div>
      <div class="priority-wrapper half-width">
        <label for="Priority">Priority</label>
        <select v-model="selected" class="half-width" name="Priority" id="Priority">
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
  name: 'Task form',
  data() {
    return {
      title: this.task.title ? this.task.title : '',
      description: this.task ? this.task.description : '',
      dueDate: this.currentDate
    }
  },
  props: ['submit', 'task'],
  computed: {   
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
    }
  }
}
</script>

<style lang="scss" scoped>
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
  button {
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
    }
  }
</style>