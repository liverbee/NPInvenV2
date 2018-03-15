function tree(){
  $.ajax({
              url: localStorage.url_menu_tree_user,
              //data: '{"userID":"'+login.username.value+'","pwd":"'+login.pwd.value+'"}',
              contentType: "application/json; charset=utf-8",
              dataType: "json",
              type: "GET",
              cache: false,
              success: function(result){
                     var mytree = result.data;
                     $('.tree').treeview({
                     color: "#428bca",
                     levels: 1,
                     expandIcon: 'glyphicon glyphicon-plus',
                     collapseIcon: 'glyphicon glyphicon-minus',
                     nodeIcon: 'glyphicon glyphicon-bookmark',
                     enableLinks: true,
                     data: mytree
                     });
              }
     });
  }