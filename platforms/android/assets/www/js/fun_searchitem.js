window.addEventListener('native.onscanbarcode', function (schitem) {
       var page = "";
       //alert(pr.scanResult);
      // console.log(schitem.scanResult);
       localStorage.barcode = schitem.scanResult;

       if(page == ""){
         page = $.mobile.activePage.attr('id');
       }
       $(document).on("pageshow", function (e, data) {
          page = $(this)[0].activeElement.id;
       });
        switch(page){
                    case "searchitem" : itemProfile(localStorage.barcode);
                                    break;
                    }
});
function itemProfile(bcitem){
                                        var valwh = document.getElementById("valwh").value;
                                        var tiwh = "";
                                        var itemdetail = "";
                                        if(valwh==""){

                                         var $popUp = $("<div>").popup({
                                              dismissible: false,
                                              theme: "a",
                                              positionto: "window",
                                              transition: "flip",
                                              }).css({
                                                'background': '#F8F8FF',
                                                '-webkit-box-shadow':  '0px 0px 0px 9999px rgba(0, 0, 0, 0.5)',
                                                'box-shadow':  '0px 0px 0px 9999px rgba(0, 0, 0, 0.5)',
                                                'width' : 100
                                              });

                                          $("<img>", {
                                          src: "images/loading.gif"
                                          }).appendTo($popUp);
                                          $popUp.popup('open');

                                         $.ajax({
                                                url: localStorage.api_url_server+""+ localStorage.api_url_searchwh_is,
                                                data: '{"accessToken":"","search":"'+bcitem+'"}',
                                                contentType: "application/json; charset=utf-8",
                                                dataType: "json",
                                                type: "POST",
                                                cache: false,
                                                   success: function(result){
                                                       var whName = "";
                                                       var whLoca = "";
                                                       var res = JSON.stringify(result.warehouseList);
                                                       if(res != "[]"){
                                                            $.each(result.warehouseList, function(key, wh) {
                                                                whName = wh['whName'];
                                                                whLoca = wh['location'];
                                                            });
                                                            document.getElementById("de-wh").innerHTML = "<b>คลัง : </b>&nbsp;&nbsp;"+whName+" <i> "+whLoca+" </i>";
                                                            document.getElementById("de-wh").style.textAlign = "left";
                                                            document.getElementById("valwh").value =  bcitem;
                                                            $("#bt-wh").hide();
                                                            $("#bt-item").show();
                                                            $("#de-wh").show();
                                                            $("#itemdtail").show();
                                                            $popUp.popup("close");
                                                           // console.log("whname = "+whName);
                                                           // console.log("whname = "+whLoca);
                                                       }else{
                                                            console.log("ไม่มีข้อมูล");
                                                            alertify.alert("ไม่มีข้อมูล");
                                                            $popUp.popup("close");

                                                       }

                                                    },
                                                   error: function (error) {
                                                        console.log(JSON.stringify(error));
                                                    }

                                              });


                                        }else{

                                          var $popUp = $("<div>").popup({
                                              dismissible: false,
                                              theme: "a",
                                              positionto: "window",
                                              transition: "flip",
                                              }).css({
                                                'background': '#F8F8FF',
                                                '-webkit-box-shadow':  '0px 0px 0px 9999px rgba(0, 0, 0, 0.5)',
                                                'box-shadow':  '0px 0px 0px 9999px rgba(0, 0, 0, 0.5)',
                                                'width' : 100
                                              });

                                          $("<img>", {
                                          src: "images/loading.gif"
                                          }).appendTo($popUp);
                                          $popUp.popup('open');

                                        $.ajax({
                                                url: localStorage.api_url_server+""+localStorage.api_url_profile_it,
                                                data: '{"accessToken":"","whCode":"'+document.getElementById("valwh").value+'","itemCode":"'+bcitem+'"}',
                                                //data: '{"accessToken":"","whCode":"A44","itemCode":"8851123218016"}',
                                                contentType: "application/json; charset=utf-8",
                                                dataType: "json",
                                                type: "POST",
                                                cache: false,
                                                   success: function(result){
                                                   if(result.itemProfileList.length==0){
                                                       alertify.alert("ไม่มีข้อมูล");
                                                       $popUp.popup("close");
                                                       $("#bt-item").show();
                                                   }else{
                                                        var bcCode = "";
                                                        var itemCode = "";
                                                        var itemName = "";
                                                        var unitCode = "";
                                                        var brandCode = "";
                                                        var brandName = "";
                                                        var rang = "";
                                                        var price = "";
                                                        var whCode = "";
                                                        var vendorCode = "";
                                                        var vendorName = "";
                                                   // console.log(result.itemProfileList);
                                                    var js = result.itemProfileList;
                                                    //console.log(js);
                                                    $.each(js, function(key, val) {
                                                        bcCode = bcitem;
                                                        itemCode = val['itemCode'];
                                                        itemName = val['itemName'];
                                                        unitCode = val['unitCode'];
                                                        brandCode = val['brandCode'];
                                                        brandName = val['brandName'];
                                                        rang = val['rang'];
                                                        price = val['price'];
                                                        whCode = val['whCode'];
                                                        vendorCode = val['vendorCode'];
                                                        vendorName = val['vendorName'];
                                                    });
                                                    console.log(whCode);
                                                        itemdetail += '<div class="ui-grid-a" style="padding-bottom:5%;">';
                                                        itemdetail += '<div class="ui-block-a" style="width:35%; font-weight: bold;">';
                                                        itemdetail += 'รหัสบาร์โค้ด :</div>';
                                                        itemdetail += '<div class="ui-block-b" style="text-align:left; padding-left:2%; width:65%;">';
                                                        itemdetail += bcCode+'</div>';
                                                        itemdetail += '</div>';

                                                        itemdetail += '<div class="ui-grid-a" style="padding-bottom:5%;">';
                                                        itemdetail += '<div class="ui-block-a" style="width:35%; font-weight: bold;">';
                                                        itemdetail += 'รหัสสินค้า :</div>';
                                                        itemdetail += '<div class="ui-block-b" style="text-align:left; padding-left:2%; width:65%;">';
                                                        itemdetail += itemCode+'</div>';
                                                        itemdetail += '</div>';

                                                        itemdetail += '<div class="ui-grid-a" style="padding-bottom:5%;">';
                                                        itemdetail += '<div class="ui-block-a" style="width:35%; font-weight: bold;">';
                                                        itemdetail += 'ชื่อ :</div>';
                                                        itemdetail += '<div class="ui-block-b" style="text-align:left; padding-left:2%; width:65%;">';
                                                        itemdetail += itemName+'</div>';
                                                        itemdetail += '</div>';

                                                        itemdetail += '<div class="ui-grid-a" style="padding-bottom:5%;">';
                                                        itemdetail += '<div class="ui-block-a" style="width:35%; font-weight: bold;">';
                                                        itemdetail += 'ราคา :</div>';
                                                        itemdetail += '<div class="ui-block-b" style="text-align:left; padding-left:2%; width:65%;">';
                                                        itemdetail += price+'</div>';
                                                        itemdetail += '</div>';

                                                        itemdetail += '<div class="ui-grid-a" style="padding-bottom:5%;">';
                                                        itemdetail += '<div class="ui-block-a" style="width:35%; font-weight: bold;">';
                                                        itemdetail += 'หน่วยนับ :</div>';
                                                        itemdetail += '<div class="ui-block-b" style="text-align:left; padding-left:2%; width:65%;">';
                                                        itemdetail += unitCode+'</div>';
                                                        itemdetail += '</div>';

                                                        itemdetail += '<div class="ui-grid-a" style="padding-bottom:5%;">';
                                                        itemdetail += '<div class="ui-block-a" style="width:35%; font-weight: bold;">';
                                                        itemdetail += 'ยี่ห้อ :</div>';
                                                        itemdetail += '<div class="ui-block-b" style="text-align:left; padding-left:2%; width:65%;">';
                                                        itemdetail += brandCode+' '+brandName+'</div>';
                                                        itemdetail += '</div>';

                                                        itemdetail += '<div class="ui-grid-a" style="padding-bottom:5%;">';
                                                        itemdetail += '<div class="ui-block-a" style="width:35%; font-weight: bold;">';
                                                        itemdetail += 'คลัง :</div>';
                                                        itemdetail += '<div class="ui-block-b" style="text-align:left; padding-left:2%; width:65%;">';
                                                        itemdetail += whCode+'</div>';
                                                        itemdetail += '</div>';

                                                        itemdetail += '<div class="ui-grid-a" style="padding-bottom:2%;">';
                                                        itemdetail += '<div class="ui-block-a" style="width:35%; font-weight: bold;">';
                                                        itemdetail += 'เกรด :</div>';
                                                        itemdetail += '<div class="ui-block-b" style="text-align:left; padding-left:2%; width:65%;">';
                                                        itemdetail += rang+'</div>';
                                                        itemdetail += '</div>';

                                                        itemdetail += '<div class="ui-grid-a" style="padding-bottom:2%;">';
                                                        itemdetail += '<div class="ui-block-a" style="width:35%; font-weight: bold;">';
                                                        itemdetail += 'เจ้าหนี้ : </div>';
                                                        itemdetail += '<div class="ui-block-b" style="text-align:left; padding-left:2%;">';
                                                        itemdetail += ''+vendorCode+' '+vendorName+'</div>';
                                                        itemdetail += '</div>';

                                                        var x = 1;
                                                        $.each(js, function(key, val) {
                                                        console.log(x);

                                                        itemdetail += '<label id="'+x+'">';

                                                        itemdetail += '<a href="#" class="open"><div class="ui-grid-a" style="padding-top:5%; border-top:1px dashed gray;">';
                                                        itemdetail += '<div class="ui-block-a" style="width:35%; font-weight: bold;">';
                                                        itemdetail += 'ชั้นเก็บ :</div>';
                                                        itemdetail += '<div class="ui-block-b" style="text-align:left; padding-left:2%; width:65%;">';
                                                        itemdetail += ' '+val['shelfCode']+'</div></div></a>';


                                                        itemdetail += '<div class="box" style="display:none; padding-top:2%;">';

                                                                itemdetail += '<div class="ui-grid-a" style="padding-bottom:5%;">';
                                                                itemdetail += '<div class="ui-block-a" style="width:35%; text-align:right;">';
                                                                itemdetail += 'จำนวน : </div>';
                                                                itemdetail += '<div class="ui-block-b" style="text-align:left; padding-left:2%;">';
                                                                itemdetail += ''+val['qty']+'</div>';
                                                                itemdetail += '</div>';

                                                                itemdetail += '<div class="ui-grid-a" style="padding-bottom:5%;">';
                                                                itemdetail += '<div class="ui-block-a" style="width:35%; text-align:right;">';
                                                                itemdetail += 'ขายล่าสุด : </div>';
                                                                itemdetail += '<div class="ui-block-b" style="text-align:left; padding-left:2%;">';
                                                                itemdetail += ''+val['qtyIV']+' '+val['unitCodeIV']+'</div>';
                                                                itemdetail += '</div>';

                                                                itemdetail += '<div class="ui-grid-a" style="padding-bottom:5%;">';
                                                                itemdetail += '<div class="ui-block-a" style="width:35%; text-align:right;">';
                                                                itemdetail += 'วันที่ : </div>';
                                                                itemdetail += '<div class="ui-block-b" style="text-align:left; padding-left:2%;">';
                                                                var dateIV = "";
                                                                if(dateIV == null){
                                                                    dateIV = "";
                                                                }else{
                                                                    dateIV = val['docdateIV'].split("-");
                                                                    var day = dateIV[2];
                                                                    var month = dateIV[1];
                                                                    var year = (parseInt(dateIV[0])+543);

                                                                    dateIV = day+"/"+month+"/"+year;
                                                                }

                                                                itemdetail += ''+dateIV+'</div>';
                                                                itemdetail += '</div>';

                                                                itemdetail += '<div class="ui-grid-a" style="padding-bottom:5%;">';
                                                                itemdetail += '<div class="ui-block-a" style="width:35%; text-align:right;">';
                                                                itemdetail += 'รับล่าสุด : </div>';
                                                                itemdetail += '<div class="ui-block-b" style="text-align:left; padding-left:2%;">';
                                                                itemdetail += ''+val['qtyRV']+' '+val['unitCodeRV']+'</div>';
                                                                itemdetail += '</div>';

                                                                itemdetail += '<div class="ui-grid-a" style="padding-bottom:5%;">';
                                                                itemdetail += '<div class="ui-block-a" style="width:35%; text-align:right;">';
                                                                itemdetail += 'วันที่ : </div>';
                                                                itemdetail += '<div class="ui-block-b" style="text-align:left; padding-left:2%;">';

                                                                var dateRV = "";
                                                                if(dateRV == null){
                                                                    dateRV = "";
                                                                }else{
                                                                    dateRV = val['docdateRV'].split("-");
                                                                    var day = dateRV[2];
                                                                    var month = dateRV[1];
                                                                    var year = (parseInt(dateRV[0])+543);

                                                                    dateRV = day+"/"+month+"/"+year;
                                                                }

                                                                itemdetail += ''+dateRV+'</div>';
                                                                itemdetail += '</div>';

                                                                itemdetail += '<div class="ui-grid-a" style="padding-bottom:5%;">';
                                                                itemdetail += '<div class="ui-block-a" style="width:35%; text-align:right;">';
                                                                itemdetail += 'โอนล่าสุด : </div>';
                                                                itemdetail += '<div class="ui-block-b" style="text-align:left; padding-left:2%;">';
                                                                itemdetail += ''+val['qtyTF']+' '+val['unitCodeTF']+'</div>';
                                                                itemdetail += '</div>';

                                                                itemdetail += '<div class="ui-grid-a" style="padding-bottom:5%;">';
                                                                itemdetail += '<div class="ui-block-a" style="width:35%; text-align:right;">';
                                                                itemdetail += 'วันที่ : </div>';
                                                                itemdetail += '<div class="ui-block-b" style="text-align:left; padding-left:2%;">';

                                                                var dateTF = "";
                                                                if(dateTF == null){
                                                                    dateTF = "";
                                                                }else{
                                                                    dateTF = val['docdateTF'].split("-");
                                                                    var day = dateTF[2];
                                                                    var month = dateTF[1];
                                                                    var year = (parseInt(dateTF[0])+543);

                                                                    dateTF = day+"/"+month+"/"+year;
                                                                }

                                                                itemdetail += ''+dateTF+'</div>';
                                                                itemdetail += '</div>';

                                                        itemdetail += '</div></label>';
                                                        x++;
                                                        });



                                                    document.getElementById("de-item").innerHTML = itemdetail;
                                                    document.getElementById("itemdtail").style.textAlign = "right";
                                                    $popUp.popup("close");
                                                    $("#bt-item").hide();
                                                    $("#de-item").show();
                                                    var open = $('.open'),
                                                        a = $('label').find('a');
                                                        console.log(a.hasClass('active'));
                                                        console.log(open);
                                                    open.click(function(e){

                                                        e.preventDefault();
                                                        var $this = $(this),
                                                            speed = 500;
                                                        if($this.hasClass('active') === true) {
                                                            $this.removeClass('active').next('.box').slideUp(speed);
                                                        } else if(a.hasClass('active') === false) {
                                                            $this.addClass('active').next('.box').slideDown(speed);
                                                        } else {
                                                            a.removeClass('active').next('.box').slideUp(speed);
                                                            $this.addClass('active').next('.box').delay(speed).slideDown(speed);
                                                        }
                                                    });
                                                    }
                                            },
                                            error: function (error) {
                                                 console.log(JSON.stringify(error));
                                            }
                                        });

                                        }
}

function rewh(){

     document.getElementById("valwh").value = "";
     document.getElementById("bt-item").style.textAlign = "center";
     document.getElementById("bt-wh").style.textAlign = "center";
     $("#itemdtail").hide();
     $("#de-wh").hide();
     $("#bt-item").hide();
     $("#bt-wh").show();
     $("#de-item").hide();
     $.mobile.changePage("#searchitem");
}