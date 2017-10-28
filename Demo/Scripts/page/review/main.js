import  '../../components/dialog/dialog.js';


const vm = new Vue({

    el:'body',
    data:{
    	artistName:'李小臻',
    	artistCity:'1',
    	artistTitle:'',
    	artistContent:'',
    	artistInfo:'',
    	
    },
    methods:{
        addReview:function()
        {
        	vm.artistName='李小楠'
            dialog.id=false;
            dialog.custom('.dialog-1')
        },
        submit:function()
        {
            alert("提交了按钮");
        }

    },
});