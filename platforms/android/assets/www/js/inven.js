
/*
function pluspr(){
	alert("บันทึกข้อมูลแล้ว!!");
  $.mobile.changePage('#pagepr');
}

  function additem(){
  alert("เพิ่มสินค้า!!");
  document.getElementById("noitems").value = "";
  $("#itemdetail").hide();
  $("#bt-scan").show();
$.mobile.changePage('#additem');
}
function scanadditem(){
  alert("M150");
  document.getElementById("noitems").value = "0001";
  document.getElementById("nameitems").value = "M150";
  document.getElementById("gradeitem").value = "A";
  document.getElementById("units").value = "ขวด";
  $("#itemdetail").show();
  $("#bt-scan").hide();
 $.mobile.changePage("#additem");
}

function scanshelves(){
  alert("ชั้นเก็บที่ A1");
  document.getElementById("shel").value = "A1";
  $("#shelves1").hide();
  $("#shelves2").show();
  $("#item1").show();
  $.mobile.changePage("#countitem");
}

function scanitem(){
  alert("สินค้าชื่อ M150");
  document.getElementById("items").value = "M150";
  document.getElementById("units").value = "ขวด";
  $("#item1").hide();
  $("#item2").show();
  $("#count").show();
  $("#unit").show();
  $.mobile.changePage("#countitem");
}

function saveitem(){
  alert("บันทึกรายการสินค้าที่ตรวจนับ");
  $("#shelves2").hide();
  $("#shelves1").show();
  $("#item1").hide();
  $("#item2").hide();
  $("#count").hide();
  $("#unit").hide();
  $.mobile.changePage("#countstock");
}
*/
function select_warehouse(e){
alert(e.value);

  }
function scan_receive(){
  $("#receive2").show();
  $("#scan_cancel").show();
  $("#scan_btn").hide();
}
function cancel_scan(){
  document.getElementById("test_scanner").value = "";
  $("#receive2").hide();
  $("#scan_cancel").hide();
  $("#scan_btn").show();
}
function testtttt(){
localStorage.receivestatus = "0";
alertify.error(localStorage.receivestatus)

}
function submit_scan(){
if(document.getElementById("amount_scanner").value==""){
alertify.alert("กรุณากรอกจำนวนที่ต้องการ");
return false;
}else{
var d = new Date();
var curr_date = d.getDate();
var curr_month = d.getMonth()+1;
var curr_year = d.getFullYear();
var date = curr_date + "/" + curr_month
+ "/" + curr_year;
//alert(date);
if(localStorage.receivestatus=="0"){
//alertify.error(localStorage.receivestatus+" ยังไม่มีใบ")
$.ajax({
         url: localStorage.api_url_server+""+localStorage.api_url_insert,
         data: '{"accessToken":"","docNo":"","docDate":"'+date+'","poRefNo":"'+localStorage.porefno+'","isCompleteSave":"0","userID":"'+localStorage.username+'"}',
         //{"accessToken":"","docDate":"'+date+'","poRefNo":"'+localStorage.porefno+'","isCompleteSave":"0","userID":"'+localStorage.username+'"}
         contentType: "application/json; charset=utf-8",
         dataType: "json",
         type: "POST",
         cache: false,
         success: function(insert_res){
         console.log(insert_res);
         localStorage.receiveNumber = insert_res.docNo;
         //alertify.error(insert_res.docNo)
         $.ajax({
                  url: localStorage.api_url_server+""+localStorage.api_url_manageitem,
                  data: '{"accessToken":"","docNo":"'+insert_res.docNo+'","docDate":"'+date+'","poRefNo":"'+localStorage.porefno+'","barCode":"'+localStorage.barCode_rv+'","qty":"'+document.getElementById("amount_scanner").value+'","isCancel":"0","userID":"'+localStorage.username+'"}',
                         //{"accessToken":"","docNo":"testnava","docDate":"28/07/2016","poRefNo":"PO5806-0033","barCode":"1000040","qty":"10","userID":"'+localStorage.username+'"}
                  contentType: "application/json; charset=utf-8",
                  dataType: "json",
                  type: "POST",
                  cache: false,
                  success: function(additem_res){
                  console.log(additem_res);
                  alertify.success("เพิ่มสินค้าในใบรับเข้าเรียบร้อยแล้ว !!");
                  document.getElementById("amount_scanner").value = "";
                  document.getElementById("product_show").innerHTML = "";
                  search_rc_no();
                  //$.mobile.changePage("#receive_item");

                  },
                  error: function (error){
                  alertify.error(error);
                  }
                  });

         },
         error: function (error){
         alertify.error(error);
         }
         });


        //alert('"accessToken":"","Docdate":"'+date+'","apCode":"'+localStorage.apcode+'","PoRefNo":"'+localStorage.porefno+'","userID":"'+localStorage.username+'"')
        localStorage.receivestatus = "1";

        }else{
        //alert(localStorage.receivestatus+" มีใบแล้ว")

        $.ajax({
                          url: localStorage.api_url_server+""+localStorage.api_url_manageitem,
                          data: '{"accessToken":"","docNo":"'+localStorage.receiveNumber+'","docDate":"'+date+'","poRefNo":"'+localStorage.porefno+'","barCode":"'+localStorage.barCode_rv+'","qty":"'+document.getElementById("amount_scanner").value+'","isCancel":"0","userID":"'+localStorage.username+'"}',
                                 //{"accessToken":"","docNo":"testnava","docDate":"28/07/2016","poRefNo":"PO5806-0033","barCode":"1000040","qty":"10","isCancel":"0","userID":"'+localStorage.username+'"}
                          contentType: "application/json; charset=utf-8",
                          dataType: "json",
                          type: "POST",
                          cache: false,
                          success: function(additem_res){
                          console.log(additem_res);
                          alertify.success("เพิ่มสินค้าในใบรับเข้าเรียบร้อยแล้ว !!");
                          document.getElementById("amount_scanner").value = "";
                          document.getElementById("product_show").innerHTML = "";
                          search_rc_no();
                          //$.mobile.changePage("#receive_item");

                          },
                          error: function (error){
                          alertify.error(error);
                          }
                          });
localStorage.receivestatus = "1";

}
}
//alert('{"accessToken":"","docNo":"","docDate":"'+date+'","apCode":"'+localStorage.apcode+'","poRefNo":"'+localStorage.porefno+'","barCode":"'+localStorage.barCode_rv+'""itemCode":"'+localStorage.itemCode_rv+'","itemName":"'+localStorage.itemName_rv+'","qty":"'+document.getElementById("amount_scanner").value+'","unitCode":"'+localStorage.unitCode_rv+'","lineNumber":"0","userID":"'+localStorage.username+'"}')
}


