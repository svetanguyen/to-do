<template>
  <div class="bulk-action">
      <h4>Bulk action</h4>
      <div class="buttons-wrapper">
          <button>Done</button>
          <button @click="removeChecked">Remove</button>
      </div>
  </div>
</template>

<script>
export default {
    name: "Bulk-actions",
    methods: {
        removeChecked: function() {
            for (let i = 0; i < this.$store.state.tasks.length; i++) {
                if(this.$store.state.tasks[i].checked) {
                    this.$store.state.tasks.splice(i, 1)
                }
            }
            this.saveToLocalStorage();
           
        },
       
    }
}
</script>

<style scoped lang="scss">
    .bulk-action {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: #E0E0E0;
        padding: 10px;
        margin: 0 -50px -50px;
        button {
            color: #FFFFFF;
            font-family: Arimo;
            font-size: 12px;           
            text-align: center;
            cursor: pointer;
            background: #2196F3;
            border: none;
            border-radius: 10px;
            display: inline-block;
            padding: 10px;
            width: 110px;
            margin-right: 20px;
            &:last-child {
                background: #D9534F;
                margin: 0;
            }
        }
    }
</style>