import axios from 'axios'

export default{
    install: app => {
        app.config.globalProperties.$logout = logout.logout;
    }
}

const logout = {
        async logout(){
            await this.axios.post('/api/auth/sign-out',{},
              {headers : {'Authorization' : localStorage.getItem("accessToken")}}
            ).then(res => {
              console.log(res);
      
              if(res.status === 200){
                localStorage.setItem('isLogin',false);
                localStorage.removeItem('memberId');
                localStorage.removeItem('accessToken')
                localStorage.removeItem('isLogin');
                console.log("log out 성공")
                this.$router.go(0);
              }
            }).catch(error => {
              console.log(error)
              console.log("log out failed")
              });
          }
}