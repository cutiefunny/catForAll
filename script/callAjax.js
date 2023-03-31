//Ajax 함수
function callAjaxImage(op,data) {

    $.ajax({
        url: '/ajax',
        dataType: 'json',
        type: 'POST',
        data: { op : op
            , link : data.link
            , deletehash : data.deletehash
            , createTm : data.createTm
            , lat : data.lat
            , long : data.long
            , address : data.address
            , deviceID : data.deviceID
        },
        success: function(result) {
            //테스트
            if ( result['result'] == "uploadImage" ) {  
                 
            }
            location.reload();
        } //function끝
    }).done(function(response) {
        //alert("success");
    }).fail(function(response, txt, e) {
        //alert("fail");
    }); // ------      ajax 끝-----------------
}