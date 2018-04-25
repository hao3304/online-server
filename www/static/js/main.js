layui.use(['jquery','layer'], function () {
    var $ = layui.jquery;
    var layer = layui.layer;
    $('button[common="delete"]').on('click', function (e) {
        var index = layer.confirm('确定删除该数据?', {icon: 3, title:'提示'}, function(index){
            //do something

            $.ajax({
                url:CONTROLLER + '/delete',
                type:'post',
                data: {id:e.target.id},
                success: function (rep) {
                    layer.close(index);
                    if(rep.errno == 0) {
                        window.location.reload();
                    }else{
                        layer.alert(rep.errmsg);
                    }
                }
            })

            layer.close(index);
        });
    })
})