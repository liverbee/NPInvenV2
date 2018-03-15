function select_op_vender(xx){
	/*$.ajax({
                                                     url: "http://192.168.0.166:8082/NPInventoryWs/po/podetails",
                                                     data: '{"accessToken":"","search":"'+xx+'"}',
                                                     contentType: "application/json; charset=utf-8",
                                                     dataType: "json",
                                                     type: "POST",
                                                     cache: false,
                                                     success: function(po_detail){
                                                     //console.log(JSON.stringify(po_detail));
                                                     var po_d = JSON.stringify(po_detail);
                                                     var po_ds = po_d.split(":[");
                                                     var str = po_ds[1].split("]}");
                                                     po_d = "["+str[0]+"]";
                                                     var js = jQuery.parseJSON(po_d);
                                                     console.log(JSON.stringify(js));
                                                                            //document.getElementById("PO").innerHTML = JSON.stringify(js);
                                                     var count = js.length;
                                                                                 var po_de_head = "";                         //console.log(count);
                                                                                 var po_de = "";

                                                                                 po_de_head += "<h2 class='sub_title'>เลขที่ PO :"+po_detail.docNo+"</h2>";
                                                                                 po_de_head += "<p> วันที่ออกเอกสาร :"+po_detail.docDate+"</p>";
                                                                                 po_de_head += "<p>รหัสเจ้าหนี้ :"+po_detail.apCode+"</p>";
                                                                                 po_de_head += "<p>ชื่อเจ้าหนี้ :"+po_detail.apName+"</p>";
                                                                                 po_de_head += "<p>ราคารวม :"+po_detail.sumOfItemAmount.toLocaleString()+" บาท</p>";
                                                                                 po_de_head += "<p>ราคารวมภาษี :"+po_detail.totalAmount.toLocaleString()+" บาท</p>";



                                                                                 po_de += '<label><div class="ui-grid-c" style="text-align:center;  font-size:14px;">';
                                                                                 po_de += '<div class="ui-block-a"><b>สินค้า</b></div>';
                                                                                 po_de += '<div class="ui-block-b"><b>จำนวน</b></div>';
                                                                                 po_de += '<div class="ui-block-c"><b>ราคา/หน่วย</b></div>';
                                                                                 po_de += '<div class="ui-block-d"><b>รวม</b></div></div></label><hr>';
                                                                                 for(var i = 0;i<js.length;i++){
                                                                                 //console.log(js[i].code);
                                                                                 po_de += '<div class="ui-grid-c" style="text-align:center; font-size:12px;">'
                                                                                 po_de += '<div class="ui-block-a">'+js[i].itemName+'</div>';
                                                                                 po_de += '<div class="ui-block-b">'+js[i].qty+' '+js[i].unitCode+'</div>';
                                                                                 po_de += '<div class="ui-block-c">'+js[i].price.toLocaleString()+' บาท</div>';
                                                                                 po_de += '<div class="ui-block-d">'+js[i].amount.toLocaleString()+' บาท</div></div><hr>';

                                                                                                 }
                                                                                 po_de += '</table>';
                                                                                 document.getElementById("po_head").innerHTML = po_de_head;
                                                                                 document.getElementById("po_detail").innerHTML = po_de;
                                                                                 $.mobile.changePage("#receive_item");
                                                                                 },
                                                                                 error: function (error){
                                                                                 alert(error);
                                                                                }


                                                 });*/
}