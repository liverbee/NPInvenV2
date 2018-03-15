$(document).ready(function(){

if(localStorage.receivestatus == null ||localStorage.receivestatus == "" ){
localStorage.receivestatus = "0";
}
$("#pageone").bind('pageshow', function() {
 $('#username').focus();
 });


//alert(localStorage.api_url_server+""+localStorage.api_url_vender)
               /* $.ajax({
                   url: localStorage.api_url_server+localStorage.api_url_vender,
                   data: '{"accessToken":"","search":""}',
                   contentType: "application/json; charset=utf-8",
                   dataType: "json",
                   type: "POST",
                   cache: false,
                   success: function(result){
                        //console.log(JSON.stringify(result));
                        var prl = JSON.stringify(result);
                        var prlp = prl.split(":[");
                        var str = prlp[1].split("]}");
                        prl = "["+str[0]+"]";
                        var js = jQuery.parseJSON(prl);
                        //console.log(JSON.stringify(js));
                        //document.getElementById("PO").innerHTML = JSON.stringify(js);
                        var count = js.length;
                          //console.log(count);
                          var po = "";
                          for(var i = 0;i<js.length;i++){
                            //console.log(js[i].code);
                            po += '<a href="#" data-transition="slidefade" class="ui-btn ui-corner-all" onclick="select_vender(';
                            po += "'"+js[i].code+"')";
                            po += '">'+js[i].name+'</a>';

                          }
                        document.getElementById("polist").innerHTML = po;
                           },
                    error: function (error){
                        console.log(error);
                    }

                });*/

searchpo();
});

function xxxxx(){
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!

var yyyy = today.getFullYear();
if(dd<10){
    dd='0'+dd
}
if(mm<10){
    mm='0'+mm
}
var today = dd+'/'+mm+'/'+yyyy;

alert(today);

}
function focus_search(){

 $("#receive").bind('pageshow', function() {
 $('#search').focus();
 });
}

function focus_receive_list(){

 $("#receive_list").bind('pageshow', function() {
 $('#search_receive_doc').focus();
 });
}
function check_back_receive(){
if(localStorage.receivestatus=="1"){
$.mobile.changePage('#receive_show',{transition: 'slidefade',reverse: true});
}else{
$.mobile.changePage('#receive_item',{transition: 'slidefade',reverse: true});
}
}
function user_focus(){
 $("#pageone").bind('pageshow', function() {
 $('#username').focus();
 });
}
function pass_focus(){
 $("#pageone").bind('pageshow', function() {
 $('#passwd').focus();
 });
}
function pass_s_focus(){

 $("#pagelogin").bind('pageshow', function() {
 $('#passwds').focus();
 });
}
function focus_search_item(){
 $("#receive_search").bind('pageshow', function() {
 $('#receive_search_item').focus();
 });
}


