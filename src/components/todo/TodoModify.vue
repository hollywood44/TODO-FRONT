<template>
    <div class="btn-group">
        <button type="submit" class="todo-input-btn btn-danger" @click="pushDelete">삭제</button>
     </div>

    <div class="todo-content mt-5">
<h3>원래 할일</h3>
    <form id="modifyForm">
        <div class="todo-form-item">
        <input type="text" class="todo-input" :value="this.todoItem.todo" disabled/>
        <input type="date" class="todo-input-date" :value="this.todoItem.finishDate" disabled/>
        </div>
    </form>
<h3 class="mt-6">바꿀 할일</h3>

    <form @submit.prevent="pushModify" id="modifyForm">
        <div class="todo-form-item">
        <input type="text" class="todo-input" v-model="todo"/>
        <input type="date" class="todo-input-date" v-model="finishDate"/>
        <button type="submit" class="todo-input-btn ms-2">제출</button>
        </div>
    </form>
        
    </div>
</template>

<script>
export default {
    name : "todo Modify page",
    data(){
        return{
            todoItem : '',
            todo : '',
            finishDate : null,
        }
    },
    props:{
        todoId: String
    },
    methods :{
        async getDetail(){
            await this.axios.get('/api/todos/detail/'+this.todoId,
            {headers : {'Authorization' : localStorage.getItem("accessToken")}}
            ).then(res =>{
                this.todoItem = res.data;
            }).catch(err =>{
                console.log(err)
            })
        },
        async pushModify(){
            await this.axios.post('/api/todos/modify',{"todo" : this.todo,"finishDate" : this.finishDate,"todoId" : this.todoId},
            {headers : {"Authorization" : localStorage.getItem("accessToken")}}
            ).then(res => {
                if(res.status == 200){
                    this.$router.push('/todo/main');
                }
            }).catch(err =>{
                console.log(err)
                alert(err.response.data.message)
            })
        },
        async pushDelete(){
            await this.axios.post('/api/todos/delete',{'todoId' : this.todoId},{headers : {"Authorization" : localStorage.getItem("accessToken")}}
            ).then(res =>{
                if(res.status == 200){
                    this.$router.push('/todo/main');
                }
            }).catch(err => {
                console.log(err)
                alert(err.response.data.message)
            })
        }
    },
    mounted(){
        this.getDetail()
    }
}
</script>

<style scoped>
    @import "@/assets/css/todo.css";
</style>