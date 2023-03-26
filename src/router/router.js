import { createWebHistory, createRouter } from "vue-router";
import ErrorPage from '@/components/ErrorPage';
import IntroPage from '@/components/IntroPage';
import TodoMain from '@/components/todo/TodoMain';
import SignIn from '@/components/member/SignIn';
import SignUp from '@/components/member/SignUp';
import TodoModify from '@/components/todo/TodoModify';
import BoardList from '@/components/board/BoardList';
import BoardDetail from '@/components/board/BoardDetail';

const router = createRouter({
    history : createWebHistory(),
    routes : [ // path별 component를 추가한다.
        { path : "/", name : "Intro page", component : IntroPage },
        { path : "/sign-in", name : "SignIn page",component : SignIn,beforeEnter:(to,from,next)=>{
            const isLogin = localStorage.getItem('isLogin');
            if(isLogin){
                next('/');
                return;
            }
            next();
        }},
        { path : "/sign-up", name : "SignUp page",component : SignUp},
        { path : "/todo/main", name : "Todo main page", component : TodoMain,meta :{requiresAuth:true}},
        { path : "/todo/modify/:todoId", name : "todoModify", component : TodoModify,meta :{requiresAuth:true},props:true},
        { path : '/board', name : "boardList", component : BoardList, meta :{requiresAuth:true}},
        { path : '/board/:boardId', name: 'boardDetail', component : BoardDetail,meta :{requiresAuth:true},props:true},
        { path : "/:pathMatch(.*)",name : "not-found",component : ErrorPage},
    ]
});

router.beforeEach((to,from,next) => {
    const isLogin = localStorage.getItem('isLogin');
    if(to.matched.some(record => record.meta.requiresAuth) && !isLogin){
        next('/sign-in')
    }
    next();
})

export default router;