function submit_scan_edit(){
if(document.getElementById("amount_scanner_e").value==""){
alertify.alert("กรุณากรอกจำนวนที่ต้องการ");
return false;
}else{
var d = new Date();
var curr_date = d.getDate();
var curr_month = d.getMonth()+1;
var curr_year = d.getFullYear();
var date = curr_date + "/" + curr_month
+ "/" + curr_year;
//alert(date);

        $.ajax({
                          url: localStorage.api_url_server+""+localStorage.api_url_manageitem,
                          data: '{"accessToken":"","docNo":"'+localStorage.re_no+'","docDate":"'+date+'","poRefNo":"'+localStorage.po_no+'","barCode":"'+localStorage.barCode_rv_e+'","qty":"'+document.getElementById("amount_scanner_e").value+'","isCancel":"0","userID":"'+localStorage.username+'"}',
                                 //{"accessToken":"","docNo":"testnava","docDate":"28/07/2016","poRefNo":"PO5806-0033","barCode":"1000040","qty":"10","isCancel":"0","userID":"'+localStorage.username+'"}
                          contentType: "application/json; charset=utf-8",
                          dataType: "json",
                          type: "POST",
                          cache: false,
                          success: function(additem_res){
                          console.log(additem_res);
                          alertify.success("เพิ่มสินค้าในใบรับเข้าเรียบร้อยแล้ว !!");
                          document.getElementById("amount_scanner_e").value = "";
                          document.getElementById("product_show").innerHTML = "";
                          show_receive_detail_edit(localStorage.re_no,localStorage.po_no);
                          //$.mobile.changePage("#receive_item");

                          },
                          error: function (error){
                          alertify.error(error);
                          }
                          });


}
//alert('{"accessToken":"","docNo":"","docDate":"'+date+'","apCode":"'+localStorage.apcode+'","poRefNo":"'+localStorage.porefno+'","barCode":"'+localStorage.barCode_rv+'""itemCode":"'+localStorage.itemCode_rv+'","itemName":"'+localStorage.itemName_rv+'","qty":"'+document.getElementById("amount_scanner").value+'","unitCode":"'+localStorage.unitCode_rv+'","lineNumber":"0","userID":"'+localStorage.username+'"}')
}