function searchpo(){
//alert(localStorage.api_url_server+""+localStorage.api_url_vender);
        //alert(search_po.search.value)
        $.ajax({
                   url: localStorage.api_url_server+""+localStorage.api_url_vender,
                   data: '{"accessToken":"","search":"'+document.getElementById("search").value+'"}',
                   contentType: "application/json; charset=utf-8",
                   dataType: "json",
                   type: "POST",
                   cache: false,
                   success: function(result){
                        //console.log(JSON.stringify(result));
                        var prl = JSON.stringify(result);
                        var prlp = prl.split(":[");
                        var str = prlp[1].split("]}");
                        prl = "["+str[0]+"]";
                        var js = jQuery.parseJSON(prl);
                        //console.log(JSON.stringify(js));
                        //document.getElementById("PO").innerHTML = JSON.stringify(js);
                        var count = js.length;
                          //console.log(count);
                          var po = "";
                          for(var i = 0;i<js.length;i++){
                            //console.log(js[i].code);
                            po += '<a href="#" data-transition="slidefade" class="ui-btn ui-corner-all" onclick="select_vender(';
                            po += "'"+js[i].code+"')";
                            po += '">'+js[i].name+'</a>';
                          }
                        document.getElementById("polist").innerHTML = po;
                    },
                    error: function (error){
                        console.log(error);
                    }
                });

}
function select_vender(po_number){
    //alert(po_number);
    //console.log(po_no);
    //document.getElementById("po_no").value=po_no;
        //alert("click : "+ po_number)
     $.ajax({
                   url: localStorage.api_url_server+""+localStorage.api_url_poList,
                   data: '{"accessToken":"","search":"'+po_number+'"}',
                   contentType: "application/json; charset=utf-8",
                   dataType: "json",
                   type: "POST",
                   cache: false,
                   success: function(result){

                        //console.log(JSON.stringify(result));
                        var prl = JSON.stringify(result);
                        var prlp = prl.split(":[");
                        var str = prlp[1].split("]}");
                        prl = "["+str[0]+"]";
                        var js = jQuery.parseJSON(prl);
                        //console.log(JSON.stringify(js));
                        //document.getElementById("PO").innerHTML = JSON.stringify(js);
                        var count = js.length;
                          //console.log(count);
                          var po_ven = "";
                          var po_header = "";
                          for(var i = 0;i<js.length;i++){
                            //console.log(js[i].code);
                            po_ven += '<a href="#" data-transition="slidefade" class="ui-btn ui-corner-all" onclick="select_op_vender(';
                            po_ven += "'"+js[i].docNo+"')";
                            po_ven += '">'+js[i].docNo+'</a>';
                            po_header = "ชื่อ vender : "+js[i].apName;

                          }
                        document.getElementById("polist_head").innerHTML = po_header;
                        document.getElementById("polist_detail").innerHTML = po_ven;
                        $.mobile.changePage("#receive_listpo",{transition: 'slidefade'});
                    },
                    error: function (error){
                        console.log(error);
                    }
                });

                //$.mobile.changePage("#receive_item");
}
function select_op_vender(get_detail){
	                $.ajax({
                                                     url: localStorage.api_url_server+""+localStorage.api_url_poDetail,
                                                     data: '{"accessToken":"","search":"'+get_detail+'"}',
                                                     contentType: "application/json; charset=utf-8",
                                                     dataType: "json",
                                                     type: "POST",
                                                     cache: false,
                                                     success: function(po_detail){
                                                     //console.log(JSON.stringify(po_detail));
                                                     console.log(po_detail.resp.isSuccess);
                                                     if(po_detail.resp.isSuccess==1){
                                                     var po_d = JSON.stringify(po_detail);
                                                     var po_ds = po_d.split(":[");
                                                     var str = po_ds[1].split("]}");
                                                     po_d = "["+str[0]+"]";
                                                     var js = jQuery.parseJSON(po_d);
                                                    // alert(JSON.stringify(po_detail.isSuccess));
                                                    console.log(JSON.stringify(js));
                                                                            //document.getElementById("PO").innerHTML = JSON.stringify(js);
                                                     var count = js.length;
                                                     //alert(count)
                                                                                 var po_de_head = "";                         //console.log(count);
                                                                                 var po_de = "";

                                                                                 po_de_head += "<h2 class='sub_title'>เลขที่ PO :"+po_detail.docNo+"</h2>";
                                                                                 po_de_head += "<p> วันที่ออกเอกสาร :"+po_detail.docDate+"</p>";
                                                                                 po_de_head += "<p>รหัสเจ้าหนี้ :"+po_detail.apCode+"</p>";
                                                                                 po_de_head += "<p>ชื่อเจ้าหนี้ :"+po_detail.apName+"</p>";
                                                                                 po_de_head += "<p>ราคารวม :"+po_detail.sumOfItemAmount.toLocaleString()+" บาท</p>";
                                                                                 po_de_head += "<p>ราคารวมภาษี :"+po_detail.totalAmount.toLocaleString()+" บาท</p>";
                                                                                 localStorage.apcode = po_detail.apCode;
                                                                                 localStorage.porefno = po_detail.docNo;



                                                                                 po_de += '<p style="color:red; font-size:12px;text-align:center;">** สแกนสินค้าเพื่อรับสินค้า **</p>';
                                                                                 po_de += '<label><div class="ui-grid-d" style="text-align:center;  font-size:14px;">';
                                                                                 po_de += '<div class="ui-block-a"><b>สินค้า</b></div>';
                                                                                 po_de += '<div class="ui-block-b"><b>จำนวนค้างรับ</b></div>';
                                                                                 po_de += '<div class="ui-block-c"><b>ราคา/หน่วย</b></div>';
                                                                                 po_de += '<div class="ui-block-d"><b>ราคา</b></div>';
                                                                                 po_de += '<div class="ui-block-e"><b>สถานะ</b></div></div></label><hr>';
                                                                                 for(var i = 0;i<js.length;i++){
                                                                                 //console.log(js[i].code);
                                                                                 // po_ven += '<a href="#" data-transition="slidefade" class="ui-btn ui-corner-all" onclick="select_op_vender(';
                                                                                 //po_ven += "'"+js[i].docNo+"')";
                                                                                 //po_ven += '">'+js[i].docNo+'</a>';
                                                                                 po_de += '<div class="ui-grid-d" style="text-align:center; font-size:12px;">'
                                                                                 po_de += '<div class="ui-block-a"> '+js[i].itemName+' </div>';
                                                                                 po_de += '<div class="ui-block-b"> '+js[i].remainQty+' '+js[i].unitCode+' </div>';
                                                                                 po_de += '<div class="ui-block-c"> '+js[i].price.toLocaleString()+' </div>';
                                                                                 po_de += '<div class="ui-block-d"> '+js[i].amount.toLocaleString()+' </div>';

                                                                                 po_de += '<div class="ui-block-d"><img src="images/Warning.png" class="receive_status"></div></div><hr>';

                                                                                 //po_de += '<div class="ui-block-d">'+js[i].amount.toLocaleString()+' บาท</div></div><hr>';

                                                                                                 }
                                                                                 //po_de += '</table>';
                                                                                  //po_de +='<a href="#" onclick="search_rc_no()" class="ui-btn ui-corner-all">แสดงใบรับสินค้า</a>';
                                                                                 document.getElementById("po_head").innerHTML = po_de_head;
                                                                                 document.getElementById("po_detail").innerHTML = po_de;
                                                                                 $.mobile.changePage("#receive_item");
                                                                                 }else if(po_detail.resp.isSuccess==0){alertify.error("Barcode ไม่ถูกต้อง !!");}
                                                                                 },
                                                                                 error: function (error){
                                                                                 alertify.error(error);
                                                                                }


                                                 });
}

