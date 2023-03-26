import axios from 'axios'

export default{
    install: app => {
        app.config.globalProperties.$logout = async function(){
          console.log("logout try")
          await this.axios.post('/api/auth/sign-out',{},
            {headers : {'Authorization' : localStorage.getItem("accessToken")}}
          ).then(res => {
            console.log(res);
    
            if(res.status == 200){
              localStorage.setItem('isLogin',false);
              localStorage.removeItem('memberId');
              localStorage.removeItem('accessToken')
              localStorage.removeItem('isLogin');
              alert('로그아웃 하셨습니다.')
              this.$router.go(0);
            }
          }).catch(error => {
            console.log(error)
            console.log("log out failed")
            });
        };
    }
}