function submit_receive(){
var d = new Date();
var curr_date = d.getDate();
var curr_month = d.getMonth()+1;
var curr_year = d.getFullYear();
var date = curr_date + "/" + curr_month
+ "/" + curr_year;
            $.ajax({
                     url: localStorage.api_url_server+""+localStorage.api_url_insert,
                     data: '{"accessToken":"","docNo":"'+localStorage.receiveNumber+'","docDate":"'+date+'","poRefNo":"'+localStorage.porefno+'","isCompleteSave":"1","userID":"'+localStorage.username+'"}',
                     //{"accessToken":"","docDate":"'+date+'","poRefNo":"'+localStorage.porefno+'","isCompleteSave":"0","userID":"'+localStorage.username+'"}
                     contentType: "application/json; charset=utf-8",
                     dataType: "json",
                     type: "POST",
                     cache: false,
                     success: function(receive_success){
                     console.log(receive_success);
                     alertify.success("บันทึกใบรับเข้าเรียบร้อยแล้ว");
                     localStorage.receivestatus = "0";
                     //alert(localStorage.receivestatus+" save complete!!")
                     //search_rc_no();
                     //select_op_vender(localStorage.porefno);
                     //$.mobile.changePage("#receive",{transition: 'slidefade'});

                     show_receive();

                     },
                     error: function (error){
                     alertify.error(error);
                     }
                     });


}
/*function test(){
 window.addEventListener("native.onscanbarcode",function(t){
        document.getElementById("test_scanner").value=t.scanResult;
        })
return false;
}​*/
/*
$(document).on("pageshow", function (e, data) {
 var page = $(this)[0].activeElement.id;
//alert(page);
window.addEventListener("native.onscanbarcode",function(s){

           if(page=="receive_scan"){
           document.getElementById("test_scanner").value=s.scanResult;
           $("#receive2").show();
           $("#scan_cancel").show();
           $("#scan_btn").hide();
           }else{
           document.getElementById("test_scanner").value="";
           $("#receive2").hide();
           $("#scan_cancel").hide();
           $("#scan_btn").show();
           }
           if(page=="transferup_item"){
           document.getElementById("product_scan_up").value=s.scanResult;
           }else{
           document.getElementById("product_scan_up").value="";
           }


            })

});*/
function scan_search_item(scan_value){
 var result_scanner = "";
                           $.ajax({
                                                                  url: localStorage.api_url_server+""+localStorage.api_url_serchitem,
                                                                  data: '{"accessToken":"","docNo":"","type":"1","barCode":"'+scan_value+'"}',
                                                                  contentType: "application/json; charset=utf-8",
                                                                  dataType: "json",
                                                                  type: "POST",
                                                                  cache: false,
                                                                  success: function(item){
                                                                  console.log(JSON.stringify(item));
                                                                  if(item.resp.isSuccess== "0"){
                                                                  alertify.error("Barcode ไม่ถูกต้อง !!")
                                                                  }else{

                                                                  //console.log(item.itemName);

                                                                  //result_scanner +="<p>รหัสสินค้า : "+e.scanResult+"</p>";
                                                                  //result_scanner +="<p>ชื่อสินค้า : "+item.itemCode.itemName+"</p>";
                                                                  //result_scanner +="<p>หน่วยสินค้า : "+item.unitCode+"</p>";

                                                                  //localStorage.itemCode_rv = item.itemCode
                                                                  //localStorage.barCode_rv = item.barCode
                                                                  //localStorage.itemName_rv = item.itemName
                                                                  //localStorage.unitCode_rv = item.unitCode

                                                                  var item_d = JSON.stringify(item);
                                                                  var item_ds = item_d.split(":[");
                                                                  var item_str = item_ds[1].split("]}");
                                                                  item_d = "["+item_str[0]+"]";
                                                                  var item_js = jQuery.parseJSON(item_d);
                                                                  // alertify.error(JSON.stringify(po_detail.isSuccess));
                                                                  console.log(JSON.stringify(item_js));
                                                                  //document.getElementById("PO").innerHTML = JSON.stringify(js);
                                                                  var count = item_js.length;
                                                                            for(var i = 0;i<count;i++){
                                                                               result_scanner +="<p>รหัสสินค้า : "+item_js[i].itemCode+"</p>";
                                                                               result_scanner +="<p>Barcode สินค้า : "+item_js[i].barCode+"</p>";
                                                                               result_scanner +="<p>ชื่อสินค้า : "+item_js[i].itemName+"</p>";
                                                                               result_scanner +="<p>หน่วยนับ : "+item_js[i].unitCode+"</p>";
                                                                               localStorage.itemCode_rv = item_js[i].itemCode;
                                                                               localStorage.barCode_rv = item_js[i].barCode;
                                                                               localStorage.itemName_rv = item_js[i].itemName;
                                                                               localStorage.unitCode_rv = item_js[i].unitCode;
                                                                               //[{"itemCode":"8850025518361","barCode":"8850025518361","itemName":"ยูเอฟชี น้ำมะพร้าว","unitCode":"กระป๋อง","price":15,"qtyRC":0}]
                                                                             }

                                                                              //result_scanner +='<label>กรอกจำนวน : <input type="number" name="receive1" id="amount_scanner"></label>';
                                                                             document.getElementById("product_show").innerHTML = result_scanner;

                                                                              $.mobile.changePage("#receive_scan",{transition: 'slidefade'});
                                                                             //document.getElementById("amount_scanner").focus();
                                                                             $("#receive_scan").bind('pageshow', function() {
                                                                             			$('#amount_scanner').focus();
                                                                             });

                                                                       }

                                                                  },
                                                                  error: function (error){
                                                                  alertify.error(error);
                                                                  }
                                                                  });

}


