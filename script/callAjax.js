//Ajax 함수
function callAjax(op) {

    $.ajax({
        url: '/ajax',
        dataType: 'json',
        type: 'POST',
        data: { 
            msg : "test"
            , op : op
        },
        success: function(result) {
            //테스트
            if ( result['result'] == "change" ) {  
                img_main.setAttribute("src","/images/"+result['filename']);
            }else if( result['result'] == "face1" ) {
                span_sub.className = "bold";
                span_sub.innerText = "밥줘!!";
                img_cat.setAttribute("src","/images/"+imgFolder+"/cat_angry.png");
                callAjax("idle");
            }
            
        } //function끝
    }).done(function(response) {
        //alert("success");
    }).fail(function(response, txt, e) {
        //alert("fail");
    }); // ------      ajax 끝-----------------
}