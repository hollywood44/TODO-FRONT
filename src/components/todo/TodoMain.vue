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

        <div class="todo-item">
            <div class="todo-detail">
                <div>할일1</div>
                <div>~ 2023-03-25</div>
            </div>
            <button>수정</button>
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
        todoDataList : []
    };
},
methods :{
    submitTodo(){
    },
}
};
</script>

<style scoped>
.todo-input{
    padding: 8px;
    border: 3px rgb(126, 139, 247) solid;
    border-radius: 10px 0px 0px 10px;
    min-height: 50px;
    min-width: 65%;
    font-size: 20px;
}
.todo-input-date{
    border: 3px rgb(126, 139, 247) solid;
    border-radius: 0px 10px 10px 0px;
    border-left: none;
    min-height: 50px;
    min-width: 12%;
    font-size: 20px;
}
.todo-input-btn{
    min-height: 50px;
    border: 3px rgb(126, 139, 247) solid;
    border-radius: 10px;
    min-width: 60px;
    font-size: 20px;
}
button:hover{
    box-shadow: 0px 0px 3px 3px rgba(81, 81, 247, 0.397);
}
.todo-form-item {
    text-align: center;
}
.todo-form-item input:focus {
    border-color: rgba(65, 65, 212, 0.726);
    outline: none ;
    box-shadow: 0px 0px 3px 3px rgba(81, 81, 247, 0.397);
}
.todo-content{
    text-align: -webkit-center;
    font-size: 18px;
}
.todo-content button{
    border: 3px rgb(126, 139, 247) solid;
    border-radius: 10px;
    min-width: 8%;
    margin-left: 3px;
}
.todo-item{
    max-width: 80%;
    text-align: left;
    display: flex;
}
.todo-detail{
    padding: 8px;
    display: flex;
    min-height: 50px;
    border: 3px rgb(126, 139, 247) solid;
    border-radius: 10px;
    min-width: 90%;
    align-items: center;
    justify-content: space-between;
}
</style>