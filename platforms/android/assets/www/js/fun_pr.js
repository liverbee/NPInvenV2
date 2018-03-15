localStorage.apcode = "";
localStorage.apname = "";

window.addEventListener('native.onscanbarcode', function (pr) {
       var page = "";
       //alert(pr.scanResult);
       console.log(pr.scanResult);


       if(page == ""){
         page = $.mobile.activePage.attr('id');
       }
       $(document).on("pageshow", function (e, data) {
          page = $(this)[0].activeElement.id;
       });

       console.log(page);
       localStorage.barcode = pr.scanResult;

       switch(page){
            case "pageone" : rslogin(localStorage.barcode);
                            break;
            case "pagelogin" : rslogin(localStorage.barcode);
                                        break;
            case "pluspr" : additems(localStorage.barcode);
                             break;

            case "additem" : additems(localStorage.barcode);
                             break;
       }
});

function additems(barcode){
                            console.log("function additems "+barcode);
                             console.log(document.getElementById("DocNo").value);
                             var DocNo = document.getElementById("DocNo").value;
                                $.ajax({
                                           url: localStorage.api_url_server+""+localStorage.api_url_search_item_pr,
                                           data: '{"barcode":"'+barcode+'","docno":"'+DocNo+'","type":"1"}',
                                           contentType: "application/json; charset=utf-8",
                                           dataType: "json",
                                           type: "POST",
                                           cache: false,
                                           success: function(result){
                                            console.log(JSON.stringify(result));
                                                var itemcode = "";
                                                var itemName = "";
                                                var rank = "";
                                                var cntitem = "";
                                                var units = "";
                                                var apcode = "";
                                                var apname = "";
                                                if(result.listBarcode==null){
                                                    console.log("data listbarcode : null");

                                                    $.each(result.listPRBarcode, function(key, val) {
                                                           itemcode = val['itemcode'];
                                                           itemName = val['itemname'];
                                                           rank = val['range'];
                                                           cntitem = val['qty'];
                                                           units = val['unitcode'];
                                                           apcode = val['apCode'];
                                                           apname = val['apName'];

                                                    });

                                                }else{
                                                    $.each(result.listBarcode, function(key, val) {
                                                        itemcode = val['itemcode'];
                                                        itemName = val['itemname'];
                                                        rank = val['range'];
                                                        cntitem = val['qty'];
                                                        units = val['unitcode'];
                                                        apcode = val['apCode'];
                                                        apname = val['apName'];
                                                    });
                                                }
                                                if(localStorage.apcode == ""){
                                                    if(apcode==0){
                                                        var ven = "กรุณาเลือกข้อมูลเจ้าหนี้";
                                                        document.getElementById("vender").value = localStorage.apcode;
                                                        document.getElementById("vender").placeholder = ven;
                                                        document.getElementById("apCodevendor").innerHTML = '<a href="#vendor" data-rel="popup" class="ui-btn ui-icon-search ui-btn-icon-right">'+ven+'</a>';
                                                        document.getElementById("apCodeven").value = localStorage.apcode;
                                                    }else{
                                                        var ven = apcode;
                                                        var venname = apname;
                                                        localStorage.apcode = ven;
                                                        localStorage.apname = venname;
                                                        document.getElementById("apCodevendor").innerHTML = '<a href="#vendor" data-rel="popup" class="ui-btn ui-icon-search ui-btn-icon-right">'+localStorage.apcode+'<br>'+localStorage.apname+'</a>';
                                                        document.getElementById("apCodeven").value = localStorage.apcode;

                                                    }

                                                }else{
                                                    document.getElementById("vender").value = localStorage.apcode;

                                                }
                                                console.log(localStorage.apcode);
                                                $("#additem").bind('pageshow', function() {
                                                    $('#citem').focus();
                                                });
                                                document.getElementById("DocNo").value = DocNo;
                                                document.getElementById("noitems").value = itemcode;
                                                document.getElementById("nameitems").value = itemName;
                                                document.getElementById("gradeitem").value = rank;
                                                document.getElementById("units").value = units;
                                                if(cntitem==0){
                                                    document.getElementById("citem").value = "";
                                                }else{
                                                    document.getElementById("citem").value = cntitem;
                                                }

                                                document.getElementById("Tnoitem").innerHTML = itemcode;
                                                document.getElementById("TNameitem").innerHTML = itemName;
                                                document.getElementById("Tgrade").innerHTML = rank;
                                                document.getElementById("Tunit").innerHTML = units;
                                           },
                                           error: function (error) {
                                           alertify.error("can't call api");
                                           $.mobile.changePage("#pluspr");
                                           }

                                        });




                                 $("#itemdetail").show();
                                 $("#scanbaritem").hide();
                                 $.mobile.changePage("#additem");

                                  return false;



}

function rslogin(result){

                                        var networkState = navigator.connection.type;
                                        var states = {};
                                        states[Connection.UNKNOWN] = 'Unknown connection';
                                        states[Connection.ETHERNET] = 'Ethernet connection';
                                        states[Connection.WIFI] = 'WiFi connection ready!!';
                                        states[Connection.CELL_2G] = 'Cell 2G connection ready!!';
                                        states[Connection.CELL_3G] = 'Cell 3G connection ready!!';
                                        states[Connection.CELL_4G] = 'Cell 4G connection ready!!';
                                        states[Connection.CELL] = 'Cell generic connection ready!!';
                                        states[Connection.NONE] = 'No network connection';

                                        if(states[networkState]== states[Connection.NONE]){
                                            alertify.confirm("การเชื่อมต่อล้มเหลวเนื่องจากข้องผิดพลาดทางซิร์ฟเวอร์ กรุณาตรวจสัญญาณอินเทอร์เน็ตของท่าน", function (e) {
                                                if (e) {
                                                    navigator.app.exitApp();
                                                } else {
                                                    $.mobile.changePage("#pageone");
                                                }
                                            });
                                        }else if(states[networkState]== states[Connection.UNKNOWN]){
                                            alertify.confirm("การเชื่อมต่อล้มเหลวเนื่องจากข้องผิดพลาดทางซิร์ฟเวอร์ กรุณาตรวจสัญญาณอินเทอร์เน็ตของท่าน", function (e) {
                                                if (e) {
                                                    navigator.app.exitApp();
                                                } else {
                                                    $.mobile.changePage("#pageone");
                                                }
                                            });
                                        }else{
                                            localStorage.username = result;
                                            document.getElementById("show_user").innerHTML = "<h3>"+localStorage.username+"</h3>";
                                            pass_s_focus();
                                            $.mobile.changePage("#pagelogin");

                                        }
}