function scan_search_item_edit(scan_value){
 var result_scanner_e = "";
                           $.ajax({
                                                                  url: localStorage.api_url_server+""+localStorage.api_url_serchitem,
                                                                  data: '{"accessToken":"","docNo":"","type":"1","barCode":"'+scan_value+'"}',
                                                                  contentType: "application/json; charset=utf-8",
                                                                  dataType: "json",
                                                                  type: "POST",
                                                                  cache: false,
                                                                  success: function(item_e){
                                                                  console.log(JSON.stringify(item_e));
                                                                  if(item_e.resp.isSuccess== "0"){
                                                                  alertify.error("Barcode ไม่ถูกต้อง !!")
                                                                  }else{

                                                                  var item_d_e = JSON.stringify(item_e);
                                                                  var item_ds_e = item_d_e.split(":[");
                                                                  var item_str_e = item_ds_e[1].split("]}");
                                                                  item_d_e = "["+item_str_e[0]+"]";
                                                                  var item_js_e = jQuery.parseJSON(item_d_e);
                                                                  // alertify.error(JSON.stringify(po_detail.isSuccess));
                                                                  console.log(JSON.stringify(item_js_e));
                                                                  //document.getElementById("PO").innerHTML = JSON.stringify(js);
                                                                  var count_e = item_js_e.length;
                                                                            for(var i = 0;i<count_e;i++){
                                                                               result_scanner_e +="<p>รหัสสินค้า : "+item_js_e[i].itemCode+"</p>";
                                                                               result_scanner_e +="<p>Barcode สินค้า : "+item_js_e[i].barCode+"</p>";
                                                                               result_scanner_e +="<p>ชื่อสินค้า : "+item_js_e[i].itemName+"</p>";
                                                                               result_scanner_e +="<p>หน่วยนับ : "+item_js_e[i].unitCode+"</p>";
                                                                               localStorage.itemCode_rv_e = item_js_e[i].itemCode;
                                                                               localStorage.barCode_rv_e = item_js_e[i].barCode;
                                                                               localStorage.itemName_rv_e = item_js_e[i].itemName;
                                                                               localStorage.unitCode_rv_e = item_js_e[i].unitCode;

                                                                               //[{"itemCode":"8850025518361","barCode":"8850025518361","itemName":"ยูเอฟชี น้ำมะพร้าว","unitCode":"กระป๋อง","price":15,"qtyRC":0}]
                                                                             }

                                                                              //result_scanner +='<label>กรอกจำนวน : <input type="number" name="receive1" id="amount_scanner"></label>';
                                                                             document.getElementById("product_show_e").innerHTML = result_scanner_e;

                                                                              $.mobile.changePage("#receive_scan_edit",{transition: 'slidefade'});
                                                                             //document.getElementById("amount_scanner").focus();
                                                                             $("#receive_scan_edit").bind('pageshow', function() {
                                                                             			$('#amount_scanner_e').focus();
                                                                             });

                                                                       }

                                                                  },
                                                                  error: function (error){
                                                                  alertify.error(error);
                                                                  }
                                                                  });

}