function search_rc_no(){


if(localStorage.receiveNumber){

	                $.ajax({
                                                     url: localStorage.api_url_server+""+localStorage.api_url_search,
                                                     data: '{"accessToken":"","docNo":"'+localStorage.porefno+'","recNo":"'+localStorage.receiveNumber+'"}',
                                                     //{"accessToken":"","docNo":"'+localStorage.porefno+'","recNo":"'+localStorage.receiveNumber+'"}
                                                     contentType: "application/json; charset=utf-8",
                                                     dataType: "json",
                                                     type: "POST",
                                                     cache: false,
                                                     success: function(rc_detail){
                                                     console.log(JSON.stringify(rc_detail));
                                                     //console.log(rc_detail.resp.isSuccess);
                                                     if(rc_detail.resp.isSuccess==1){
                                                     var rc_d = JSON.stringify(rc_detail);
                                                     var rc_ds = rc_d.split(":[");
                                                     var str = rc_ds[1].split("]}");
                                                     rc_d = "["+str[0]+"]";
                                                     var js = jQuery.parseJSON(rc_d);
                                                    // alert(JSON.stringify(rc_detail.isSuccess));
                                                     console.log(JSON.stringify(js));
                                                                            //document.getElementById("PO").innerHTML = JSON.stringify(js);
                                                     var count = js.length;
                                                     //alert(count)
                                                                                 var rc_de_head = "";                         //console.log(count);
                                                                                 var rc_de = "";
                                                                                 rc_de_head += "<h2 class='sub_title'>เลขที่ ใบรับเข้า :"+localStorage.receiveNumber+"</h2>";
                                                                                 rc_de_head += "<h2 class='sub_title'>เลขที่ PO :"+rc_detail.docNo+"</h2>";
                                                                                 rc_de_head += "<p> วันที่ออกเอกสาร :"+rc_detail.docDate+"</p>";
                                                                                 rc_de_head += "<p>รหัสเจ้าหนี้ :"+rc_detail.apCode+"</p>";
                                                                                 rc_de_head += "<p>ชื่อเจ้าหนี้ :"+rc_detail.apName+"</p>";
                                                                                 rc_de_head += "<p>ราคารวม :"+rc_detail.sumOfItemAmount.toLocaleString()+" บาท</p>";
                                                                                 rc_de_head += "<p>ราคารวมภาษี :"+rc_detail.totalAmount.toLocaleString()+" บาท</p>";
                                                                                 rc_de += '<p style="color:red; font-size:12px;text-align:center;">** สแกนสินค้าเพื่อรับสินค้า **</p>';

                                                                                 localStorage.apcode = rc_detail.apCode;
                                                                                 localStorage.porefno = rc_detail.docNo;




                                                                                 rc_de += '<label><div class="ui-grid-d" style="text-align:center;  font-size:14px;">';
                                                                                 rc_de += '<div class="ui-block-a"><b>สินค้า</b></div>';
                                                                                 rc_de += '<div class="ui-block-b"><b>จำนวนค้างรับ</b></div>';
                                                                                 rc_de += '<div class="ui-block-c"><b>ราคา/หน่วย</b></div>';
                                                                                 rc_de += '<div class="ui-block-d"><b>จำนวนรับเข้า</b></div>';
                                                                                 rc_de += '<div class="ui-block-e"><b>สถานะ</b></div></div></label><hr>';
                                                                                 for(var i = 0;i<js.length;i++){
                                                                                 if(js[i].isListCancel == "1"){
                                                                                 //console.log(js[i].code);
                                                                                 //data-row-id="4" id="4"
                                                                                 if(js[i].status=="0"){

                                                                                 rc_de += '<div class="ui-grid-d blur" style="text-align:center; font-size:12px; color:#ccc;">';
                                                                                 }else{
                                                                                 rc_de += '<div class="todo-uncancelview ui-grid-d blur" data-uncancel-id="'+js[i].barCode+'" data-uncancelrow-id="i'+js[i].itemCode+'" data-unreceive="'+js[i].rcQty+'" id="i'+js[i].itemCode+'" style="text-align:center; font-size:12px;">';

                                                                                 //rc_de += '<div class="ui-grid-d blur" onclick="uncancel_item(';
                                                                                 //rc_de += "'"+js[i].barCode+"','"+js[i].rcQty+"')";
                                                                                 //rc_de += '"  style="text-align:center; font-size:12px;">';
                                                                                 }
                                                                                 }else{
                                                                                 if(js[i].status=="0"){
                                                                                 rc_de += '<div class="ui-grid-d" style="text-align:center; font-size:12px;">';
                                                                                 }else{

                                                                                 rc_de += '<div class="todo-cancelview ui-grid-d" data-cancel-id="'+js[i].barCode+'" data-cancelrow-id="i'+js[i].itemCode+'" data-receive="'+js[i].rcQty+'" id="i'+js[i].itemCode+'" style="text-align:center; font-size:12px;">';

                                                                                 //rc_de += '<div class="ui-grid-d" onclick="cancel_item(';
                                                                                 //rc_de += "'"+js[i].barCode+"')";
                                                                                 //rc_de += '"  style="text-align:center; font-size:12px;">';
                                                                                 }

                                                                                 }
                                                                                 rc_de += '<div class="ui-block-a">'+js[i].itemName+'</div>';
                                                                                 rc_de += '<div class="ui-block-b"> '+js[i].remainQty+' '+js[i].unitCode+' </div>';
                                                                                 rc_de += '<div class="ui-block-c"> '+js[i].price.toLocaleString()+' </div>';
                                                                                 rc_de += '<div class="ui-block-d"> '+js[i].rcQty+' </div>';
                                                                                 //rc_de += '<div class="ui-block-d"> '+js[i].amount.toLocaleString()+' </div>';

                                                                                  if(js[i].status==0){
                                                                                    rc_de += '<div class="ui-block-d"><img src="images/Warning.png" class="receive_status"></div></div><hr>';
                                                                                  }else if(js[i].status==1){
                                                                                    rc_de += '<div class="ui-block-d"><img src="images/tick.png" class="receive_status"></div></div><hr>';
                                                                                  }else if(js[i].status==2){
                                                                                    rc_de += '<div class="ui-block-d"><img src="images/minus.png" class="receive_status"></div></div><hr>';
                                                                                  }else if(js[i].status==3){
                                                                                    rc_de += '<div class="ui-block-d"><img src="images/plus.png" class="receive_status"></div></div><hr>';
                                                                                  }else if(js[i].status==4){
                                                                                    rc_de += '<div class="ui-block-d"><img src="images/private.png" class="receive_status"></div></div><hr>';
                                                                                  }
                                                                                 //rc_de += '<div class="ui-block-d">'+js[i].amount.toLocaleString()+' บาท</div></div><hr>';
                                                                                            //rc_de +="</label>";
                                                                                                 }
                                                                                 //rc_de += '</table>';
                                                                                 document.getElementById("rv_head").innerHTML = rc_de_head;
                                                                                 document.getElementById("rv_detail").innerHTML = rc_de;
                                                                                 $.mobile.changePage("#receive_show",{transition: 'slidefade'});
                                                                                 }else if(rc_detail.resp.isSuccess==0){alertify.error("Barcode ไม่ถูกต้อง !!");}
                                                                                 },
                                                                                 error: function (error){
                                                                                 alertify.error(error);
                                                                                }


                                                 });
            }else{alertify.error("ไม่มีใบรับสินค้า !!");}

}


