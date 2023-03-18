<template>
    <form @submit.prevent="submitTodo">
        <div class="todo-form-item">
        <input type="text" class="todo-input" v-model="todo"/>
        <input type="date" class="todo-input-date" v-model="finishDate"/>
        <button type="submit" class="todo-input-btn ms-2">제출</button>
        </div>
    </form>

    <hr class="mt-5" color="royalblue"/>

    <div class="todo-content mt-16">

        <div class="todo-item mt-5" v-for="todoItem in todoDataList" :key="todoItem.todoId">
            <div class="todo-detail">
                <div>{{todoItem.todo}}</div>
                <div>~ {{todoItem.finishDate}}</div>
            </div>
            <button @click="goToDetail(todoItem.todoId)">수정</button>
            <button>완료</button>
        </div>
        
    </div>
</template>

<script>
export default {
name : "todo main page",
data(){
    return{
        todo : '',
        finishDate : '',
        todoDataList : [],
    };
},
methods : {
    async getTodoList(){
        await this.axios.get('/api/todos/list',
        {headers : {'Authorization' : localStorage.getItem("accessToken")}}
        ).then(res => {
            this.todoDataList = res.data;
        }).catch(error => {
            console.log(error)
        })
    },
    async submitTodo(){
        await this.axios.post('/api/todos/posting',{'todo' : this.todo,'finishDate' : this.finishDate},{headers : {'Authorization' : localStorage.getItem("accessToken")}})
        .then(res => {
            if(res.status == 200){
                this.getTodoList();
                this.todo = '';
                this.finishDate ='';
            }
        }).catch(error => {
            alert(error.response.data.message)
        })
    },
    goToDetail(id){
        this.$router.push({
            name: 'todoModify',
            params: { todoId: id}
        })
    }
},
mounted(){
    this.getTodoList();
}
}
</script>

<style scoped>
    @import "@/assets/css/todo.css";
</style>