function prlist(){
            var $popUp = $("<div>").popup({
              dismissible: false,
              theme: "b",
              positionto: "window",
              transition: "flip",
              }).css({
                'background': '#F8F8FF',
                '-webkit-box-shadow':  '0px 0px 0px 9999px rgba(0, 0, 0, 0.5)',
                'box-shadow':  '0px 0px 0px 9999px rgba(0, 0, 0, 0.5)',
                'width' : 100
              });;
              $("<img>", {
              src: "images/loading.gif"
              }).appendTo($popUp);
              $popUp.popup('open');

            $.ajax({
                   url: localStorage.api_url_server+localStorage.api_url_prlist,
                   data: '{"type":"1","search":"'+localStorage.username+'"}',
                   contentType: "application/json; charset=utf-8",
                   dataType: "json",
                   type: "POST",
                   cache: false,
                   success: function(result){
                   console.log(JSON.stringify(result.listData));
                   if(JSON.stringify(result.listData)!="[]"){
                        var prl = JSON.stringify(result);
                        console.log(prl);
                        var prlist = "";
                        var wdate = "";
                        var x = 1;
                        $.each(result.listData, function(key, val) {
                           //console.log(val['docNo']);
                           var wantDate = val['wantDate'];
                            if(wantDate==null){
                                $.ajax({
                                       url: localStorage.api_url_server+""+localStorage.api_url_cancelPr,
                                       data: '{"accessToken": "","docNo": "'+val['docNo']+'","userID": "'+localStorage.username+'","isCancel": "1"}',
                                       contentType: "application/json; charset=utf-8",
                                       dataType: "json",
                                       type: "POST",
                                       cache: false,
                                       success: function(isCancel){
                                       console.log(isCancel);
                                       },
                                       error: function (error){
                                       console.log(error);
                                       }
                                   });
                           }else{
                           prlist += '<label class="todo-listview" data-view-id="';
                           prlist += "'"+val['docNo']+"'";
                           prlist += '" data-row-id="'+x+'" id="'+x+'"><a href="#" onclick="prdetail(';
                           prlist += "'"+val['docNo']+"'";
                           prlist += ')" ><div class="ui-grid-c" style="text-align:center; font-size:14px;">';
                           prlist += '<div class="ui-block-a" data-view-id="1">'+val['docNo']+'</div>';

                           if(wantDate!=null){
                           wdate = val['wantDate'].split("-");
                           day = wdate[2];
                           month = wdate[1];
                           year = (parseInt(wdate[0])+543);

                           wantDate = day+"/"+month+"/"+year;
                           }

                           prlist += '<div class="ui-block-b">'+wantDate+'</div>';
                           prlist += '<div class="ui-block-c">'+val['diffDate']+' วัน</div>';
                               switch (val['status']){
                                    case 1 : var status = "<img src='images/Warning.png' width='24'>";
                                            break;
                                    case 2 : var status = "<img src='images/quick.png' width='24'>";
                                            break;
                                    default: var status = "";
                                            break;
                               }
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
                                    var n = yyyy+'-'+mm+'-'+dd;
                                   //console.log(n);
                                   switch (val['docDate']){
                                        case n :
                                               status += "<img src='images/New.png' width='24'>";
                                               break;
                                   }

                           prlist += '<div class="ui-block-d">'+status+'</div>';
                           prlist += '</div></label></a><hr>';
                            x++;
                           }
                        });
                        document.getElementById("prlist").innerHTML = prlist;
                        $.mobile.changePage("#pagepr",{transition: 'slidefade'});
                        $popUp.popup('close');
                     }else{
                        alertify.alert("ไม่มีข้อมูลใบ PR ค้าง สำหรับผู้ใช้งานนี้ !!");
                        document.getElementById("prlist").innerHTML = "";
                        $.mobile.changePage("#pagepr",{transition: 'slidefade'});
                        $popUp.popup('close');
                     }
                   },
                   error: function (error){
                        console.log(JSON.stringify(error));
                        alertify.error("api qserver can't connect!!");
                        $popUp.popup('close');
                   }

                   });
}
//window.setInterval(prlist, 1000);

$(document).on('taphold', '.todo-listview', function() {
       // console.log("DEBUG - Go popup");
      var link_name = $(this).attr('data-view-id');
      var link_id = $(this).attr('data-row-id');
      var $popUp = $("<div/>").popup({
        dismissible: false,

        //theme: "a",
        transition: "pop",
        arrow: "b",
        positionTo: '#'+link_id
        }).on("popupafterclose", function () {
    //remove the popup when closing
            $(this).remove();
        }).css({
           'padding': '10%',
           'color': '#fff',
           'background': 'red'
        });
    console.log('#'+link_id);
    $("<a>", {
    text: "Cancel",
    href: "#",
    onclick: "cancelPR("+link_name+");"
    }).appendTo($popUp);

    $popUp.popup('open').enhanceWithin();

    });
function cancelPR(Docno){

            var $popUp = $("<div>").popup({
              dismissible: false,
              theme: "b",
              positionto: "window",
              transition: "flip",
              }).css({
                'background': '#F8F8FF',
                '-webkit-box-shadow':  '0px 0px 0px 9999px rgba(0, 0, 0, 0.5)',
                'box-shadow':  '0px 0px 0px 9999px rgba(0, 0, 0, 0.5)',
                'width' : 100
              });;
              $("<img>", {
              src: "images/loading.gif"
              }).appendTo($popUp);
              $popUp.popup('open');
$.ajax({
    url: localStorage.api_url_server+""+localStorage.api_url_cancelPr,
    data: '{"accessToken": "","docNo": "'+Docno+'","userID": "'+localStorage.username+'","isCancel": "1"}',
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    type: "POST",
    cache: false,
    success: function(isCancel){
    console.log(isCancel);
    $.ajax({
           url: localStorage.api_url_server+localStorage.api_url_prlist,
           data: '{"type":"1","search":"'+localStorage.username+'"}',
           contentType: "application/json; charset=utf-8",
           dataType: "json",
           type: "POST",
           cache: false,
           success: function(result){
               //console.log(JSON.stringify(result));
               var prl = JSON.stringify(result);
               //console.log(prl);
               var prlp = prl.split(":[");
               var str = prlp[1].split("]}");
               prl = "["+str[0]+"]";
               var js = jQuery.parseJSON(prl);
               var prlist = "";
               var wdate = "";
               var x = 1;
                  $.each(js, function(key, val) {
                  //console.log(val['docNo']);

                  prlist += '<label class="todo-listview" data-view-id="';
                  prlist += "'"+val['docNo']+"'";
                  prlist += '" data-row-id="'+x+'" id="'+x+'"><a href="#" onclick="prdetail(';
                  prlist += "'"+val['docNo']+"'";
                  prlist += ')" ><div class="ui-grid-c" style="text-align:center; font-size:14px;">';
                  prlist += '<div class="ui-block-a" data-view-id="1">'+val['docNo']+'</div>';

                  var wantDate = val['wantDate'];
                  if(wantDate!=null){
                  wdate = val['wantDate'].split("-");
                  day = wdate[2];
                  month = wdate[1];
                  year = (parseInt(wdate[0])+543);

                  wantDate = day+"/"+month+"/"+year;
                  }

                  prlist += '<div class="ui-block-b">'+wantDate+'</div>';
                  prlist += '<div class="ui-block-c">'+val['diffDate']+' วัน</div>';
                  switch (val['status']){
                      case 1 : var status = "<img src='images/Warning.png' width='24'>";
                               break;
                      case 2 : var status = "<img src='images/quick.png' width='24'>";
                               break;
                      default: var status = "";
                               break;
                  }
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
                    var n = yyyy+'-'+mm+'-'+dd;
                  //console.log(n);
                  switch (val['docDate']){
                      case n :
                               status += "<img src='images/New.png' width='24'>";
                               break;
                  }

                           prlist += '<div class="ui-block-d">'+status+'</div>';
                           prlist += '</div></label></a><hr>';
                            x++;
                        });
                        document.getElementById("prlist").innerHTML = prlist;

                        //console.log(JSON.stringify(js));

                       $.mobile.changePage("#pagepr");
                       $popUp.popup('close');
                           },
                   error: function (error){
                        console.log(JSON.stringify(error));
                        $popUp.popup('close');
                       // $.mobile.changePage("#pagepr");
                   }

                   });
    },
    error: function(error){
        console.log(JSON.stringify(error));
        $popUp.popup('close');
    }

});
  }



