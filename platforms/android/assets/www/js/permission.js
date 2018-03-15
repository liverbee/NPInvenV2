var JSper
function perdata(){
    var Permission = localStorage.getItem('permission');
    JSper = JSON.parse(Permission);
       console.log("Permission : "+Permission);
}

    function persi(id){
    var read = "";
    console.log("key : "+id);
        $.each(JSper, function(key, val) {
            switch (val['id']){
                case id: console.log(val['text']);
                         read = val['can_read'];
                        // return false;
                         break;
            }
        });
        if(read == true){
            console.log("result "+id);
            if(id=="1"){
                prlist();
            }else if(id=="2"){
                focus_search();
                $.mobile.changePage("#receive",{transition: 'slidefade'});
            }else if(id=="3"){
                $.mobile.changePage("#stock",{transition: 'slidefade'});
                //alertify.alert("ระบบยังไม่เปิดให้บริการ");
            }else if(id=="4"){
                //alertify.alert("ระบบยังไม่เปิดให้บริการ");
                wh_type_store();
                $.mobile.changePage("#transfer",{transition: 'slidefade'});
            }else if(id=="5"){
                //alertify.alert("ระบบยังไม่เปิดให้บริการ");
                wh_type_store();
                $.mobile.changePage("#transferup",{transition: 'slidefade'});
            }else if(id=="6"){
                //alertify.alert("ระบบยังไม่เปิดให้บริการ");
                wh_dmg_from();
                $.mobile.changePage("#transferdown",{transition: 'slidefade'});
            }else if(id=="7"){
                //alertify.alert("ระบบยังไม่เปิดให้บริการ");
                wh_dmg_from();
                $.mobile.changePage("#transfer_damage",{transition: 'slidefade'});
            }else if(id=="8"){
                alertify.alert("ระบบยังไม่เปิดให้บริการ");
               // $.mobile.changePage("#transfer_isp",{transition: 'slidefade'});
            }else if(id=="9"){
                alertify.alert("ระบบยังไม่เปิดให้บริการ");
                //$.mobile.changePage("#transfer_rtv",{transition: 'slidefade'});
            }else if(id=="10"){
               //alertify.alert("ระบบยังไม่เปิดให้บริการ");
               wh_normal();
            }else if(id=="11"){
                rewh();
            }else if(id=="12"){
                $.mobile.changePage("#setting",{transition: 'slidefade'});
            }
        }else{
            alertify.alert("ท่านไม่มีสิทธิ์ ในการเข้าใช้งานระบบนี้");
            console.log("result "+id);
            console.log("no menu");
        }
    }


