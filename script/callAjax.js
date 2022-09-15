//Ajax 함수
function callAjax(op,latitude,longitude,deviceID,fileUrl,fileId) {

    $.ajax({
        url: '/ajax',
        dataType: 'json',
        type: 'POST',
        data: { 
            msg : "test"
            , op : op
            , latitude : latitude
            , longitude : longitude
            , deviceID : deviceID
            , fileUrl : fileUrl
            , fileId : fileId
            //latitude,longitude,deviceID,fileUrl,fileId
        },
        success: function(result) {
            //테스트
            if ( result['result'] == "upload" ) {  
                uploaded.setAttribute("src",result['fileUrl']);
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