function backdetail(){
    console.log("backlink");

            var $popUp = $("<div>").popup({
              dismissible: false,
              theme: "b",
              positionto: "window",
              transition: "flip",
              }).css({
                'background': '#F8F8FF',
                '-webkit-box-shadow':  '0px 0px 0px 9999px rgba(0, 0, 0, 0.5)',
                'box-shadow':  '0px 0px 0px 9999px rgba(0, 0, 0, 0.5)',
                'width' : 100
              });;
              $("<img>", {
              src: "images/loading.gif"
              }).appendTo($popUp);
              $popUp.popup('open');

    var Docno = document.getElementById("DocNo").value;
     $.ajax({
            url: localStorage.api_url_server+""+localStorage.api_url_prdetail,
            data: '{"type":"1","searchDocno":"'+Docno+'"}',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            type: "POST",
            cache: false,
            success: function(result){

                     var prl = JSON.stringify(result);
                     var prlp = prl.split(":[");
                     var str = prlp[1].split("]}");
                     prl = "["+str[0]+"]";
                     var js = jQuery.parseJSON(prl);
                     console.log(js);
                     if(JSON.stringify(js)=="[]"){
                       alertify.confirm("รายการนี้ไม่สมบูรณ์ ท่านต้องการยกเลิกการทำรายการนี้หรือไม่ ?", function (e){
                            if (e) {
                                   var Docno = document.getElementById("DocNo").value;
                                   cancelPR(Docno);
                                   console.log("cancel pr");
                                   $popUp.popup('close');// user clicked "ok"
                            } else {
                                   $.mobile.changePage("#pluspr",{transition: 'slidefade',reverse: true});
                                   $popUp.popup('close');
                            }
                        });
                     }else{
                        alertify.confirm("ใบ PR นี้มีสินค้าอยู่ ท่านต้องกายกเลิกหรือไม่ ?", function (e){
                            if (e){
                                var Docno = document.getElementById("DocNo").value;
                                cancelPR(Docno);
                                console.log("cancel pr");
                                $popUp.popup('close');
                            }else{
                                $.mobile.changePage("pluspr",{transition: 'slidefade',reverse: true});
                                $popUp.popup('close');
                            }
                        });
                     }
            }
     });

}


function prdetail(DocNo){
    //alert(DocNo);
            var $popUp = $("<div>").popup({
              dismissible: false,
              theme: "b",
              positionto: "window",
              transition: "flip",
              }).css({
                'background': '#F8F8FF',
                '-webkit-box-shadow':  '0px 0px 0px 9999px rgba(0, 0, 0, 0.5)',
                'box-shadow':  '0px 0px 0px 9999px rgba(0, 0, 0, 0.5)',
                'width' : 100
              });;
              $("<img>", {
              src: "images/loading.gif"
              }).appendTo($popUp);
              $popUp.popup('open');

    $.ajax({
                       url: localStorage.api_url_server+""+localStorage.api_url_prdetail,
                       data: '{"type":"1","searchDocno":"'+DocNo+'"}',
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
                            var no = "";
                            var wdate = "";
                            var state = "";
                            var dif = "";
                            var ite = 1;
                            var detail = "";
                            var venID = "";
                            var venName = "";

                           console.log(JSON.stringify(js));
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
                            var n = yyyy+'-'+mm+'-'+dd;
                            console.log(n);
                            var state = "";
                           $.each(js, function(key, val) {
                               if(val['apcode']!=null){
                                    venID = val['apcode'];
                                    venName = val['apname'];
                               }else{
                                    venID = "รายการอาจไม่สมบูรณ์";
                                    venName = "-";
                               }
                               switch (val['status']){
                                    case 1 : state = "<img src='images/Warning.png' width='24'> ค้าง";
                                            break;
                                    case 2 : state = "<img src='images/quick.png' width='24'> ด่วน";
                                            break;
                                    default : state = "";
                                            break;
                               }


                                   switch (val['docDate']){
                                        case n :
                                               state += "<img src='images/New.png' width='24'>ใหม่";
                                               break;
                                   }

                                no = val['docNo'];

                               wdate = val['wantDate'];
                               if(wdate!=null){
                               wdate = val['wantDate'].split("-");
                               day = wdate[2];
                               month = wdate[1];
                               year = (parseInt(wdate[0])+543);

                               wdate = day+"/"+month+"/"+year;
                               }
                                var itemno = val['itemcode'];
                                if(val['iscancel']==1){
                                    var blur = 'class="todo-detailitem-hold blur"';
                                }else{
                                    var blur = 'class="todo-detailitem"';
                                }
                               // wdate = val['wantDate'];
                                //state = val['status'];
                                dif = val['diffdate'];
                                detail +='<label '+blur+' data-item-id="'+val['docNo']+'/'+itemno+'/'+val['itemname']+'/'+val['qty']+'/'+val['unitcode']+'" data-detail-id="i'+ite+'" id="i'+ite+'" style="border-bottom:1.5px dashed black; padding-bottom:5%; margin-bottom:4%;">';
                                detail += "<div class='ui-grid-a' style='margin-top:2%; margin-left:0;'>";
                                detail += "<div class='ui-block-a' style='text-align:right; padding-right:10%;'><b>รหัสสินค้า</b></div><div class='ui-block-b'>"+val['itemcode']+"</div>";
                                detail += "</div>";

                                detail += "<div class='ui-grid-a' style='margin-top:2%; margin-left:0;'>";
                                detail += "<div class='ui-block-a' style='text-align:right; padding-right:10%;'><b>ชื่อสินค้า</b></div><div class='ui-block-b'>"+val['itemname']+"</div>";
                                detail += "</div>";

                                detail += "<div class='ui-grid-a' style='margin-top:2%; margin-left:0;'>";
                                detail += "<div class='ui-block-a' style='text-align:right; padding-right:10%;'><b>rank</b></div><div class='ui-block-b'>"+val['rank']+"</div>";
                                detail += "</div>";

                                detail += "<div class='ui-grid-a' style='margin-top:2%; margin-left:0;'>";
                                detail += "<div class='ui-block-a' style='text-align:right; padding-right:10%;'><b>จำนวน</b></div><div class='ui-block-b'>"+val['qty']+"&nbsp;"+val['unitcode']+"</div>";
                                detail += "</div></label>";

                                ite++;

                            });

                            document.getElementById("LDocNo").innerHTML = no;
                            document.getElementById("wantdate").innerHTML = wdate;
                            document.getElementById("status").innerHTML = state;
                            document.getElementById("diffdate").innerHTML = dif;

                            document.getElementById("prldetail").innerHTML = detail;
                            document.getElementById("vendorID").innerHTML = venID;
                            document.getElementById("vendorName").innerHTML = venName;

                            $.mobile.changePage("#listpr");
                            $popUp.popup('close');
                               },
                       error: function (error){
                            console.log(error);
                            $.mobile.changePage("#pagepr");
                            $popUp.popup('close');
                       }

           });

   // $.mobile.changePage("#listpr");
}
////////////////////////////////////////////////////////////
$(document).on('taphold', '.todo-detailitem', function() {
      console.log("this hold");
      var link_name = $(this).attr('data-item-id');
      var link_data = $(this).attr('data-detail-id');
      var link_id = $(this).attr('id');
      var data = link_name.split("/");
      var $hold = $("<div/>").popup({
        dismissible: false,

        //theme: "a",
        transition: "pop",
        arrow: "b",
        positionTo: '#'+link_id
        }).on("popupafterclose", function () {
    //remove the popup when closing
    $(this).remove();
    }).css({
   'padding': '10%',
   'color': '#fff',
   'background': 'red'
   });
    console.log(link_name);
    console.log('#'+link_id);
    $("<a>", {
    text: "Hold",
    href: "#",
    onclick: "MyItemdetail('"+data[0]+"','"+data[1]+"', '"+data[2]+"', "+data[3]+", '"+data[4]+"');"
    }).appendTo($hold);

    $hold.popup('open').enhanceWithin();

    });

