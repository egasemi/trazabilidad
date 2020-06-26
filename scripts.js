$(document).ready(function(){
    var rform = ""

    var requestURL = "https://spreadsheets.google.com/feeds/cells/1qDfmW1_zmA9zVq-dk8XV3YwREsJCUxFEcLAz37LwTPE/4/public/values?alt=json";
    var request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();

    request.onload = function(){
        $("#btn-dni").removeAttr('disabled');

        var hashs = [];
        var json = request.response.feed.entry;
        $.each(json, function(index, value){
            hashs.push(value.content.$t)

        })
        $("#btn-dni").click(function(){
            var hash = MD5($("#dni").val());
            if (hashs.includes(hash)) {
                $("#datos-personales").hide();
                $("#registro").show();
            } else {
                $("#datos-personales").show();
                $("#registro").hide();
            }
        })
        $("#registro").click(function(){
            window.open(rform + hash,'_blank');
        })
        //console.log(hashs);
    }

})