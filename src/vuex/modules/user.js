const state = {
    user:{
      username:localStorage.getItem('userInfo')?JSON.parse(localStorage.getItem('userInfo')).username:'',
      password:localStorage.getItem('userInfo')?JSON.parse(localStorage.getItem('userInfo')).password:'',
      nickname:localStorage.getItem('userInfo')?JSON.parse(localStorage.getItem('userInfo')).nickname:''  
    }
    
}


const getters = {
    user:state =>state.user
}

const mutations = {
    getUser(state,userInfo){
        state.user.username = userInfo.username
        state.user.password = userInfo.password
        state.user.nickname =  userInfo.nickname
    },
    exit(state){
        state.user = {
            username:'',
            password:'',
            nickname:''
        }
    }
}

const actions = {
    userInfo({commit},params){
        commit('getUser',params)
    }
}


export default{
    state,mutations,actions,getters
}