function show_receive_detail(r,p){



	                $.ajax({
                                                     url: localStorage.api_url_server+""+localStorage.api_url_search,
                                                     data: '{"accessToken":"","docNo":"'+p+'","recNo":"'+r+'"}',
                                                     //{"accessToken":"","docNo":"'+localStorage.porefno+'","recNo":"'+localStorage.receiveNumber+'"}
                                                     contentType: "application/json; charset=utf-8",
                                                     dataType: "json",
                                                     type: "POST",
                                                     cache: false,
                                                     success: function(rc_detail1){
                                                     console.log(JSON.stringify(rc_detail1));
                                                     //console.log(rc_detail.resp.isSuccess);
                                                     if(rc_detail1.resp.isSuccess==1){
                                                     var rc_d1 = JSON.stringify(rc_detail1);
                                                     var rc_ds1 = rc_d1.split(":[");
                                                     var str1 = rc_ds1[1].split("]}");
                                                     rc_d1 = "["+str1[0]+"]";
                                                     var js1 = jQuery.parseJSON(rc_d1);
                                                    // alert(JSON.stringify(rc_detail.isSuccess));
                                                     //console.log(JSON.stringify(js1));
                                                                            //document.getElementById("PO").innerHTML = JSON.stringify(js);
                                                     var count1 = js1.length;
                                                     //alert(count)
                                                                                 var rc_de_head1 = "";                         //console.log(count);
                                                                                 var rc_de1 = "";
                                                                                 rc_de_head1 += "<h2 class='sub_title'>เลขที่ ใบรับเข้า :"+r+"</h2>";
                                                                                 rc_de_head1 += "<p> เลขที่ใบ PO :"+p+"</p>";
                                                                                 rc_de_head1 += "<p> วันที่ออกเอกสาร :"+rc_detail1.docDate+"</p>";
                                                                                 rc_de_head1 += "<p>รหัสเจ้าหนี้ :"+rc_detail1.apCode+"</p>";
                                                                                 rc_de_head1 += "<p>ชื่อเจ้าหนี้ :"+rc_detail1.apName+"</p>";
                                                                                 rc_de_head1 += "<p>ราคารวม :"+rc_detail1.sumOfItemAmount.toLocaleString()+" บาท</p>";
                                                                                 rc_de_head1 += "<p>ราคารวมภาษี :"+rc_detail1.totalAmount.toLocaleString()+" บาท</p>";
                                                                                 rc_de_head1 += "<p>ยกเลิก & คอนเฟิร์ม</p>";
                                                                                 if(rc_detail1.isDocCancel == "0"){
                                                                                 rc_de_head1 += "<p>สถานะใบรับสินค้า : ปกติ </p>";
                                                                                 }else if(rc_detail1.isDocCancel == "1"){
                                                                                 rc_de_head1 += "<p style='color:red;'>สถานะใบรับสินค้า : ถูกยกเลิก</p>";
                                                                                 }




                                                                                 rc_de1 += '<label><div class="ui-grid-d" style="text-align:center;  font-size:14px;">';
                                                                                 rc_de1 += '<div class="ui-block-a"><b>สินค้า</b></div>';
                                                                                 rc_de1 += '<div class="ui-block-b"><b>จำนวนค้างรับ</b></div>';
                                                                                 rc_de1 += '<div class="ui-block-c"><b>ราคา/หน่วย</b></div>';
                                                                                 rc_de1 += '<div class="ui-block-d"><b>จำนวนรับเข้า</b></div>';
                                                                                 rc_de1 += '<div class="ui-block-e"><b>สถานะ</b></div></div></label><hr>';
                                                                                 for(var i = 0;i<js1.length;i++){

                                                                                 rc_de1 += '<div class="ui-grid-d" style="text-align:center; font-size:12px;">';


                                                                                 rc_de1 += '<div class="ui-block-a">'+js1[i].itemName+'</div>';
                                                                                 rc_de1 += '<div class="ui-block-b"> '+js1[i].remainQty+' '+js1[i].unitCode+' </div>';
                                                                                 rc_de1 += '<div class="ui-block-c"> '+js1[i].price.toLocaleString()+' </div>';
                                                                                 rc_de1 += '<div class="ui-block-d"> '+js1[i].rcQty+' </div>';
                                                                                 //rc_de += '<div class="ui-block-d"> '+js[i].amount.toLocaleString()+' </div>';

                                                                                  if(js1[i].status==0){
                                                                                    rc_de1 += '<div class="ui-block-d"><img src="images/Warning.png" class="receive_status"></div>';
                                                                                  }else if(js1[i].status==1){
                                                                                    rc_de1 += '<div class="ui-block-d"><img src="images/tick.png" class="receive_status"></div>';
                                                                                  }else if(js1[i].status==2){
                                                                                    rc_de1 += '<div class="ui-block-d"><img src="images/minus.png" class="receive_status"></div>';
                                                                                  }else if(js1[i].status==3){
                                                                                    rc_de1 += '<div class="ui-block-d"><img src="images/plus.png" class="receive_status"></div>';
                                                                                  }else if(js1[i].status==4){
                                                                                    rc_de1 += '<div class="ui-block-d"><img src="images/private.png" class="receive_status"></div>';
                                                                                  }
                                                                                   rc_de1 += '</div><hr>';
                                                                                 //rc_de += '<div class="ui-block-d">'+js[i].amount.toLocaleString()+' บาท</div></div><hr>';
                                                                                            //rc_de +="</label>";
                                                                                                 }
                                                                                 //rc_de += '</table>';
                                                                                 document.getElementById("rv_head1").innerHTML = rc_de_head1;
                                                                                 document.getElementById("rv_detail1").innerHTML = rc_de1;
                                                                                 $.mobile.changePage("#receive_list_detail",{transition: 'slidefade'});
                                                                                 }else if(rc_detail1.resp.isSuccess==0){alertify.error("ไม่มีใบรับสินค้าที่ท่านเลือก");}
                                                                                 },
                                                                                 error: function (error){
                                                                                 alertify.error(error);
                                                                                }


                                                 });

}


