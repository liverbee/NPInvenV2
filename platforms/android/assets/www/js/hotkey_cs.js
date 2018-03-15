document.addEventListener("keydown", function(event) {
        console.log(event.keyCode);
        var page="";
        page = $.mobile.activePage.attr('id');
        console.log(page);

            if(page=="countstock"){
                switch (event.keyCode){
                    case 0 :
                            console.log("pluspr");
                            $.mobile.changePage('#shelves',{transition: 'slidefade',reverse: true});
                            break;
                    case 13 :
                            savedata();
                            console.log("update IS");
                            break;
                }
            }else if(page=="countitem"){

                switch(event.keyCode){
                    case 13 :
                            console.log("insert IS item");
                            savestock();
                            break;
                }
            }

});

    document.addEventListener("backbutton", function(pr){
        if($.mobile.activePage.is('#countstock')){
            alertify.error("ท่านยังทำรายการไม่เสร็จ กรุณากดบันทึกรายการเพื่อทำรายการใหม่");
        }else if($.mobile.activePage.is('#shelves')){
                         backstock();
        }
    }, false);