function show_receive(){
$.ajax({
                          url: localStorage.api_url_server+""+localStorage.api_url_list_receive,
                          data: '{"accessToken":"","search":"'+document.getElementById("search_receive_doc").value+'"}',
                                 //{"accessToken":"","docNo":"testnava","docDate":"28/07/2016","poRefNo":"PO5806-0033","barCode":"1000040","qty":"10","isCancel":"0","userID":"'+localStorage.username+'"}
                          contentType: "application/json; charset=utf-8",
                          dataType: "json",
                          type: "POST",
                          cache: false,
                          success: function(list_receive){
                          console.log(list_receive);
                            if(list_receive.resp.isSuccess==1){
                                                     var rc_l = JSON.stringify(list_receive);
                                                     var rc_ls = rc_l.split(":[");
                                                     var strl = rc_ls[1].split("]}");
                                                     rc_l = "["+strl[0]+"]";
                                                     var jsl = jQuery.parseJSON(rc_l);
                                                     console.log(JSON.stringify(jsl));
                                                     var count = jsl.length;
                                                     var list = "";
                                                      for(var i = 0;i<count;i++){

                                                            if(jsl[i].isCancel==1){
                                                      list += '<a href="#" class="ui-btn ui-corner-all" style="background: #FF3333; color: gray;" onclick="show_receive_detail(';
                                                      list += "'"+jsl[i].recNo+"'"+","+"'"+jsl[i].poRefNo+"')";
                                                      list += '">'+jsl[i].recNo+'<br>'+jsl[i].apName+'</a>';

                                                      }else{

                                                            if(jsl[i].isConfirm==1){
                                                      list += '<a href="#" class="todo-deleteview ui-btn ui-corner-all" data-delete-id="'+jsl[i].recNo+'" data-deleterow-id="i'+jsl[i].recNo+'" data-delete-poRefNo="'+jsl[i].poRefNo+'" id="i'+jsl[i].recNo+'" onclick="show_receive_detail(';
                                                      list += "'"+jsl[i].recNo+"'"+","+"'"+jsl[i].poRefNo+"')";
                                                      list += '">'+jsl[i].recNo+'<br>'+jsl[i].apName+'</a>';
                                                            }else{
                                                      list += '<a href="#" class="todo-deleteview ui-btn ui-corner-all" data-delete-id="'+jsl[i].recNo+'" data-deleterow-id="i'+jsl[i].recNo+'" data-delete-poRefNo="'+jsl[i].poRefNo+'" id="i'+jsl[i].recNo+'" onclick="show_receive_detail_edit(';
                                                      list += "'"+jsl[i].recNo+"'"+","+"'"+jsl[i].poRefNo+"')";
                                                      list += '">'+jsl[i].recNo+'<br>'+jsl[i].apName+'</a>';
                                                              }

                                                     }


                                                      }
                                                      document.getElementById("list_receive").innerHTML = list;

                                                      $.mobile.changePage("#receive_list",{transition: 'slidefade'});
                                                      focus_receive_list();

                                                      }else if(list_receive.resp.isSuccess==0){alertify.error("ไม่มีใบรับเข้า !!");}
                          },
                          error: function (error){
                          alertify.error(error);
                          }
                          });
}




window.addEventListener('native.onscanbarcode', function (e) {
       //alert(e.scanResult);
       var page = "";
       if(page == ""){
         page = $.mobile.activePage.attr('id');
       }
       $(document).on("pageshow", function (e, data) {
          page = $(this)[0].activeElement.id;
       });
       //alert(page);
                			//document.getElementById("noitems").value = e.scanResult;
       switch(page){
              case "pageone" :

                           //$.mobile.changePage("#pagetwo");

                		   break;
              case "receive" :
                          select_op_vender(e.scanResult);
                           break;
             case "receive_scan" :
                            scan_search_item(e.scanResult);
                           break;
             case "receive_item" :
                           scan_search_item(e.scanResult);
                           break;
             case "receive_show" :
                           scan_search_item(e.scanResult);
                           break;
             case "receive_list_detail_edit" :
                           scan_search_item_edit(e.scanResult);
                           break;
             case "receive_scan_edit" :
                           scan_search_item_edit(e.scanResult);
                           break;
                			}






});