function show_receive_detail_edit(r,p){

$.ajax({
                                                     url: localStorage.api_url_server+""+localStorage.api_url_search,
                                                     data: '{"accessToken":"","docNo":"'+p+'","recNo":"'+r+'"}',
                                                     //{"accessToken":"","docNo":"'+localStorage.porefno+'","recNo":"'+localStorage.receiveNumber+'"}
                                                     contentType: "application/json; charset=utf-8",
                                                     dataType: "json",
                                                     type: "POST",
                                                     cache: false,
                                                     success: function(rc_detail_e){
                                                     console.log(JSON.stringify(rc_detail_e));
                                                     //console.log(rc_detail.resp.isSuccess);
                                                     if(rc_detail_e.resp.isSuccess==1){
                                                     var rc_d_e = JSON.stringify(rc_detail_e);
                                                     var rc_ds_e = rc_d_e.split(":[");
                                                     var str_e = rc_ds_e[1].split("]}");
                                                     rc_d_e = "["+str_e[0]+"]";
                                                     var js_e = jQuery.parseJSON(rc_d_e);
                                                    // alert(JSON.stringify(rc_detail.isSuccess));
                                                     console.log(JSON.stringify(js_e));
                                                                            //document.getElementById("PO").innerHTML = JSON.stringify(js);
                                                     var count_e = js_e.length;
                                                     //alert(count)
                                                                                 var rc_de_head_e = "";                         //console.log(count);
                                                                                 var rc_de_e = "";
                                                                                 rc_de_head_e += "<h2 class='sub_title'>เลขที่ ใบรับเข้า :"+r+"</h2>";
                                                                                 rc_de_head_e += "<h2 class='sub_title'>เลขที่ PO :"+p+"</h2>";
                                                                                 rc_de_head_e += "<p> วันที่ออกเอกสาร :"+rc_detail_e.docDate+"</p>";
                                                                                 rc_de_head_e += "<p>รหัสเจ้าหนี้ :"+rc_detail_e.apCode+"</p>";
                                                                                 rc_de_head_e += "<p>ชื่อเจ้าหนี้ :"+rc_detail_e.apName+"</p>";
                                                                                 rc_de_head_e += "<p>ราคารวม :"+rc_detail_e.sumOfItemAmount.toLocaleString()+" บาท</p>";
                                                                                 rc_de_head_e += "<p>ราคารวมภาษี :"+rc_detail_e.totalAmount.toLocaleString()+" บาท</p>";
                                                                                 rc_de_e += '<p style="color:red; font-size:12px;text-align:center;">** สแกนสินค้าเพื่อรับสินค้า **</p>';
                                                                                 localStorage.re_no = r;
                                                                                 localStorage.po_no = p;





                                                                                 rc_de_e += '<label><div class="ui-grid-d" style="text-align:center;  font-size:14px;">';
                                                                                 rc_de_e += '<div class="ui-block-a"><b>สินค้า</b></div>';
                                                                                 rc_de_e += '<div class="ui-block-b"><b>จำนวนค้างรับ</b></div>';
                                                                                 rc_de_e += '<div class="ui-block-c"><b>ราคา/หน่วย</b></div>';
                                                                                 rc_de_e += '<div class="ui-block-d"><b>จำนวนรับเข้า</b></div>';
                                                                                 rc_de_e += '<div class="ui-block-e"><b>สถานะ</b></div></div></label><hr>';
                                                                                 for(var i = 0;i<js_e.length;i++){
                                                                                 if(js_e[i].isListCancel == "1"){
                                                                                 //console.log(js[i].code);
                                                                                 //data-row-id="4" id="4"
                                                                                 if(js_e[i].status=="0"){

                                                                                 rc_de_e += '<div class="ui-grid-d blur" style="text-align:center; font-size:12px; color:#ccc;">';
                                                                                 }else{
                                                                                 rc_de_e += '<div class="todo-uncancel_editview ui-grid-d blur" data-uncancel-id="'+js_e[i].barCode+'" data-uncancelrow-id="i'+js_e[i].itemCode+'" data_receive_no="'+r+'" data_po_no="'+p+'" data-unreceive="'+js_e[i].rcQty+'" id="i'+js_e[i].itemCode+'" style="text-align:center; font-size:12px;">';

                                                                                 //rc_de += '<div class="ui-grid-d blur" onclick="uncancel_item(';
                                                                                 //rc_de += "'"+js[i].barCode+"','"+js[i].rcQty+"')";
                                                                                 //rc_de += '"  style="text-align:center; font-size:12px;">';
                                                                                 }
                                                                                 }else{
                                                                                 if(js_e[i].status=="0"){
                                                                                 rc_de_e += '<div class="ui-grid-d" style="text-align:center; font-size:12px;">';
                                                                                 }else{

                                                                                 rc_de_e += '<div class="todo-cancel_editview ui-grid-d" data-cancel-id="'+js_e[i].barCode+'" data-cancelrow-id="i'+js_e[i].itemCode+'" data_receive_no="'+r+'" data_po_no="'+p+'" data-receive="'+js_e[i].rcQty+'" id="i'+js_e[i].itemCode+'" style="text-align:center; font-size:12px;">';

                                                                                 //rc_de += '<div class="ui-grid-d" onclick="cancel_item(';
                                                                                 //rc_de += "'"+js[i].barCode+"')";
                                                                                 //rc_de += '"  style="text-align:center; font-size:12px;">';
                                                                                 }

                                                                                 }
                                                                                 rc_de_e += '<div class="ui-block-a">'+js_e[i].itemName+'</div>';
                                                                                 rc_de_e += '<div class="ui-block-b"> '+js_e[i].remainQty+' '+js_e[i].unitCode+' </div>';
                                                                                 rc_de_e += '<div class="ui-block-c"> '+js_e[i].price.toLocaleString()+' </div>';
                                                                                 rc_de_e += '<div class="ui-block-d"> '+js_e[i].rcQty+' </div>';
                                                                                 //rc_de += '<div class="ui-block-d"> '+js[i].amount.toLocaleString()+' </div>';

                                                                                  if(js_e[i].status==0){
                                                                                    rc_de_e += '<div class="ui-block-d"><img src="images/Warning.png" class="receive_status"></div></div><hr>';
                                                                                  }else if(js_e[i].status==1){
                                                                                    rc_de_e += '<div class="ui-block-d"><img src="images/tick.png" class="receive_status"></div></div><hr>';
                                                                                  }else if(js_e[i].status==2){
                                                                                    rc_de_e += '<div class="ui-block-d"><img src="images/minus.png" class="receive_status"></div></div><hr>';
                                                                                  }else if(js_e[i].status==3){
                                                                                    rc_de_e += '<div class="ui-block-d"><img src="images/plus.png" class="receive_status"></div></div><hr>';
                                                                                  }else if(js_e[i].status==4){
                                                                                    rc_de_e += '<div class="ui-block-d"><img src="images/private.png" class="receive_status"></div></div><hr>';
                                                                                  }
                                                                                 //rc_de += '<div class="ui-block-d">'+js[i].amount.toLocaleString()+' บาท</div></div><hr>';
                                                                                            //rc_de +="</label>";
                                                                                                 }
                                                                                 //rc_de += '</table>';
                                                                                 document.getElementById("rv_head_edit").innerHTML = rc_de_head_e;
                                                                                 document.getElementById("rv_detail_edit").innerHTML = rc_de_e;
                                                                                 $.mobile.changePage("#receive_list_detail_edit",{transition: 'slidefade'});
                                                                                 }else if(rc_detail_e.resp.isSuccess==0){alertify.error("ไม่มีใบรับสินค้า !!");}
                                                                                 },
                                                                                 error: function (error){
                                                                                 alertify.error(error);
                                                                                }


                                                 });

}