function MyItemdetail(DocNo, itemcode, itemname, qty, unitcode){

            var $popUp = $("<div>").popup({
              dismissible: false,
              theme: "b",
              positionto: "window",
              transition: "flip",
              }).css({
                'background': '#F8F8FF',
                '-webkit-box-shadow':  '0px 0px 0px 9999px rgba(0, 0, 0, 0.5)',
                'box-shadow':  '0px 0px 0px 9999px rgba(0, 0, 0, 0.5)',
                'width' : 100
              });;
              $("<img>", {
              src: "images/loading.gif"
              }).appendTo($popUp);
              $popUp.popup('open');
    console.log("detailItem "+DocNo+" "+itemcode+" "+itemname+" "+qty+" "+unitcode+" isCancel:1");
    $.ajax({
           url: localStorage.api_url_server+""+localStorage.api_url_insertpr,
           data: '{"docNo":"'+DocNo+'","itemCode":"'+itemcode+'","itemName":"'+itemname+'","unitcode":"'+unitcode+'","qty":"'+qty+'","isCancel":"1"}',
           contentType: "application/json; charset=utf-8",
           dataType: "json",
           type: "POST",
           cache: false,
           success: function(result){
                console.log(JSON.stringify(result));
                $.ajax({
                       url: localStorage.api_url_server+""+localStorage.api_url_prdetail,
                       data: '{"type":"1","searchDocno":"'+DocNo+'"}',
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
                            var no = "";
                            var wdate = "";
                            var state = "";
                            var dif = "";
                            var ite = 1;
                            var detail = "";

                      //     console.log(JSON.stringify(js));

                           $.each(js, function(key, val) {
                               switch (val['status']){
                                    case 1 : state = "<img src='images/Warning.png' width='24'> ค้าง";
                                            break;
                                    case 2 : state = "<img src='images/quick.png' width='24'> ด่วน";
                                            break;
                                    default : state = "";
                                            break;
                               }
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
                                    var n = yyyy+'-'+mm+'-'+dd;
                                   console.log(n);
                                   switch (val['docDate']){
                                        case n :
                                               state += ",<img src='images/New.png' width='24'> ใหม่";
                                               break;
                                   }
                                no = val['docNo'];

                               wdate = val['wantDate'];
                               if(wdate!=null){
                               wdate = val['wantDate'].split("-");
                               day = wdate[2];
                               month = wdate[1];
                               year = (parseInt(wdate[0])+543);

                               wdate = day+"/"+month+"/"+year;
                               }
                                var itemno = val['itemcode'];

                                if(val['iscancel']==1){
                                    var blur = 'class="todo-detailitem-hold blur"';
                                }else{
                                    var blur = 'class="todo-detailitem"';
                                }
                               // wdate = val['wantDate'];
                                //state = val['status'];
                                dif = val['diffdate'];
                                detail +='<label '+blur+' data-item-id="'+val['docNo']+'/'+itemno+'/'+val['itemname']+'/'+val['qty']+'/'+val['unitcode']+'" data-detail-id="i'+ite+'" id="i'+ite+'" style="border-bottom:1.5px dashed black; padding-bottom:5%; margin-bottom:4%;">';
                                detail += "<div class='ui-grid-a' style='margin-top:2%; margin-left:0;'>";
                                detail += "<div class='ui-block-a' style='text-align:right; padding-right:10%;'><b>รหัสสินค้า</b></div><div class='ui-block-b'>"+val['itemcode']+"</div>";
                                detail += "</div>";

                                detail += "<div class='ui-grid-a' style='margin-top:2%; margin-left:0;'>";
                                detail += "<div class='ui-block-a' style='text-align:right; padding-right:10%;'><b>ชื่อสินค้า</b></div><div class='ui-block-b'>"+val['itemname']+"</div>";
                                detail += "</div>";

                                detail += "<div class='ui-grid-a' style='margin-top:2%; margin-left:0;'>";
                                detail += "<div class='ui-block-a' style='text-align:right; padding-right:10%;'><b>rank</b></div><div class='ui-block-b'>"+val['rank']+"</div>";
                                detail += "</div>";

                                detail += "<div class='ui-grid-a' style='margin-top:2%; margin-left:0;'>";
                                detail += "<div class='ui-block-a' style='text-align:right; padding-right:10%;'><b>จำนวน</b></div><div class='ui-block-b'>"+val['qty']+"&nbsp;"+val['unitcode']+"</div>";
                                detail += "</div></label>";

                                ite++;

                            });

                            document.getElementById("LDocNo").innerHTML = no;
                            document.getElementById("wantdate").innerHTML = wdate;
                            document.getElementById("status").innerHTML = state;
                            document.getElementById("diffdate").innerHTML = dif;

                            document.getElementById("prldetail").innerHTML = detail;

                            $.mobile.changePage("#listpr");
                            $popUp.popup('close');
                               },
                       error: function (error){
                            console.log(error);
                            $.mobile.changePage("#pagepr");
                            $popUp.popup('close');
                       }

           });
                  },
                  error: function (error){
                         console.log(error);
                  }

    });


  }
//////////////////////////// hold ///////////////////////////////////

$(document).on('taphold', '.todo-detailitem-hold', function() {
      console.log("cancel hold");
      var link_name = $(this).attr('data-item-id');
      var link_data = $(this).attr('data-detail-id');
      var link_id = $(this).attr('id');
      var data = link_name.split("/");
      var $popUp = $("<div/>").popup({
        dismissible: false,

        //theme: "a",
        transition: "pop",
        arrow: "b",
        positionTo: '#'+link_id
        }).on("popupafterclose", function () {
    //remove the popup when closing
    $(this).remove();
    }).css({
   'padding': '10%',
   'color': '#fff',
   'background': 'red',
   'width': '100%'
   });
    console.log(link_name);
    console.log('#'+link_id);
    $("<a>", {
    text: "Return",
    href: "#",
    onclick: "MyItemhold('"+data[0]+"','"+data[1]+"', '"+data[2]+"', "+data[3]+", '"+data[4]+"');"
    }).appendTo($popUp);

    $popUp.popup('open').enhanceWithin();

    });
