window.addEventListener('native.onscanbarcode', function (ci) {
       var page = "";
       //alert(ci.scanResult);
       console.log("count : "+ci.scanResult);

       if(page == ""){
         page = $.mobile.activePage.attr('id');
       }
       $(document).on("pageshow", function (c, data) {
          page = $(this)[0].activeElement.id;
       });
       console.log("count : " + page);
       localStorage.barcode = ci.scanResult;
switch(page){

             case "stock"   : searchWHis(localStorage.barcode);
                            break;
             case "shelves" : searchSHis(localStorage.barcode);
                    	    break;
             case "countitem" : searchItem(localStorage.barcode);
                            break;
           	}
});

function searchWHis(result){
    $.ajax({
           url: localStorage.api_url_server+""+localStorage.api_url_searchwh_is,
           data: '{"accessToken":"","search":"'+result+'"}',
           contentType: "application/json; charset=utf-8",
           dataType: "json",
           type: "POST",
           cache: false,
           success: function(result){
                  console.log(JSON.stringify(result.warehouseList));
                  if(JSON.stringify(result.warehouseList)==="[]"){
                       alertify.alert("ไม่มีข้อมูลคลังสินค้า");
                  }else{
                       var whName = "";
                       var whLocal = "";
                       $.each(result.warehouseList, function(key, val) {
                       if(val['whName']!=null&&val['localtion']){
                            whName = val['whName'].trim();
                            whLocal = val['location'].trim();
                       }else{
                            whName = val['whName'];
                            whLocal = val['location'];
                       }

                       });

                      $.ajax({
                             url: localStorage.api_url_server+""+localStorage.api_url_gendocno,
                             data: '{"type":"3","search":"'+localStorage.username+'"}',
                             contentType: "application/json; charset=utf-8",
                             dataType: "json",
                             type: "POST",
                             cache: false,
                             success: function(Is){
                                   console.log(Is.docno);
                                   document.getElementById("valdocIS").value = Is.docno;
                                   document.getElementById("docIS").innerHTML = Is.docno;
                                   isList();
                             },
                             error: function (error) {
                                 alertify.error("can't call api");
                             }

                      });

                      document.getElementById("wh").innerHTML = "คลัง : "+whName+"  "+whLocal;
                      document.getElementById("whvalue").value = whName;
                      isList();
                      $.mobile.changePage("#countstock");
                  }
           },
           error: function (error) {
              alertify.error("can't call api");
           }

    });

}
function searchSHis(shelfCode){
    var stockWH = document.getElementById("whvalue").value;
    $.ajax({
        url: localStorage.api_url_server+""+localStorage.api_url_searchshelf_is,
        data: '{"accessToken":"38850025531385","searchWH":"'+stockWH+'","searchShelf":"'+shelfCode+'"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        type: "POST",
        cache: false,
        success: function(result){
            console.log(JSON.stringify(result.shelfList));
            if(JSON.stringify(result.shelfList)=="[]"){
                 alertify.alert("ไม่มีข้อมูลชั้นเก็บสินค้า");
            }else{
                 var shelName = "";
                 $.each(result.shelfList, function(key, val) {
                       shelName = val['shelfName'].trim();
                 });

                 document.getElementById("shel").value = shelName;
                 document.getElementById("CTshelves").innerHTML = shelName;
                 document.getElementById("CTitemno").innerHTML = "** SCANBARCODE ITEM **";
                 document.getElementById("CTitemname").innerHTML = "";
                 document.getElementById("CTunit").innerHTML = "";
                 document.getElementById("itemNo").value = "";
                 document.getElementById("itemsName").value = "";
                 document.getElementById("Cunit").value = "";
                 document.getElementById("counts").value = "";
                 $("#count1").show();
                 $("#count2").hide();
                 $.mobile.changePage("#countitem");
            }
        },
        error: function (error) {
            alertify.error("can't call api");
        }

    });
}

