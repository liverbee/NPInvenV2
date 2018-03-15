document.addEventListener("keydown", function(event) {
        console.log(event.keyCode);
        var page="";
        page = $.mobile.activePage.attr('id');
        console.log(page);

            if(page=="pageone"){
                switch (event.keyCode){
                    case 13: cnklogin();
                    break;
                            default:
                    break;
                }
            }else if(page=="pagelogin"){
                switch (event.keyCode){
                case 13: cnkloginscan();
                             break;
                     default:
                           break;
                }
            }else if(page=="pagetwo"){
                switch (event.keyCode){
                    case 49: persi(1);
                            break;
                    case 50: persi(2);
                             focus_search();
                            break;
                    case 51: persi(3);
                            break;
                    case 52: persi(4);
                            break;
                    case 53: persi(12);
                            break;
                    case 54: persi(11);
                            break;
                    default: $.mobile.changePage("#pagetwo",{transition: 'slidefade'});
                            break;
                }
            }else if(page=="transfer"){
                switch (event.keyCode){
                    case 49:persi(5);
                            break;
                    case 50:persi(6);
                            break;
                    case 51: persi(7);
                            break;
                    case 52: persi(8);
                            break;
                    case 53: persi(9);
                            break;
                    case 54: persi(10);
                            break;
                    default: $.mobile.changePage("#transfer",{transition: 'slidefade'});
                            break;
                }
            }else if(page=="receive"){
                switch (event.keyCode){
                    case 13: searchpo();
                             return false;
                             break;
                    case 0: show_receive();
                             return false;
                             break;
                    default:
                             break;
                    }
            }else if(page=="receive_item"){
                switch (event.keyCode){
                    case 0: $.mobile.changePage('#receive_search',{transition: 'slidefade'});
                            focus_search_item();
                            return false;
                            break;
                    default:
                            break;
                    }
            }else if(page=="receive_scan"){
                switch (event.keyCode){
                    case 13: submit_scan();
                             return false;
                             break;
                    default:
                             break;
                    }

            }else if(page=="receive_search"){
            switch (event.keyCode){
                   case 13: search_receive();
                            return false;
                            break;
                   default:
                            break;
                   }

            }else if(page=="receive_show"){
            switch (event.keyCode){
                   case 0: $.mobile.changePage('#receive_search',{transition: 'slidefade'});
                           focus_search_item();
                           return false;
                   case 13: submit_receive();
                            return false;
                            break;
                   default:
                            break;
                   }
            }else if(page=="receive_list"){
            switch (event.keyCode){
                   case 13: show_receive();
                           return false;
                           break;
                   default:
                           break;
                   }
            }else if(page=="receive_scan_edit"){
            switch (event.keyCode){
                   case 13: submit_scan_edit();
                          return false;
                          break;
                   default:
                          break;
                   }
            }else if(page=="setting"){
            switch (event.keyCode){
                   case 13: set_api();
                           return false;
                           break;
                   default:
                           break;
                    }
            }else if(page=="transferup_item"){
            switch (event.keyCode){
                   case 13: submit_transferup();
                          return false;
                          break;
                   default:
                          break;
                   }
            }else if(page=="transferdown_item"){
            switch (event.keyCode){
                   case 13: submit_transferdown();
                           return false;
                           break;
                   default:
                           break;
                    }
            }else if(page=="transferup"){
            switch (event.keyCode){
                   case 0: tranfer_up_select();
                           return false;
                           break;
                   default:
                           break;
                    }
            }else if(page=="transferdown"){
            switch (event.keyCode){
                   case 0: tranfer_down_select();
                           return false;
                           break;
                   default:
                           break;
                    }
            }else if(page=="transferup_detail"){
            switch (event.keyCode){
                   case 13: save_up();
                           return false;
                           break;
                   default:
                           break;
                    }
            }else if(page=="transferdown_detail"){
            switch (event.keyCode){
                   case 13: save_down();
                           return false;
                           break;
                   default:
                           break;
                    }
            }else if(page=="transferitem_detail"){
            switch (event.keyCode){
                   case 13: transfer_edit();
                           return false;
                           break;
                   default:
                           break;
                    }
            }else if(page=="transfer_normal"){
            switch (event.keyCode){
                   case 0: transfer_normal();
                           return false;
                           break;
                   default:
                           break;
                    }
            }else if(page=="transfer_normal_item"){
            switch (event.keyCode){
                   case 13: submit_transfer_normal();
                           return false;
                           break;
                   default:
                           break;
                    }
            }else if(page=="transfer_normal_detail"){
            switch (event.keyCode){
                   case 13: save_normal();
                           return false;
                           break;
                   default:
                           break;
                    }
            }else if(page=="transfer_damage"){
            switch (event.keyCode){
                   case 0: transfer_dmg();
                           return false;
                           break;
                   default:
                           break;
                    }
            }else if(page=="transfer_damage_item"){
            switch (event.keyCode){
                   case 13: submit_transfer_damage();
                           return false;
                           break;
                   default:
                           break;
                    }
            }else if(page=="transfer_damage_detail"){
            switch (event.keyCode){
                   case 13: save_damage();
                           return false;
                           break;
                   default:
                           break;
                    }
            }else if(page=="transfer_item"){
            switch (event.keyCode){
                   case 13: transfer_edit();
                           return false;
                           break;
                   default:
                           break;
                    }

            }
});
document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady(){
    document.addEventListener("backbutton", function(e){

        if($.mobile.activePage.is('#pageone')){
            var r = confirm("ต้องการออกจากโปรแกรมหรือไม่ !");
            if (r == true) {
                navigator.app.exitApp();
            } else {
                return false;
            }

       }if($.mobile.activePage.is('#pagelogin')){
            $.mobile.changePage('#pageone',{transition: 'slidefade',reverse: true});
       }else if($.mobile.activePage.is('#pagetwo')){
            logout();
       }else if($.mobile.activePage.is('#pagepr')){
            $.mobile.changePage('#pagetwo',{transition: 'slidefade',reverse: true});
       }else if($.mobile.activePage.is('#receive')){
            $.mobile.changePage('#pagetwo',{transition: 'slidefade',reverse: true});
       }else if($.mobile.activePage.is('#receive_listpo')){
            $.mobile.changePage('#receive',{transition: 'slidefade',reverse: true});
       }else if($.mobile.activePage.is('#receive_item')){
            $.mobile.changePage('#receive',{transition: 'slidefade',reverse: true});
       }else if($.mobile.activePage.is('#receive_scan')){
           check_back_receive();
       }else if($.mobile.activePage.is('#receive_show')){
            if(localStorage.receivestatus == "1"){
                alert("ยังไม่ได้บันทึกใบรับเข้า กรุณาบันทึกก่อน");
                return false;
            }else{$.mobile.changePage('#receive',{transition: 'slidefade',reverse: true});}
       }else if($.mobile.activePage.is('#receive_list')){
            $.mobile.changePage('#receive',{transition: 'slidefade',reverse: true});
       }else if($.mobile.activePage.is('#receive_scan_edit')){
            $.mobile.changePage('#receive_list_detail_edit',{transition: 'slidefade',reverse: true});
       }else if($.mobile.activePage.is('#receive_list_detail_edit')){
            $.mobile.changePage('#receive',{transition: 'slidefade',reverse: true});
       }else if($.mobile.activePage.is('#receive_list_detail')){
            $.mobile.changePage('#receive_list',{transition: 'slidefade',reverse: true});
       }else if($.mobile.activePage.is('#transfer')){
            $.mobile.changePage('#pagetwo',{transition: 'slidefade',reverse: true});
       }else if($.mobile.activePage.is('#transferlist')){
            $.mobile.changePage('#transfer',{transition: 'slidefade',reverse: true});
       }else if($.mobile.activePage.is('#transfer_detail')){
            checkstatus();
       }else if($.mobile.activePage.is('#transfer_details')){
             $.mobile.changePage('#transferlist',{transition: 'slidefade',reverse: true});
       }else if($.mobile.activePage.is('#transfer_item')){
             $.mobile.changePage('#transfer_detail',{transition: 'slidefade',reverse: true});
       }else if($.mobile.activePage.is('#transferup')){
            $.mobile.changePage('#transfer',{transition: 'slidefade',reverse: true});
       }else if($.mobile.activePage.is('#transferup_item')){
            check_cancel();
       }else if($.mobile.activePage.is('#transferup_detail')){
            checkstatus();
       }else if($.mobile.activePage.is('#transferdown')){
            $.mobile.changePage('#transfer',{transition: 'slidefade',reverse: true});
       }else if($.mobile.activePage.is('#transferdown_item')){
            check_cancel();
       }else if($.mobile.activePage.is('#transferdown_detail')){
            checkstatus();
       }else if($.mobile.activePage.is('#transfer_damage')){
            $.mobile.changePage('#transfer',{transition: 'slidefade',reverse: true});
       }else if($.mobile.activePage.is('#transfer_damage_item')){
            check_cancel_damage();
       }else if($.mobile.activePage.is('#transfer_damage_detail')){
            checkstatus_damage();
       }else if($.mobile.activePage.is('#transfer_isp')){
            $.mobile.changePage('#transfer',{transition: 'slidefade',reverse: true});
       }else if($.mobile.activePage.is('#transfer_isp_item')){
            $.mobile.changePage('#transfer_isp',{transition: 'slidefade',reverse: true});
       }else if($.mobile.activePage.is('#transfer_rtv')){
            $.mobile.changePage('#transfer',{transition: 'slidefade',reverse: true});
       }else if($.mobile.activePage.is('#transfer_rtv_item')){
            $.mobile.changePage('#transfer_rtv',{transition: 'slidefade',reverse: true});
       }else if($.mobile.activePage.is('#transfer_normal')){
            $.mobile.changePage('#transfer',{transition: 'slidefade',reverse: true});
       }else if($.mobile.activePage.is('#transfer_normal_item')){
            check_cancel_normal();
       }else if($.mobile.activePage.is('#transfer_normal_detail')){
            checkstatus_normal();
       }else if($.mobile.activePage.is('#stock')){
            $.mobile.changePage('#pagetwo',{transition: 'slidefade',reverse: true});
       }else if($.mobile.activePage.is('#shelves')){
            $.mobile.changePage('#countstock',{transition: 'slidefade',reverse: true});
       }else if($.mobile.activePage.is('#countitem')){
            $.mobile.changePage('#shelves',{transition: 'slidefade',reverse: true});
       }else if($.mobile.activePage.is('#setting')){
            $.mobile.changePage('#pagetwo',{transition: 'slidefade',reverse: true});
       }else if($.mobile.activePage.is('#searchitem')){
            $.mobile.changePage('#pagetwo',{transition: 'slidefade',reverse: true});
       }else if($.mobile.activePage.is('#stock')){
            $.mobile.changePage('#pagetwo',{transition: 'slidefade',reverse: true});
       }else if($.mobile.activePage.is('#receive_search')){
            navigator.app.backHistory();
       }



    }, false);
}
