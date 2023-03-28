import { createWebHistory, createRouter } from "vue-router";
import ErrorPage from '@/components/ErrorPage';
import IntroPage from '@/components/IntroPage';
import TodoMain from '@/components/todo/TodoMain';
import SignIn from '@/components/member/SignIn';
import SignUp from '@/components/member/SignUp';
import TodoModify from '@/components/todo/TodoModify';
import BoardList from '@/components/board/BoardList';
import BoardDetail from '@/components/board/BoardDetail';
import BoardPosting from '@/components/board/BoardPosting';
import BoardModify from '@/components/board/BoardModify';
import FriendList from '@/components/friend/FriendList';
import FollowRequestList from '@/components/friend/FollowRequestList';
import FollowRequestedList from '@/components/friend/FollowRequestedList';

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
        // todo
        { path : "/todo/main", name : "Todo main page", component : TodoMain,meta :{requiresAuth:true}},
        { path : "/todo/modify/:todoId", name : "todoModify", component : TodoModify,meta :{requiresAuth:true},props:true},
        // board
        { path : '/board', name : "boardList", component : BoardList, meta :{requiresAuth:true}},
        { path : '/board/:boardId', name: 'boardDetail', component : BoardDetail,meta :{requiresAuth:true},props:true},
        { path : '/board/posting', name: 'boardPosting', component : BoardPosting,meta :{requiresAuth:true}},
        { path : '/board/modify/:boardId', name: 'boardModify', component : BoardModify,meta :{requiresAuth:true},props:true},
        // friend
        { path : '/friend/list', name: 'friendList', component : FriendList,meta:{requiresAuth:true}},
        { path : '/friend/requested', name: 'FollowRequestedList', component : FollowRequestedList,meta:{requiresAuth:true}},
        { path : '/friend/request', name: 'FollowRequestList', component : FollowRequestList,meta:{requiresAuth:true}},


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