function search_receive(){
var sear = document.getElementById("receive_search_item").value;

var se_search ="";

          $.ajax({
                url: localStorage.api_url_server+""+localStorage.api_url_serchitem,
                data: '{"accessToken":"","docNo":"","type":"0","barCode":"'+sear+'"}',
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                type: "POST",
                cache: false,
                success: function(search){
                console.log(JSON.stringify(search));
                if(search.resp.isSuccess== "0"){
                alertify.error("ไม่ถูกต้อง !!")
                }else{

                var search_d = JSON.stringify(search);
                var search_ds = search_d.split(":[");
                var search_str = search_ds[1].split("]}");
                search_d = "["+search_str[0]+"]";
                var search_js = jQuery.parseJSON(search_d);
                // alert(JSON.stringify(po_detail.isSuccess));
                console.log(JSON.stringify(search_js));
               //document.getElementById("PO").innerHTML = JSON.stringify(js);
               var count = search_js.length;
                   for(var i = 0;i<search_js.length;i++){

                   //se_search +="<a href='#' class='ui-btn ui-corner-all' onclick=''>"+search_js[i].itemName+""+search_js[i].itemName+"</a>";
                   se_search += '<a href="#" class="ui-btn ui-corner-all"   onclick="scan_search_item(';
                   se_search += "'"+search_js[i].barCode+"')";
                   se_search += '">'+search_js[i].itemName+''+search_js[i].itemName+'</a>';
                   //result_scanner +="<p>รหัสสินค้า : "+search_js[i].itemCode+"</p>";
                   //result_scanner +="<p>รหัสสินค้า : "+search_js[i].barCode+"</p>";
                   //result_scanner +="<p>รหัสสินค้า : "+search_js[i].itemName+"</p>";
                   //result_scanner +="<p>รหัสสินค้า : "+search_js[i].unitCode+"</p>";
                   //localStorage.searchCode_rv = search_js[i].searchCode;
                   //localStorage.barCode_rv = search_js[i].barCode;
                   //localStorage.searchName_rv = search_js[i].searchName;
                   //localStorage.unitCode_rv = search_js[i].unitCode;
                   //[{"itemCode":"8850025518361","barCode":"8850025518361","itemName":"ยูเอฟชี น้ำมะพร้าว","unitCode":"กระป๋อง","price":15,"qtyRC":0}]
                   }
               }
               document.getElementById("show_search_item").innerHTML = se_search;


               //$.mobile.changePage("#receive_search");
               },
               error: function (error){
               alertify.error(error);
               }
          });


//document.getElementById("show_search_item").innerHTML = se_item;
}

