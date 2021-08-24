<template>
<div class="task-item">
    <div class="task-content">
      <div class="name-wrapper">
        <input :id="inputId" type="checkbox" @input="checkCard" v-model="task.checked">
        <label :for="inputId">
            <span v-show="task.checked">✔</span>
        </label>
        <h4>{{ task.title }}</h4>
      </div>
     
      <div class="cta-buttons">
          <button @click="showDetails">Detail</button>
          <button @click="removeTask">Remove</button>
      </div>
        
  </div>
  <div class="form-wrapper">
    <TaskForm :id="id" v-show="detailsShown" :task="task" :submit="update" />

  </div>
</div>
  
</template>

<script>
import TaskForm from './TaskForm.vue';
export default {
    name: 'Task-card',
    props: ['task', 'id'],
    components: {
        TaskForm
    },
    data() {
        return {
           update: 'update',
           detailsShown: false,
           checked: this.task ? this.task.checked : false
        }
    },
    computed: {
        inputId() {
            return `Checked--${this.id}`
        }
    },
    methods: {
        showDetails: function() {
            this.detailsShown = !this.detailsShown
        },
        checkCard: function() {
            this.checked = !this.checked
        },
        removeTask: function() {
            this.$store.state.tasks.splice(this.id, 1)
            this.saveToLocalStorage();
        },
         saveToLocalStorage() {
            localStorage.setItem('tasks', JSON.stringify(this.$store.state.tasks))
        }
    }
}
</script>

<style scoped lang="scss">
    input {
        display: none;        
    }
    label {
        width: 20px;
        height: 20px;
        border: 1px solid #000;
        position: relative;
        cursor: pointer;
        display: block;
        margin-right: 10px;
        span {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
    }
    button {
        color: #FFFFFF;
        font-family: Arimo;
        font-size: 12px;
        font-weight: normal;
        font-style: normal;
        width: 93px;
        cursor: pointer;
        height: 27px;
        margin-right: 20px;
        background: #00BCD4;
        border: none;
        border-radius: 10px;
        &:last-child {
            background: #D9534F;
            margin: 0;
        }
    }
    .task-content {
        background: #FFFFFF;
        padding: 20px;
        display: flex;
        align-items: center;
        border: 1px solid #000000;
        border-radius: 0px; 
        justify-content: space-between;
    }
    .name-wrapper {
        display: flex;
        align-items: center;
    }
    h4 {
        font-weight: 400;
        font-family: 'Source Sans Pro';
        font-size: 16px;
        margin: 0;
    }
    .form-wrapper {
        border: 1px solid #000;
        border-top: 0;
    }
    @media screen and (max-width: 1139px) and (min-width: 749px) {
        .task-content {
            justify-content: center;
            flex-direction: column;
            .cta-buttons {
                margin-top: 20px;
            }
        }
    }
</style>