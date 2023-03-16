import { createWebHistory, createRouter } from "vue-router";
import ErrorPage from '@/components/ErrorPage';
import IntroPage from '@/components/IntroPage';
import TodoMain from '@/components/todo/TodoMain';
import SignIn from '@/components/member/SignIn';
import SignUp from '@/components/member/SignUp';

const router = createRouter({
    history : createWebHistory(),
    routes : [ // path별 component를 추가한다.
        { path : "/", name : "Intro page", component : IntroPage },
        { path : "/sign-in", name : "SignIn page",component : SignIn},
        { path : "/sign-up", name : "SignUp page",component : SignUp},
        { path : "/todo/main", name : "Todo main page", component : TodoMain},
        { path : "/:pathMatch(.*)",name : "not-found",component : ErrorPage},
    ]
});

export default router;