function MyItemhold(DocNo, itemcode, itemname, qty, unitcode){

            var $popUp = $("<div>").popup({
              dismissible: false,
              theme: "b",
              positionto: "window",
              transition: "flip",
              }).css({
                'background': '#F8F8FF',
                '-webkit-box-shadow':  '0px 0px 0px 9999px rgba(0, 0, 0, 0.5)',
                'box-shadow':  '0px 0px 0px 9999px rgba(0, 0, 0, 0.5)',
                'width' : 100
              });;
              $("<img>", {
              src: "images/loading.gif"
              }).appendTo($popUp);
              $popUp.popup('open');
    console.log("detailItem "+DocNo+" "+itemcode+" "+itemname+" "+qty+" "+unitcode+" isCancel:'0'");
    $.ajax({
           url: localStorage.api_url_server+""+localStorage.api_url_insertpr,
           data: '{"docNo":"'+DocNo+'","itemCode":"'+itemcode+'","itemName":"'+itemname+'","unitcode":"'+unitcode+'","qty":"'+qty+'","isCancel":"0"}',
           contentType: "application/json; charset=utf-8",
           dataType: "json",
           type: "POST",
           cache: false,
           success: function(result){
                console.log(JSON.stringify(result));
                $.ajax({
                       url: localStorage.api_url_server+""+localStorage.api_url_prdetail,
                       data: '{"type":"1","searchDocno":"'+DocNo+'"}',
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
                            var no = "";
                            var wdate = "";
                            var state = "";
                            var dif = "";
                            var ite = 1;
                            var detail = "";

                      //     console.log(JSON.stringify(js));

                           $.each(js, function(key, val) {
                               switch (val['status']){
                                    case 1 : state = "<img src='images/Warning.png' width='24'> ค้าง";
                                            break;
                                    case 2 : state = "<img src='images/quick.png' width='24'> ด่วน";
                                            break;
                                    default : state = "";
                                            break;
                               }
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
                                    var n = yyyy+'-'+mm+'-'+dd;
                                   console.log(n);
                                   switch (val['docDate']){
                                        case n :
                                               state += ",<img src='images/New.png' width='24'> ใหม่";
                                               break;
                                   }
                                no = val['docNo'];

                               wdate = val['wantDate'];
                               if(wdate!=null){
                               wdate = val['wantDate'].split("-");
                               day = wdate[2];
                               month = wdate[1];
                               year = (parseInt(wdate[0])+543);

                               wdate = day+"/"+month+"/"+year;
                               }
                                var itemno = val['itemcode'];
                                if(val['iscancel']==1){
                                    var blur = 'class="todo-detailitem-hold blur"';
                                }else{
                                    var blur = 'class="todo-detailitem"';
                                }
                               // wdate = val['wantDate'];
                                //state = val['status'];
                                dif = val['diffdate'];
                                detail +='<label '+blur+' data-item-id="'+val['docNo']+'/'+itemno+'/'+val['itemname']+'/'+val['qty']+'/'+val['unitcode']+'" data-detail-id="i'+ite+'" id="i'+ite+'" style="border-bottom:1.5px dashed black; padding-bottom:5%; margin-bottom:4%;">';
                                detail += "<div class='ui-grid-a' style='margin-top:2%; margin-left:0;'>";
                                detail += "<div class='ui-block-a' style='text-align:right; padding-right:10%;'><b>รหัสสินค้า</b></div><div class='ui-block-b'>"+val['itemcode']+"</div>";
                                detail += "</div>";

                                detail += "<div class='ui-grid-a' style='margin-top:2%; margin-left:0;'>";
                                detail += "<div class='ui-block-a' style='text-align:right; padding-right:10%;'><b>ชื่อสินค้า</b></div><div class='ui-block-b'>"+val['itemname']+"</div>";
                                detail += "</div>";

                                detail += "<div class='ui-grid-a' style='margin-top:2%; margin-left:0;'>";
                                detail += "<div class='ui-block-a' style='text-align:right; padding-right:10%;'><b>rank</b></div><div class='ui-block-b'>"+val['rank']+"</div>";
                                detail += "</div>";

                                detail += "<div class='ui-grid-a' style='margin-top:2%; margin-left:0;'>";
                                detail += "<div class='ui-block-a' style='text-align:right; padding-right:10%;'><b>จำนวน</b></div><div class='ui-block-b'>"+val['qty']+"&nbsp;"+val['unitcode']+"</div>";
                                detail += "</div></label>";

                                ite++;

                            });

                            document.getElementById("LDocNo").innerHTML = no;
                            document.getElementById("wantdate").innerHTML = wdate;
                            document.getElementById("status").innerHTML = state;
                            document.getElementById("diffdate").innerHTML = dif;

                            document.getElementById("prldetail").innerHTML = detail;

                            $.mobile.changePage("#listpr");
                            $popUp.popup('close');
                               },
                       error: function (error){
                            console.log(error);
                            $.mobile.changePage("#pagepr");
                            $popUp.popup('close');
                       }

           });
                  },
                  error: function (error){
                         console.log(error);
                         $popUp.popup('close');
                  }

    });


  }
///////////////////////////////////////////////////////////////



function clicksubmit(){

            var $popUp = $("<div>").popup({
              dismissible: false,
              theme: "b",
              positionto: "window",
              transition: "flip",
              }).css({
                'background': '#F8F8FF',
                '-webkit-box-shadow':  '0px 0px 0px 9999px rgba(0, 0, 0, 0.5)',
                'box-shadow':  '0px 0px 0px 9999px rgba(0, 0, 0, 0.5)',
                'width' : 100
              });;
              $("<img>", {
              src: "images/loading.gif"
              }).appendTo($popUp);
              $popUp.popup('open');

    console.log("clickadditem");
    console.log(document.getElementById("DocNo").value);
    var DocNo = document.getElementById("DocNo").value;
    var no = document.getElementById("noitems").value;
    var name = document.getElementById("nameitems").value;
    var grade = document.getElementById("gradeitem").value;
    var cnt = document.getElementById("citem").value;
    var units = document.getElementById("units").value;
    console.log(no);
   if(no=="null"){
          alertify.alert("รหัสสินค้านี้เป็นค่า null ไม่สามารถบันทึกได้ กรุณาสแกนสินค้าอื่น ๆ ");
          $.mobile.changePage("#additem");
          $popUp.popup('close');
   }else if(no==""){
       alertify.alert("ท่านยังไม่ได้ scan สินค้า กรุณา scan สินค้าด้วย");
       $ .mobile.changePage("#additem");
       $popUp.popup('close');
   }else{
        if(cnt == ""){
            alertify.alert("ท่านยังไม่ได้กรอกจำนวนสินค้า กรุณากรอกจำนวนให้ถูกต้อง!!");
            $.mobile.changePage("#additem");
            $popUp.popup('close');
        }else{


                               $.ajax({
                                           url: localStorage.api_url_server+""+localStorage.api_url_insertpr,
                                           data: '{"docNo":"'+DocNo+'","itemCode":"'+no+'","itemName":"'+name+'","unitcode":"'+units+'","qty":"'+cnt+'","isCancel":"0"}',
                                           contentType: "application/json; charset=utf-8",
                                           dataType: "json",
                                           type: "POST",
                                           cache: false,
                                           success: function(result){
                                                console.log(JSON.stringify(result));
                                                 $.ajax({
                                                                       url: localStorage.api_url_server+""+localStorage.api_url_prdetail,
                                                                       data: '{"type":"1","searchDocno":"'+DocNo+'"}',
                                                                       contentType: "application/json; charset=utf-8",
                                                                       dataType: "json",
                                                                       type: "POST",
                                                                       cache: false,
                                                                       success: function(obj){

                                                                              var itemno = "";
                                                                              var itemname = "";
                                                                              var cnt = "";
                                                                              var rank = "";
                                                                              var sitemno = "";
                                                                              var detail = "";
                                                                              var ite = 1;
                                                                              console.log(JSON.stringify(obj.listItem));

                                                                                    $.each(obj.listItem, function(key, val) {
                                                                                    itemno = val['itemcode'];
                                                                                    itemname = val['itemname'];
                                                                                    cnt = val['qty']+" "+val['unitcode'];
                                                                                    rank = val['range'];

                                                                                    console.log(itemno);
                                                                                    if(itemno==null){
                                                                                    sitemno=itemno;
                                                                                    }else{
                                                                                    sitemno = Math.ceil(itemno.length/10);
                                                                                    console.log(sitemno);
                                                                                    }


                                                                                        var s = 0;
                                                                                        var l = 8;
                                                                                        var str1 = "";
                                                                                        if(sitemno!=null){
                                                                                            for(var i = 0;i<sitemno;i++){
                                                                                                 str1 += itemno.substr(s,l)+"<br>";
                                                                                                 s += 8;
                                                                                                 l += 8;
                                                                                            }
                                                                                        }else{
                                                                                            str1=sitemno;
                                                                                        }

                                                                                        if(val['iscancel']==1){
                                                                                            var blur = 'class="todo-itemview blur"';
                                                                                        }else{
                                                                                            var blur = 'class="todo-itemview-hold"';
                                                                                        }
                                                                                        console.log(str1);
                                                                                            detail += '<label '+blur+' data-item-id="'+val['docNo']+'/'+itemno+'/'+val['itemname']+'/'+val['qty']+'/'+val['unitcode']+'" data-itemrow-id="i'+ite+'" id="i'+ite+'"><a href="#">';
                                                                                            detail += "<div class='ui-grid-b' style='border-bottom:1px dashed black; padding:2%; text-align:center; font-size:14px;'>";
                                                                                            detail += "<div class='ui-block-a' style='width:30%;'>"+str1+"</div>";
                                                                                            detail += "<div class='ui-block-b' style='width:50%;'>"+itemname+"</div>";
                                                                                            detail += "<div class='ui-block-c' style='width:20%;'>"+cnt+'</div>';
                                                                                            detail += "</div></a></label>";
                                                                                            ite++;

                                                                                        });

                                                                                        document.getElementById("sumitem").innerHTML = detail;
                                                                                        alertify.success("บันทึกข้อมูลแล้ว!!");
                                                                                        //alert("รหัสสินค้า: "+no+", ชื่อสินค้า: "+name+", เกรด: "+grade+", จำนวน: "+cnt+", หน่วยนับ: "+units+",DocPR :"+DocNo);

                                                                                        $.mobile.changePage("#pluspr");
                                                                                        $popUp.popup('close');
                                                                                            },
                                                                                        error: function (error){
                                                                                            console.log(error);
                                                                                            $.mobile.changePage("#pluspr");
                                                                                            $popUp.popup('close');
                                                                                        }

                                                                       });
                                           },
                                           error: function (error){
                                                console.log(error);
                                                $popUp.popup('close');
                                           }

                               });

                document.getElementById("noitems").value = "";
                document.getElementById("nameitems").value = "";
                document.getElementById("gradeitem").value = "";
                document.getElementById("units").value = "";
                document.getElementById("citem").value = "";

                document.getElementById("Tnoitem").innerHTML = "-- SCAN สินค้า --";
                document.getElementById("TNameitem").innerHTML = "";
                document.getElementById("Tgrade").innerHTML = "";
                document.getElementById("Tunit").innerHTML = "";
                $("#itemdetail").show();
                $popUp.popup('close');
        }

   }
}