function searchItem(itemCode){
    var DocNo = document.getElementById("valdocIS").value;
    var shel = document.getElementById("shel").value;
    $.ajax({
           url: localStorage.api_url_server+""+localStorage.api_url_search_item_pr,
           data: '{"barcode":"'+itemCode+'","docno":"'+DocNo+'","type":"3","shelfcode":"'+shel+'"}',
           contentType: "application/json; charset=utf-8",
           dataType: "json",
           type: "POST",
           cache: false,
           success: function(result){
                 console.log(JSON.stringify(result.listBarcode));
                 var itemcode = "";
                 var itemName = "";
                 var range = "";
                 var cntitem = "";
                 var units = "";

                 if(result.listBarcode==null){
                     console.log("data listbarcode : null");
                     $.each(result.listISBarcode, function(key, val) {
                         itemcode = val['itemcode'];
                         itemName = val['itemname'];
                         range = val['range'];
                         if(val['qty']==0){
                           cntitem = "";
                         }else{
                           cntitem = val['qty'];
                         }
                         units = val['unitcode'];
                         apcode = val['apCode'];
                         apname = val['apName'];
                     });
                 }else{
                     $.each(result.listBarcode, function(key, val) {
                     itemcode = val['itemcode'];
                     itemName = val['itemname'];
                     range = val['range'];
                     if(val['qty']==0){
                        cntitem = "";
                     }else{
                        cntitem = val['qty'];
                     }
                        units = val['unitcode'];
                        apcode = val['apCode'];
                        apname = val['apName'];
                     });
                 }
                 $("#count1").hide();
                 $("#count2").show();
                 document.getElementById("CTitemno").innerHTML = itemcode;
                 document.getElementById("CTitemname").innerHTML = itemName;
                 document.getElementById("CTunit").innerHTML = units;

                 document.getElementById("itemNo").value = itemcode;
                 document.getElementById("itemsName").value = itemName;
                 document.getElementById("Cunit").value = units;
                 document.getElementById("counts").value = cntitem;

                 $('#counts').focus();

                 $.mobile.changePage("#countitem");
           },
           error: function (error) {
                 alertify.error("can't call api");
                 $.mobile.changePage("#countitem");
           }

    });
}

function backstock(){
    isList();
    $.mobile.changePage("#countstock");
    //window.location="#stock";
}

function savestock(){
    var DocNo = document.getElementById("valdocIS").value;
    var sv = document.getElementById("shel").value;
    var noitem = document.getElementById("itemNo").value;
    var wh = document.getElementById("whvalue").value;
    var citem = document.getElementById("counts").value;
    var uitem = document.getElementById("Cunit").value;
    var userID = localStorage.username;
    if(citem == ""||noitem == ""){
    alert("กรุณากรอกข้อมูลให้ครบด้วย !!");
    }else{
    console.log('result:[{"docNo":"'+DocNo+'","user":"'+userID+'","itemCode":"'+noitem+'","unitcode":"'+uitem+'","whCode":"'+wh+'","shelfCode":"'+sv+'","qty":"'+citem+'"}]');

         $.ajax({
                 url: localStorage.api_url_server+"NPInventoryWs/V1/is/insertIS",
                 data: '{"docNo":"'+DocNo+'","user":"'+userID+'","itemCode":"'+noitem+'","unitcode":"'+uitem+'","whCode":"'+wh+'","shelfCode":"'+sv+'","qty":"'+citem+'"}',
                 contentType: "application/json; charset=utf-8",
                 dataType: "json",
                 type: "POST",
                 cache: false,
                 success: function(result){
                    console.log(JSON.stringify(result));
                    document.getElementById("CTitemno").innerHTML = "** SCANBARCODE ITEM **";
                    document.getElementById("CTitemname").innerHTML = "";
                    document.getElementById("CTunit").innerHTML = "";
                    document.getElementById("itemNo").value = "";
                    document.getElementById("itemsName").value = "";
                    document.getElementById("Cunit").value = "";
                    document.getElementById("counts").value = "";

                    $("#count1").show();
                    $("#count2").hide();
                    $("#scanitemcode").show();
                    alertify.success("บันทีกข้อมูลเรียบร้อยแล้ว!");
                    $.mobile.changePage("#countitem");
                 },
                 error: function (error) {
                    alertify.error("can't call api");
                    $.mobile.changePage("#countitem");
                 }
            });
    }

}

