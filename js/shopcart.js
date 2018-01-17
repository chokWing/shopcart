new Vue({
    el:'#app',
    data:{
        showFlag:false,
    },
    mounted () {

        },
    methods: {
        toggle () {
            this.showFlag=!this.showFlag;
        }
    }
})