function sumdetail(){

            var $popUp = $("<div>").popup({
              dismissible: false,
              theme: "b",
              positionto: "window",
              transition: "flip",
              }).css({
                'background': '#F8F8FF',
                '-webkit-box-shadow':  '0px 0px 0px 9999px rgba(0, 0, 0, 0.5)',
                'box-shadow':  '0px 0px 0px 9999px rgba(0, 0, 0, 0.5)',
                'width' : 100
              });;
              $("<img>", {
              src: "images/loading.gif"
              }).appendTo($popUp);
              $popUp.popup('open');

$.ajax({
           url: localStorage.api_url_server+""+localStorage.api_url_gendocno,
           data: '{"type":"1","search":"'+localStorage.username+'"}',
           contentType: "application/json; charset=utf-8",
           dataType: "json",
           type: "POST",
           cache: false,
           success: function(result){
                console.log(result.docno);
                var DocNo = result.docno;
                document.getElementById("titelpr").innerHTML = '<img src="images/PRicon.png"><b>'+result.docno+'</b>';
                document.getElementById("DocNo").value = DocNo;
                var sel = 'วันที่ต้องการ :<select id="defdate" data-role="none" class="whselect">';
                    sel += '<option value="1">1 วัน</option>';
                    sel += '<option value="3">3 วัน</option>';
                    sel += '<option value="5">5 วัน</option>';
                    sel += '<option value="7">7 วัน</option></select>';
                document.getElementById("defdate1").innerHTML = sel;
                document.getElementById("discript").value = "";
                var pai = document.getElementById("paility").value;
                if(pai=="1"){
                    change();
                }




                $.ajax({
                       url: localStorage.api_url_server+""+localStorage.api_url_prdetail,
                       data: '{"type":"1","searchDocno":"'+DocNo+'"}',
                       contentType: "application/json; charset=utf-8",
                       dataType: "json",
                       type: "POST",
                       cache: false,
                       success: function(result){
                       var prl = JSON.stringify(result);
                       var prlp = prl.split(":[");
                       var str = prlp[1].split("]}");
                       prl = "["+str[0]+"]";
                       var js = jQuery.parseJSON(prl);
                       var itemno = "";
                       var itemname = "";
                       var cnt = "";
                       var rank = "";
                       var sitemno = "";
                       var detail = "";
                       var ite = 1;
                             $.each(js, function(key, val) {
                             itemno = val['itemcode'];
                             itemname = val['itemname'];
                             cnt = val['qty']+" "+val['unitcode'];
                             rank = val['range'];
                             sitemno = Math.ceil(itemno.length/10);
                             var s = 0;
                             var l = 8;
                             var str1 = "";
                             for(var i = 0;i<sitemno;i++){
                                  str1 += itemno.substr(s,l)+"<br>";
                                  s += 8;
                                  l += 8;
                             }
                             console.log(str1);
                                  detail += '<label class="todo-itemview" data-item-id="'+itemno+'" data-itemrow-id="i'+ite+'" id="i'+ite+'"><a href="#">';
                                  detail += "<div class='ui-grid-b' style='border-bottom:1px dashed black; padding:2%; text-align:center; font-size:14px;'>";
                                  detail += "<div class='ui-block-a' style='width:30%;'>"+str1+"</div>";
                                  detail += "<div class='ui-block-b' style='width:28%;'>"+itemname+"</div>";
                                  detail += "<div class='ui-block-c' style='width:18%;'>"+cnt+'</div>';
                                  detail += "</div></a></label>";

                                  ite++;
                             });

                                document.getElementById("sumitem").innerHTML = detail;

                                $.mobile.changePage("#pluspr");
                                $popUp.popup('close');
                                   },
                           error: function (error){
                                console.log(error);
                                $.mobile.changePage("#pluspr");
                                $popUp.popup('close');
                           }

               });
           },
           error: function (error){
                console.log(error);
                $.mobile.changePage("#pagepr");
                $popUp.popup('close');
           }

    });


}

