$(document).ready(function () {

    if(hinfoVar)
    {
        $.ajax({
			url: 'hinfo.php?a=cname',
			data:{
						cid:hinfoVar.cid, 
						ctr:hinfoVar.ctr
				},
			type : 'POST',
			timeout: 5000,
            dataType: "json",
			success: function(json){
				
                $('.tipo_scuola').html(json.des);
                $('.descrizione_scuola').html(json.tit+' - '+json.place);
                
			},
			error: function(){
                
			}
		});
    }

});