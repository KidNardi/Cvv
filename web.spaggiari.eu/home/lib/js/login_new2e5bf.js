// 20171026-r.12
$(function(){

	var getCookie = function(cname)
	{
		var name = cname + "=";
		var decodedCookie = decodeURIComponent(document.cookie);
		var ca = decodedCookie.split(';');
		for(var i = 0; i <ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) == ' ') {
				c = c.substring(1);
			}
			if (c.indexOf(name) == 0) {
				return c.substring(name.length, c.length);
			}
		}
		return "";
	}
	
	var errorMsg = function(msgstr)
	{
		$('.rotella').hide();
		$('.error-message').find('p').html(msgstr);
		$('.error-message').slideDown();
	
		$('.check-auth').click( auth_check );
	
		setTimeout(function(){
			$('.error-message').slideUp();
			$('.error-message').find('p').html('');
		},5000);
	}
	
	var getProjectPhrase = function(proj) {
		if (proj=='cvv') {
            return 'Il nuovo numero di <span style="color:#CC1020;font-weight:bold;">Classeviva</span> è <span style="font-weight:bold;">0521 299300</span>';
        }
		else if (proj=='sdg') {
            return 'Il nuovo numero di <span style="color:#6EBB3B;font-weight:bold;">Segreteria Digitale</span> è <span style="font-weight:bold;">0521 299310</span>';
        }
		else if (proj=='pvb') {
            return 'Il nuovo numero di <span style="color:#303030;font-weight:bold;">Prima Visione Web</span> è <span style="font-weight:bold;">0521 299330</span>';
        }
		else if (proj=='oas') {
            return 'Il nuovo numero di <span style="color:#AAA;font-weight:bold;">Oggi a Scuola</span> è <span style="font-weight:bold;">0521 299360</span>';
        }
		else if (proj=='sct') {
            return 'Il nuovo numero di <span style="color:#5F3121;font-weight:bold;">Scuola e territorio</span> è <span style="font-weight:bold;">0521 299380</span>';
        }
		else if (proj=='acd') {
            return 'Il nuovo numero di <span style="color:#2E3771;font-weight:bold;">School Academy</span> è <span style="font-weight:bold;">0521 299350</span>';
        }
		else if (proj=='bmb') {
            return 'Il nuovo numero di <span style="color:#D9881C;font-weight:bold;">Bambini</span> è <span style="font-weight:bold;">0521 299320</span>';
        }
		else if (proj=='bbl') {
            return 'Il nuovo numero di <span style="color:#0070C0;font-weight:bold;">Bibl&ograve;</span> è <span style="font-weight:bold;">0521 299390</span>';
        }
		else if (proj=='sps') {
            return 'Il nuovo numero di <span style="color:#25753C;font-weight:bold;">Spaggiari Shop</span> è <span style="font-weight:bold;">0521 299370</span>';
        }
		else if (proj=='wsc') {
            return 'Il nuovo numero di <span style="color:#333;font-weight:bold;">Smart Connection</span> è <span style="font-weight:bold;">0521 299300</span>';
        }
		else{
            return 'Il nuovo numero è <span style="font-weight:bold;">0521 2992</span>';
        }
	} 	
	
	var is_pfolio=0;
	var webrole = getCookie("webrole");
	
	if (webrole!='userdoc' && webrole!=''){
		$('[name="login"]').val(getCookie("weblogin"));
	}
	
	if($('.error-message').find('p').text().length > 0){
		$('.error-message').slideDown();
		$('#login').val('');
		$('#login').focus();
		setTimeout(function(){
			$('.error-message').slideUp();
			$('.error-message').find('p').html('');
		},2000);		
	}	

	$('.box-selezione-progetto').click(function(){
		var custcode= $('#custcode').attr('value');
		if(custcode.length !== 0)
		{
			location.href = '?target=' + $(this).attr('data-target')+'&custcode='+custcode;
		}
		else
		{
			location.href = '?target=' + $(this).attr('data-target');
		}
		return false;
	});
	
	$('.expand').expander({
    	slicePoint: 550,
    	expandText: 'Leggi tutto',
    	userCollapseText: 'Chiudi',
    });
	
	$('.lingua2').click(function(){  
		$('#lang_selector').toggle();
		$(this).toggleClass('hover');
	});
	
	$('.accedi').click(function(){
		$('#login-container').slideToggle();
		$(this).toggleClass('hover');
	});
	
	$('.tastiera').click(function(){ 
		$("#tastiera-badge").slideToggle();  
		$('.passreminder').hide(); 
		$(this).hide();

	});

	$('.passreminder').click(function(){
		$('.mail-request').slideToggle(); 
	});
	$('.video-play').on('click',function(){
		$(".vimeo").toggle();
	});
	
	$('.div_img_pwd_dimenticata').click(function(){
		
		//$('.div_img_pwd_dimenticata').hide();
		
		if($(".video_pwd_dimenticata").is(':visible'))
		{
			src = "";
			$('#iframe_pwd_dimenticata').attr("src",src);
			$(".video_pwd_dimenticata").slideUp(200);
		}
		else
		{
			src = "https://player.vimeo.com/video/357518429?autoplay=1";
			$('#iframe_pwd_dimenticata').attr("src",src);
			$(".video_pwd_dimenticata").slideDown(200);
		}
		
	});
	
	var target_project = getCookie('LAST_REQUESTED_TARGET');
	var phrase = getProjectPhrase(target_project);
	//$('.vimeo').find('iframe').closest('.vimeo').prepend('<div class="slogan" align="center" style="font-weight:normal;color:#666;text-align:center;width:100%;margin-bottom:8px;font-size:16pt;">Abbiamo cambiato i nostri numeri di telefono personalizzandoli per progetto! '+phrase+'</div>');
	
	$('#login-container').css('max-height','750px');

	
	$('#login').focus();
	$('#login').keypress(function(e) {	
		if(e.which == 13) {
			$('.check-auth').click();	
		}	
	});

	$('#password').keypress(function(e) {	
		if(e.which == 13) {		
			$('.check-auth').click();	
		}	
	});
	
	$('#tastiera-badge input').click(function(){
		var val_click = $(this).val();
		$( "#pin" ).val( function( index, val ) {
		    return val + val_click;
		});  	
	});
	
	$('#canc-button').click(function(){
		$('#pin').val('');
	});

	if(localStorage.userName != null)
	{
		$('#login').val(localStorage.userName);
	}
	
	
	var auth_check = function()
	{
		$(this).unbind();

        $('.rotella').show();
        
        if (validateBadge($('[name="login"]').val()) || validateShortBadge($('[name="login"]').val())) 
        {
            valida_badge($('[name="login"]').val(),$('[name="pin"]').val(),0);	
        }
        else
        {
            if ( $('[name="login"]').val().trim().length==0 || $('[name="password"]').val().trim().length==0 )
            {
                errorMsg('Inserire utente e password');
                return false;
            }
            button=this;
			//console.log("AuthApi::authenticate-1");
            $.AuthApi({
                action: "authenticate",                  // action richiesta 
                authCid: $('[name="custcode"]').val(),   // codice cliente (opzionale)
                authLogin: $('[name="login"]').val(),    // login
                authPass: $('[name="password"]').val(),  // password
                authPin: $('[name="pin"]').val(),  // pin
                authAllowAccountChoice: false,
                onError: _onError,
                authCompleted: _authCompleted,
                onDialogOpen: _onDialogOpen
            });
        }
	
	}
	
    // richiesta login: inizio
    $('.check-auth').click( auth_check );
    // richiesta login: fine
    
    // richiesta logout: inizio 
    $('.logout').click(function(){
        $.AuthApi({
            action: "reset",
            resetCompleted: function(json){       // callback  
            },          
        });
    });
    // richiesta logout: fine

        $('#pwd-reminder-input').keypress(function(e){
            if(e.keyCode == 13){
                e.preventDefault();
            }
        });

	$('#inviamail').click(function(){
            var data=$('#pwd-reminder').serialize();
            $.post('/sso/app/default/sam.php?a=akRSPWRQ', data, function(res){
                if(res.status){
                    $('.error-message').find('p').html('Operazione conclusa. Controlla la tua posta.');
                    $('.mail-request').slideUp();
                }else{
                    $('.error-message').find('p').html(res.err);	
                }
                $('.error-message').slideDown();
                setTimeout(function(){
                    $('.error-message').slideUp();
                    $('.error-message').find('p').html('');
                },5000);			
            }, 'json');
            
            /*
		var email= $('[name="email"]').val();
		$.post('/sso/app/default/sam.php?a=akRSPWRQ', {eml: email }, function(res){
				if(res.status){
					$('.error-message').find('p').html('Operazione conclusa. Controlla la tua posta.');
					$('.mail-request').slideUp();
				}else{
						$('.error-message').find('p').html(res.err);	
				}
				$('.error-message').slideDown();
				setTimeout(function(){
					$('.error-message').slideUp();
					$('.error-message').find('p').html('');
				},5000);			
		}, 'json');
             */
	})
  

	var validateBadge = function(badge){  
		badge = badge.match(/^[a-fA-F0-9_]*$/);

		if( badge !== null){   
			if(badge.toString().length === 16){ 
				return true;
			}else{
				return false;		
			}	
		}
		else{ 
			return false;
		}
	}
	
	var validateShortBadge = function(badge){  
		badge = badge.match(/^[a-fA-F0-9]*$/);
		if( badge !== null){   
			if( (badge.toString().length === 8) && ($('[name="custcode"]').val()!="")  && ($('[name="password"]').val() =="") ){ 
				return true;
			}else{
				return false;				
			}
		}
		else{
			return false;
		}
	}	
		
	var valida_badge = function(bdg,pin,secondtry) {
				if(validateBadge(bdg)  || validateShortBadge(bdg))
				{
					$('.input_account').prop('type','password');
		// richiesta login badge : inizio
		
				if (validateShortBadge(bdg)) {
					bdg=bdg+'00000000';
				}
	
			$.AuthApi({
				action: "authenticate",                  // action richiesta 
				authCid: $('[name="custcode"]').val(),   // codice cliente (opzionale)
				authLogin: bdg,    // login
				authPass: "",  // password
				authPin:  pin,  // password
				authAllowAccountChoice: false,
				//authTarget: $('[name="target1"]').val(),  // target app/progetto (opzionale) 
				authCompleted: function(json){           // callback autenticazione (opzionale)
					if (!json.data.auth.loggedIn)
					{
						if (secondtry == 0) {
							if ( $('[name="custcode"]').val() == 'VRSP0045' || $('[name="custcode"]').val() == 'BRIT0004' ) {
								bdg = bdg.substring(6,8)+bdg.substring(4,6)+bdg.substring(2,4)+bdg.substring(0,2);
								valida_badge(bdg,pin,1);
								return false;
							}
						}
						
						$('.rotella').hide();
						var errore = json.data.auth.errors[0];
						$('.error-message').find('p').html(errore);
						$('.error-message').slideDown();
						setTimeout(function(){
							$('.error-message').slideUp();
							$('.error-message').find('p').html('');
						},5000);
						if (json.data.auth.verified)
						{
							if (json.data.auth.hints.retry !== undefined && json.data.auth.hints.retry == 'password'  ) {
								$('.error-message').find('p').html("Pin bloccato entrare con utente e password");
								$('.error-message').slideDown();
								$('#tastiera-badge').hide();
								$('.tastiera').show();
								$('.passreminder').show(); 
								$('.password-tastiera').show();
								$('.pin').hide();
								$('#login').select();
								setTimeout(function(){
									$('.error-message').slideUp();
									$('.error-message').find('p').html('');
								},5000);
							}
							
							if (json.data.auth.hints.retry !== undefined && json.data.auth.hints.retry == 'pin'  ) {
								$('#tastiera-badge').show();
								$('.tastiera').hide();
								$('.passreminder').hide(); 
								$('.password-tastiera').hide();
								$('.pin').show();
								$('#login').select();
							}
						}
					}
					else
					{
						//location.href= 'login_ok_redirect.php';
						$('form#fform').attr("action", 'login_ok_redirect.php'); 
						$('form#fform').submit(); 						
					}        
				},
				onDialogOpen: function(code, dialog){    // callback apertura dialog (opzionale)   
				}
			}); 
	
				}
				else
				{
					$('#tastiera-badge').hide(); 
					$('#password').show();
					$('.tastiera').show();
					$('.passreminder').show();
				}	
	
	}
	
	var _onError = function(xhr, status, error)
	{
		//console.log("_onError() :",xhr, status, error);
		
		var msgstr="Error: ";
		if (typeof error == "string" && error)
		{
			msgstr += error;
		}
		if (typeof xhr != "undefined" && xhr != null && xhr.status)
		{
			msgstr += ' '+xhr.status;
		}
		if (typeof status == "string")
		{
			if ( status.match(/^(timeout|session|exception)$/i) )
			{
				msgstr = "Si è verificato un problema con la connessione internet, si prega di riprovare! ("+status[0]+")";
			}
		}

		errorMsg(msgstr);
	}		
	
	var _onDialogOpen = function(code, dialog)  // callback apertura dialog (opzionale)
	{    
		//console.log("_onDialogOpen():", code, dialog);
		
		if(code=="changePasswordDialog"){
		
			// cambio posizionamento del dialog
			$(dialog).dialog( "option", "width", "520px" );
			$(dialog).css('width','500px');
			$(dialog).dialog( "option", "position", "center" );
			$(dialog).find('.header').css('background-color','#FFF').css('padding','10px').find('br').remove();
			$(dialog).find('.header').before('<div style="padding:10px;border-bottom:1px solid #666;">Password scaduta</div>');
			$(dialog).find('label').remove();
			$(dialog).find('.hint:last').remove();
			$(dialog).find('#aapi-dlg-pnew').css('width','250px').before('<br/><br/>');
			$(dialog).find('#aapi-dlg-rnew').css('width','250px')
			$(dialog).closest('.ui-dialog')
				.find('.ui-dialog-buttonpane')
				.css('border','none')
				.find('.ui-button')
				.css('background-color','#EEE')
				.css('width','100px')
				.css('border','1px solid #DDD');
				
			$(dialog).find('input').css('padding','5px').css('border','1px solid #CCC').css('border-radius','5px').css('color','#666');
			
			$(dialog).find('#aapi-dlg-user').val( $('#login').val() );
			$(dialog).find('#aapi-dlg-pold').val( $('#password').val() );
			
		}
		if(code=='accountChoiceDialog'){
			// not used
		}
	}
	
	var _authCompleted = function(json)
	{
	
		//console.log("_authCompleted() :", json);
	
            if (typeof json != "undefined" && json != null)
            {
				if (json.error !== undefined && json.error.length) {
					var xerr=json.error.toString();
					if (xerr.match(/^21[0-3]\/.*$/)) {
						// session-error-codes
						_onError(null, "session", xerr); 
					}else{
						// other-error-codes
						_onError(null, "exception", xerr);
					}
					return;
				}
			
                if (json.data !== undefined)
                {
                    if (!json.data.auth.loggedIn)
                    {
			
						if (json.data.auth.verified)
						{
							if (json.data.pfolio !== undefined && json.data.pfolio.fullList !== undefined && json.data.pfolio.fullList.length>1) {
								//Ho più di un profilo
								var xaccount ='';
								// carico il cookie dell identita
								var ck_id = getCookie("webidentity");
								//cilco tra tutte le identita
								$.each(json.data.pfolio.fullList, function() {								
									var uq_id= this.account_string;
								//se una identita e ugugale al cookie la imposto con xaccount
									if (ck_id==uq_id) {
										xaccount = this.account_string;
									}
								});
								//se non ho impostato un x account prendo il primo
								if (xaccount =='') {
									xaccount = json.data.pfolio.fullList[0].account_string;
								}
								is_pfolio=1;
								// seconda chiamata con il primo della lista
								//console.log("AuthApi::samauthenticate-1 ");
								$.AuthApi({
									action: "samauthenticate", // action richiesta 
									authLogin: xaccount,       // login
									onError: _onError, 
									authCompleted: _authCompleted,
									onDialogOpen: _onDialogOpen
								});
								
							}else{
								// TODO! nessun utente in portfolio: che fare ??
							}
						}else if (json.data.auth.errors!='') {
							if (json.data.auth.actionRequested == 'changePasswordDialog') {
								//code
							}else{
								var errore = json.data.auth.errors[0];
								if(parseInt($('[name="login"]').val())==$('[name="login"]').val()){
									errore = '<span style="font-size:14px;">Attenzione se prima usavate' +
									' il codice scuola e utente solo numerico ora il codice scuola' +
									' va scritto nel campo login seguito da un punto' +
									' e da utente numerico.  Esempio: MIXX0005.123456</span>';
								}
								errorMsg('Error: ' + errore);
							}
						}
                    }
                    else
                    {
						document.cookie = "weblogin="+  $('[name="login"]').val()+";path=/";
						// carico il cookie dell identita
						var webrole = getCookie("webrole");
						$('form#fform').attr("action", 'login_ok_redirect.php'); 
						$('form#fform').submit(); 													
                    }
                }
                else
                {
                    errorMsg('Errore non previsto (a)');
					return;
                }
            }
            else
            {
                errorMsg('Errore non previsto (b)');
				return;
            }
	}
  
  
});


