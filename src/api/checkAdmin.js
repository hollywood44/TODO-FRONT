export default{
    install: app => {
        app.config.globalProperties.$checkAdmin = async function(){
            const memberId = localStorage.getItem('memberId');
            if(memberId.startsWith('admin')){
                return true;
            }else{
                return false;
            }
        };
    }
}