$(document).ready(function(){

if(localStorage.api_url_server){
    document.getElementById("server").value = localStorage.api_url_server;
}else{
    localStorage.api_url_server = document.getElementById("apiserver_s").value;
    document.getElementById("server").value = document.getElementById("apiserver_s").value;
}

if(localStorage.api_url_server_nava){
    document.getElementById("server_nava").value = localStorage.api_url_server_nava;
}else{
    localStorage.api_url_server_nava = document.getElementById("apiserver_nava_s").value;
    document.getElementById("server_nava").value = document.getElementById("apiserver_nava_s").value;
}

if(localStorage.api_url_login){
    document.getElementById("apilogin").value = localStorage.api_url_login;
}else{
    localStorage.api_url_login = document.getElementById("apilogin_s").value;
    document.getElementById("apilogin").value = document.getElementById("apilogin_s").value;
}

if(localStorage.api_url_vender){
     document.getElementById("api1").value = localStorage.api_url_vender;
 }else{
     localStorage.api_url_vender = document.getElementById("api1_s").value;
     document.getElementById("api1").value = document.getElementById("api1_s").value;
 }

 if(localStorage.api_url_poList){
     document.getElementById("api2").value = localStorage.api_url_poList;
 }else{
     localStorage.api_url_poList = document.getElementById("api2_s").value;
     document.getElementById("api2").value = document.getElementById("api2_s").value;
 }

 if(localStorage.api_url_poDetail){
     document.getElementById("api3").value = localStorage.api_url_poDetail;
 }else{
     localStorage.api_url_poDetail = document.getElementById("api3_s").value;
     document.getElementById("api3").value = document.getElementById("api3_s").value;
 }

 if(localStorage.api_url_insert){
     document.getElementById("api4").value = localStorage.api_url_insert;
 }else{
     localStorage.api_url_insert = document.getElementById("api4_s").value;
     document.getElementById("api4").value = document.getElementById("api4_s").value;
 }

 if(localStorage.api_url_manageitem){
     document.getElementById("api5").value = localStorage.api_url_manageitem;
 }else{
     localStorage.api_url_manageitem = document.getElementById("api5_s").value;
     document.getElementById("api5").value = document.getElementById("api5_s").value;
 }

 if(localStorage.api_url_serchitem){
     document.getElementById("api6").value = localStorage.api_url_serchitem;
 }else{
     localStorage.api_url_serchitem = document.getElementById("api6_s").value;
     document.getElementById("api6").value = document.getElementById("api6_s").value;
 }

 if(localStorage.api_url_search){
     document.getElementById("api7").value = localStorage.api_url_search;
 }else{
     localStorage.api_url_search = document.getElementById("api7_s").value;
     document.getElementById("api7").value = document.getElementById("api7_s").value;
 }

 if(localStorage.api_url_prlist){
      document.getElementById("api8").value = localStorage.api_url_prlist;
 }else{
     localStorage.api_url_prlist = document.getElementById("api8_s").value;
      document.getElementById("api8").value = document.getElementById("api8_s").value;
 }

 if(localStorage.api_url_prdetail){
       document.getElementById("api9").value = localStorage.api_url_prdetail;
 }else{
     localStorage.api_url_prdetail = document.getElementById("api9_s").value;
       document.getElementById("api9").value = document.getElementById("api9_s").value;
 }

 if(localStorage.api_url_insertpr){
        document.getElementById("api10").value = localStorage.api_url_insertpr;
 }else{
     localStorage.api_url_insertpr = document.getElementById("api10_s").value;
        document.getElementById("api10").value = document.getElementById("api10_s").value;
 }

 if(localStorage.api_url_gendocno){
         document.getElementById("api11").value = localStorage.api_url_gendocno;
 }else{
     localStorage.api_url_gendocno = document.getElementById("api11_s").value;
         document.getElementById("api11").value = document.getElementById("api11_s").value;
 }

 if(localStorage.api_url_search_item_pr){
          document.getElementById("api12").value = localStorage.api_url_search_item_pr;
  }else{
      localStorage.api_url_search_item_pr = document.getElementById("api12_s").value;
          document.getElementById("api12").value = document.getElementById("api12_s").value;
  }

 if(localStorage.api_url_list_receive){
         document.getElementById("api13").value = localStorage.api_url_list_receive;
 }else{
     localStorage.api_url_list_receive = document.getElementById("api13_s").value;
     document.getElementById("api13").value = document.getElementById("api13_s").value;
 }


 if(localStorage.api_url_delete_receive){
    document.getElementById("api14").value = localStorage.api_url_delete_receive;
 }else{
    localStorage.api_url_delete_receive = document.getElementById("api14_s").value;
    document.getElementById("api14").value = document.getElementById("api14_s").value;
 }

 if(localStorage.api_url_cancelPr){
    document.getElementById("api15").value = localStorage.api_url_cancelPr;
 }else{
    localStorage.api_url_cancelPr = document.getElementById("api15_s").value;
    document.getElementById("api15").value = document.getElementById("api15_s").value;
 }

 if(localStorage.api_url_searchvendorPR){
    document.getElementById("api16").value = localStorage.api_url_searchvendorPR;
 }else{
    localStorage.api_url_searchvendorPR = document.getElementById("api16_s").value;
    document.getElementById("api16").value = document.getElementById("api16_s").value;
 }

 if(localStorage.api_url_searchwh_is){
    document.getElementById("api17").value = localStorage.api_url_searchwh_is;
 }else{
    localStorage.api_url_searchwh_is = document.getElementById("api17_s").value;
    document.getElementById("api17").value = document.getElementById("api17_s").value;
 }

 if(localStorage.api_url_searchshelf_is){
    document.getElementById("api18").value = localStorage.api_url_searchshelf_is;
 }else{
    localStorage.api_url_searchshelf_is = document.getElementById("api18_s").value;
    document.getElementById("api18").value = document.getElementById("api18_s").value;
 }

 if(localStorage.api_url_confirm_is){
    document.getElementById("api19").value = localStorage.api_url_confirm_is;
 }else{
    localStorage.api_url_confirm_is = document.getElementById("api19_s").value;
    document.getElementById("api19").value = document.getElementById("api19_s").value;
 }
 /*
 if(localStorage.api_url_xx){
    document.getElementById("api20").value = localStorage.api_url_xx;
 }else{
    localStorage.api_url_xx = document.getElementById("api20_s").value;
    document.getElementById("api20").value = document.getElementById("api20_s").value;
 }

 if(localStorage.api_url_xx){
    document.getElementById("api21").value = localStorage.api_url_xx;
 }else{
    localStorage.api_url_xx = document.getElementById("api21_s").value;
    document.getElementById("api21").value = document.getElementById("api21_s").value;
 }

 if(localStorage.api_url_xx){
    document.getElementById("api22").value = localStorage.api_url_xx;
 }else{
    localStorage.api_url_xx = document.getElementById("api22_s").value;
    document.getElementById("api22").value = document.getElementById("api22_s").value;
 }

 if(localStorage.api_url_xx){
    document.getElementById("api23").value = localStorage.api_url_xx;
 }else{
    localStorage.api_url_xx = document.getElementById("api23_s").value;
    document.getElementById("api23").value = document.getElementById("api23_s").value;
 }

 if(localStorage.api_url_xx){
    document.getElementById("api24").value = localStorage.api_url_xx;
 }else{
    localStorage.api_url_xx = document.getElementById("api24_s").value;
    document.getElementById("api24").value = document.getElementById("api24_s").value;
 }
 */
 if(localStorage.api_url_searchwh_tf){
    document.getElementById("api25").value = localStorage.api_url_searchwh_tf;
 }else{
    localStorage.api_url_searchwh_tf = document.getElementById("api25_s").value;
    document.getElementById("api25").value = document.getElementById("api25_s").value;
 }

 if(localStorage.api_url_searchshelf_tf){
    document.getElementById("api26").value = localStorage.api_url_searchshelf_tf;
 }else{
    localStorage.api_url_searchshelf_tf = document.getElementById("api26_s").value;
    document.getElementById("api26").value = document.getElementById("api26_s").value;
 }

 if(localStorage.api_url_searchitem_tf){
    document.getElementById("api27").value = localStorage.api_url_searchitem_tf;
 }else{
    localStorage.api_url_searchitem_tf = document.getElementById("api27_s").value;
    document.getElementById("api27").value = document.getElementById("api27_s").value;
 }

 if(localStorage.api_url_insert_tf){
    document.getElementById("api28").value = localStorage.api_url_insert_tf;
 }else{
    localStorage.api_url_insert_tf = document.getElementById("api28_s").value;
    document.getElementById("api28").value = document.getElementById("api28_s").value;
 }

 if(localStorage.api_url_manageitem_tf){
    document.getElementById("api29").value = localStorage.api_url_manageitem_tf;
 }else{
    localStorage.api_url_manageitem_tf = document.getElementById("api29_s").value;
    document.getElementById("api29").value = document.getElementById("api29_s").value;
 }

 if(localStorage.api_url_searchtlist_tf){
    document.getElementById("api30").value = localStorage.api_url_searchtlist_tf;
 }else{
    localStorage.api_url_searchtlist_tf = document.getElementById("api30_s").value;
    document.getElementById("api30").value = document.getElementById("api30_s").value;
 }

 if(localStorage.api_url_searchdetail_tf){
    document.getElementById("api31").value = localStorage.api_url_searchdetail_tf;
 }else{
    localStorage.api_url_searchdetail_tf = document.getElementById("api31_s").value;
    document.getElementById("api31").value = document.getElementById("api31_s").value;
 }

 if(localStorage.api_url_cancel_tf){
    document.getElementById("api32").value = localStorage.api_url_cancel_tf;
 }else{
    localStorage.api_url_cancel_tf = document.getElementById("api32_s").value;
    document.getElementById("api32").value = document.getElementById("api32_s").value;
 }

 if(localStorage.api_url_updatepr){
    document.getElementById("api33").value = localStorage.api_url_updatepr;
 }else{
    localStorage.api_url_updatepr = document.getElementById("api33_s").value;
    document.getElementById("api33").value = document.getElementById("api33_s").value;
 }

 if(localStorage.api_url_profile_it){
    document.getElementById("api34").value = localStorage.api_url_profile_it;
 }else{
    localStorage.api_url_profile_it = document.getElementById("api34_s").value;
    document.getElementById("api34").value = document.getElementById("api34_s").value;
 }

});
function set_api(){
//$("#set").click(function() {
    localStorage.api_url_server = document.getElementById("server").value;
    localStorage.api_url_server_nava = document.getElementById("server_nava").value;
    localStorage.api_url_login = document.getElementById("apilogin").value;
    localStorage.api_url_vender = document.getElementById("api1").value;
    localStorage.api_url_poList = document.getElementById("api2").value;
    localStorage.api_url_poDetail = document.getElementById("api3").value;
    localStorage.api_url_insert = document.getElementById("api4").value;
    localStorage.api_url_manageitem = document.getElementById("api5").value;
    localStorage.api_url_serchitem = document.getElementById("api6").value;
    localStorage.api_url_search = document.getElementById("api7").value;
    localStorage.api_url_prlist = document.getElementById("api8").value;
    localStorage.api_url_prdetail = document.getElementById("api9").value;
    localStorage.api_url_insertpr = document.getElementById("api10").value;
    localStorage.api_url_gendocno = document.getElementById("api11").value;
    localStorage.api_url_search_item_pr = document.getElementById("api12").value;
    localStorage.api_url_list_receive = document.getElementById("api13").value;
    localStorage.api_url_delete_receive = document.getElementById("api14").value;
    localStorage.api_url_cancelPr = document.getElementById("api15").value;
    localStorage.api_url_searchvendorPR = document.getElementById("api16").value;
    localStorage.api_url_searchwh_is = document.getElementById("api17").value;
    localStorage.api_url_searchshelf_is = document.getElementById("api18").value;
    localStorage.api_url_confirm_is = document.getElementById("api19").value;
    //localStorage.api_url_20 = document.getElementById("api20").value;
    //localStorage.api_url_21 = document.getElementById("api21").value;
    //localStorage.api_url_22 = document.getElementById("api22").value;
    //localStorage.api_url_23 = document.getElementById("api23").value;
    //localStorage.api_url_24 = document.getElementById("api24").value;
    localStorage.api_url_searchwh_tf = document.getElementById("api25").value;
    localStorage.api_url_searchshelf_tf = document.getElementById("api26").value;
    localStorage.api_url_searchitem_tf = document.getElementById("api27").value;
    localStorage.api_url_insert_tf = document.getElementById("api28").value;
    localStorage.api_url_manageitem_tf = document.getElementById("api29").value;
    localStorage.api_url_searchtlist_tf = document.getElementById("api30").value;
    localStorage.api_url_searchdetail_tf = document.getElementById("api31").value;
    localStorage.api_url_cancel_tf = document.getElementById("api32").value;
    localStorage.api_url_updatepr = document.getElementById("api33").value;
    localStorage.api_url_profile_it = document.getElementById("api34").value;
    alert("บันทึกข้อมูลเรียบร้อยแล้ว")


//});
}