function cancel_item(delete_item,rcq){
//alert(delete_item)
var d = new Date();
var curr_date = d.getDate();
var curr_month = d.getMonth()+1;
var curr_year = d.getFullYear();
var date = curr_date + "/" + curr_month
+ "/" + curr_year;
if (confirm('ต้องการยกเลิกสินค้านี้หรือไม ?')) {
      $.ajax({
                        url: localStorage.api_url_server+""+localStorage.api_url_manageitem,
                        data: '{"accessToken":"","docNo":"'+localStorage.receiveNumber+'","docDate":"'+date+'","poRefNo":"'+localStorage.porefno+'","barCode":"'+delete_item+'","qty":"'+rcq+'","isCancel":"1","userID":"admin"}',
                               //{"accessToken":"","docNo":"testnava","docDate":"28/07/2016","poRefNo":"PO5806-0033","barCode":"1000040","qty":"10","userID":"admin"}
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        type: "POST",
                        cache: false,
                        success: function(additem_res){
                        console.log(additem_res);
                        alertify.error("ยกเลิกเรียบร้อยแล้ว !!");
                        document.getElementById("amount_scanner").value = "";
                        document.getElementById("product_show").innerHTML = "";
                        search_rc_no();
                        $.mobile.changePage("#receive_show");

                        },
                        error: function (error){
                        alert(error);
                        }
                        });
    }

}

function uncancel_item(undelete_item,rcq){
//alert(undelete_item)
//alert(rcq)
var d = new Date();
var curr_date = d.getDate();
var curr_month = d.getMonth()+1;
var curr_year = d.getFullYear();
var date = curr_date + "/" + curr_month
+ "/" + curr_year;
if (confirm('ต้องการคืนค่าสินค้านี้หรือไม ?')) {
      $.ajax({
                        url: localStorage.api_url_server+""+localStorage.api_url_manageitem,
                        data: '{"accessToken":"","docNo":"'+localStorage.receiveNumber+'","docDate":"'+date+'","poRefNo":"'+localStorage.porefno+'","barCode":"'+undelete_item+'","qty":"'+rcq+'","isCancel":"0","userID":"admin"}',
                               //{"accessToken":"","docNo":"testnava","docDate":"28/07/2016","poRefNo":"PO5806-0033","barCode":"1000040","qty":"10","userID":"admin"}
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        type: "POST",
                        cache: false,
                        success: function(additem_res){
                        console.log(additem_res);
                        alertify.success("คืนค่าเรียบร้อยแล้ว !!");
                        document.getElementById("amount_scanner").value = "";
                        document.getElementById("product_show").innerHTML = "";
                        search_rc_no();
                        $.mobile.changePage("#receive_show");

                        },
                        error: function (error){
                        alertify.error(error);
                        }
                        });
    }

}

function cancel_item_edit(delete_item,rcq,po_e,rv_e){
var d = new Date();
var curr_date = d.getDate();
var curr_month = d.getMonth()+1;
var curr_year = d.getFullYear();
var date = curr_date + "/" + curr_month
+ "/" + curr_year;
if (confirm('ต้องการยกเลิกสินค้านี้หรือไม ?')) {
      $.ajax({
                        url: localStorage.api_url_server+""+localStorage.api_url_manageitem,
                        data: '{"accessToken":"","docNo":"'+rv_e+'","docDate":"'+date+'","poRefNo":"'+po_e+'","barCode":"'+delete_item+'","qty":"'+rcq+'","isCancel":"1","userID":"'+localStorage.username+'"}',
                               //{"accessToken":"","docNo":"testnava","docDate":"28/07/2016","poRefNo":"PO5806-0033","barCode":"1000040","qty":"10","userID":"'+localStorage.username+'"}
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        type: "POST",
                        cache: false,
                        success: function(additem_res){
                        console.log(additem_res);
                        alertify.error("ยกเลิกเรียบร้อยแล้ว !!");
                        document.getElementById("amount_scanner").value = "";
                        document.getElementById("product_show").innerHTML = "";
                        show_receive_detail_edit(rv_e,po_e);
                        $.mobile.changePage("#receive_list_detail_edit");

                        },
                        error: function (error){
                        alert(error);
                        }
                        });
    }

}

function uncancel_item_edit(undelete_item,rcq,po_e,rv_e){
var d = new Date();
var curr_date = d.getDate();
var curr_month = d.getMonth()+1;
var curr_year = d.getFullYear();
var date = curr_date + "/" + curr_month
+ "/" + curr_year;
if (confirm('ต้องการคืนค่าสินค้านี้หรือไม ?')) {
      $.ajax({
                        url: localStorage.api_url_server+""+localStorage.api_url_manageitem,
                        data: '{"accessToken":"","docNo":"'+rv_e+'","docDate":"'+date+'","poRefNo":"'+po_e+'","barCode":"'+undelete_item+'","qty":"'+rcq+'","isCancel":"0","userID":"'+localStorage.username+'"}',
                               //{"accessToken":"","docNo":"testnava","docDate":"28/07/2016","poRefNo":"PO5806-0033","barCode":"1000040","qty":"10","userID":"'+localStorage.username+'"}
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        type: "POST",
                        cache: false,
                        success: function(additem_res){
                        console.log(additem_res);
                        alertify.success("คืนค่าเรียบร้อยแล้ว !!");
                        document.getElementById("amount_scanner").value = "";
                        document.getElementById("product_show").innerHTML = "";
                        show_receive_detail_edit(rv_e,po_e);
                        $.mobile.changePage("#receive_list_detail_edit");

                        },
                        error: function (error){
                        alertify.error(error);
                        }
                        });
    }

}



