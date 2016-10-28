
window.onload=function(){
    
    //判断localStorage中是否存在 博客文章
    if(window.localStorage.getItem("blogs")){
        
       window.blogs=JSON.parse(window.localStorage.getItem("blogs")); 
    }else{
        
        window.blogs=[];
    }    
    
    //循环输出blogs数组对象的值
    $(blogs).each(function(k){
        
        var content="";
        //判断正文内容是否大于200个  大于则截取200个
        if(blogs[k]['content'].length>200){
            content=blogs[k]['content'].substr(0,200)+"...";
        }else{
            content=blogs[k]['content']; 
        }
        //构造html 用于插入页面中显示
        
        var html="";
        html+='<div class="col-md-12"><div class="tc-ch"><div class="tc-font">';
        html+='<a>'+blogs[k]['title']+'</a></div><div class="tc-time">Time&nbsp;<a>'+blogs[k]['time']+' </a></div><div class="tc-content"><a>'+content+'</a></div>';
        html+='<div class="tc-function"><div class="bht1" style="float: left;"><a href="index_content.html?key='+k+'">查看全文</a></div><div class="nav" style="float: right; "><a href="javascript:;" onclick="del('+k+')" >删除</a>&nbsp;<a href="javascript:;" data-toggle="modal" data-target="#myEditModal" onclick="change('+k+')">修改</a></div></div></div></div>';
        html+='<div class="col-md-12"><hr /></div>';
        $('#blogDiv').append(html);
    })
    
    
}

//提交添加
function myAddPut(){    
     var title= $(window.myAddForm.title).val();    
     var content= $(window.myAddForm.content).val();
    //获取时间
     var d=new Date();
     var year=d.getFullYear();//年
     var month=d.getMonth()+1;//月
     var day=d.getDate();//日
     var now=year+"-"+month+"-"+day;
     
     //新增一个对象 里面保存一篇博客的所有内容
     var NewBlog={'title':title,'content':content,'time':now};
     
     var i=blogs.push(NewBlog);
     i--;
     window.localStorage.setItem("blogs",JSON.stringify(blogs));
     //判断正文是否大于200
     var content2="";
     if(content.length>200){
          content2=content.substr(0,200)+"...";
     }else{
          content2=content;
     }
   //构造html，在页面内增加一篇文章
     var html="";
     html+='<div class="col-md-12"><div class="tc-ch"><div class="tc-font">';
     html+='<a>'+title+'</a></div><div class="tc-time">Time&nbsp;<a>'+now+' </a></div><div class="tc-content"><a>'+content2+'</a></div>';
     html+='<div class="tc-function"><div class="bht1" style="float: left;"><a href="index_content.html?key='+i+'">查看全文</a></div><div class="nav" style="float: right; "><a href="javascript:;" onclick="del('+i+')" >删除</a>&nbsp;<a href="javascript:;" data-toggle="modal" data-target="#myEditModal" onclick="change('+i+')">修改</a></div></div></div></div>';
     html+='<div class="col-md-12"><hr /></div>';
     console.log(html);
     $('#blogDiv').append(html);
     
     $(window.myAddForm.title).val(" ");
     $(window.myAddForm.content).val(" ")
      //关闭模态框
     $('#myAddModal').modal('hide');
}

function change(k){
    $(window.myEditForm.title).val(blogs[k]['title']);
    $(window.myEditForm.content).val(blogs[k]['content']);
    $(window.myEditForm.key).val(k);
}

//确认修改
function myEditPut(){
    
      var k=$(window.myEditForm.key).val();
     
      var title=$(window.myEditForm.title).val();
      
     var content=$(window.myEditForm.content).val();
     
     //重新获取一遍时间
     var d=new Date();
     var year=d.getFullYear();
     var month=d.getMonth()+1;
     var day=d.getDate();
     var now=year+"-"+month+"-"+day;
     var blog={'title':title,'content':content,'time':now};   
     blogs[k]=blog;    
     window.localStorage.setItem("blogs",JSON.stringify(blogs));     
      $('#myEditModal').modal('hide');
      //刷新页面
      window.location.reload();
}

function del(k){   
    blogs.splice(k,1);
    console.log(blogs);   
    window.localStorage.setItem("blogs",JSON.stringify(blogs));     
     window.location.reload();
}
