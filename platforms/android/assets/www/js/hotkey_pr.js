document.addEventListener("keydown", function(event) {
        console.log(event.keyCode);
        var page="";
        page = $.mobile.activePage.attr('id');
        console.log(page);

            if(page=="pagepr"){
                switch (event.keyCode){
                    case 0 :
                            console.log("pluspr");
                            sumdetail();
                            return false;
                            break;

                }
            }else if(page=="pluspr"){
                switch(event.keyCode){
                    case 13 :
                            console.log("add pr");
                            pluspr();

                            break;
                }
            }else if(page=="additem"){

                switch(event.keyCode){
                    case 13 :
                            console.log("add item");
                            clicksubmit();
                            break;
                }

            }

});

    document.addEventListener("backbutton", function(pr){
        if($.mobile.activePage.is('#listpr')){
               $.mobile.changePage("#pagepr",{transition: 'slidefade',reverse: true});
        }else if($.mobile.activePage.is('#pluspr')){
               backdetail();
        }else if($.mobile.activePage.is('#additem')){
               $.mobile.changePage("#pluspr",{transition: 'slidefade',reverse: true} );
        }
    }, false);