function delete_receive(delete_deceive_no,poref_no){
//alert(delete_deceive_no);
//alert(poref_no);
//alert(poref_no+",ใบรับเข้า = "+delete_deceive_no);

if (confirm('ต้องการลบใบรับเข้านี้หรือไม่ ?')) {
      $.ajax({
                        url: localStorage.api_url_server+""+localStorage.api_url_delete_receive,
                        data: '{"accessToken":"","docNo":"'+poref_no+'","recNo":"'+delete_deceive_no+'"}',
                               //{"accessToken":"","docNo":"testnava","docDate":"28/07/2016","poRefNo":"PO5806-0033","barCode":"1000040","qty":"10","userID":"'+localStorage.username+'"}
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        type: "POST",
                        cache: false,
                        success: function(delete_receive){
                        console.log(delete_receive);
                        alertify.success("ลบข้อมูลเรียบร้อยแล้ว !!");
                        show_receive();
                        $.mobile.changePage("#receive_list");

                        },
                        error: function (error){
                        alertify.error(error);
                        }
                        });
    }
}


    function check_submit(){
    if(localStorage.receivestatus == "1"){
    alertify.alert("ยังไม่ได้บันทึกใบรับเข้า กรุณาบันทึกก่อน");
    return false;
    }else{$.mobile.changePage("#receive");}
    }

//================================================== cancel receive =================================================================

$(document).on('taphold', '.todo-uncancelview', function() {
       // console.log("DEBUG - Go popup");
      var link_name = $(this).attr('data-uncancel-id');
      var link_id = $(this).attr('data-uncancelrow-id');
      var rcqtys = $(this).attr('data-unreceive');
      var $popUp = $("<div/>").popup({
        dismissible: true,

        //theme: "a",
        transition: "pop",
        arrow: "b",
        positionTo: '#'+link_id
        }).on("popupafterclose", function () {
    //remove the popup when closing
    $(this).remove();
    }).css({
   'padding': '15%',
   'color': '#fff',
   'background': 'green'
   });
    console.log(link_name);
    console.log('#'+link_id);
    $("<a>", {
    text: "Return",
    href: "#",
    onclick: "uncancel_item("+link_name+","+rcqtys+");"
    }).appendTo($popUp);

    $popUp.popup('open').enhanceWithin();

    });

$(document).on('taphold', '.todo-cancelview', function() {
       // console.log("DEBUG - Go popup");
      var link_name = $(this).attr('data-cancel-id');
      var link_id = $(this).attr('data-cancelrow-id');
      var rcqtys = $(this).attr('data-receive');
      var $popUp = $("<div/>").popup({
        dismissible: true,

        //theme: "a",
        transition: "pop",
        arrow: "b",
        positionTo: '#'+link_id
        }).on("popupafterclose", function () {
    //remove the popup when closing
    $(this).remove();
    }).css({
   'padding': '15%',
   'color': '#fff',
   'background': 'red'
   });
    console.log(link_name);
    console.log('#'+link_id);
    $("<a>", {
    text: "Hold",
    href: "#",
    onclick: "cancel_item("+link_name+","+rcqtys+");"
    }).appendTo($popUp);

    $popUp.popup('open').enhanceWithin();

    });


//================================================== cancel edit receive =================================================================
$(document).on('taphold', '.todo-uncancel_editview', function() {
       // console.log("DEBUG - Go popup");
      var link_name = $(this).attr('data-uncancel-id');
      var link_id = $(this).attr('data-uncancelrow-id');
      var rcqtys = $(this).attr('data-unreceive');
      var po = $(this).attr('data_po_no');
      var rv = $(this).attr('data_receive_no');
      var $popUp = $("<div/>").popup({
        dismissible: true,

        //theme: "a",
        transition: "pop",
        arrow: "b",
        positionTo: '#'+link_id
        }).on("popupafterclose", function () {
    //remove the popup when closing
    $(this).remove();
    }).css({
   'padding': '15%',
   'color': '#fff',
   'background': 'green'
   });
    console.log(link_name);
    console.log('#'+link_id);
    $("<a>", {
    text: "Return",
    href: "#",
    onclick: "uncancel_item_edit("+link_name+","+rcqtys+",'"+po+"','"+rv+"');"
    }).appendTo($popUp);

    $popUp.popup('open').enhanceWithin();

    });

$(document).on('taphold', '.todo-cancel_editview', function() {
       // console.log("DEBUG - Go popup");
      var link_name = $(this).attr('data-cancel-id');
      var link_id = $(this).attr('data-cancelrow-id');
      var rcqtys = $(this).attr('data-receive');
      var po = $(this).attr('data_po_no');
      var rv = $(this).attr('data_receive_no');

      var $popUp = $("<div/>").popup({
        dismissible: true,

        //theme: "a",
        transition: "pop",
        arrow: "b",
        positionTo: '#'+link_id
        }).on("popupafterclose", function () {
    //remove the popup when closing
    $(this).remove();
    }).css({
   'padding': '15%',
   'color': '#fff',
   'background': 'red'
   });
    console.log(link_name);
    console.log('#'+link_id);
    $("<a>", {
    text: "Hold",
    href: "#",
    onclick: "cancel_item_edit("+link_name+","+rcqtys+",'"+po+"','"+rv+"');"
    }).appendTo($popUp);

    $popUp.popup('open').enhanceWithin();

    });

//========================================================= delete list rv =================================================================
$(document).on('taphold', '.todo-deleteview', function() {
       // console.log("DEBUG - Go popup");
      var link_name = $(this).attr('data-delete-id');
      var link_id = $(this).attr('data-deleterow-id');
      var poRefNo = $(this).attr('data-delete-poRefNo');
      var $popUp = $("<div/>").popup({
        dismissible: true,

        //theme: "a",
        transition: "pop",
        arrow: "b",
        positionTo: '#'+link_id
        }).on("popupafterclose", function () {
    //remove the popup when closing
    $(this).remove();
    }).css({
   'padding': '15%',
   'color': '#fff',
   'background': 'red'
   });
    console.log(link_name);
    console.log('#'+link_id);
    $("<a>", {
    text: "Cancel",
    href: "#",
    onclick: 'delete_receive('+"'"+link_name+"'"+','+"'"+poRefNo+"'"+');'
    }).appendTo($popUp);

    $popUp.popup('open').enhanceWithin();

    });