function savedata(){
    var DocNo = document.getElementById("valdocIS").value;
    var UserID = localStorage.username;
    console.log('Update IS :{"DocNo":"'+DocNo+'","userID":"'+UserID+'","isCancel":"0"}');
    $.ajax({
        url: localStorage.api_url_server+""+localStorage.api_url_confirm_is,
        data: '{"docNo":"'+DocNo+'","user":"'+UserID+'","isCancel":"0"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        type: "POST",
        cache: false,
        success: function(result){
            console.log(JSON.stringify(result));
            $.mobile.changePage("#stock",{transition: 'slidefade'});
            document.getElementById("valdocIS").value = "";
            document.getElementById("shel").value = "";
            document.getElementById("itemNo").value = "";
            document.getElementById("whvalue").value = "";
            document.getElementById("counts").value = "";
            document.getElementById("Cunit").value = "";
            alertify.success("บันทึกใบนับที่ "+DocNo+" แล้ว");
        },
        error: function(err){
            alertify.alert("Update IS ERROR!!");
            $.mobile.changePage("#countitem",{transition: 'slidefade'});
        }
    });
    $.mobile.changePage("#stock",{transition: 'slidefade'});
        d
}

function isList(){
    console.log("list is detail");
    var DocNo = document.getElementById("valdocIS").value;
    $.ajax({
            url: "http://s01xp.dyndns.org:8080/NPInventoryWs/V1/is/isList",
            data: '{"accessToken":"","docNo":"'+DocNo+'"}',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            type: "POST",
            cache: false,
            success: function(result){
                console.log(JSON.stringify(result.listData));
                var detail = "";

                if(JSON.stringify(result.listData)!="[]"){
                    $.each(result.listData, function(key,val){
                                    itemno = val['itemCode'];

                                    if(itemno==null){
                                         sitemno=itemno;
                                    }else{
                                         sitemno = Math.ceil(itemno.length/6);
                                         console.log(sitemno);
                                    }
                                    var s = 0;
                                    var str1 = "";
                                    if(sitemno!=null){
                                      for(var i = 0;i<sitemno;i++){
                                           str1 += itemno.substr(s,6)+"<br>";
                                           s += 6;
                                      }
                                    }else{
                                      str1=sitemno;
                                    }
                                        detail += '<label style="text-align:center; border-bottom:1px gray dashed;">';
                                             detail += '<div class="ui-grid-d">';
                                              detail += '<div class="ui-block-a">';
                                                     detail += str1;
                                              detail += '</div>';
                                              detail += '<div class="ui-block-b">';
                                                     detail += val['itemName'];
                                              detail += '</div>';
                                              detail += '<div class="ui-block-c">';
                                                     detail += val['shelfCode'];
                                              detail += '</div>';
                                              detail += '<div class="ui-block-d">';
                                                     detail += val['diffQty']+"  "+val['unitCode'];
                                              detail += '</div>';
                                              detail += '<div class="ui-block-e">';

                                                if(val['diffQty']!="0"){
                                                    detail += '<img src="images/Alert.png" width="24">';
                                                }else if(val['diffQty']=="0"){
                                                    detail += '<img src="images/check.png" width="24">';
                                                }

                                              detail += '</div>';
                                             detail += '</div>';
                                        detail += '</label>';
                                    });
                }else{
                    detail = `<label style="border-bottom:1px dashed black; padding:2%; color:red; text-align:center">
                                          <h5>** ยังไม่มีข้อมูลสินค้าที่นับในใบนับนี้ **</h5>
                              </label>`;
                }

                document.getElementById("csdetail").innerHTML = detail;
               // $.mobile.changePage("#countitem",{transition: 'slidefade'});
            },
            error: function(err){
                alertify.alert("Update IS ERROR!!");
                $.mobile.changePage("#countitem",{transition: 'slidefade'});
            }
        });
}