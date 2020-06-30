$(document).ready(function(){
    var rform = "https://docs.google.com/forms/d/e/1FAIpQLSeESHTkFduHquan3qz1qEuSZRz_cQNJxT3PZvewnVf01cUxcg/viewform?usp=pp_url&entry.1153636103="
    var dpform = "https://docs.google.com/forms/d/e/1FAIpQLSd1-kFHWyaEx4eBUNdsBfHE841HIAxSpaGBd2ZtkLidsT-9hg/viewform?usp=pp_url&entry.1029536374="
    var id_dni = ""

    var requestURLact = "https://spreadsheets.google.com/feeds/cells/1qDfmW1_zmA9zVq-dk8XV3YwREsJCUxFEcLAz37LwTPE/5/public/values?alt=json";
    var requestAct = new XMLHttpRequest();
    requestAct.open('GET', requestURLact);
    requestAct.responseType = 'json';
    requestAct.send();

    requestAct.onload = function(){
        var acts = [];
        var jsonAct = requestAct.response.feed.entry;
        $.each(jsonAct, function(index, value){
            acts.push(value.content.$t);
    })
    console.log(acts);
    $("#cargando").text("Elegir Actividad");
    $.each(acts,function(index, value){
        $("#cargando").before($("<option></option>").text(value));
    })
    }

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
            dni = $("#dni").val();
            hash = MD5(dni);
            act = $("#actividad").val();
            console.log(act);
            if (hashs.includes(hash)) {
                $("#datos-personales").hide();
                $("#registro").show();
            } else {
                $("#datos-personales").show();
                $("#registro").hide();
            }
        })
        $("#registro").click(function(){
            window.open(rform + hash + '&entry.888917016=' + act,'_blank');
            location.reload();
        })
        $("#datos-personales").click(function(){
            window.open(dpform + dni + "&entry.160733827=" + act,'_blank');
        })
        //console.log(hashs);
    }

})