function pluspr(){

            var $popUp = $("<div>").popup({
              dismissible: false,
              theme: "b",
              positionto: "window",
              transition: "flip",
              }).css({
                'background': '#F8F8FF',
                '-webkit-box-shadow':  '0px 0px 0px 9999px rgba(0, 0, 0, 0.5)',
                'box-shadow':  '0px 0px 0px 9999px rgba(0, 0, 0, 0.5)',
                'width' : 100
              });;
              $("<img>", {
              src: "images/loading.gif"
              }).appendTo($popUp);
              $popUp.popup('open');
    var Docno = document.getElementById("DocNo").value;
    var apCode = document.getElementById("apCodeven").value;
    var priority = document.getElementById("paility").value;
  // console.log(Docno+" "+priority);
    console.log(document.getElementById("apCodeven").value);
    if(apCode){
        apCode = apCode;
    }else{
        apCode = "null";
    }
    $.ajax({
            url: localStorage.api_url_server+""+localStorage.api_url_prdetail,
            data: '{"type":"1","searchDocno":"'+Docno+'"}',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            type: "POST",
            cache: false,
            success: function(result){
                var prl = JSON.stringify(result);
                var prlp = prl.split(":[");
                var str = prlp[1].split("]}");
                prl = "["+str[0]+"]";
                var js = jQuery.parseJSON(prl);
                console.log(js);
                if(JSON.stringify(js)=="[]"){
                    alertify.alert("ยังไม่มีรายการสินค้าในใบ PR นี้ กรุณาสั่งสินค้าอย่างน้อย 1 รายการ");
                    $popUp.popup('close');
                }else{
                        var wday = document.getElementById("defdate").value;
                        var discript = document.getElementById("discript").value;

                        if(priority==true){
                            priority = 1;
                        }else{
                            priority = 0;
                        }
                        if(discript==""||apCode == "null"){
                            alertify.alert("กรุณากรอกข้อมูลให้ครบถ้วน!!");
                            $popUp.popup('close');
                        }else{
                                $.ajax({
                                           url: localStorage.api_url_server+""+localStorage.api_url_updatepr,
                                           data: '{"docNo": "'+Docno+'","workman":"'+localStorage.username+'","wantday":"'+wday+'","description":"'+discript+'","priority":"'+priority+'","isCancel":"0","apCode":"'+apCode+'"}',
                                           contentType: "application/json; charset=utf-8",
                                           dataType: "json",
                                           type: "POST",
                                           cache: false,
                                           success: function(result){
                                           var status = JSON.stringify(result);
                                           console.log(Docno+","+wday+","+discript+","+priority+",apcode :"+apCode);

                                           $.ajax({
                                                   url: localStorage.api_url_server+localStorage.api_url_prlist,
                                                   data: '{"type":"1","search":"'+localStorage.username+'"}',
                                                   contentType: "application/json; charset=utf-8",
                                                   dataType: "json",
                                                   type: "POST",
                                                   cache: false,
                                                   success: function(result){
                                                        //console.log(JSON.stringify(result));
                                                        var prl = JSON.stringify(result);
                                                        //console.log(prl);
                                                        var prlp = prl.split(":[");
                                                        var str = prlp[1].split("]}");
                                                        prl = "["+str[0]+"]";
                                                        var js = jQuery.parseJSON(prl);
                                                        var prlist = "";
                                                        var wdate = "";
                                                        var x = 1;
                                                        $.each(js, function(key, val) {
                                                           //console.log(val['docNo']);

                                                           prlist += '<label class="todo-listview" data-view-id="';
                                                           prlist += "'"+val['docNo']+"'";
                                                           prlist += '" data-row-id="'+x+'" id="'+x+'"><a href="#" onclick="prdetail(';
                                                           prlist += "'"+val['docNo']+"'";
                                                           prlist += ')" ><div class="ui-grid-c" style="text-align:center; font-size:14px;">';
                                                           prlist += '<div class="ui-block-a" data-view-id="1">'+val['docNo']+'</div>';

                                                           var wantDate = val['wantDate'];
                                                           if(wantDate!=null){
                                                           wdate = val['wantDate'].split("-");
                                                           day = wdate[2];
                                                           month = wdate[1];
                                                           year = (parseInt(wdate[0])+543);

                                                           wantDate = day+"/"+month+"/"+year;
                                                           }

                                                           prlist += '<div class="ui-block-b">'+wantDate+'</div>';
                                                           prlist += '<div class="ui-block-c">'+val['diffDate']+' วัน</div>';
                                                               switch (val['status']){
                                                                    case 1 : var status = "<img src='images/Warning.png' width='24'>";
                                                                            break;
                                                                    case 2 : var status = "<img src='images/quick.png' width='24'>";
                                                                            break;
                                                                    default : var status = "";
                                                                            break;
                                                               }
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
                                                                    var n = yyyy+'-'+mm+'-'+dd;
                                                                   console.log(val['docDate']+"/"+n);
                                                                   switch (val['docDate']){
                                                                        case n :
                                                                               status += "<img src='images/New.png' width='24'>";
                                                                               break;
                                                                   }

                                                           prlist += '<div class="ui-block-d">'+status+'</div>';
                                                           prlist += '</div></label></a><hr>';
                                                            x++;
                                                        });
                                                        document.getElementById("prlist").innerHTML = prlist;
                                                        localStorage.apcode="";
                                                        $popUp.popup('close');
                                                        //console.log(JSON.stringify(js));

                                                      //  $.mobile.changePage("#pagepr");
                                                           },
                                                   error: function (error){
                                                        console.log(JSON.stringify(error));
                                                        $popUp.popup('close');
                                                       // $.mobile.changePage("#pagepr");
                                                   }

                                                   });
                                           alertify.success("บันทึกข้อมูลเรียบร้อยแล้ว");
                                           $.mobile.changePage("#pagepr");
                                           $popUp.popup('close');
                                           },
                                           error: function (error){
                                             console.log(JSON.stringify(error));
                                             $.mobile.changePage("#pluspr");
                                             $popUp.popup('close');
                                           }

                                   });

                        }
                }
            }
    });
}


$(document).on('taphold', '.todo-itemview-hold', function() {
       // console.log("DEBUG - Go popup");
       console.log('hold plus item');
    var link_name = $(this).attr('data-item-id');
      var link_id = $(this).attr('data-itemrow-id');
      var data = link_name.split("/");
      var $popUp = $("<div/>").popup({
        dismissible: false,
        transition: "pop",
        arrow: "b",
        positionTo: '#'+link_id
        }).on("popupafterclose", function () {
    //remove the popup when closing
    $(this).remove();
    }).css({
   'padding': '10%',
   'color': '#fff',
   'background': 'red'
   });
    console.log(link_name);
    console.log('#'+link_id);
    $("<a>", {
    text: "Hold",
    href: "#",
    onclick: "MyItem('"+data[0]+"','"+data[1]+"', '"+data[2]+"', "+data[3]+", '"+data[4]+"');"
    }).appendTo($popUp);

    $popUp.popup('open').enhanceWithin();

    });

function MyItem(DocNo, itemcode, itemname, qty, unitcode){

            var $ipop = $("<div>").popup({
              dismissible: false,
              theme: "b",
              positionto: "window",
              transition: "flip",
              }).css({
                'background': '#F8F8FF',
                '-webkit-box-shadow':  '0px 0px 0px 9999px rgba(0, 0, 0, 0.5)',
                'box-shadow':  '0px 0px 0px 9999px rgba(0, 0, 0, 0.5)',
                'width' : 100
              });;
              $("<img>", {
              src: "images/loading.gif"
              }).appendTo($ipop);
              $ipop.popup('open');

    //alert("cancel "+DocNo+" "+itemcode+" "+itemname+" "+qty+" "+unitcode+" isCancel:'1'");
    $.ajax({
           url: localStorage.api_url_server+""+localStorage.api_url_insertpr,
           data: '{"docNo":"'+DocNo+'","itemCode":"'+itemcode+'","itemName":"'+itemname+'","unitcode":"'+unitcode+'","qty":"'+qty+'","isCancel":"1"}',
           contentType: "application/json; charset=utf-8",
           dataType: "json",
           type: "POST",
           cache: false,
           success: function(result){
                console.log(JSON.stringify(result));
                $.ajax({
                        url: localStorage.api_url_server+""+localStorage.api_url_prdetail,
                        data: '{"type":"1","searchDocno":"'+DocNo+'"}',
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        type: "POST",
                        cache: false,
                        success: function(result){
                            var prl = JSON.stringify(result);
                            var itemno = "";
                            var itemname = "";
                            var cnt = "";
                            var rank = "";
                            var sitemno = "";
                            var detail = "";
                            var ite = 1;
                                $.each(result.listItem, function(key, val) {
                                itemno = val['itemcode'];
                                itemname = val['itemname'];
                                cnt = val['qty']+" "+val['unitcode'];
                                rank = val['range'];
                                console.log(itemno);
                                if(itemno==null){
                                    sitemno=itemno;
                                }else{
                                    sitemno = Math.ceil(itemno.length/10);
                                    console.log(sitemno);
                                }
                                var s = 0;
                                var l = 8;
                                var str1 = "";
                                if(sitemno!=null){
                                   for(var i = 0;i<sitemno;i++){
                                       str1 += itemno.substr(s,l)+"<br>";
                                       s += 8;
                                       l += 8;
                                   }
                                }else{
                                   str1=sitemno;
                                }
                                if(val['iscancel']==1){
                                   var blur = 'class="todo-itemview blur"';
                                }else{
                                   var blur = 'class="todo-itemview-hold"';
                                }
                                console.log(str1);
                                detail += '<label '+blur+' data-item-id="'+val['docNo']+'/'+itemno+'/'+val['itemname']+'/'+val['qty']+'/'+val['unitcode']+'" data-itemrow-id="i'+ite+'" id="i'+ite+'"><a href="#">';
                                detail += "<div class='ui-grid-b' style='border-bottom:1px dashed black; padding:2%; text-align:center; font-size:14px;'>";
                                detail += "<div class='ui-block-a' style='width:30%;'>"+str1+"</div>";
                                detail += "<div class='ui-block-b' style='width:50%;'>"+itemname+"</div>";
                                detail += "<div class='ui-block-c' style='width:20%;'>"+cnt+'</div>';
                                detail += "</div></a></label>";
                                ite++;

                            });

                            document.getElementById("sumitem").innerHTML = detail;

                            $.mobile.changePage("#pluspr");
                            $ipop.popup('close');
                            },
                            error: function (error){
                                 console.log(error);
                                 $.mobile.changePage("#pluspr");
                                 $ipop.popup('close');
                            }

                        });
                  },
                  error: function (error){
                         console.log(error);
                         $ipop.popup('close');
                  }

    });
  }

$(document).on('taphold', '.todo-itemview', function() {
       // console.log("DEBUG - Go popup");
      var link_name = $(this).attr('data-item-id');
      var link_id = $(this).attr('data-itemrow-id');
      var data = link_name.split("/");
      var $popUp = $("<div/>").popup({
        dismissible: false,
        transition: "pop",
        arrow: "b",
        positionTo: '#'+link_id
        }).on("popupafterclose", function () {
    //remove the popup when closing
    $(this).remove();
    }).css({
   'padding': '10%',
   'color': '#fff',
   'background': 'red'
   });
    console.log(link_name);
    console.log('#'+link_id);
    $("<a>", {
    text: "Return",
    href: "#",
    onclick: "MyItemReturn('"+data[0]+"','"+data[1]+"', '"+data[2]+"', "+data[3]+", '"+data[4]+"');"
    }).appendTo($popUp);

    $popUp.popup('open').enhanceWithin();

    });

function MyItemReturn(DocNo, itemcode, itemname, qty, unitcode){

            var $popUp = $("<div>").popup({
              dismissible: false,
              theme: "b",
              positionto: "window",
              transition: "flip",
              }).css({
                'background': '#F8F8FF',
                '-webkit-box-shadow':  '0px 0px 0px 9999px rgba(0, 0, 0, 0.5)',
                'box-shadow':  '0px 0px 0px 9999px rgba(0, 0, 0, 0.5)',
                'width' : 100
              });;
              $("<img>", {
              src: "images/loading.gif"
              }).appendTo($popUp);
              $popUp.popup('open');
    $.ajax({
           url: localStorage.api_url_server+""+localStorage.api_url_insertpr,
           data: '{"docNo":"'+DocNo+'","itemCode":"'+itemcode+'","itemName":"'+itemname+'","unitcode":"'+unitcode+'","qty":"'+qty+'","isCancel":"0"}',
           contentType: "application/json; charset=utf-8",
           dataType: "json",
           type: "POST",
           cache: false,
           success: function(result){
                console.log(JSON.stringify(result));
                $.ajax({
                        url: localStorage.api_url_server+""+localStorage.api_url_prdetail,
                        data: '{"type":"1","searchDocno":"'+DocNo+'"}',
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        type: "POST",
                        cache: false,
                        success: function(result){
                            var prl = JSON.stringify(result);
                            var prlp = prl.split(":[");
                            var str = prlp[1].split("]}");
                            prl = "["+str[0]+"]";
                            var js = jQuery.parseJSON(prl);
                            var itemno = "";
                            var itemname = "";
                            var cnt = "";
                            var rank = "";
                            var sitemno = "";
                            var detail = "";
                            var ite = 1;
                            $.each(js, function(key, val) {
                                 itemno = val['itemcode'];
                                 itemname = val['itemname'];
                                 cnt = val['qty']+" "+val['unitcode'];
                                 rank = val['range'];
                                 sitemno = Math.ceil(itemno.length/10);
                                 var s = 0;
                                 var l = 8;
                                 var str1 = "";
                                 for(var i = 0;i<sitemno;i++){
                                     str1 += itemno.substr(s,l)+"<br>";
                                     s += 8;
                                     l += 8;
                                 }
                                 if(val['iscancel']==1){
                                       var blur = 'class="todo-itemview blur"';
                                 }else{
                                       var blur = 'class="todo-itemview-hold"';
                                 }
                                    console.log(str1);
                                    detail += '<label '+blur+' data-item-id="'+val['docNo']+'/'+itemno+'/'+val['itemname']+'/'+val['qty']+'/'+val['unitcode']+'" data-itemrow-id="i'+ite+'" id="i'+ite+'"><a href="#">';
                                    detail += "<div class='ui-grid-b' style='border-bottom:1px dashed black; padding:2%; text-align:center; font-size:14px;'>";
                                    detail += "<div class='ui-block-a' style='width:30%;'>"+str1+"</div>";
                                    detail += "<div class='ui-block-b' style='width:50%;'>"+itemname+"</div>";
                                    detail += "<div class='ui-block-c' style='width:20%;'>"+cnt+'</div>';
                                    detail += "</div></a></label>";

                                        ite++;

                            });

                    document.getElementById("sumitem").innerHTML = detail;
                    $.mobile.changePage("#pluspr");
                    $popUp.popup('close');
                    },
                    error: function (error){
                           console.log(error);
                           $.mobile.changePage("#pluspr");
                           $popUp.popup('close');
                    }
                });
           }

    });
}

function searchapcode(){
    var valapCode = document.getElementById("vender").value;
    $.ajax({
           url: localStorage.api_url_server+""+localStorage.api_url_searchvendorPR,
           data: '{"search":"'+valapCode+'"}',
           contentType: "application/json; charset=utf-8",
           dataType: "json",
           type: "POST",
           cache: false,
           success: function(apcode){
                var ap = JSON.stringify(apcode);
                var apC = ap.split(":[");
                var str = apC[1].split("]}");
                ap = "["+str[0]+"]";
                var js = jQuery.parseJSON(ap);
                //console.log(JSON.stringify(apcode));
                var textven = "";
                var name = "";
                var listapcode = "";
                $.each(js, function(key, val) {
                     textven = val['apCode'];
                     name = val['apName'];
                     listapcode += '<label onclick="addapcode(';
                     listapcode += "'"+textven+"' ,";
                     listapcode += "'"+name+"'";
                     listapcode += ')"><a href="#">'+textven+' '+name+'</a></label>';
                });
                   // document.getElementById("apCodeven").value = textven;
                    document.getElementById("nameven").innerHTML = listapcode;
           }
    });


}

function addapcode(textven, name){

    console.log(textven);
    console.log(name);
    document.getElementById("apCodevendor").innerHTML = '<a href="#vendor" data-rel="popup" class="ui-btn ui-icon-search ui-btn-icon-right">'+textven+'<br>'+name+'</a>';
    document.getElementById("apCodeven").value = textven;
    document.getElementById("vender").value = "";
    document.getElementById("nameven").innerHTML = "-- ชื่อเจ้าหนี้ --";
    $('#vendor').popup('close');
}

function change(){
	var pai = document.getElementById("paility");
	if(pai.value=="1"){
		pai.value="0";
		document.getElementById("detail").innerHTML = "ไม่ด่วน";
		document.getElementById("ims").src = "images/notquick.png";
		pai.className="btn btn-login";
	}else{
		pai.value="1";
		document.getElementById("detail").innerHTML = "ด่วน";
		document.getElementById("ims").src = "images/quick.png";
		pai.className = "btn btn-buy";
	}

	//alert(pai.value);
}
