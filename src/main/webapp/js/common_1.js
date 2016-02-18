
   	function isFormat(data) {
		re = /[A-Za-z0-9]*[A-Za-z0-9]$/;
		
		if (re.test(data)) {
			return  true;
		}
		
		return  false;
	}
	function js_isFormat(obj) {
		re = /[A-Za-z0-9]*[A-Za-z0-9]$/;
		var data = obj.value;
		if (re.test(data)) {
			return;
		}
		obj.value = "";
	}       
	function setCookie( name, value ){
		var todayDate = new Date();
		todayDate.setDate( todayDate.getDate() + (60*60*24*365));
		document.cookie = name + "=" + escape( value ) + "; path=/; expires=" + todayDate.toGMTString() + ";"
	}
	
	function setCookieOne( name, value ){
		var todayDate = new Date();
		todayDate.setDate( todayDate.getDate() + (60*60*24));
		document.cookie = name + "=" + escape( value ) + "; path=/; expires=" + todayDate.toGMTString() + ";"
	}
	
	function getCookie(name){
		var coki;
		var idx = document.cookie.indexOf(name+'=');
		
		if (idx != -1) {
			idx += name.length + 1;
			to_idx = document.cookie.indexOf(';', idx);
			
			if (to_idx == -1) {
				to_idx = document.cookie.length;
			}		
			coki = document.cookie.substring(idx, to_idx);
		} else {
		 coki = "";
		}
		return coki;
	}
	
	function js_PopResize(width, height){
		var top, left;
		top	 = screen.height/2 - height/2 - 50;
		left = screen.width/2 - width/2 ;
		window.moveTo(left, top);
		window.resizeTo(width, height);
	}
	/*-------------------------------------------------------------------------
 	Spec      : Open Window�� ��ũ�� �߾� ��ġ ó��
 	Parameter : url    -> �ش� ������
	Parameter : name   -> �ش� Window Name
	Parameter : width  -> Window Width Size
	Parameter : height -> Window Heigth Size
	Parameter : scroll -> Window Scroll
	Parameter : loc    -> Window Location(null�� �ƴϸ� Center)
	Example   : a href="jsOpenWindow()";
	-------------------------------------------------------------------------*/
	function jsOpenWindow(url, name, width, height, scroll, loc){
		var top, left;
		if(scroll == null || scroll == '')	scroll='0';
		if(loc != null) {
			top	 = screen.height/2 - height/2 - 50;
			left = screen.width/2 - width/2 ;
		} else {
			top  = 10;
			left = 10;
		}
		var	option = 'width='+width+',height='+height+',top='+top+',left='+left+',resizable=no,location=no,status=no,toolbar=no,menubar=no,scrollbars=' + scroll;
	   	var win = window.open(url, name, option);
	   	return win;
	}

	function dodacheck(val) {
		var mikExp = /[ \{\}\[\]\/?.,;:|\)*~`!^\-_+��<>@\#$%&\'\"\\\(\=]/gi;
		var strPass = val.value;
		var strLength = strPass.length;
		var lchar = val.value.charAt((strLength) - 1);
		    if(lchar.search(mikExp) != -1) {
		
		var tst = val.value.substring(0, (strLength) - 1);
		    val.value = tst;
		   }
	}
	function dodaNumber(val) {
        re = /[0-9]*[0-9]$/;
		var strPass = val.value;
		var strLength = strPass.length;
        if (re.test(strPass)) {
			var tst = val.value.substring(0, (strLength) - 1);
		    val.value = tst;
        }
    }	
    /**
     * ���ڿ��� byte length�� ��´�.
     *
     * @param   str ���ڿ�
     * @return  byte length
     * @author  marie
     */
     
    function jsByteLength(str) {
        if (str == "") {
            return  0;
        }

        var len = 0;

        for (var i = 0; i < str.length; i++) {
            if (str.charCodeAt(i) > 128) {
                len++;
            }
            len++;
        }

        return  len;
    }

    /**
     * Object�� ���� �����Ѵ�.
     *
     * @param   obj
     * @param   value
     */
    function jsSetValue(obj, value) {
        if (obj) {
            if (obj.type == "text") {
                obj.value = value;
            } else if (obj.tagName == "SELECT") {
                for (var i = 0; i < obj.length; i++) {
                    if (obj.options[i].value == value) {
                        obj.options[i].selected = true;
                        break;
                    }
                }
            }
        }
    }
     /**
     * �ܱ��� �ֹε�Ϲ�ȣ�� üũ�Ѵ�.
     *
     * @param   str �ֹε�Ϲ�ȣ
     * @return  true - �ùٸ� ��ȣ
     *          false - Ʋ�� ��ȣ
     */
    function jsCheckJumin3(obj) {
        
		var str = deleteHyphen(obj.value);  // �ʵ忡 �ִ� �ֹι�ȣ���� '-'����

        if( !jsCheckJumin2(str) ) {
            alert("�߸��� �ֹε�Ϲ�ȣ�Դϴ�.")
            obj.value="";
            //obj.focus();
            if (window.event) {
                window.event.returnValue = false;
            }
            return  false;
        }

        obj.value = str;
        return  true;
    }
   /**
     * �ܱ��� �ֹε�Ϲ�ȣ�� üũ�Ѵ�.
     *
     * @param   str �ֹε�Ϲ�ȣ
     * @return  true - �ùٸ� ��ȣ
     *          false - Ʋ�� ��ȣ
     */
    function jsCheckJumin2(str) {
        var tmp = 0;
        var sex = str.substring(6, 7);
        var birthday;

        if (str.length != 13) {
            return  false;
        }

        if (sex == 5 || sex == 6) {
            birthday = "19" + str.substring(0, 6);
        } else if (sex == 7  || sex == 8) {
            birthday = "20" + str.substring(0, 6);
        } else {
            return  false;
        }

        if (!isDate(birthday)) {
            return  false;
        }
		var digit = 0;
		var digset = "234567892345";
	
		for(var n=0; n < 12; n++)
			digit += parseInt(str.charAt(n),10) * parseInt(digset.charAt(n), 10);
	
		digit = digit % 11;
		digit = 11 - digit;
		if (digit >= 10) digit -= 10;
	    digit += 2;
	    if (digit >= 10) digit -= 10;
	    if(digit != parseInt(str.charAt(12),10)){
			return false;
	    }
	    return  true;
    }
    function jsCheckJumin3(value) {
		var pattern = /^([0-9]{6})-?([0-9]{7})$/;
		var num = value;
	
		if (!pattern.test(num)) return false;
		num = RegExp.$1 + RegExp.$2;
		var digit = 0;
		var digset = "234567892345";
	
		for(var n=0; n < 12; n++)
			digit += parseInt(num.charAt(n),10) * parseInt(digset.charAt(n), 10);
	
	
		digit = digit % 11;
		digit = 11 - digit;
	
		if(num.charAt(6) == '5' || num.charAt(6) == '6' || num.charAt(6) == '7' || num.charAt(6) == '8'){
			if (digit >= 10) digit -= 10;
		    digit += 2;
		    if (digit >= 10) digit -= 10;
		    if(digit != parseInt(num.charAt(12),10)){
		    	return false
		    }
		} else {
			digit = digit % 10;
			if(digit != parseInt(num.charAt(12),10)){
				return false
			}	
		}
		return true;
	}
    /**
     * �ֹε�Ϲ�ȣ�� üũ�Ѵ�.
     *
     * @param   obj �ֹε�Ϲ�ȣ �ʵ�
     * @return  true - �ùٸ� ��ȣ
     *          false - Ʋ�� ��ȣ
     */
    function jsCheckJumin1(obj) {
        var str = deleteHyphen(obj.value);  // �ʵ忡 �ִ� �ֹι�ȣ���� '-'����

        if( !jsCheckJumin(str) ) {
            alert("�߸��� �ֹε�Ϲ�ȣ�Դϴ�.")
            obj.value="";
            //obj.focus();
            if (window.event) {
                window.event.returnValue = false;
            }
            return  false;
        }

        obj.value = str;
        return  true;
    }

    /**
     * �ֹε�Ϲ�ȣ�� üũ�Ѵ�.
     *
     * @param   str �ֹε�Ϲ�ȣ
     * @return  true - �ùٸ� ��ȣ
     *          false - Ʋ�� ��ȣ
     */
    function jsCheckJumin(str) {
        var tmp = 0;
        var sex = str.substring(6, 7);
        var birthday;

        if (str.length != 13) {
            return  false;
        }

        if (sex == 1 || sex == 2) {
            birthday = "19" + str.substring(0, 6);
        } else if (sex == 3  || sex == 4) {
            birthday = "20" + str.substring(0, 6);
        } else {
            return  false;
        }

        if (!isDate(birthday)) {
            return  false;
        }

        for (var i = 0; i < 12 ; i++) {
            tmp = tmp + ((i%8+2) * parseInt(str.substring(i,i+1)));
        }

        tmp = 11 - (tmp %11);
        tmp = tmp % 10;

        if (tmp != str.substring(12, 13)) {
            return  false;
        }

        return  true;
    }

    /**
     * �ֹι�ȣ�� üũ�Ѵ�.
     *
     * @param       �ֹι�ȣ(���ڸ����ڸ� ��ģ)
     * @param       �ֹι�ȣ ���ڸ�
     * @param       �ֹι�ȣ ���ڸ�
     * @param       �������� �̵��� ��Ŀ��
     * @author      ������
     * @since       2003-12-04
     */
    function checkJuminNo(juminNo, juminNo1, juminNo2, nextFocus)
    {
        var form    = document.form1;
        var flag    = true;

        var juminNoElm  = eval(form.elements[juminNo]);
        var juminNo1Elm     = eval(form.elements[juminNo1]);
        var juminNo2Elm     = eval(form.elements[juminNo2]);
        var nextFocusElm    = eval(form.elements[nextFocus]);
        //alert("juminNo ::"+ juminNoElm.value +"/ juminNo1 ::"+ juminNo1Elm.value +"/ juminNo2 ::"+ juminNo2Elm.value +"/ nextFocus ::"+ nextFocusElm.value);

        if(juminNo2Elm.value == "" || juminNo2Elm.value.length < 7)
        {
            jsRange(7, 7);
            juminNo2Elm.focus();
            return;
        }

        if(!jsCheckJumin(juminNo1Elm.value + juminNo2Elm.value)) 
        {
            alert("�߸��� �ֹι�ȣ�Դϴ�.");
            juminNo1Elm.value = "";
            juminNo2Elm.value = "";
            juminNo1Elm.focus();
        }
        else
        {
            juminNoElm.value    = juminNo1Elm.value + juminNo2Elm.value;
            nextFocusElm.focus();
        }
    }
    /**
     * ���� ���ڷθ� �̷���� �ִ��� üũ �Ѵ�.
     *
     * @param   num
     * @return  boolean
     */
    function isNumber(num) {
        re = /[0-9]*[0-9]$/;

        if (re.test(num)) {
            return  true;
        }

        return  false;
    }

    /**
     * ���� üũ
     *
     * 1. +, - ��ȣ�� �����ϰų� ���� �� �ִ� : ^[\+-]?
     * 2. 0���� 9���� ���ڰ� 0�� �̻� �� �� �ִ� : [0-9]*
     * 3. �������� ���ڷ� ������ �Ѵ� : [0-9]$
     *
     * @param   num
     * @return  boolean
     */
    function isInteger(num) {
        re = /^[\+-]?[0-9]*[0-9]$/;

        if (re.test(num)) {
            return  true;
        }

        return  false;
    }

    /**
     * ������ üũ
     *
     * 1. +, - ��ȣ�� �����ϰų� ���� �� �ִ� : ^[\+-]?
     * 2. 0���� 9���� ���ڰ� 0�� �̻� �� �� �ִ� : [0-9]*
     * 3. �Ҽ����� ���� �� �ִ� : [.]?
     * 4. �Ҽ��� ���� �ڸ��� 0���� 9���� ���ڰ� �� �� �ִ� : [0-9]*
     * 5. �������� ���ڷ� ������ �Ѵ� : [0-9]$
     *
     * @param   num
     * @return  boolean
     */
    function isFloat(num) {
        re = /^[\+-]?[0-9]*[.]?[0-9]*[0-9]$/;

        if (re.test(num)) {
            return  true;
        }

        return  false;
    }

    /**
     * �̸��� üũ
     *
     * @param   email
     * @return  boolean
     */
    function isEmail(email) {
        re = /[^@]+@[A-Za-z0-9_-]+[.]+[A-Za-z]+/;

        if (re.test(email)) {
            return  true;
        }

        return  false;
    }

    /**
     * �̸��� �ּ� üũ - �����ϰ�
     */
    function emailCheck(emailStr) {
        var checkTLD=1;
        var knownDomsPat=/^(com|net|org|edu|int|mil|gov|arpa|biz|aero|name|coop|info|pro|museum)$/;
        var emailPat=/^(.+)@(.+)$/;
        var specialChars="\\(\\)><@,;:\\\\\\\"\\.\\[\\]";
        var validChars="\[^\\s" + specialChars + "\]";
        var quotedUser="(\"[^\"]*\")";
        var ipDomainPat=/^\[(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})\]$/;
        var atom=validChars + '+';
        var word="(" + atom + "|" + quotedUser + ")";
        var userPat=new RegExp("^" + word + "(\\." + word + ")*$");
        var domainPat=new RegExp("^" + atom + "(\\." + atom +")*$");
        var matchArray=emailStr.match(emailPat);

        if (matchArray==null) {
            alert("�̸��� �ּҰ� ��Ȯ���� �ʽ��ϴ� (üũ @ and .'s)");
            return false;
        }
        var user=matchArray[1];
        var domain=matchArray[2];
        for (i=0; i<user.length; i++) {
            if (user.charCodeAt(i)>127) {
                alert("�߸��� �̸��� �ּҸ� �Է� �ϼ̽��ϴ�.");
                return false;
            }
        }
        for (i=0; i<domain.length; i++) {
            if (domain.charCodeAt(i)>127) {
                alert("������ �̸��� �߸� ���� �Ǿ����ϴ�.");
                return false;
            }
        }
        if (user.match(userPat)==null) {
            alert("�̸��� �ּҰ� �ƴմϴ�.");
            return false;
        }
        var IPArray=domain.match(ipDomainPat);
        if (IPArray!=null) {
            for (var i=1;i<=4;i++) {
                if (IPArray[i]>255) {
                    alert("IP�ּҰ� Ʋ���ϴ�!");
                    return false;
                }
            }
            return true;
        }
        var atomPat=new RegExp("^" + atom + "$");
        var domArr=domain.split(".");
        var len=domArr.length;
        for (i=0;i<len;i++) {
            if (domArr[i].search(atomPat)==-1) {
                alert("������ �� ���� ���� �ʽ��ϴ�.");
                return false;
            }
        }
        if (checkTLD && domArr[domArr.length-1].length!=2 && 
            domArr[domArr.length-1].search(knownDomsPat)==-1) {
            alert("�˷��� �������� ���� �����մϴ�." + "country.");
            return false;
        }
        if (len<2) {
        alert("Hostname�� Ʋ���ϴ�. !");
        return false;
        }

        return true;
    }

    /**
     * ��¥ üũ
     *
     * @param   date
     * @return  boolean
     */
    function isDate(date) {
        if (date == null || date.length != 8) {
            return  false;
        }

        if (!isNumber(date)) {
            return  false;
        }

        var year = eval(date.substring(0, 4));
        var month = eval(date.substring(4, 6));
        var day = eval(date.substring(6, 8));

		if(year == "0000") {
			return false;
		}

        if (month > 12 || month == "00") {
            return  false;
        }

        var totalDays;

        switch (eval(month)){

            case 1 :
                totalDays = 31;
                break;
            case 2 :
                if (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0))
                    totalDays = 29;
                else
                    totalDays = 28;
                break;
            case 3 :
                totalDays = 31;
                break;
            case 4 :
                totalDays = 30;
                break;
            case 5 :
                totalDays = 31;
                break;
            case 6 :
                totalDays = 30;
                break;
            case 7 :
                totalDays = 31;
                break;
            case 8 :
                totalDays = 31;
                break;
            case 9 :
                totalDays = 30;
                break;
            case 10 :
                totalDays = 31;
                break;
            case 11 :
                totalDays = 30;
                break;
            case 12 :
                totalDays = 31;
                break;
        }

        if (day > totalDays) {
            return  false;
        }

        if (day == "00") {
            return  false;
        }

        return  true;
    }

    /**
     * ������ ��ȿ���� üũ�Ѵ�.
     *
     * @param   form
     */
    function validate(form) {
        var obj;
        var dispName;
        var dataType;
        var minValue;
        var maxValue;
        var len;
        var lenCheck;
        var lenMCheck;
        var isValid;
        var value;
        for (i = 0; i < form.elements.length; i++) {
            obj = form.elements(i);
            
        if(obj.name != ""){ //�̸��� �ִ� ��츸 üũ��.(2004.10.26 suna)
            	obj.value = trim(obj.value);
         	
            dispName 		= obj.getAttribute("dispName");
            dataType 		= obj.getAttribute("dataType");
            minValue 		= obj.getAttribute("minValue");
            maxValue 		= obj.getAttribute("maxValue");
            len      		= obj.getAttribute("len");
            lenCheck 		= obj.getAttribute("lenCheck");		//�ִ� �ڸ���
            lenMCheck 		= obj.getAttribute("lenMCheck");	//�ּ� �Է��ڸ���

            value = obj.value;
            
            if (dispName == null) {
                dispName = obj.name;
            }

            // �ʼ� �Է� �׸� üũ
            if (obj.getAttribute("notNull") != null) {
                isValid = false;

                if (obj.type == "radio" || obj.type == "checkbox") {
                    if (form.elements(obj.name).length) {
                        for (j = 0; j < form.elements(obj.name).length; j++) {
                            if (form.elements(obj.name)[j].checked) {
                                isValid = true;
                                break;
                            }
                        }
                    } else {
                        if (obj.checked) {
                            isValid = true;
                        }
                    }
                } else {
                    if (value != "") {
                        isValid = true;
                    } else {
                        if (obj.getAttribute("comma") != null) {
                            obj.value = 0;
                            isValid = true;
                        }
                    }
                }

                if (!isValid) {
                    alert(dispName + "��(��) �Է��Ͻʽÿ�.");
                    obj.focus();
                    if (window.event) {
                        window.event.returnValue = false;
                    }
                    return  false;
                }
            }
             



            // ������ ���� üũ
            if (len != null) {
                if (value.length != eval(len)) {
                    alert(dispName + "��(��) " + len + "�ڸ��� �Է��ؾ� �մϴ�.");
                    obj.focus();
                    if (window.event) {
                        window.event.returnValue = false;
                    }
                    return  false;
                }
            }
            
           if(lenCheck != null )
            {
            	
              if( jsByteLength(value) > eval(lenCheck) )
                {
                  alert(dispName + "��(��) " + lenCheck + " �ڸ��� ������ �����ϴ� ���� ���ڼ�("+jsByteLength(value)+")");
                  obj.value = value;
                  obj.focus();
                  if(window.event)
                    {
                       window.event.returnValue = false;
                    }
                
                    return false;
                }
               
            }            
            
            // �ּ� �Է��ڸ��� üũ(2004.07.21 �߰�     �ۼ��� : �ڱ���)
            if(lenMCheck != null) {
            	if(value.length < eval(lenMCheck)) {
            		alert(dispName + "��(��) " + lenMCheck + " �ڸ��� �̻� �Է��ϼž� �մϴ�.");
            		obj.focus();
            		if(window.event)
            			window.event.returnValue = false;
            		
            		return false;
            	}
            }

            if (obj.type == "text") {
                // ������ Ÿ�� üũ
                if (dataType == null) { // 2002.01.30 �߰�
                    //if (obj.readOnly == false && jsByteLength(value) > obj.maxLength) {
                    if (obj.readOnly == false && (getLength(value)/2) > obj.maxLength) {
                        alert(dispName + " ���̰� " + obj.maxLength + " ��(��) �ѽ��ϴ�.");
                        obj.focus();
                        if (window.event) {
                            window.event.returnValue = false;
                        }

                        return  false;
                    }
                } else if ((value != "") && (dataType != null)) {
                    isValid = true;
                    checkValue = false;

                    if (dataType == "date") {
                        value = deleteDateFormatStr(value);
                        isValid = isDate(value);
                        checkValue = true;
                    } else if (dataType == "email") {
                        isValid = isEmail(value);
                        
                    } else if (dataType == "float") {
                        value = deleteCommaStr(value);
                        isValid = isFloat(value);
                        checkValue = true;
                    } else if (dataType == "integer") {
                        value = deleteCommaStr(value);
                        isValid = isInteger(value);
                        checkValue = true;
                    } else if (dataType == "number") {
                        value = deleteCommaStr(value);
                        isValid = isNumber(value);
                        checkValue = true;
                    } else if (dataType == "double") {
                        value = deleteCommaStr(value);
                        isValid = isNumber(value);
                        checkValue = true;
                    }

                    if (!isValid) {
                        alert(dispName + " ������ �ùٸ��� �ʽ��ϴ�.");
                        if (dataType == "float" || dataType == "integer" || dataType == "number" || dataType == "double") {
                            obj.value = "0";
                        }
                        obj.focus();
                        if (window.event) {
                            window.event.returnValue = false;
                        }
                        return  false;
                    }

                    if (checkValue) {
                        if (minValue != null) {
                            if (eval(minValue) > eval(value)) {
                                alert(dispName + " ���� �ּҰ�(" + minValue + ") �̻��Դϴ�.");
                                obj.focus();
                                if (window.event) {
                                    window.event.returnValue = false;
                                }
                                return  false;
                            }
                        }

                        if (isValid && (maxValue != null)) {
                            if (eval(maxValue) < eval(value)) {
                                alert(dispName + " ���� �ִ밪(" + maxValue + ")�� �ʰ��մϴ�.");
                                obj.focus();
                                if (window.event) {
                                    window.event.returnValue = false;
                                }
                                return  false;
                            }
                        }
                    }
                }
            }
         }
      }
        return  true;
    }

    /**
     * ���ڿ� comma�� ���δ�.
     *
     * @param   obj
     */
    function addComma(obj) {
        obj.value = trim(obj.value);
        var value = obj.value;

        if (value == "") {
            return;
        }

        value = deleteCommaStr(value);

        if (!isFloat(value)) {
            dispName = obj.getAttribute("dispName");

            if (dispName == null) {
                dispName = "";
            }

            alert(dispName + " ������ �ùٸ��� �ʽ��ϴ�.");
            obj.value = "0";
            obj.focus();
            if (window.event) {
                window.event.returnValue = false;
            }
            return;
        }

        obj.value = addCommaStr(value);
    }

    /**
     * ���ڿ� comma�� ���δ�.
     */
    function addComma2() {
        var obj = window.event.srcElement;
        addComma(obj);
    }

    /**
     * ���ڿ� comma�� ���δ�.
     *
     * @param   str
     */
    function addCommaStr(str) {
        var rxSplit = new RegExp('([0-9])([0-9][0-9][0-9][,.])');
        var arrNumber = str.split('.');
        arrNumber[0] += '.';
        do {
            arrNumber[0] = arrNumber[0].replace(rxSplit, '$1,$2');
        } while (rxSplit.test(arrNumber[0]));

        if (arrNumber.length > 1) {
            replaceStr = arrNumber.join("");
        } else {
            replaceStr = arrNumber[0].split(".")[0];
        }
        return replaceStr;
    }

    /**
     * ���ڿ��� comma�� ���ش�.
     *
     * @param   obj
     */
    function deleteComma(obj) {
        obj.value = deleteCommaStr(obj.value);
    }

    /**
     * ���ڿ��� comma�� ���ش�.
     */
    function deleteComma2() {
        var obj = window.event.srcElement;
        deleteComma(obj);
        obj.select();
    }

    /**
     * ���ڿ��� comma�� ���ش�.
     *
     * @param   str
     */
    function deleteCommaStr(str) {
        var temp = '';

        for (var i = 0; i < str.length; i++) {
            if (str.charAt(i) == ',') {
                continue;
            } else {
                temp += str.charAt(i);
            }
        }

        return  temp;
    }

    /**
     * ��¥�� "-"�� ���δ�.
     *
     * @param   obj
     */
    function addDateFormat(obj) {
        var value = obj.value;

        if (trim(value) == "") {
            return;
        }

        value = deleteDateFormatStr(value);

        if (!isDate(value)) {
            dispName = obj.getAttribute("dispName");

            if (dispName == null) {
                dispName = "";
            }

            alert(dispName + " ������ �ùٸ��� �ʽ��ϴ�.");
            obj.value='';
            obj.focus();

            return;
        }

        obj.value = addDateFormatStr(value);
    }

    /**
     * ��¥(���)�� "-"�� ���δ�.
     *
     * @param   obj
     */
    function addYmFormat(obj) {
        var value = obj.value;

        if (trim(value) == "") {
            return;
        }

        value = deleteDateFormatStr(value);

        if (!isDate(value + "01")) {
            dispName = obj.getAttribute("dispName");

            if (dispName == null) {
                dispName = "";
            }

            alert(dispName + " ������ �ùٸ��� �ʽ��ϴ�.");
            obj.focus();

            return;
        }

        obj.value = addYmFormatStr(value);
    }
    
    /**
     * ��¥�� "-"�� ���δ�.
     */
    function addDateFormat2() {
        var obj = window.event.srcElement;
        addDateFormat(obj);
    }

    /**
     * ��¥�� "-"�� ���δ�.
     */
    function addYmFormat2() {
        var obj = window.event.srcElement;
        addYmFormat(obj);
    }

    /**
     * ��¥�� "-"�� ���δ�.
     *
     * @param   str
     */
    function addDateFormatStr(str) {
        return  str.substring(0, 4) + "-" + str.substring(4, 6) + "-" + str.substring(6, 8);
    }

    /**
     * ��¥(���)�� "-"�� ���δ�.
     *
     * @param   str
     */
    function addYmFormatStr(str) {
        return  str.substring(0, 4) + "-" + str.substring(4, 6);
    }

    /**
     * ��¥���� "-"�� ���ش�.
     *
     * @param   obj
     */
    function deleteDateFormat(obj) {
        obj.value = deleteDateFormatStr(obj.value);
    }

    /**
     * ��¥���� "-"�� ���ش�.
     */
    function deleteDateFormat2() {
        var obj = window.event.srcElement;
        deleteDateFormat(obj);
        obj.select();
    }

    /**
     * ��¥���� "-"�� ���ش�.
     *
     * @param   str
     */
    function deleteDateFormatStr(str) {
        var temp = '';

        for (var i = 0; i < str.length; i++) {
            if (str.charAt(i) == '-') {
                continue;
            } else {
                temp += str.charAt(i);
            }
        }

        return  temp;
    }

    /**
     * trim
     *
     * @param   text
     * @return  string
     */
    function trim(text) {
    	if (text == "") {
            return  text;
        }

        var len = text.length;
        var st = 0;

        while ((st < len) && (text.charAt(st) <= ' ')) {
            st++;
        }

        while ((st < len) && (text.charAt(len - 1) <= ' ')) {
            len--;
        }

        return  ((st > 0) || (len < text.length)) ? text.substring(st, len) : text;
    }

    /**
     * ltrim
     *
     * @param   text
     * @return  string
     */
    function ltrim(text) {
        if (text == "") {
            return  text;
        }

        var len = text.length;
        var st = 0;

        while ((st < len) && (text.charAt(st) <= ' ')) {
            st++;
        }

        return  (st > 0) ? text.substring(st, len) : text;
    }

    /**
     * rtrim
     *
     * @param   text
     * @return  string
     */
    function rtrim(text) {
        if (text == "") {
            return  text;
        }

        var len = text.length;
        var st = 0;

        while ((st < len) && (text.charAt(len - 1) <= ' ')) {
            len--;
        }

        return  (len < text.length) ? text.substring(st, len) : text;
    }

    /**
     * �̺�Ʈ �ڵ鷯�� ����Ѵ�.
     */
    function setEventHandler() {
        for (i = 0; i < document.forms.length; i++) {

            var elements = document.forms(i).elements;

            for (j = 0; j < elements.length; j++) {
                // INPUT ��ü�� onblur �̺�Ʈ�� �ڵ鷯�� ����Ѵ�.
                if (elements(j).tagName == "INPUT") {

                    dataType = elements(j).getAttribute("dataType");

                    if (dataType == "date") {
                        elements(j).onblur = addDateFormat2;
                        elements(j).onfocus = deleteDateFormat2;
                        addDateFormat(elements(j));
                    } else if (dataType == "number" || dataType == "integer" || dataType == "float" || dataType == "double") {
                        if (elements(j).getAttribute("comma") != null) {
                            elements(j).onblur = addComma2;
                            elements(j).onfocus = deleteComma2;
                            addComma(elements(j));
                        }
                    } else if (dataType == "yyyymm") {
                        elements(j).onblur = addYmFormat2;
                        elements(j).onfocus = deleteDateFormat2;
                        addYmFormat(elements(j));
                    }
                }
            }
        }
    }

    /**
     * �ڸ����� �ּҰ�, �ִ밪
     *
     * �ּҰ��� üũ : jsRange(2, -1)
     * �ִ밪�� üũ : jsRange(-1, 10)
     * �ּҰ�, �ִ밪 ��� üũ : jsRange(2, 10)
     * �ּҰ�, �ִ밪 �Ѵ� üũ ���� : jsRange(-1, -1)
     * 
     */
    function jsRange(minValue, maxValue)
    {
        jsMinLength(minValue);
        jsMaxLength(maxValue);
    }
	function js_Str_ChkSub(max,Object){
		var byteLength = 0;
        var dispName    = Object.getAttribute("dispName");
		var rtnStr = "";	// ���ڿ��� �߶� �Է��ʵ忡 �ִ´�
		var Len = jsByteLength(Object.value);
		if(Len > max){
            alert(dispName +"��(��) �ִ� "+ max +"��(Byte)���� �����մϴ�.\n\n������ "+(Len-max)+"��(Byte)�� �����˴ϴ�.");

			for (var inx = 0; inx < Object.value.length; inx++) {
				var oneChar1 = Object.value.charAt(inx)
				var oneChar = escape(oneChar1);
				if ( oneChar.length == 1 )
					byteLength ++;
				else if (oneChar.indexOf("%u") != -1)
					byteLength += 2;
				else if (oneChar.indexOf("%") != -1)
					byteLength += oneChar.length/3;
	
				rtnStr+=oneChar1;
	
				if(byteLength >= max) break;
				else if((byteLength+1) >= max)
					if (escape(Object.value.charAt(inx+1)).indexOf("%u") != -1) break;
			
		    }//end for
		    
			Object.value = rtnStr;
	
		}else {
		}
	
	}
	// ���� ����.. (dispName�� �ѱ� �������� 30��(���� 60��)���� �Է°����մϴ�.)
	function js_Str_ChkSub_edit(max,Object){
		var byteLength = 0;
        var dispName    = Object.getAttribute("dispName");
		var rtnStr = "";	// ���ڿ��� �߶� �Է��ʵ忡 �ִ´�
		var Len = jsByteLength(Object.value);
		if(Len > max){
            alert(dispName +"��(��) �ѱ� ��������  "+ max/2 +"��(���� "+max+"��)���� �Է°����մϴ�.\n\n������ "+(Len-max)+"��(Byte)�� �����˴ϴ�.");

			for (var inx = 0; inx < Object.value.length; inx++) {
				var oneChar1 = Object.value.charAt(inx)
				var oneChar = escape(oneChar1);
				if ( oneChar.length == 1 )
					byteLength ++;
				else if (oneChar.indexOf("%u") != -1)
					byteLength += 2;
				else if (oneChar.indexOf("%") != -1)
					byteLength += oneChar.length/3;
	
				rtnStr+=oneChar1;
	
				if(byteLength >= max) break;
				else if((byteLength+1) >= max)
					if (escape(Object.value.charAt(inx+1)).indexOf("%u") != -1) break;
			
		    }//end for
		    
			Object.value = rtnStr;
	
		}else {
	
		}
	
	}
	
	// �ٸ� �������� iframe �������� ����� ���� ���̱� ������. 
	function js_Str_ChkSub_edit_content(max,Object){
		var byteLength = 0;
        var dispName    = Object.getAttribute("dispName");
		var rtnStr = "";	// ���ڿ��� �߶� �Է��ʵ忡 �ִ´�
		var Len = jsByteLength(Object.value);
		if(Len > max){
            alert(dispName +"��(��) �ѱ� ��������  "+ max/2 +"��(���� "+max+"��)���� �Է°����մϴ�.\n\n������ "+(Len-max)+"��(Byte)�� �����ϼž� �մϴ�.");
			return false;
	
		}else {
			return true;
		}
	
	}
	
	
	
    /**
     * �ִ밪
     */
    function jsMaxLength(maxValue)
    {
        var obj         = window.event.srcElement;
        var dispName    = obj.getAttribute("dispName");
        //var maxValue    = obj.getAttribute("maxValue");
        var val         = jsByteLength(obj.value);
        if(maxValue != -1 && val > maxValue)
        {
            alert(dispName +" ���� �ִ밪("+ maxValue +")�� �ʰ��մϴ�.\n�ʰ� ���� :"+ (val - maxValue));
        	var objValue    = obj.value;
        	obj.value = objValue.substring(0, maxValue-2);
            obj.focus();
            if(window.event)
            {
                window.event.returnValue = false;
            }
            return;
        }
    }

    /**
     * �ּҰ�
     */
    function jsMinLength(minValue)
    {
        var obj         = window.event.srcElement;
        var dispName    = obj.getAttribute("dispName");
        //var minValue    = obj.getAttribute("minValue");
        var val         = jsByteLength(obj.value);
        if(minValue != -1 && val < minValue)
        {
            alert(dispName +" ���� �ּҰ�(" + minValue + ") �̸��Դϴ�.\n���� ���� :"+ (minValue - val));
            //obj.value = "0";
            obj.focus();
            if(window.event)
            {
                window.event.returnValue = false;
            }
            return;
        }
    }

    /**
     * �����̸� ����, ���ڰ� �ƴϸ� 0
     */
    function nvlNumber(val)
    {
        if(val == "" || isNaN(val) || val == "undefined")
            return 0;

        return Number(val);
    }

    /**
     * �������Ŀ��� comma�� ���ְ�, ��¥���Ŀ��� "/" �� ���ش�.
     *
     * @param   form
     */
    function makeValue(form) {
        for (i = 0; i < form.elements.length; i++) {
            obj = form.elements(i);

            if (obj.tagName == "INPUT") {
                dataType = obj.getAttribute("dataType");

                if (dataType == "date") {
                    deleteDateFormat(obj);
                } else if (dataType == "number" || dataType == "integer" || dataType == "float" || dataType == "double") {
                    if (obj.getAttribute("comma") != null) {
                        deleteComma(obj);
                    }
                } else if (dataType == "yyyymm") {
                    deleteDateFormat(obj);
                }
                /// notHyphen �̶�� �����ߴٸ� �������� ��� �����Ѵ�.
                if(obj.getAttribute("notHyphen") != null) {
                    deleteHyphenObj(obj);
                }
            }
        }
    }

    /**
      * ���ڿ��� Hyphen�� ���ش�.
      *
      * @param  obj
      */
    function deleteHyphenObj(obj) {
        obj.value = deleteHyphen(obj.value);
    }

    /**
     * ������ ��ȿ���� üũ�Ѵ�.
     * �ϳ��� ������Ʈ�� ���� ����.
     *
     * @param   form
     * @param   obj
     */
    function validateObj(form, obj) {

        var dispName;
        var dataType;
        var minValue;
        var maxValue;
        var isValid;
        var value;

        obj.value = trim(obj.value);
        dispName = obj.getAttribute("dispName");
        dataType = obj.getAttribute("dataType");
        minValue = obj.getAttribute("minValue");
        maxValue = obj.getAttribute("maxValue");
        len      = obj.getAttribute("len");
        value = obj.value;

        if (dispName == null) {
            dispName = obj.name;
        }

        // �ʼ� �Է� �׸� üũ
        if (obj.getAttribute("notNull") != null) {
            isValid = false;

            if (obj.type == "radio" || obj.type == "checkbox") {
                if (form.elements(obj.name).length) {
                    for (j = 0; j < form.elements(obj.name).length; j++) {
                        if (form.elements(obj.name)[j].checked) {
                            isValid = true;
                            break;
                        }
                    }
                } else {
                    if (obj.checked) {
                        isValid = true;
                    }
                }
            } else {
                if (value != "") {
                    isValid = true;
                } else {
                    if (obj.getAttribute("comma") != null) {
                        obj.value = 0;
                        isValid = true;
                    }
                }
            }

            if (!isValid) {
                alert(dispName + "��(��) �Է��Ͻʽÿ�.");
                obj.focus();
                if (window.event) {
                    window.event.returnValue = false;
                }
                return  false;
            }
        }

        // ������ ���� üũ
        if (len != null) {
            if (value.length != eval(len)) {
                alert(dispName + "��(��) " + len + "�ڸ��� �Է��ؾ� �մϴ�.");
                obj.focus();
                if (window.event) {
                    window.event.returnValue = false;
                }
                return  false;
            }
        }

        if (obj.type == "text") {
            // ������ Ÿ�� üũ
            if ((value != "") && (dataType != null)) {
                isValid = true;
                checkValue = false;

                if (dataType == "date") {
                    value = deleteDateFormatStr(value);
                    isValid = isDate(value);
                    checkValue = true;
                } else if (dataType == "email") {
                    isValid = isEmail(value);
                } else if (dataType == "float") {
                    value = deleteCommaStr(value);
                    isValid = isFloat(value);
                    checkValue = true;
                } else if (dataType == "integer") {
                    value = deleteCommaStr(value);
                    isValid = isInteger(value);
                    checkValue = true;
                } else if (dataType == "number") {
                    value = deleteCommaStr(value);
                    isValid = isNumber(value);
                    checkValue = true;
                } else if (dataType == "double") {
                    value = deleteCommaStr(value);
                    isValid = isNumber(value);
                    checkValue = true;
                }

                if (!isValid) {
                    alert(dispName + " ������ �ùٸ��� �ʽ��ϴ�.");
                    if (dataType == "float" || dataType == "integer" || dataType == "number" || dataType == "double") {
                        obj.value = "0";
                    }
                    obj.focus();
                    if (window.event) {
                        window.event.returnValue = false;
                    }
                    return  false;
                }

                if (checkValue) {
                    if (minValue != null) {
                        if (eval(minValue) > eval(value)) {
                            alert(dispName + " ���� �ּҰ�(" + minValue + ") �̸��Դϴ�.");
                            obj.focus();
                            if (window.event) {
                                window.event.returnValue = false;
                            }
                            return  false;
                        }
                    }

                    if (isValid && (maxValue != null)) {
                        if (eval(maxValue) < eval(value)) {
                            alert(dispName + " ���� �ִ밪(" + maxValue + ")�� �ʰ��մϴ�.");
                            obj.focus();
                            if (window.event) {
                                window.event.returnValue = false;
                            }
                            return  false;
                        }
                    }
                }
            }
        }

        return  true;
    }

    /**
     * �������Ŀ��� comma�� ���ְ�, ��¥���Ŀ��� "/" �� ���ش�.
     * �ϳ��� ������Ʈ�� ���� ����.
     *
     * @param   form
     * @param   obj
     */
    function makeValueObj(form, obj) {
        if (obj.tagName == "INPUT") {
            dataType = obj.getAttribute("dataType");

            if (dataType == "date") {
                deleteDateFormat(obj);
            } else if (dataType == "number" || dataType == "integer" || dataType == "float" || dataType == "double") {
                if (obj.getAttribute("comma") != null) {
                    deleteComma(obj);
                }
            }
        }
    }

     /**
      * ���ڿ��� Hyphen�� ���ش�.
      *
      * @param   str
      */
    function deleteHyphen(str) {
        var temp = '';

        for (var i = 0; i < str.length; i++) {
            if (str.charAt(i) == '-') {
                continue;
            } else {
                temp += str.charAt(i);
            }
        }

        return  temp;
    }

    /**
     * �ֹε�Ϲ�ȣ&����ڹ�ȣ�� '-'�ֱ�
     */
     function setJuminHyphen(obj) {
        var str = deleteHyphen(obj.value);

        if(str.length == 13) {  // �ֹε�Ϲ�ȣ  6-7
            str = str.substring(0, 6) + "-" + str.substring(6);
        }else if(str.length == 10) { // ����ڹ�ȣ 3-2-5
            str = str.substring(0, 3) + "-"+ str.substring(3, 5) + "-"+ str.substring(5);
        }
        obj.value = str;
     }

    /** 
     * ���ι�ȣ �� '-'�ֱ�
     */
    function setPupinHyphen(obj) {
        var str = deleteHyphen(obj.value);

        if(str.length == 13) {  // �ֹε�Ϲ�ȣ  6-7
            str = str.substring(0, 6) + "-" + str.substring(6);
        }
        obj.value = str;
    }

    /**
     * �����ֱ⿡ ���� ������ ����Ѵ�.
     * (�Ҽ��� ��ȯ�Ѵ�.)
     *
     * @param   currencyCd ��ȭ
     * @param   yRate ������
     * @param   term �����ֱ�
     * @return  �Ҽ� ����
     */
    function jsRateCalc(currencyCd, yRate, term) {

        var yday = jsYdayCalc(currencyCd);
        var rate = eval((yRate / 100) * (term / 12) * (365 / yday));

        return  rate;
    }

    /**
     * �ݾ��� �ܼ� ó���Ѵ�.
     *
     * ��ȭ(WON)
     *
     *  �ܼ�����
     *      0 - ���̸�
     *      1 - �ʿ��̸�
     *      2 - ����̸�
     *      3 - õ���̸�
     *      4 - �����̸�
     *
     *  �ܼ�ó��
     *      1 - �ݿø�
     *      2 - ����
     *      3 - ����
     *
     * ��ȭ
     *
     *  �ܼ�����
     *      0 - �Ҽ��� 0 �̸�
     *      1 - �Ҽ��� 1 �̸�
     *      2 - �Ҽ��� 2 �̸�
     *
     *  �ܼ�ó��
     *      1 - �ݿø�
     *      2 - ����
     *      3 - ����
     * @param   currency ��ȭ (text)
     * @param   amt �ݾ� (text)
     * @param   unit �ܼ����� (text)
     * @param   method �ܼ�ó�� (text)
     */
    function jsTruncAmt(currency, amt, unit, method) {

        var after = eval(amt);

        if (currency == "WON") {

            after /= Math.pow(10, eval(unit));

            if (method == "1") {
                after = Math.round(after);
            } else if (method == "2") {
                after = Math.ceil(after);
            } else if (method == "3") {
                after = Math.floor(after);
            }

            after *= Math.pow(10, eval(unit));
        } else {
            after *= Math.pow(10, eval(unit));

            if (method == "1") {
                after = Math.round(after);
            } else if (method == "2") {
                after = Math.ceil(after);
            } else if (method == "3") {
                after = Math.floor(after);
            }

            after /= Math.pow(10, eval(unit));
        }

        return  after;
    }

    /**
     * String�� null�� ��� '0'���� �ٲپ� �ش�.
     *
     * @param   string
     * @return  String
     */
    function jsNumnvl(str) {
        if(str == null || str == "") {
            return "0";
        }
        return  str;
    }

    function jsNvl(str) {
        if(str == null) {
            return "";
        }
        return  str;
    }

    /**
     * �� ���� ���� ������Ʈ�� �޸��� �ٿ��ش�.
     */
    function setComma() {

        for (i = 0; i < document.forms.length; i++) {
            var elements = document.forms(i).elements;
            for (j = 0; j < elements.length; j++) {
                if (elements(j).tagName == "INPUT") {
                    dataType = elements(j).getAttribute("dataType");
                    if (dataType == "number" || dataType == "integer" ||
                    dataType == "float" || dataType == "double") {
                        if (elements(j).getAttribute("comma") != null) {
                            addComma(elements(j));
                        }
                    }
                }
            }
        }
    }

    /**
     * �ϼ��� ����Ѵ�.(���ϻ��� ���Ϻһ���)
     *
     * @param   from ������
     * @param   to ������
     * @return  �ϼ�
     */
    function jsGetDays(from, to) {

        var fromDt = deleteDateFormatStr(from);
        var toDt = deleteDateFormatStr(to);
        var days = 0 ;

        var fromYy = eval(fromDt.substring(0,4));
        var fromMm = eval(fromDt.substring(4,6) - 1);
        var fromDd = eval(fromDt.substring(6,8));

        var toYy = eval(toDt.substring(0,4));
        var toMm = eval(toDt.substring(4,6) - 1);
        var toDd = eval(toDt.substring(6,8));

        var fromDate = new Date(fromYy, fromMm, fromDd) ;
        var toDate = new Date(toYy, toMm, toDd) ;

        days = ((toDate - fromDate) / 60 / 60 / 24 / 1000);

        return  days;
    }

    /**
     * ��й�ȣ üũ
     */
    function passChk(p_id, p_pass, obj) {

        var cnt = 0;
        var cnt2 = 1;
        var cnt3 = 1;
        var temp = "";
        
        /* ��й�ȣ���� ���ڸ� �ԷµǴ°��� üũ - ����*/
        regNum = /^[0-9]+$/gi;
        bNum = regNum.test(p_pass);
        if(bNum) {
            alert('��й�ȣ�� ���ڸ����� �����ϽǼ��� �����ϴ�.');
               obj.focus();
            return false;
        }
        /* ��й�ȣ���� ���ڸ� �ԷµǴ°��� üũ - ����*/
        regNum = /^[a-zA-Z]+$/gi;
        bNum = regNum.test(p_pass);
        if(bNum) {
            alert('��й�ȣ�� ���ڸ����� �����ϽǼ��� �����ϴ�.');
               obj.focus();
            return false;
        }

        for(var i = 0; i < p_id.length; i++) {
            temp_id = p_id.charAt(i);

            for(var j = 0; j < p_pass.length; j++) {
                if (cnt > 0) {
                    j = tmp_pass_no + 1;
                }

                if (temp == "r") {
                    j=0;
                    temp="";
                }

                temp_pass = p_pass.charAt(j);

                if (temp_id == temp_pass){
                    cnt = cnt + 1;
                    tmp_pass_no = j;
                    break;
                } else if (cnt > 0 && j > 0){
                    temp="r";
                    cnt = 0;
                } else {
                    cnt = 0;
                }
            }

            if (cnt > 3) {
                break;
            }
        }

        if (cnt > 3){
            alert("��й�ȣ�� ID�� 4�� �̻� �ߺ��ǰų�, \n���ӵ� ���ڳ� �������� ���ڸ� 4���̻� ����ؼ��� �ȵ˴ϴ�.");
            obj.focus();
            return  false;
        }

        for(var i = 0; i < p_pass.length; i++) {
            temp_pass1 = p_pass.charAt(i);
            next_pass = (parseInt(temp_pass1.charCodeAt(0)))+1;
            temp_p = p_pass.charAt(i+1);
            temp_pass2 = (parseInt(temp_p.charCodeAt(0)));

            if (temp_pass2 == next_pass) {
                cnt2 = cnt2 + 1;
            } else {
                cnt2 = 1;
            }

            if (temp_pass1 == temp_p) {
                cnt3 = cnt3 + 1;
            } else {
                cnt3 = 1;
            }

            if (cnt2 > 3) {
                break;
            }

            if (cnt3 > 3) {
                break;
            }
        }

        if (cnt2 > 3){
            alert("��й�ȣ�� ���ӵ� ���̳� �������� ���ڸ� 4���̻� ����ؼ��� �ȵ˴ϴ�.");
            obj.focus();
            return  false;
        }

        if (cnt3 > 3){
            alert("��й�ȣ�� �ݺ��� ����/���ڸ� 4���̻� ����ؼ��� �ȵ˴ϴ�.");
            obj.focus();
            return  false;
        }

        return true;
    }

    /**
     * �������� ������ üũ�Ѵ�.
     *
     * @param   none
     * @return  none
     */
    function objDetectBrowser() {
        var strUA, s, i;
        this.isIE = false;  // ���ͳ� �ͽ��÷η������� ��Ÿ���� �Ӽ�
        this.isNS = false;  // �ݽ������������� ��Ÿ���� �Ӽ�
        this.version = null; // ������ ������ ��Ÿ���� �Ӽ�

        // Agent ������ ��� �ִ� ���ڿ�.
        strUA = navigator.userAgent; 

        s = "MSIE";
        // Agent ���ڿ�(strUA) "MSIE"�� ���ڿ��� ��� �ִ��� üũ

        if ((i = strUA.indexOf(s)) >= 0) {
            this.isIE = true;
            // ���� i���� strUA ���ڿ� �� MSIE�� ���۵� ��ġ ���� ����ְ�,
            // s.length�� MSIE�� ���� ��, 4�� ��� �ִ�.
            // strUA.substr(i + s.length)�� �ϸ� strUA ���ڿ� �� MSIE ������ 
            // ������ ���ڿ��� �߶�´�.
            // �� ���ڿ��� parseFloat()�� ��ȯ�ϸ� ������ �˾Ƴ� �� �ִ�.
            this.version = parseFloat(strUA.substr(i + s.length));
            return;
        }

        s = "Netscape6/";
        // Agent ���ڿ�(strUA) "Netscape6/"�̶� ���ڿ��� ��� �ִ��� üũ

        if ((i = strUA.indexOf(s)) >= 0) {
            this.isNS = true;
            this.version = parseFloat(strUA.substr(i + s.length));
            return;
        }

        // �ٸ� "Gecko" �������� NS 6.1�� ���.

        s = "Gecko";
        if ((i = strUA.indexOf(s)) >= 0) {
            this.isNS = true;
            this.version = 6.1;
            return;
        }
    }

  /**
   * ȭ�� ũ�⸦ 1024*768�� ���� ��Ų��.
   */
  function fixScreen(){
    if ((screen.availWidth >= 1024) & (screen.availHeight >= 768)){
      availX = 1024;
      availY = 768;
      screenX = screen.availWidth;
      screenY = screen.availHeight;
      windowX = (screenX - availX)/2;
      windowY = (screenY - availY)/2;
    }
    else {
      //availX = 1024;
      //availY = 768;
      availX = screen.availWidth;
      availY = screen.availHeight;
      windowX = 0;
      windowY = 0;
    }
    moveTo(windowX,windowY);
    resizeTo(availX, availY);
  }

    /**
     * sub ȭ���� ����� ��ġ ��Ų��.
     * centerSubWindow(winName, wx, wy)
     * winName : ������������ �̸�
     * ww : ����������� �� â�� �ʺ�
     * wh : ����������� �� â�� ����
     */
    function centerSubWindow(winName, ww, wh){
        if (document.layers) {
            sw = screen.availWidth;
            sh = screen.availHeight;
        }
        if (document.all) {
            sw = screen.width;
            sh = screen.height;
        }

        w = (sw - ww)/2;
        h = (sh - wh)/2;
        winName.moveTo(w,h);
    }   

    /**
     * ���ڿ����� ������ ���ϴ� ���ڸ� �����Ѵ�.
     *
     * @param   val ���ڿ�
     * @param   str ������ ����
     */
    function jsTrim(val, str) {
        var temp  = val.value;
        temp = temp.split(str);

        val.value = temp.join("");
    }

    /**
     * �� ��ü�� �б��������� �����.
     *
     * @param    form��
     */
    function setAllDisabled(tform) {
        var len = tform.elements.length;
        alert("len ::"+ len);
        for(i=0; i<len; i++) {
            if(tform.elements[i].type == "text" || tform.elements[i].type == "select-one" 
               || tform.elements[i].type == "textarea" || tform.elements[i].type == "file" 
               || tform.elements[i].type == "radio" || tform.elements[i].type == "checkbox") {
                 tform.elements[i].disabled = true;
            }
        }
    }

    /**
     * �� ��ü�� �б������� �������� ���� ���´�.
     *
     * @param    form��
     */
    function setAllEnabled(tform) {
        var len = tform.elements.length;
        for(i=0; i<len; i++) {
            if(tform.elements[i].type == "text" || tform.elements[i].type == "select-one" 
               || tform.elements[i].type == "textarea" || tform.elements[i].type == "file" 
               || tform.elements[i].type == "radio" || tform.elements[i].type == "checkbox") {
                 tform.elements[i].disabled = false;
            }
        }
    }

    /**
     * tokenCommaPatt
     *
     * @param    val
     * @param    patt
     * @ String val�� String patt�� �����Ͽ��迭�� �����Ѵ�.
     * example
     *  var TestArray = tokenCommaPatt( "abcd efgh ijkl", " ")
     *  TestArray[0] = "abcd";
     *  TestArray[1] = "efgh";
     *  TestArray[2] = "ijkl";
     */
    function tokenCommaPatt(val, patt){
        var i = 0, iFst = 0; 
        var sCheckValue = val;
        var arrRst = new Array();
        while( ( iFst = sCheckValue.indexOf( patt ) ) >= 0 ) {
            arrRst[i++] = sCheckValue.substring( 0 , iFst );
            sCheckValue = sCheckValue.substring( iFst + patt.length ,  sCheckValue.length );
            }
        arrRst[i] = sCheckValue;
        return arrRst;
    }

    /**
     * ���ڷθ� �̷���� �ִ��� üũ �Ѵ�.
     *
     * @param    num
     * @return   boolean
     */
    function isNumber2(num){
        var inText = num.value;
        var ret;

        for (var i = 0; i < inText.length; i++) {
            ret = inText.charCodeAt(i);
            if (!((ret > 47) && (ret < 58)))  {
                alert("���ڸ� �Է� �����մϴ�.");
                num.value = "";
                num.focus();
                return false;
            }
        }
        return true;
    }

    /**
     * �ѱ۷θ� �̷���� �ִ��� üũ �Ѵ�.
     *
     * @param    han
     * @return   boolean
     */
    function isHangul(han) {
        var inText = han.value;
        var ret;

        ret = inText.charCodeAt();
        if (ret > 31 && ret < 127) {
            alert("�ѱ۸� �Է� �����մϴ�.");
            han.value = "";
            han.focus();
            return false;
        }

        return true;
    } 

   /**
    * ����ĳ�������� üũ(�빮��)
    *
    * param obj
    * return 
    */
    function checkChar(obj)
    {
        var strValue = obj.value

        var retChar = strValue.toUpperCase();

        if (retChar <  "A" || retChar  > "Z")
        {
            alert("�����ڸ� �Է��� �����մϴ�.");
            obj.value = "";
            obj.focus();
            return;
        }
        obj.value = retChar;
    }
    
    /**
     * Ű���� �Է½� ���ڸ� �Է� ����
     */
    /*
    function onlyNumber(){
    	if ((event.keyCode >= 32 && event.keyCode < 48)
            || (event.keyCode > 57 && event.keyCode < 65)
            || (event.keyCode > 90 && event.keyCode < 97)
            || (event.keyCode >= 106 && event.keyCode <= 122)
            || (event.keyCode >= 65 && event.keyCode <= 90)
            || (event.keyCode == 144))
            event.returnValue = false;
        
    }
    */
    function onlyNumber(obj){
    	/*
    	if (
    	    (event.keyCode >= 48 && event.keyCode <= 57)
            || (event.keyCode > 96 && event.keyCode <= 105)
            || (event.keyCode == 8)
            || (event.keyCode == 46)
        ){
        
        }else{
            event.returnValue = false;
        }
        */
    	var num = obj.value;

    	var pattern = /\D/gi;

    	if( pattern.test(num)==true){

    	//alert("���ڸ� �Է� �����մϴ�.");

    	obj.value = num.replace(/\D/gi, "");

    	obj.focus();

    	}



        
    }    

    /**
     * Ű���� �Է½� ���� �� ','�� �Է� ����
     */
    function AmtNumber(){
        if ((event.keyCode >= 32 && event.keyCode < 44)
            || (event.keyCode >= 45 && event.keyCode < 48)
            || (event.keyCode > 57 && event.keyCode < 65)
            || (event.keyCode > 90 && event.keyCode < 97)
            || (event.keyCode >= 97 && event.keyCode <= 122)
            || (event.keyCode >= 65 && event.keyCode <= 90))
            event.returnValue = false;
    }

    /**
     * Ű���� �Է½� ���� �� '.'�� �Է� ����
     */
    function RateNumber(){
        if ((event.keyCode >= 32 && event.keyCode < 46)
            || (event.keyCode >= 47 && event.keyCode < 48)
            || (event.keyCode > 57 && event.keyCode < 65)
            || (event.keyCode > 90 && event.keyCode < 97)
            || (event.keyCode >= 97 && event.keyCode <= 122)
            || (event.keyCode >= 65 && event.keyCode <= 90))
            event.returnValue = false;
    }

    /**
     * �������Ŀ� null�� �ԷµǸ� 0���� �����Ѵ�.
     *
     * @param   form
     */
    function setZero(form) {
        for (i = 0; i < form.elements.length; i++) {
            obj = form.elements(i);

            if (obj.tagName == "INPUT") {
                dataType = obj.getAttribute("dataType");

                if (dataType == "number" || dataType == "integer" || dataType == "float" || dataType == "double") {
                    if (obj.value == null || obj.value == "") {
                        obj.value = "0";
                    }
                } 
            }
        }
    }

    /* ��¥���� *******************************************************************************/
    var dateBase  = new Date();

    /**
     * ��
     */
    function getYear()
    {
        return dateBase.getFullYear();
    }

    /**
     * ��
     */
    function getMonth()
    {
        var month = dateBase.getMonth()+1;
        if (("" + month).length == 1)
            month = "0" + month;
        return month;
    }

    /**
     * ��
     */
    function getDay()
    {
        var day = dateBase.getDate();
        if(("" + day).length == 1)
            day   = "0" + day;
        return day;
    }

    /**
     * �����Ϻ��� Ư������ ����(0), ����(1)�� ��¥�� �����Ѵ�.(YYYYMMDD)
     */
    function getIntervalDate(term, isPrevNext)
    {
        var year2, month2, day2;
        var dt = new Date(getMonth() +"-"+ getDay() +"-"+ getYear());
        var anyTime;
        var anyDate;
        if(isPrevNext == "0") /// ����
            anyTime = dt.getTime() - (term) * 1000 * 3600 * 24;
        else /// ����
            anyTime = dt.getTime() + (term) * 1000 * 3600 * 24;
        anyDate = new Date();
        anyDate.setTime(anyTime);
        year2 = ( (anyDate.getYear()<100) ? "19"+ anyDate.getYear() : anyDate.getYear() );
        month2 = anyDate.getMonth()+1;
        day2 = anyDate.getDate();
        if (("" + month2).length == 1)
            month2 = "0" + month2;
        if(("" + day2).length == 1)
            day2   = "0" + day2;
        //alert("["+ year2 +"/"+ month2 +"/"+ day2 +"]");

        return year2 +""+ month2 +""+ day2;
    }

    /**
     * �����Ϻ��� Ư������ ����(0), ����(1)�� ��¥�� �����Ѵ�.(YYYYMMDD)
     */
    function getIntervalDate2(kijunDate, term, isPrevNext)
    {
        var year2, month2, day2;
        var dt = toTimeObject(deleteDateFormatStr(kijunDate) +"0000");
        var anyTime;
        var anyDate;
        if(isPrevNext == "0") /// ����
            anyTime = dt.getTime() - (term) * 1000 * 3600 * 24;
        else /// ����
            anyTime = dt.getTime() + (term) * 1000 * 3600 * 24;
        anyDate = new Date();
        anyDate.setTime(anyTime);
        year2 = ( (anyDate.getYear()<100) ? "19"+ anyDate.getYear() : anyDate.getYear() );
        month2 = anyDate.getMonth()+1;
        day2 = anyDate.getDate();
        if (("" + month2).length == 1)
            month2 = "0" + month2;
        if(("" + day2).length == 1)
            day2   = "0" + day2;
        //alert("["+ year2 +"/"+ month2 +"/"+ day2 +"]");

        return year2 +""+ month2 +""+ day2;
    }

    /**
     * �����Ϻ��� Ư������ ����(0), ����(1)�� ������ ��ŭ ���̳��� ��¥�� �����Ѵ�.(YYYYMMDD)
     */
    function getIntervalMonth(kijunDate, term, isPrevNext)
    {
        var kijunDate   = deleteDateFormatStr(kijunDate);
        var year        = kijunDate.substring(0,4); /// ��
        var month       = kijunDate.substring(4,6); /// ��
        var date        = kijunDate.substring(6,8); /// ��
        var addMonth;
        var addYear;
        var tempYear;
        var tempMonth;
        var rtnDate;

        if(isPrevNext == "0") /// ����
        {
            addMonth    = eval(month) - eval(term);
            addYear     = Math.floor(eval(addMonth/12)); /// ���� �⵵ ���
            tempYear    = eval(addYear) + eval(addMonth%12);
            if(tempYear > 0)
            {
                tempMonth   = eval(tempYear%13);
            }
            else
            {
                tempMonth   = eval(12 + addMonth%12);
                if(tempYear == 0)
                    addYear     = addYear-1;
            }
        }
        else /// ����
        {
            addMonth    = eval(month) + eval(term);
            addYear     = Math.floor(eval(addMonth/13)); /// ������ �⵵ ���
            tempYear    = eval(addYear) + eval(addMonth%13);

            if(tempYear < 13)
            {
                tempMonth   = eval(tempYear%13);
            }
            else
            {
                tempMonth   = eval(tempYear%13 +1);
                addYear     = addYear+1;
            }
        }

        tempMonth   = tempMonth + ""; /// ���̸� �˾ƺ������� string���� �ٲ���.
        if(tempMonth.length == 1)
        {
            tempMonth = "0" + tempMonth;
        }
        /// �ش���� �ش����� �����ϴ��� üũ�ϰ� �������� �ʴ´ٸ� ������ ���� �����´�.
        if( !isValidDay(eval(year) + eval(addYear), tempMonth, date))
            date = getLastDay(eval(year) + eval(addYear), tempMonth);

        rtnDate = eval(year) + eval(addYear) +""+ tempMonth +""+ date;
        //alert(">��¥ ::"+ rtnDate);

        return rtnDate;
    }

    /**
     * Time ��Ʈ���� �ڹٽ�ũ��Ʈ Date ��ü�� ��ȯ
     *
     * parameter time: Time ������ String
     */
    function toTimeObject(time)
    { //parseTime(time)
        var year  = time.substr(0,4);
        var month = time.substr(4,2) - 1; // 1��=0,12��=11
        var day   = time.substr(6,2);
        var hour  = time.substr(8,2);
        var min   = time.substr(10,2);

        return new Date(year,month,day,hour,min);
    }

    /**
     * �ڹٽ�ũ��Ʈ Date ��ü�� Time ��Ʈ������ ��ȯ
     *
     * parameter date: JavaScript Date Object
     */
    function toTimeString(date)
    { //formatTime(date)
        var year  = date.getFullYear();
        var month = date.getMonth() + 1; // 1��=0,12��=11�̹Ƿ� 1 ����
        var day   = date.getDate();
        var hour  = date.getHours();
        var min   = date.getMinutes();

        if(("" + month).length == 1) { month = "0" + month; }
        if(("" + day).length   == 1) { day   = "0" + day;   }
        if(("" + hour).length  == 1) { hour  = "0" + hour;  }
        if(("" + min).length   == 1) { min   = "0" + min;   }

        return ("" + year + month + day + hour + min)
    }

    /**
     * �� ��¥���� ���ڸ� ����
     *
     * parameter date: JavaScript Date Object
     */
    function daysBetween(fromDt, toDt) {
    
        var date1 = toTimeObject(fromDt);
        var date2 = toTimeObject(toDt);
        
        //alert(date1 + date2);
        
        var DSTAdjust = 0;
        // constants used for our calculations below
        oneMinute = 1000 * 60;
        var oneDay = oneMinute * 60 * 24;
        // equalize times in case date objects have them
        date1.setHours(0);
        date1.setMinutes(0);
        date1.setSeconds(0);
        date2.setHours(0);
        date2.setMinutes(0);
        date2.setSeconds(0);
        // take care of spans across Daylight Saving Time changes
        if (date2 > date1) {
            DSTAdjust = 
                (date2.getTimezoneOffset( ) - date1.getTimezoneOffset( )) * oneMinute;
        } else {
            DSTAdjust = 
                (date1.getTimezoneOffset( ) - date2.getTimezoneOffset( )) * oneMinute;    
        }
        var diff = Math.abs(date2.getTime( ) - date1.getTime( )) - DSTAdjust;
        //alert(Math.floor(diff/oneDay)+1);
        return Math.floor(diff/oneDay)+1;
    }


    /**
     * ��ȿ��(�����ϴ�) ��(��)���� üũ
     */
    function isValidMonth(mm)
    {
        var m = parseInt(mm,10);
        return (m >= 1 && m <= 12);
    }

    /**
     * ��ȿ��(�����ϴ�) ��(��)���� üũ
     */
    function isValidDay(yyyy, mm, dd)
    {
        var m = parseInt(mm,10) - 1;
        var d = parseInt(dd,10);

        var end = new Array(31,28,31,30,31,30,31,31,30,31,30,31);
        if ((yyyy % 4 == 0 && yyyy % 100 != 0) || yyyy % 400 == 0) {
            end[1] = 29;
        }

        return (d >= 1 && d <= end[m]);
    }

    /**
     * �ش� ���� ������ ���� �����´�.
     */
    function getLastDay(yyyy, mm)
    {
        var m = parseInt(mm,10) - 1;
        var d;

        var end = new Array(31,28,31,30,31,30,31,31,30,31,30,31);
        if ((yyyy % 4 == 0 && yyyy % 100 != 0) || yyyy % 400 == 0) {
            end[1] = 29;
        }
        for(var i=0; i<end.length; i++)
        {
            if(m == i)
                d = end[i];
        }
        //alert("d ::"+ d);

        return d;
    }

    /**
     * ��ȿ��(�����ϴ�) ��(��)���� üũ
     */
    function isValidHour(hh)
    {
        var h = parseInt(hh,10);
        return (h >= 1 && h <= 24);
    }

    /**
     * ��ȿ��(�����ϴ�) ��(��)���� üũ
     */
    function isValidMin(mi)
    {
        var m = parseInt(mi,10);
        return (m >= 1 && m <= 60);
    }

    /**
     * ���糯¥�� �����Ѵ�.
     *
     */
    function getCurDate()
    {
        var date  = new Date();
        var year  = date.getFullYear();
        var month = date.getMonth() + 1; // 1��=0,12��=11�̹Ƿ� 1 ����
        var day   = date.getDate();
        var hour  = date.getHours();
        var min   = date.getMinutes();

        if (("" + month).length == 1) { month = "0" + month; }
        if (("" + day).length   == 1) { day   = "0" + day;   }
        if (("" + hour).length  == 1) { hour  = "0" + hour;  }
        if (("" + min).length   == 1) { min   = "0" + min;   }

        return ("" + year + month + day)
    }
    /* ��¥���� *******************************************************************************/

    /**
     * ��¥�� üũ�Ͽ� �ݿ��� return
     *
     * @param       ��¥
     */
    function jsThisMonth(nowDate) {
        var form = document.form1;
        
        var nowYear = nowDate.substring(0, 4);
        var nowMonth = nowDate.substring(4, 6);
        var nowDay = nowDate.substring(6, 8);
        var newDay = "";
        
        for(var i=28; i<=31; i++) {
            if (isDate(nowYear + nowMonth + i)) {
                newDay = i + "";
            }
        }

        form.fromDate.value = addDateFormatStr(nowYear + nowMonth + "01");
        form.toDate.value = addDateFormatStr(nowYear + nowMonth + newDay);
    }

    /**
     * ��¥�� üũ�Ͽ� ���ָ� return
     *
     * @param       ��¥
     */
    function jsThisWeek(nowDate) {
        var form = document.form1;

        var dateWeek = getDateWeek(nowDate);
        var monday = Number(nowDate) - dateWeek + 1;
        var sunday = monday + 6 ;

        form.fromDate.value = addDateFormatStr(monday + "");
        form.toDate.value = addDateFormatStr(sunday + "");
    }

    /**
     * ��¥�� üũ�Ͽ� ���ϸ� return
     *
     * @param       ��¥
     */
    function jsThisDay(nowDate) {
        var form = document.form1;

        form.fromDate.value = addDateFormatStr(nowDate);
        form.toDate.value = addDateFormatStr(nowDate);
    }
    
    /**
     * ������ ��¥�� ����(1 -> ��, ~ 7 -> ��)
     *
     * @param       ��¥
     */
    function getDateWeek(val){
        var day;
        var d = new Date(); 

        d.setUTCFullYear(Number(val.substring(0, 4)));
        d.setUTCMonth(Number(val.substring(4, 6)) - 1);
        d.setUTCDate(Number(val.substring(6, 8)));

        day = d.getDay();

        return day;
    }

    /**
     * ����Ű ������ �ڵ����� ���� �ʵ�� �̵�
     */
    function enterNextField(field, event) 
    {
        var keyCode = event.keyCode ? event.keyCode : event.which ? event.which : event.charCode;

        if(keyCode == 13)
        {
            var i;
            for(i = 0; i<field.form.elements.length; i++)
            {
                if(field == field.form.elements[i])
                    break;
            }

            i = (i + 1) % field.form.elements.length;
            field.form.elements[i].focus();
            return false;
        } 
        else
            return true;
    }

    /**
     * ȭ���� ù��° TextField�� ��Ŀ�� �̵�
     */
    function firstTextFocus() 
    {
        var elements;
        var obj;

        for(var j=0; j<document.forms.length; j++)
        {
            elements = document.forms(j).elements;

            for(var i=0; i<elements.length; i++)
            {
                obj = elements(i);

                if(obj.tagName == "INPUT")
                {
                    if(obj.type == "text" && obj.disabled == false)
                    {
                        obj.focus();
                        return;
                    }
                }
            }
        }
    }

    /**
     * FM## - getFM(12, 4) -> 0012�� �����Ѵ�.
     * @param       val ���� ��
     * @param       len ������ (0�� ä�� ����)
     */
    function getFM(val, len)
    {
        if(val == "")
            return val;
        var str     = "";
        var zero    = "";
        var valLen  = new String(val).length;
        var forLen  = len-valLen;
        if(len <= valLen)
            return val;
        for(var i=0; i<(forLen); i++)
        {
            zero    += "0";
        }
        str = zero+val;

        return str;
    }
    
    
    //--	���� �Է¿��� Ȯ��
function isEmpty(data) {
	for (var i = 0; i < data.length; i++) {
		if (data.substring(i, i+1) != " ") {
			return false;
		}
	}
	return true;
}

//--	��ȣ�� ����� �Է��Ͽ����� Ȯ��
function Check_Num1(num) {
	for (var i = 0 ; i < num.length ; i++) {
		if ((num.charAt(i) < '0') || (num.charAt(i) > '9')) {
			return false;
		}
	}
	return true;
}
//--	��ȣ�� ����� �Է��Ͽ����� Ȯ��(� Ư����������)
function Check_Num2(num) {
	for (var i = 0 ; i < num.length ; i++) {
		if ((num.charAt(i) >= '0') && (num.charAt(i) <= '9')
			|| (num.charAt(i) == '-') || (num.charAt(i) == '(')
			|| (num.charAt(i) == ')'))
			continue;
		else
			return false;
	}
	return true;
}
//--	��ȣ�� ����� �Է��Ͽ����� Ȯ��(�Ҽ�������)
function Check_Num3(num) {
	if (num == '') {
		num		=	'0';
	}
	var var_1	=	0;
	

	for (var i = 0 ; i < num.length ; i++) {
		if ((num.charAt(i) >= '0' && num.charAt(i) <= '9') || (num.charAt(i) == '.')) {
			if (num.charAt(i) == '.') {
				var_1	=	var_1 + 1;
			}
		//	continue;
		}
		else {
			return false;
		}
	}
	//--	�Ҽ�������, �Ҽ������� �ڸ���, 
	if (var_1 > 1) {
		return false;
	}

	return true;
}

//--	���ڸ� ����� �Է��Ͽ����� Ȯ��
function num_check(num) {
	for (var i = 0 ; i < num.length ; i++) {
		if ((num.charAt(i) < '0') || (num.charAt(i) > '9')) {
			return false;
		}
	}
	return true;
}

//--	�Ҽ��� �����ڸ���(1�ڸ�) üũ
function Check_Decimal(num) {

	if (num == '') {
		num		=	'0';
	}

	var var_1	=	0;
	var var_p	=	9;
	for (var i = 0 ; i < num.length ; i++) {

		if (num.charAt(i) == '.') {
			var_p		=	i;
		}
		//--	�Ҽ������� �ڸ��� ���
		if (i > var_p && (num.charAt(i) >= '0' && num.charAt(i) <= '9')) {
			var_1		=	var_1 + 1;
		}
	}

	//--	�Ҽ������� �ڸ���, 
	if (var_1 > 1 || var_p == 0) {
		return false;
	}

	return true
}

//--	�Է��׸��� �������� Ȯ��
function empty_check(data) {
	if (data.length == 0) {
		return false;
	}
	else {
		for (var i=0; i<data.length; i++) {
			if (data.substring(i,i+1) != " ") {
				return true;
			}
		}
		return false;
	}
	return true;
}

//--	������ �ִ��� Ȯ��
function Space_Check(data) {
	for (var i=0; i<data.length; i++) {
		if (data.substring(i,i+1) == " ") {
			return false;
		}
	}
	return true;
}

//--	�Է°� �˻�
function char_Check(data) {
	var num_cnt		=	0;
	var chk_str		=	'-./[]_{|}~';
//	var chk_str		=	'!#$%()*,-./:;<=>@[\]^_{|}~';
	for (var i = 0; i < data.length; i++) {
		if ((((data.charAt(i) >= '0') && (data.charAt(i) <= '9'))) || (((data.charAt(i) >= 'a') && (data.charAt(i) <= 'z'))) || (((data.charAt(i) >= 'A') && (data.charAt(i) <= 'Z'))))
			num_cnt +=	1;
	}
	if (num_cnt == data.length) {
		return true;
	}
	return false;
}

//--	�ʵ���� �˻�(����, ���� 1Byte, �ѱ� 2Byte�� ���)
function getLength(str) {
	return (str.length + (escape(str) + "/%u").match(/%u/g).length-1);
}

//--	Ư������ �˻�(��ü)
function Special_Check1(data) {
	var num_cnt		=	0;
	var chk_str		=	'!#$%()*,-./:;<=>@[\]^_`{|}~&+?"';

	for (var i = 0; i < data.length; i++) {
		for (var j = 0; j < chk_str.length; j++)
			if (chk_str.charAt(j) == data.charAt(i) || data.charAt(i) == '"' || data.charAt(i) == "'" || data.charAt(i) == '\\')
				num_cnt += 1;
	}

	if (num_cnt > 0) {
		return false;
	}
	return true;
}

//--	Ư������ �˻�(-_����)
function Special_Check2(data) {
	var num_cnt		=	0;
	var chk_str		=	'!#$%()*,./:;<=>@[\]^`{|}~&+?"';

	for (var i = 0; i < data.length; i++) {
		for (var j = 0; j < chk_str.length; j++)
			if (chk_str.charAt(j) == data.charAt(i) || data.charAt(i) == '"' || data.charAt(i) == "'")
				num_cnt += 1;
	}

	if (num_cnt > 0) {
		return false;
	}
	return true;
}

//--	Ư������ �˻�(/����)
function Special_Check3(data) {
	var num_cnt		=	0;
	var chk_str		=	'!#$%()*,-.:;<=>@[\]^_`{|}~&+?"';

	for (var i = 0; i < data.length; i++) {
		for (var j = 0; j < chk_str.length; j++)
			if (chk_str.charAt(j) == data.charAt(i) || data.charAt(i) == '"' || data.charAt(i) == "'" || data.charAt(i) == '\\')
				num_cnt += 1;
	}

	if (num_cnt > 0) {
		return false;
	}
	return true;
}

//--	Ư������ �˻�(����)
function Double_Check(data) {
	var num_cnt		=	0;
	var chk_str		=	'--__@@(())[[]]{{}}//\\||##$$%%**,,..::;;<<>>&&++??';
	var var_str1	=	'';
	var var_str2	=	'';
	for (var i = 0; i < data.length; i++) {
		if (i < data.length)
			var_str1	=	data.substring(i,i+2);

		for (var j = 0; j < chk_str.length; j++)
			if (j < chk_str.length)
				var_str2	=	chk_str.substring(j,j+1);

			if (var_str1 == var_str2 || var_str1 == '""' || var_str1 == "''")
				num_cnt += 1;
	}

	if (num_cnt > 0) {
		return false;
	}
	return true;
}

//--	OR ���� �˻�
function Or_Check(data) {
	var num_cnt		=	0;
	var var_str1	=	'';
	var var_no		=	data.length;

	for (var i = 0; i < data.length; i++) {
		for (var j = i; j < data.length; j++) {
			if (j < data.length)
				var_str1	=	data.substring(i,j+1).toLowerCase();

				if (var_str1 == 'oror' || var_str1 == 'oror ' || var_str1 == ' oror' || var_str1 == ' oror ' 
					|| var_str1 == 'or' || var_str1 == 'or ' || var_str1 == ' or' || var_str1 == ' or ')
					num_cnt += 1;
				
		}
	}

	if (num_cnt > 0) {
		return false;
	}
	return true;
}

//--	Union ���� �˻�
function Union_Check(data) {
	var num_cnt		=	0;
	var var_str1	=	'';
	var var_no		=	data.length;

	for (var i = 0; i < data.length; i++) {
		for (var j = i; j < data.length; j++) {
			if (j < data.length)
				var_str1	=	data.substring(i,j+4).toLowerCase();

				if (var_str1 == 'union' || var_str1 == 'union ' || var_str1 == ' union' || var_str1 == ' union ')
					num_cnt += 1;
				
		}
	}

	if (num_cnt > 0) {
		return false;
	}
	return true;
}


//-- Ư�� form�� Ư��name�� ���� chkbox�� ��� value�� setting
function setChkboxAll(formname, name, value) {
    for (var i = 0; i < formname.length ; i++) {
        if (name == formname.elements[i].name)
             formname.elements[i].checked = value;
    }
}

// ó������ : Ư����(char)�� append�� ����� return(üũ�ȵǾ����� default���� append)
//  check�� checkbox�� value�� attach�Ѵ� (check�ȵǸ� value����)
// �ַ� ��Ƽ ���ý� ��� 
function getChkBoxByValue(formname, name, defvalue) 
{
    var Buf = "";
    var chkCnt = 0;
    for (var i = 0; i < formname.length ; i++) {
        if (name == formname.elements[i].name) {
            if (formname.elements[i].checked) {
                chkCnt ++;
                Buf = Buf + formname.elements[i].value + defvalue;
            }
        }
    }
    return Buf;
}

// Ư�����ڵ��� ����ߴ����� üũ�Ѵ�.
function dataCheck(data) {
	var num_cnt		=	0;
	var chk_str		=	'!#$%()*,-./:;<=>@[\]^_`{|}~';
	for (var i = 0; i < data.length; i++) {
		if ((((data.charAt(i) >= '0') && (data.charAt(i) <= '9'))) || (((data.charAt(i) >= 'a') && (data.charAt(i) <= 'z'))) || (((data.charAt(i) >= 'A') && (data.charAt(i) <= 'Z'))))
			num_cnt += 1;
		for (var j = 0; j < chk_str.length; j++)
			if (chk_str.charAt(j) == data.charAt(i))
				num_cnt += 1;
	}
	if (num_cnt == data.length) {
		return true;
	}
	return false;
}

	function isEmpty(data)
	{
		for ( var i = 0 ; i < data.length ; i++ ) {
			if ( data.substring( i, i+1 ) != ' ' )
				return false;
		}
		return true;
	}

   function windowLeftPosition(pos){
      var leftPosition = screen.width - pos;
	   
	  leftPosition = (leftPosition < 0) ? 0 : leftPosition/2;
	  
	  return leftPosition;
   }

   function windowTopPosition(pos){
	  var topPosition = screen.height - pos;
	   
	  topPosition  = (topPosition < 0)  ? 0 : topPosition /2;
	  
	  return topPosition;
   }

   
   function center_popup(s_url, s_name, s_width, s_height) { 
	ls_pri = "toolbar=no, location=no, directories=no, menubar=no, resizable=no, scrollbars=no, status=no, width="+s_width+" height="+s_height;
	wd_pop = window.open(s_url, s_name,ls_pri);
	wd_pop.blur();
	wd_pop.moveTo(((screen.availwidth - eval(s_width))/2),((screen.availheight - eval(s_height))/2));
	wd_pop.focus();
	return wd_pop;
   }

   function center_popup_scroll(s_url, s_name, s_width, s_height) { 
	ls_pri = "toolbar=no, location=no, directories=no, menubar=no, resizable=no, scrollbars=yes, status=no, width="+s_width+" height="+s_height;
	wd_pop = window.open(s_url, s_name,ls_pri);
	wd_pop.blur();
	wd_pop.moveTo(((screen.availwidth - eval(s_width))/2),((screen.availheight - eval(s_height))/2));
	wd_pop.focus();
	return wd_pop;
   }
      
   function sel_box_insert(obj, s_text, s_val) {
	obj.options[obj.length] = new Option(s_text,s_val,false,false);
   }
   
   function sel_box_removeall(obj) {
        var len = obj.length;
        for (var i = len; i > 0; i--) { 
    		obj.options[i] = null;
    	}
    }

   function sel_box_remove(obj) {
        var len = obj.length;
        for (var i = len-1; i >= 0; i--) { 
    		obj.options[i] = null;
    	}
    }
    
    function sel_box_value(obj) {
	  return obj.options[obj.options.selectedIndex].value;
    }

    function sel_box_text(obj) {
	  return obj.options[obj.options.selectedIndex].text;
    }
    
    function sel_box_select(obj, s_val) {
		for(i=0; i< obj.length; i++) {
			if(obj.options[i].value==s_val) {
				obj.options[i].selected = true;
			}
		}
    }
    
	function com_checkbox_check(obj) { 
	    isChk=false;
	    if(obj.length == undefined) { 
	        isChk=false;
	    } else { 
	        isChk=true;
	    } 
	    return isChk;
	} 
	
	var checkbox_flag = true;
	function checkBoxSelectAll(obj) { 
	    try
	    {    
	        if(com_checkbox_check(obj)) { 
	            for(i=0; i< obj.length; i++) { 
	                obj[i].checked=checkbox_flag;
	            } 
	        } else { 
	            obj.checked=checkbox_flag;
	        } 
	        if(checkbox_flag==true) {  
	            checkbox_flag=false;
	        } else  {
	            checkbox_flag=true;
	        }
	    }catch (e) {
	        window.status = "error";
	    }
	}
	
	function getFileExtension(str){
       if(str == "") return "";
       
       var index = str.lastIndexOf(".");
       var extension = str.substring(index+1,str.length);
	   
	   return extension;
	}
	
	
	
	function getDateDropDownList( frmObj , endDate , selectedDate ){
		var date = new Date();
		var year = date.getYear();
		var month = date.getMonth() + 1;
		
		var endYear = endDate.substring(0 , 4 );
		var endMonth = endDate.substring( 4 , 6 );
		var monthDiff;

		if ( year > parseInt( endYear ) ){			
			monthDiff = month + ( ( year - parseInt( endYear ) - 1 ) * 12 + ( 12 - parseInt( endMonth ) ) );
		}else{
			monthDiff = month - parseInt( endMonth );
		}

		frmObj.length = monthDiff + 1;

		var cnt = 1;
		var cnt1 = 12;
		var selectedCnt = 0;

		if ( monthDiff <= month ){
			for ( var i = 0 ; i < ( month - parseInt( endMonth ) )  ; i++ ){

				if ( ( month - i ) < 10  ){
					if ( (year + "0" + ( month - i ) ) ==  selectedDate ){
						selectedCnt = cnt;
					}

					frmObj.options[cnt].value = year + "0" + ( month - i );
					frmObj.options[cnt++].text = year + "�� 0" + ( month - i ) + "��";
				}else{
					if ( (year + "" + ( month - i ) ) ==  selectedDate ){
						selectedCnt = cnt;
					}

					frmObj.options[cnt].value = year + "" + ( month - i ) ;
					frmObj.options[cnt++].text = year + "�� " + ( month - i ) + "��";
				}
			}
		}else{
			for( var i = 0 ; i < monthDiff ; i++ ){
				if ( i < month ){

					if ( ( month - i ) < 10  ){
						if ( (year + "0" + ( month - i ) ) ==  selectedDate ){
							selectedCnt = cnt;
						}
						frmObj.options[cnt].value = year + "0" + ( month - i );
						frmObj.options[cnt++].text = year + "�� 0" + ( month - i ) + "��";
					}else{
						if ( (year + "" + ( month - i ) ) ==  selectedDate ){
							selectedCnt = cnt;
						}
						frmObj.options[cnt].value = year + "" + ( month - i );
						frmObj.options[cnt++].text = year + "�� " + ( month - i ) + "��";
					}
				}else{
					if ( cnt1 == 12 ){
						year--;
					}

					if ( cnt1 < 10 ){
						if ( ( year + "0" + cnt1 ) ==  selectedDate ){
							selectedCnt = cnt;
						}

						frmObj.options[cnt].value = year + "0" + cnt1;
						frmObj.options[cnt++].text = year + "�� 0" + cnt1 + "��";
					}else{
						if ( ( year + "" + cnt1 ) ==  selectedDate ){
							selectedCnt = cnt;
						}
						frmObj.options[cnt].value = year + "" + cnt1;
						frmObj.options[cnt++].text = year + "�� " + cnt1 + "��";
					}

					if ( cnt1 == 1 ){
						cnt1 = 12;
					}else{
						cnt1--;
					}
				}
			}
		}

		frmObj.selectedIndex = selectedCnt;
	}	
	
	function getDateDropDownListWithExpdate( frmObj , endDate , selectedDate , expCnt)
	{
		var date = new Date();
		var year = date.getYear();
		var month = date.getMonth() + 1;
		
		var endYear = endDate.substring(0 , 4 );
		var endMonth = endDate.substring( 4 , 6 );
		var monthDiff;
				
		if ( year > parseInt( endYear ) ){			
			monthDiff = month + ( ( year - parseInt( endYear ) - 1 ) * 12 + ( 12 - parseInt( endMonth ) ) );
		}else{
			monthDiff = month - parseInt( endMonth );
		}

		frmObj.length = monthDiff + 1 - expCnt ;

		var cnt = 1;
		var cnt1 = 12;
		var selectedCnt = 0;

		if ( monthDiff <= month )
		{
			for ( var i = 0 ; i < ( month - parseInt( endMonth ) )  ; i++ ){

				if ( ( month - i ) < 10  )
				{
					if ( (year + "0" + ( month - i ) ) ==  selectedDate )
					{
						selectedCnt = cnt;
					}
					
					
					if ((month-i) != "1" && (month-i)!="2"&& (month-i)!="3")
					{						
						frmObj.options[cnt].value = year + "0" + ( month - i );
						frmObj.options[cnt++].text = year + "�� 0" + ( month - i ) + "��";
					}
				}
				else
				{
					if ( (year + "" + ( month - i ) ) ==  selectedDate )
					{
						selectedCnt = cnt;
					}

					if ((month-i) != "1" && (month-i)!="2"&& (month-i)!="3")
					{						
						frmObj.options[cnt].value = year + "" + ( month - i ) ;
						frmObj.options[cnt++].text = year + "�� " + ( month - i ) + "��";
					}
				}
			}
		}
		else
		{
			for( var i = 0 ; i < monthDiff ; i++ )
			{
				if ( i < month )
				{
					if ( ( month - i ) < 10  )
					{
						if ( (year + "0" + ( month - i ) ) ==  selectedDate )
						{
							selectedCnt = cnt;
						}

						if ((month-i) != "1" && (month-i)!="2"&& (month-i)!="3")
						{						
							frmObj.options[cnt].value = year + "0" + ( month - i );
							frmObj.options[cnt++].text = year + "�� 0" + ( month - i ) + "��";
						}
					}
					else
					{
						if ( (year + "" + ( month - i ) ) ==  selectedDate )
						{
							selectedCnt = cnt;
						}
						if ((month-i) != "1" && (month-i)!="2"&& (month-i)!="3")
						{						
							frmObj.options[cnt].value = year + "" + ( month - i );
							frmObj.options[cnt++].text = year + "�� " + ( month - i ) + "��";
						}
					}
				}
				else
				{
					if ( cnt1 == 12 )
					{
						year--;
					}

					if ( cnt1 < 10 )
					{
						if ( ( year + "0" + cnt1 ) ==  selectedDate ){
							selectedCnt = cnt;
						}
						if ((month-i) != "1" && (month-i)!="2"&& (month-i)!="3")
						{						
							frmObj.options[cnt].value = year + "0" + cnt1;
							frmObj.options[cnt++].text = year + "�� 0" + cnt1 + "��";
						}
					}
					else
					{
						if ( ( year + "" + cnt1 ) ==  selectedDate )
						{
							selectedCnt = cnt;
						}
						
						if ((month-i) != "1" && (month-i)!="2"&& (month-i)!="3")
						{						

							frmObj.options[cnt].value = year + "" + cnt1;
							frmObj.options[cnt++].text = year + "�� " + cnt1 + "��";
						}
					}

					if ( cnt1 == 1 )
					{
						cnt1 = 12;
					}
					else
					{
						cnt1--;
					}
				}
			}
		}

		frmObj.selectedIndex = selectedCnt;
	}		
	


	function getDateDropDownListWithExpdate2( frmObj , endDate , selectedDate , expCnt)
	{
		var date = new Date();
		var year = date.getYear();
		var month = date.getMonth() + 1;
		
		var endYear = endDate.substring(0 , 4 );
		var endMonth = endDate.substring( 4 , 6 );
		var monthDiff;
				
		if ( year > parseInt( endYear ) ){			
			monthDiff = month + ( ( year - parseInt( endYear ) - 1 ) * 12 + ( 12 - parseInt( endMonth ) ) );
		}else{
			monthDiff = month - parseInt( endMonth );
		}

		frmObj.length = monthDiff + 1 - expCnt ;

		var cnt = 1;
		var cnt1 = 12;
		var selectedCnt = 0;

		if ( monthDiff <= month )
		{
			for ( var i = 0 ; i < ( month - parseInt( endMonth ) )  ; i++ ){

				if ( ( month - i ) < 10  )
				{
					if ( (year + "0" + ( month - i ) ) ==  selectedDate )
					{
						selectedCnt = cnt;
					}
					
					
					if ((month-i) != "1" && (month-i)!="2"&& (month-i)!="3"&& (month-i)!="4")
					{						
						frmObj.options[cnt].value = year + "0" + ( month - i );
						frmObj.options[cnt++].text = year + "�� 0" + ( month - i ) + "��";
					}
				}
				else
				{
					if ( (year + "" + ( month - i ) ) ==  selectedDate )
					{
						selectedCnt = cnt;
					}

					if ((month-i) != "1" && (month-i)!="2"&& (month-i)!="3"&& (month-i)!="4")
					{						
						frmObj.options[cnt].value = year + "" + ( month - i ) ;
						frmObj.options[cnt++].text = year + "�� " + ( month - i ) + "��";
					}
				}
			}
		}
		else
		{
			for( var i = 0 ; i < monthDiff ; i++ )
			{
				if ( i < month )
				{
					if ( ( month - i ) < 10  )
					{
						if ( (year + "0" + ( month - i ) ) ==  selectedDate )
						{
							selectedCnt = cnt;
						}

						if ((month-i) != "1" && (month-i)!="2"&& (month-i)!="3"&& (month-i)!="4")
						{						
							frmObj.options[cnt].value = year + "0" + ( month - i );
							frmObj.options[cnt++].text = year + "�� 0" + ( month - i ) + "��";
						}
					}
					else
					{
						if ( (year + "" + ( month - i ) ) ==  selectedDate )
						{
							selectedCnt = cnt;
						}
						if ((month-i) != "1" && (month-i)!="2"&& (month-i)!="3"&& (month-i)!="4")
						{						
							frmObj.options[cnt].value = year + "" + ( month - i );
							frmObj.options[cnt++].text = year + "�� " + ( month - i ) + "��";
						}
					}
				}
				else
				{
					if ( cnt1 == 12 )
					{
						year--;
					}

					if ( cnt1 < 10 )
					{
						if ( ( year + "0" + cnt1 ) ==  selectedDate ){
							selectedCnt = cnt;
						}
						if ((month-i) != "1" && (month-i)!="2"&& (month-i)!="3"&& (month-i)!="4")
						{						
							frmObj.options[cnt].value = year + "0" + cnt1;
							frmObj.options[cnt++].text = year + "�� 0" + cnt1 + "��";
						}
					}
					else
					{
						if ( ( year + "" + cnt1 ) ==  selectedDate )
						{
							selectedCnt = cnt;
						}
						
						if ((month-i) != "1" && (month-i)!="2" && (month-i)!="3"&& (month-i)!="4")
						{						

							frmObj.options[cnt].value = year + "" + cnt1;
							frmObj.options[cnt++].text = year + "�� " + cnt1 + "��";
						}
					}

					if ( cnt1 == 1 )
					{
						cnt1 = 12;
					}
					else
					{
						cnt1--;
					}
				}
			}
		}

		frmObj.selectedIndex = selectedCnt;
	}		

	function submitEnters(field, event) {
		var keyCode = event.keyCode ? event.keyCode : event.which ? event.which : event.charCode;
		if (keyCode == 13)
		{
			return false;
		}else
			return true;
	}

	function addCondition(obj,startdate,enddate){

		var s_yy=startdate.substring(0,4);
		var s_mm=startdate.substring(4,6);
		var s_dd=startdate.substring(6,startdate.length);
		var sindex=0;

		var e_yy=enddate.substring(0,4);
		var e_mm=enddate.substring(4,6);
		var e_dd=enddate.substring(6,enddate.length);
		var eindex=0;

		for(var a=2006; a<(parseInt(s_yy)+10); a++){

			sindex++;

			addSelectOption(obj.startyear, a, a);

			if(s_yy==a)
			{
				obj.startyear[sindex-1].selected=true;
			}

		}

		for(var b=2006; b<(parseInt(e_yy)+10); b++){

			eindex++;
			
			addSelectOption(obj.endyear, b, b);
			
			if(e_yy==b)
			{
				obj.endyear[eindex-1].selected=true;
			}
		}

		for(var j=1; j< 13; j++){

			var m=j

			if(m<10){
				m='0'+j;
			}

			addSelectOption(obj.startmonth, m,m);
			addSelectOption(obj.endmonth, m,m);

			if(s_mm==m)
			{
				obj.startmonth[j-1].selected=true;
			}

			if(e_mm==m)
			{
				obj.endmonth[j-1].selected=true;
			}

		}

	}

function addCondition2(obj,date){

		var s_yy=date.substring(0,4);
		var s_mm=date.substring(4,6);
		var s_dd=date.substring(6,date.length);
		var sindex=0;

		for(var a=2006; a<(parseInt(s_yy)+10); a++){

			sindex++;

			addSelectOption(obj.year, a, a);

			if(s_yy==a)
			{
				obj.year[sindex-1].selected=true;
			}

		}

		for(var j=1; j< 13; j++){

			var m=j

			if(m<10){
				m='0'+j;
			}

			addSelectOption(obj.month, m,m);

			if(s_mm==m)
			{
				obj.month[j-1].selected=true;
			}

		}

	}

function addCondition_onlyYear(obj,date){

		var s_yy=date.substring(0,4);
		var sindex=0;

		for(var a=2006; a<(parseInt(s_yy)+10); a++){

			sindex++;

			addSelectOption(obj.year, a, a);

			if(s_yy==a)
			{
				obj.year[sindex-1].selected=true;
			}

		}
	}

function addCondition3(obj_yyyy,obj_mm,date){

		var s_yy=date.substring(0,4);
		var s_mm=date.substring(4,6);
		var s_dd=date.substring(6,date.length);
		var sindex=0;

		for(var a=2006; a<(parseInt(s_yy)+10); a++){

			sindex++;

			addSelectOption(obj_yyyy, a, a);

			if(s_yy==a)
			{
				obj_yyyy[sindex-1].selected=true;
			}

		}

		for(var j=1; j< 13; j++){

			var m=j

			if(m<10){
				m='0'+j;
			}

			addSelectOption(obj_mm, m,m);

			if(s_mm==m)
			{
				obj_mm[j-1].selected=true;
			}

		}

	}
	
	function dateSet(obj_year,obj_month,obj_day,date){
    
		var yyyy=date.substring(0,4);
		var mm=date.substring(4,6);
		var dd=date.substring(6,date.length);
		var index=0;

		for(var a=2006; a<(parseInt(yyyy)+10); a++){

			index++;

			addSelectOption(obj_year, a, a);

			if(yyyy==a)
			{
				obj_year[index-1].selected=true;
			}

		}

		for(var j=1; j< 13; j++){

			var m=j

			if(m<10){
				m='0'+j;
			}

			addSelectOption(obj_month, m,m);

			if(mm==m)
			{
				obj_month[j-1].selected=true;
			}

		}

		for(var x=1; x< 32; x++){

			var d=x

			if(d<10){
				d='0'+x;
			}

			addSelectOption(obj_day, d,d);

			if(dd==d)
			{
				obj_day[x-1].selected=true;
			}
			
		}

	}

function addCondition4(obj_yyyy,obj_mm,date){

		if(date==""){
				vDate = new Date();
				addSelectOption(obj_yyyy, "", "���þ���");
				addSelectOption(obj_mm, "","���þ���");

			for(var a=2006; a<Number(vDate.getFullYear()+10); a++){

				sindex++;				
			
				addSelectOption(obj_yyyy, a, a);

				if(s_yy==a)
				{
					obj_yyyy[sindex-1].selected=true;
				}

			}
			
			

			for(var j=1; j< 13; j++){

				var m=j

				if(m<10){
					m='0'+j;
				}

				addSelectOption(obj_mm, m,m);

				if(s_mm==m)
				{
					obj_mm[j-1].selected=true;
				}

			}

		} else{ // date�� �ִٸ� 

			var s_yy=date.substring(0,4);
			var s_mm=date.substring(4,6);
			var s_dd=date.substring(6,date.length);
			var sindex=0;

			

			for(var a=2006; a<(parseInt(s_yy)+10); a++){

				sindex++;

				addSelectOption(obj_yyyy, a, a);

				if(s_yy==a)
				{
					obj_yyyy[sindex-1].selected=true;
				}

			}

			for(var j=1; j< 13; j++){

				var m=j

				if(m<10){
					m='0'+j;
				}

				addSelectOption(obj_mm, m,m);

				if(s_mm==m)
				{
					obj_mm[j-1].selected=true;
				}

			}
			addSelectOption(obj_yyyy, "", "���þ���");
			addSelectOption(obj_mm, "","���þ���");
			
		}
		

	}


	function addCondition5(obj_yyyy,obj_mm,obj_dd){

	
		vDate = new Date();
		var sindex=0;
		for(var a=vDate.getFullYear(); a<Number(vDate.getFullYear()+10); a++){	
			addSelectOption(obj_yyyy, a, a);
		}

		for(var j=1; j< 13; j++){

			var m=j

			if(m<10){
				m='0'+j;
			}
			addSelectOption(obj_mm, m,m);

		}

		for(var k=1; k< 32; k++){
			var d=k

			if(d<10){
				d='0'+k;
			}
			addSelectOption(obj_dd, d,d);			

		}

	}


	function addSelectOption(object, value, text)
	{
		option = document.createElement("OPTION");
		option.text = text;
		option.value = value;
		object.options.add(option);
	}
	
	function addSelectOption2(object, value, text,title)
	{

		option = document.createElement("OPTION");
		option.text = text;
		option.value = value;
		option.title = title;
		
		object.options.add(option);
	}

	function clearSelectOptions(object)
	{
		if(object.tagName != "SELECT") return;
		
		for(var i = object.options.length - 1 ; i >= 0 ; i--) 
		{
			object.options.remove(i);
		}
	}
	var observer;//ó����
	var observerkey=false;//ó���߿���

	// ���⼭ ���ʹ� ó���� ǥ���ϴ� function

	function closeWaiting() {
		observerkey=false;
		if (document.getElementById) {
			document.getElementById('waitwindow').style.visibility = 'hidden';
		} else {
			if (document.layers) {
				document.loadingbar.visibility = 'hide';
			} else {
				document.all.loadingbar.style.visibility = 'hidden';
			}
		}
	}
	function closeWaiting2() {
		observerkey=false;
		$('#waitwindow2').dialog('close'); 
	}
	//ó���� �˾�
	function openWaiting2() {

		$('#waitwindow2').dialog({
			modal : true,
			resizable : false, //������ ���� �Ұ���
			draggable : true, //�巡�� �Ұ���
			closeOnEscape : true, //ESC ��ư �������� ����
			
			height : 120,
			width : 220,
			modal : true,
			
			open:function(){
				
				//�˾� ������ url

				$(this).load('test',{
					'test' : 'test'
				});
				
			},
			close: function(){

			}
		
		});
	}
	//���̱�
	function openWaiting( ) {
		observerkey=true;
		if (document.getElementById) {
			document.getElementById('waitwindow').style.visibility = 'visible';
		} else{
			if (document.layers) {
				document.loadingbar.visibility = 'show';
			} else {
				document.all.loadingbar.style.visibility = 'visible';
			}
		}
	}
	function dateMove(g,CalDate,sObj,eObj)
	{
	    sObj.value = getIntervalDates(sObj.value, CalDate ,g);
	    eObj.value = getIntervalDates(eObj.value, CalDate ,g);
	}
	function dateMove2(CalDate,sObj,eObj)
	{
		if(CalDate=='1'){
			sObj.value=getToDates();
			eObj.value=getToDates();
		}else{
			sObj.value = getIntervalDates(eObj.value, CalDate ,'back');
		}
	}
	/**
     * �����Ϻ��� Ư������ ����(0), ����(1)�� ��¥�� �����Ѵ�.(YYYYMMDD)
     */
    function getIntervalDates(kijunDate, term, isPrevNext)
    {
        var year2, month2, day2;
        var dt = toTimeObject(deleteDateFormatStr(kijunDate) +"0000");
        var anyTime;
        var anyDate;
        if(isPrevNext == "back") /// ����
            anyTime = dt.getTime() - (term) * 1000 * 3600 * 24;
        else /// ����
            anyTime = dt.getTime() + (term) * 1000 * 3600 * 24;
        anyDate = new Date();
        anyDate.setTime(anyTime);
        
        year2 = ( (anyDate.getYear()<100) ? "19"+ anyDate.getYear() : ""+anyDate.getYear());
        if(year2.length==3){
        	year2="20"+year2.substring(1);
        }
        month2 = anyDate.getMonth()+1;
        day2 = anyDate.getDate();
        if (("" + month2).length == 1)
            month2 = "0" + month2;
        if(("" + day2).length == 1)
            day2   = "0" + day2;

        return year2 +"-"+ month2 +"-"+ day2;
    }
    /**
     * ���� ��¥�� �����Ѵ�.(YYYYMMDD)
     */
    function getToDates()
    {
        var year2, month2, day2;
        var anyDate;
       
        anyDate = new Date();
        
        year2 = ( (anyDate.getYear()<100) ? "19"+ anyDate.getYear() : ""+anyDate.getYear());
        if(year2.length==3){
        	year2="20"+year2.substring(1);
        }
        month2 = anyDate.getMonth()+1;
        day2 = anyDate.getDate();
        if (("" + month2).length == 1)
            month2 = "0" + month2;
        if(("" + day2).length == 1)
            day2   = "0" + day2;

        return year2 +"-"+ month2 +"-"+ day2;
    }
///////////////////////////////////////////////////////////////////////////////
// �Լ��� : makeExcel() 
// ��  �� : ���� ���Ϸ� �����ϱ� 
//////////////////////////////////////////////////////////////////////////////
function makeExcel(obj) {

	if (document.all._ExcelFrame==null) {
		document.body.insertAdjacentHTML("beforeEnd", "<iframe name='_ExcelFrame' style='width:0;height=0';></iframe>");
	}

	document.all.objExcel.value = obj;
	
    document.forms[0].action = "/jsp/makeExcel.jsp";
	document.forms[0].method="POST";

	document.forms[0].target = "new";
	document.forms[0].submit();

}

function limitText(str, maxChars, maxLines, maxPerLine)
{

		var count = 0;
        var strLineCounter = 0;
        var strCharCounter = 0;

		var msg = "";
		var tmpMsg1 = "";
		var tmpMsg2 = "";
        for (var i = 0; i < str.length; i++)
        {
                var strChar = str.substring(i, i + 1);
                if (strChar == '\n')
                {
                        strLineCounter++;
                }
        }

		tmpMsg1 = "�� �� : "+ strLineCounter;

		var overLine = false;
		var overChar = false
        if (maxLines < strLineCounter){
			overLine = true;
		}else{
			if(str.length > 0){
				strLineCounter = Math.ceil(str.length/maxPerLine);
				tmpMsg1 = "�� �� : "+ strLineCounter +"��";
				if (strLineCounter > maxLines){
					overLine = true;
				}
			}		
		}

		tmpMsg2 = "���� �� : "+ str.length +"��";
        if (overLine || overLine){
			msg = tmpMsg1+" / "+tmpMsg2 
		}
		return msg;
}
///////////////////////////////////////////////////////////////////////////////
//�Լ��� :dateCheck()
//��  �� : ��¥üũ�Լ�
///////////////////////////////////////////////////////////////////////////////
function dateCheck(sObj,eObj,due){
	
	var sdate=deleteDateFormatStr(sObj.value);
	var edate=deleteDateFormatStr(eObj.value);
	
	if(!isDate(sdate)){
		alert('�˻� ���������� ��¥������ �ùٸ��� �ʽ��ϴ�.');
		return false;
	}
	if(!isDate(edate)){
		alert('�˻� ���������� ��¥������ �ùٸ��� �ʽ��ϴ�.');
		return false;
	}
	
	if(sdate>edate){
		alert('�������� �����Ϻ��� Ů�ϴ�.');
		return false;
	}
	var rdue=daysBetween(sdate,edate);
	
//	if(due!= '' && 365<rdue){
//		alert('�˻��ϼ��� 12������ �����մϴ�.');
//		return false;
//	} else if(due!='' && rdue>due){
	if(due!='' && rdue>due){
		if( due == '1' )
			alert( '�˻��ϼ��� ���Ϸ� ���ѵ˴ϴ�.' );
		else
			alert('�˻��ϼ��� '+(due-1)+'�Ϸ� �����մϴ�.');
    	return false;
	}	
	return true;
}
var openWin=0;//�˾���ü
///////////////////////////////////////////////////////////////////////////////
//�Լ��� :imageView()
//��  �� : �̹��� ��� ȣ��(�߽ſ�)
///////////////////////////////////////////////////////////////////////////////
function imageView(pre_url,UFID,FtpUrl,FtpID,FtpPW,ServerID,imageFolderName,imageFileName,imageTotalPagecount,Auth,FaxNo,ScreenID,veiwFlag){

	var url=pre_url+'&UFID='+UFID+'&ServerID='+ServerID+'&imageFolderName='+imageFolderName+'&imageFileName='+imageFileName+'&imageTotalPagecount='+imageTotalPagecount+'&Auth='+Auth+'&FaxNo='+FaxNo+'&ScreenID='+ScreenID+'&veiwFlag='+veiwFlag;
	var top, left,width,height,scroll;
	
	top = getCookie("HYUNDAI_viewwinTop");
    left = getCookie("HYUNDAI_viewwinLeft");
    height = getCookie("HYUNDAI_clientheight");
    width = getCookie("HYUNDAI_clientwidth");

    if(true){

     width='942';
     height='700';
     top	 = screen.height/2 - height/2 - 50;
	 left = screen.width/2 - width/2 ;
    }

    if(scroll == null || scroll == '')	scroll='0';
	var	option = 'width='+width+',height='+height+',top='+top+',left='+left+',resizable=yes,location=no,status=no,toolbar=no,menubar=no,scrollbars=' + scroll;
	
	if(undefined==parent.viewWin){
		
		openWin= window.open(url, 'imageView', option);
	}else{
	
		if(parent.viewWin != 0) {
			parent.viewWin.close();
		}
		parent.viewWin = window.open(url, 'imageView', option);
	}

}
///////////////////////////////////////////////////////////////////////////////
//�Լ��� :imageView()
//��  �� : �̹��� ��� ȣ��(�߽ſ�-�˾�)
///////////////////////////////////////////////////////////////////////////////
function openImageView(pre_url,UFID,FtpUrl,FtpID,FtpPW,ServerID,imageFolderName,imageFileName,imageTotalPagecount,Auth,FaxNo,ScreenID,veiwFlag){

	var url=pre_url+'&UFID='+UFID+'&ServerID='+ServerID+'&imageFolderName='+imageFolderName+'&imageFileName='+imageFileName+'&imageTotalPagecount='+imageTotalPagecount+'&Auth='+Auth+'&FaxNo='+FaxNo+'&ScreenID='+ScreenID+'&veiwFlag='+veiwFlag;
	var top, left,width,height,scroll;
	
	top = getCookie("HYUNDAI_viewwinTop");
    left = getCookie("HYUNDAI_viewwinLeft");
    height = getCookie("HYUNDAI_clientheight");
    width = getCookie("HYUNDAI_clientwidth");

    if(true){

     width='942';
     height='700';
     top=0;
     left = screen.width - width ;
    }

    if(scroll == null || scroll == '')	scroll='0';
    
	var	option = 'width='+width+',height='+height+',top='+top+',left='+left+',resizable=yes,location=no,status=no,toolbar=no,menubar=no,scrollbars=' + scroll;

	if(openWin != 0) {
		openWin.close();
	}
	openWin = window.open(url, 'imageView', option);

}
///////////////////////////////////////////////////////////////////////////////
//�Լ��� :imageView()
//��  �� : �̹��� ��� ȣ��(�߽ſ�)
///////////////////////////////////////////////////////////////////////////////
function callImageView(pre_url,UFID,FtpUrl,FtpID,FtpPW,imageFolderName,imageFileName,imageTotalPagecount,Auth,FaxNo,ScreenID){
		
	var url=pre_url+'&UFID='+UFID+'&imageFolderName='+imageFolderName+'&imageFileName='+imageFileName+'&imageTotalPagecount='+imageTotalPagecount+'&Auth='+Auth+'&FaxNo='+FaxNo+'&ScreenID='+ScreenID;
	
	var top, left,width,height,scroll;
	
	top = getCookie("HYUNDAI_viewwinTop");
    left = getCookie("HYUNDAI_viewwinLeft");
    height = getCookie("HYUNDAI_clientheight");
    width = getCookie("HYUNDAI_clientwidth");

    var name = navigator.appName, BrowserInfo = navigator.appVersion;
	if(name == "Microsoft Internet Explorer")
	{
	    if(BrowserInfo.indexOf("MSIE 3.0") != -1) BrowserInfo = "Internet Explorer 3.0x";
		else if(BrowserInfo.indexOf("MSIE 4.0") != -1) BrowserInfo = "Internet Explorer 4.0x";
		else if(BrowserInfo.indexOf("MSIE 5.0") != -1) BrowserInfo = "Internet Explorer 5.0x";
		else if(BrowserInfo.indexOf("MSIE 6.0") != -1) BrowserInfo = "Internet Explorer 6.0x";
		else if(BrowserInfo.indexOf("MSIE 7.0") != -1) BrowserInfo = "Internet Explorer 7.0x";
		else if(BrowserInfo.indexOf("MSIE 8.0") != -1) BrowserInfo = "Internet Explorer 8.0x";
		else if(BrowserInfo.indexOf("MSIE 9.0") != -1) BrowserInfo = "Internet Explorer 9.0x";
	}
    
    if(top == null || top == '' || top == undefined || left == null || left == '' || left == undefined || BrowserInfo=='Internet Explorer 4.0x' || BrowserInfo=='Internet Explorer 5.0x' || BrowserInfo=='Internet Explorer 6.0x'){

     width='942';
     height='700';
     top=0;
     left = screen.width - width ;
    }

    if(scroll == null || scroll == '')	scroll='0';
    
	var	option = 'width='+width+',height='+height+',top='+top+',left='+left+',resizable=yes,location=no,status=no,toolbar=no,menubar=no,scrollbars=' + scroll;
 
	window.open(url, 'imageView', option);

}
///////////////////////////////////////////////////////////////////////////////
//�Լ��� :inboundImageView()���ſ�
//��  �� : �̹��� ��� ȣ��
///////////////////////////////////////////////////////////////////////////////
function inboundImageView(viewUrl,returnURL,UFID,FtpUrl,FtpID,FtpPW,imageFolderName,imageFileName,imageTotalPagecount,
		Auth,FaxNo,ScreenID,ServerID,PortNo,ExtentionNo,ANI,CSID,Speed,SuccessYN,DisconnectResultCode,
		DisconnectResultDescription,ISDNResultCode,ImageFileSize,NetworkInboundYN,fullImageFolderName,OwnerDateTime,viewFlag){

	var exeindex = imageFileName.indexOf(".");
	var exetension=imageFileName.substring(exeindex);

	if(exetension!='.tif'){//�߽� ������ ��� �������� ��ȯ�� �ȵǴ� ��Ȳ�� ������ ����
		alert('�̸����� ������ ������ �ƴմϴ�.');
		return;
	}

	var url=viewUrl+'&returnURL='+returnURL+'&UFID='+UFID+'&ServerID='+ServerID+'&imageFolderName='+imageFolderName+
	'&imageFileName='+imageFileName+'&imageTotalPagecount='+imageTotalPagecount+'&Auth='+Auth+'&FaxNo='+FaxNo+'&ScreenID='+
	ScreenID+'&ServerID='+ServerID+'&PortNo='+PortNo+'&ExtentionNo='+ExtentionNo+'&ANI='+ANI+'&CSID='+
	CSID+'&Speed='+Speed+'&SuccessYN='+SuccessYN+'&DisconnectResultCode='+DisconnectResultCode+
	'&DisconnectResultDescription='+DisconnectResultDescription+'&ISDNResultCode='+ISDNResultCode+'&ImageFileSize='+ImageFileSize+'&NetworkInboundYN='+NetworkInboundYN+'&fullImageFolderName='+fullImageFolderName+'&OwnerDateTime='+OwnerDateTime+'&viewFlag='+viewFlag;

	var top, left,width,height,scroll;
	
	top = getCookie("HYUNDAI_viewwinTop");
    left = getCookie("HYUNDAI_viewwinLeft");
    height = getCookie("HYUNDAI_clientheight");
    width = getCookie("HYUNDAI_clientwidth");

    if(true){

     width='942';
     height='700';
     top	 = screen.height/2 - height/2 - 50;
	 left = screen.width/2 - width/2 ;
    }

    if(scroll == null || scroll == '')	scroll='0';
	
	var	option = 'width='+width+',height='+height+',top='+top+',left='+left+',resizable=yes,location=no,status=no,toolbar=no,menubar=no,scrollbars=' + scroll;
	
	//alert('����'+parent.viewWin);
	
	if(undefined==parent.viewWin){
	
		openWin= window.open(url, 'imageView', option);
	}else{
	
		if(parent.viewWin != 0) {
			parent.viewWin.close();
		}
		parent.viewWin = window.open(url, 'imageView', option);
	}
 	
}
///////////////////////////////////////////////////////////////////////////////
//�Լ��� :inboundImageView()���ſ�
//��  �� : �̹��� ��� ȣ��
///////////////////////////////////////////////////////////////////////////////
function LongInboundImageView(returnURL,UFID,FtpUrl,FtpID,FtpPW,imageFolderName,imageFileName,imageTotalPagecount,
		Auth,FaxNo,ScreenID,ServerID,PortNo,ExtentionNo,ANI,CSID,Speed,SuccessYN,DisconnectResultCode,
		DisconnectResultDescription,ISDNResultCode,ImageFileSize,NetworkInboundYN,fullImageFolderName){

	var exeindex = imageFileName.indexOf(".");
	var exetension=imageFileName.substring(exeindex);

	if(exetension!='.tif'){//�߽� ������ ��� �������� ��ȯ�� �ȵǴ� ��Ȳ�� ������ ����
		alert('�̸����� ������ ������ �ƴմϴ�.');
		return;
	}

	var url='/H_Common.do?cmd=InboundImageView&returnURL='+returnURL+'&UFID='+UFID+'&imageFolderName='+imageFolderName+
	'&imageFileName='+imageFileName+'&imageTotalPagecount='+imageTotalPagecount+'&Auth='+Auth+'&FaxNo='+FaxNo+'&ScreenID='+
	ScreenID+'&ServerID='+ServerID+'&PortNo='+PortNo+'&ExtentionNo='+ExtentionNo+'&ANI='+ANI+'&CSID='+
	CSID+'&Speed='+Speed+'&SuccessYN='+SuccessYN+'&DisconnectResultCode='+DisconnectResultCode+
	'&DisconnectResultDescription='+DisconnectResultDescription+'&ISDNResultCode='+ISDNResultCode+'&ImageFileSize='+ImageFileSize+'&NetworkInboundYN='+NetworkInboundYN+'&fullImageFolderName='+fullImageFolderName;

	var top, left,width,height,scroll;
	
	top = getCookie("HYUNDAI_viewwinTop");
    left = getCookie("HYUNDAI_viewwinLeft");
    height = getCookie("HYUNDAI_clientheight");
    width = getCookie("HYUNDAI_clientwidth");

    if(true){
    	
     width=screen.width;
     height=screen.height;
     top=0;
     left = 0;
     
    }

    if(scroll == null || scroll == '')	scroll='0';

	var	option = 'width='+width+',height='+height+',top='+top+',left='+left+',resizable=yes,location=no,status=no,toolbar=no,menubar=no,scrollbars=' + scroll;
	//alert('����'+parent.viewWin);
	if(parent.viewWin != 0) {
		parent.viewWin.close();
	}
	parent.viewWin = window.open(url, 'imageView', option);
	
}
///////////////////////////////////////////////////////////////////////////////
//�Լ��� :inboundImageView()���ſ�
//��  �� : �̹��� ��� ȣ��
///////////////////////////////////////////////////////////////////////////////
function acceptInboundImageView(index,returnURL,UFID,FtpUrl,FtpID,FtpPW,imageFolderName,imageFileName,imageTotalPagecount,
		Auth,FaxNo,ScreenID,ServerID,PortNo,ExtentionNo,ANI,CSID,Speed,SuccessYN,DisconnectResultCode,
		DisconnectResultDescription,ISDNResultCode,ImageFileSize,NetworkInboundYN,fullImageFolderName){

	var exeindex = imageFileName.indexOf(".");
	var exetension=imageFileName.substring(exeindex);

	if(exetension!='.tif'){//�߽� ������ ��� �������� ��ȯ�� �ȵǴ� ��Ȳ�� ������ ����
		alert('�̸����� ������ ������ �ƴմϴ�.');
		return;
	}

	var url='/H_Common.do?cmd=InboundImageView&returnURL='+returnURL+'&UFID='+UFID+'&imageFolderName='+imageFolderName+
	'&imageFileName='+imageFileName+'&imageTotalPagecount='+imageTotalPagecount+'&Auth='+Auth+'&FaxNo='+FaxNo+'&ScreenID='+
	ScreenID+'&ServerID='+ServerID+'&PortNo='+PortNo+'&ExtentionNo='+ExtentionNo+'&ANI='+ANI+'&CSID='+
	CSID+'&Speed='+Speed+'&SuccessYN='+SuccessYN+'&DisconnectResultCode='+DisconnectResultCode+
	'&DisconnectResultDescription='+DisconnectResultDescription+'&ISDNResultCode='+ISDNResultCode+'&ImageFileSize='+ImageFileSize+'&NetworkInboundYN='+NetworkInboundYN+'&fullImageFolderName='+fullImageFolderName+'&acceptIndex='+index;

	var top, left,width,height,scroll;
	
	top = getCookie("HYUNDAI_viewwinTop");
  left = getCookie("HYUNDAI_viewwinLeft");
  height = getCookie("HYUNDAI_clientheight");
  width = getCookie("HYUNDAI_clientwidth");

  if(true){
  	
   width=screen.width;
   height=screen.height;
   top=0;
   left = 0;
   
  }

  if(scroll == null || scroll == '')	scroll='0';

	var	option = 'width='+width+',height='+height+',top='+top+',left='+left+',resizable=yes,location=no,status=no,toolbar=no,menubar=no,scrollbars=' + scroll;
	//alert('����'+parent.viewWin);
	if(parent.viewWin != 0) {
		parent.viewWin.close();
	}
	parent.viewWin = window.open(url, 'imageView', option);
	
}
///////////////////////////////////////////////////////////////////////////////
//�Լ��� :imageView()
//��  �� : �̹��� ��� ȣ��(�߽ſ�)
///////////////////////////////////////////////////////////////////////////////
function LongImageView(pre_url,UFID,FtpUrl,FtpID,FtpPW,imageFolderName,imageFileName,imageTotalPagecount,Auth,FaxNo,ScreenID){
		
	var url=pre_url+'&UFID='+UFID+'&imageFolderName='+imageFolderName+'&imageFileName='+imageFileName+'&imageTotalPagecount='+imageTotalPagecount+'&Auth='+Auth+'&FaxNo='+FaxNo+'&ScreenID='+ScreenID;

	var top, left,width,height,scroll;
	
	top = getCookie("HYUNDAI_viewwinTop");
    left = getCookie("HYUNDAI_viewwinLeft");
    height = getCookie("HYUNDAI_clientheight");
    width = getCookie("HYUNDAI_clientwidth");

    if(true){

     width=screen.width;
     height=screen.height;
     top=0;
     left = 0;
     
    }

    if(scroll == null || scroll == '')	scroll='0';
    
	var	option = 'width='+width+',height='+height+',top='+top+',left='+left+',resizable=yes,location=no,status=no,toolbar=no,menubar=no,scrollbars=' + scroll;
	
	if(parent.viewWin != 0) {
		parent.viewWin.close();
	}
	parent.viewWin = window.open(url, 'imageView', option);

}
function tmt_winLaunch(theURL,winName,targetName,features) {
	eval(winName+"=window.open('"+theURL+"','"+targetName+"','"+features+"')");
}
function init(){

var h=screen.height-(screen.height*(8.5/100));
var s=screen.width-10;

//alert('������ ����� �ػ󵵴� ' + s + ' x ' + h + '�Դϴ�.');
tmt_winLaunch('<%= request.getContextPath()%>/H_Login.do?cmd=main', 'qaz', 'qaz', 'status=yes,width='+s+',height ='+h+',left=0,top=0');

}
///////////////////////////////////////////////////////////////////////////////
//�Լ��� :inboundImageView()���ſ�
//��  �� : �̹��� ��� ȣ��
///////////////////////////////////////////////////////////////////////////////
function callInboundImageView(returnURL,UFID,FtpUrl,FtpID,FtpPW,imageFolderName,imageFileName,imageTotalPagecount,
		Auth,FaxNo,ScreenID,ServerID,PortNo,ExtentionNo,ANI,CSID,Speed,SuccessYN,DisconnectResultCode,
		DisconnectResultDescription,ISDNResultCode,ImageFileSize,NetworkInboundYN,fullImageFolderName){

	var exeindex = imageFileName.indexOf(".");
	var exetension=imageFileName.substring(exeindex);

	if(exetension!='.tif'){//�߽� ������ ��� �������� ��ȯ�� �ȵǴ� ��Ȳ�� ������ ����
		alert('�̸����� ������ ������ �ƴմϴ�.');
		return;
	}

	var url='/H_Common.do?cmd=InboundImageView&returnURL='+returnURL+'&UFID='+UFID+'&imageFolderName='+imageFolderName+
	'&imageFileName='+imageFileName+'&imageTotalPagecount='+imageTotalPagecount+'&Auth='+Auth+'&FaxNo='+FaxNo+'&ScreenID='+
	ScreenID+'&ServerID='+ServerID+'&PortNo='+PortNo+'&ExtentionNo='+ExtentionNo+'&ANI='+ANI+'&CSID='+
	CSID+'&Speed='+Speed+'&SuccessYN='+SuccessYN+'&DisconnectResultCode='+DisconnectResultCode+
	'&DisconnectResultDescription='+DisconnectResultDescription+'&ISDNResultCode='+ISDNResultCode+'&ImageFileSize='+ImageFileSize+'&NetworkInboundYN='+NetworkInboundYN+'&fullImageFolderName='+fullImageFolderName;

	var top, left,width,height,scroll;

	top = getCookie("HYUNDAI_viewwinTop");
    left = getCookie("HYUNDAI_viewwinLeft");
    height = getCookie("HYUNDAI_clientheight");
    width = getCookie("HYUNDAI_clientwidth");

    var name = navigator.appName, BrowserInfo = navigator.appVersion;
	if(name == "Microsoft Internet Explorer")
	{
	    if(BrowserInfo.indexOf("MSIE 3.0") != -1) BrowserInfo = "Internet Explorer 3.0x";
		else if(BrowserInfo.indexOf("MSIE 4.0") != -1) BrowserInfo = "Internet Explorer 4.0x";
		else if(BrowserInfo.indexOf("MSIE 5.0") != -1) BrowserInfo = "Internet Explorer 5.0x";
		else if(BrowserInfo.indexOf("MSIE 6.0") != -1) BrowserInfo = "Internet Explorer 6.0x";
		else if(BrowserInfo.indexOf("MSIE 7.0") != -1) BrowserInfo = "Internet Explorer 7.0x";
		else if(BrowserInfo.indexOf("MSIE 8.0") != -1) BrowserInfo = "Internet Explorer 8.0x";
		else if(BrowserInfo.indexOf("MSIE 9.0") != -1) BrowserInfo = "Internet Explorer 9.0x";
	}
    
    if(top == null || top == '' || top == undefined || left == null || left == '' || left == undefined || BrowserInfo=='Internet Explorer 4.0x' || BrowserInfo=='Internet Explorer 5.0x' || BrowserInfo=='Internet Explorer 6.0x'){

     width='942';
     height='700';
     top=0;
     left = screen.width - width ;
    }

    if(scroll == null || scroll == '')	scroll='0';
    
	var	option = 'width='+width+',height='+height+',top='+top+',left='+left+',resizable=yes,location=no,status=no,toolbar=no,menubar=no,scrollbars=' + scroll;


	var objnm=UFID;

	objnm = window.open(url, UFID, option);
/*
	if(parent.viewWin != 0) {
		parent.viewWin.close();
	}
	parent.viewWin = window.open(url, 'imageView', option);
*/

}
function setWindowSize(){

	var viewwinTop=opener.parent.viewWin.screenTop;
	var viewwinLeft=opener.parent.viewWin.screenLeft;
	var clientheight=document.body.clientHeight;
	var clientwidth=document.body.clientWidth;

	setCookie("HYUNDAI_viewwinTop", viewwinTop);
	setCookie("HYUNDAI_viewwinLeft",viewwinLeft);
	setCookie("HYUNDAI_clientheight",clientheight);
	setCookie("HYUNDAI_clientwidth",clientwidth);

}
///////////////////////////////////////////////////////////////////////////////
//�Լ��� :format_phone()
//��  �� : ��ȭ��ȣ ������ �ڵ������Ѵ�.
///////////////////////////////////////////////////////////////////////////////
function format_phone(obj) {
	
	var str=onlyNum(obj.value);
	
	if(str.length<5){
		return;
	}

	rgnNo = new Array;
	rgnNo[0] = "02";
	rgnNo[1] = "031";
	rgnNo[2] = "032";
	rgnNo[3] = "033";
	rgnNo[4] = "041";
	rgnNo[5] = "042";
	rgnNo[6] = "043";
	rgnNo[7] = "0502";
	rgnNo[8] = "0504";
	rgnNo[9] = "0505";
	rgnNo[10] = "0506";
	rgnNo[11] = "0507";
	rgnNo[12] = "051";
	rgnNo[13] = "052";
	rgnNo[14] = "053";
	rgnNo[15] = "054";
	rgnNo[16] = "055";
	rgnNo[17] = "061";
	rgnNo[18] = "062";
	rgnNo[19] = "063";
	rgnNo[20] = "064";
	rgnNo[21] = "070";
	rgnNo[22] = "010";
	rgnNo[23] = "011";
	rgnNo[24] = "016";
	rgnNo[25] = "017";
	rgnNo[26] = "018";
	rgnNo[27] = "019";
	
	var temp = str;

	for (var i = 0; i < rgnNo.length; i++) {
		if (str.indexOf(rgnNo[i]) == 0) {
			len_rgn = rgnNo[i].length;
			formattedNo = getFormattedPhone(str.substring(len_rgn));
			temp=rgnNo[i] + "-" + formattedNo;
			
			break;
		}
	}
	
	obj.value=temp;

}
//�����̽�ó��
function fillSpace(val){

	if(typeof val =="undefined" || val == null){
		return ' ';
	}
	if(val.length==0){
		return ' ';
	}

    return val;
}
///////////////////////////////////////////////////////////////////////////////
//�Լ��� :getFormattedPhone()
//��  �� : ��ȭ��ȣ ������ �ڵ������Ѵ�.
//Event : 
//Object : Input
///////////////////////////////////////////////////////////////////////////////
function getFormattedPhone(str) {
	if (str.length<=4) {
		return str;
	}
	else {
		len_no1 = str.length - 4;
		no1 = str.substring(0, len_no1);
		no2 = str.substring(len_no1);
		return no1 + "-" + no2;
	}
}
function onlyNum(val)
{
 var num = val;
 var tmp = "";

 for (var i = 0; i < num.length; i ++)
 {
  if (num.charAt(i) >= 0 && num.charAt(i) <= 9)
   tmp = tmp + num.charAt(i);
  else
   continue;
 }
 return tmp;
}
///////////////////////////////////////////////////////////////////////////////
//�Լ��� :MM_swapImgRestore(),MM_preloadImages,MM_findObj,MM_swapImage
//��  �� : �̹��� ȿ���Լ�.
///////////////////////////////////////////////////////////////////////////////
function MM_swapImgRestore() { //v3.0
  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}
function MM_preloadImages() { //v3.0
  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
    var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}

function MM_findObj(n, d) { //v4.01
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
}

function MM_swapImage() { //v3.0
  var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
   if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}
function MM_nbGroup(event, grpName) { //v6.0
	  var i,img,nbArr,args=MM_nbGroup.arguments;
	  if (event == "init" && args.length > 2) {
	    if ((img = MM_findObj(args[2])) != null && !img.MM_init) {
	      img.MM_init = true; img.MM_up = args[3]; img.MM_dn = img.src;
	      if ((nbArr = document[grpName]) == null) nbArr = document[grpName] = new Array();
	      nbArr[nbArr.length] = img;
	      for (i=4; i < args.length-1; i+=2) if ((img = MM_findObj(args[i])) != null) {
	        if (!img.MM_up) img.MM_up = img.src;
	        img.src = img.MM_dn = args[i+1];
	        nbArr[nbArr.length] = img;
	    } }
	  } else if (event == "over") {
	    document.MM_nbOver = nbArr = new Array();
	    for (i=1; i < args.length-1; i+=3) if ((img = MM_findObj(args[i])) != null) {
	      if (!img.MM_up) img.MM_up = img.src;
	      img.src = (img.MM_dn && args[i+2]) ? args[i+2] : ((args[i+1])? args[i+1] : img.MM_up);
	      nbArr[nbArr.length] = img;
	    }
	  } else if (event == "out" ) {
	    for (i=0; i < document.MM_nbOver.length; i++) {
	      img = document.MM_nbOver[i]; img.src = (img.MM_dn) ? img.MM_dn : img.MM_up; }
	  } else if (event == "down") {
	    nbArr = document[grpName];
	    if (nbArr)
	      for (i=0; i < nbArr.length; i++) { img=nbArr[i]; img.src = img.MM_up; img.MM_dn = 0; }
	    document[grpName] = nbArr = new Array();
	    for (i=2; i < args.length-1; i+=2) if ((img = MM_findObj(args[i])) != null) {
	      if (!img.MM_up) img.MM_up = img.src;
	      img.src = img.MM_dn = (args[i+1])? args[i+1] : img.MM_up;
	      nbArr[nbArr.length] = img;
	  } }
	}
function MM_showHideLayers() { //v9.0
	  var i,p,v,obj,args=MM_showHideLayers.arguments;
	  for (i=0; i<(args.length-2); i+=3) 
	  with (document) if (getElementById && ((obj=getElementById(args[i]))!=null)) { v=args[i+2];
	    if (obj.style) { obj=obj.style; v=(v=='show')?'block':(v=='hide')?'none':v; }
	    obj.display=v; }
	}


var contextroot='';
///////////////////////////////////////////////////////////////////////////////
//�Լ��� : groupAuth
//��  �� : ����(�׷�)���ÿɼ� �߰�
///////////////////////////////////////////////////////////////////////////////
function groupAuth(frm){

	var gobj=document.all.group_select;
	var sobj=document.all.seach_box;
	var uobj=document.all.user_select;

	if(frm.AuthOption.value=="Group"){//������ �����ΰ�� ó��

		frm.AuthID.value=frm.cmAuthID.value;//����� ���� ���� ���̵� �����Ѵ�.
		
		if(gobj!= undefined){
			gobj.style.display='block';
			sobj.style.height='50px';
		}
		
		if(uobj!= undefined){
			uobj.style.display='none';
			if(frm.searchArea!= undefined){
			 frm.searchArea.value='';
			 frm.vSearchTeamDIDNo.value='';
			}

		}
		
		var step=frm.cmAuthStep.value;//���ѷ���	
		
		if(step==0){//����0�ܰ�(��ü����)
			initGroupCodeChange('G-1','group1',frm);//1�ܰ� �׷켼��
			
			if(frm.cmAuthID.value=='G0000000'){//��ü�����ΰ��
				frm.group1.value='S'; 
			}else{
				frm.group1.value=frm.cmAuthID.value; //1�ܰ� �׷� ����
			}
						
						
			frm.SearchAuthBox.value='group1';//���õ� ��ȸ���� box 
			initGroupCodeChange(frm.group1.value,'group2',frm);  //2�ܰ� �׷켼��
		}else if(step==1){//����1�ܰ�
			initGroupCodeChange(frm.cmUpAuthID.value,'group1',frm);//1�ܰ� �׷켼��
			frm.group1.value=frm.cmAuthID.value; //1�ܰ� �׷� ����
			frm.SearchAuthBox.value='group1';//���õ� ��ȸ���� box 
			initGroupCodeChange(frm.group1.value,'group2',frm); //2�ܰ� �׷켼��
			frm.group1.disabled=true; //�������� disabled
		}else if(step==2){//����2�ܰ�
			initGroupCodeChange(frm.cmUpAuthID.value,'group2',frm); //2�ܰ� �׷켼��
			frm.group2.value=frm.cmAuthID.value; //2�ܰ� �׷� ����
			frm.SearchAuthBox.value='group2';//���õ� ��ȸ���� box 
			initGroupCodeChange(frm.group2.value,'group3',frm); //3�ܰ� �׷켼��
			frm.group1.disabled=true; //�������� disabled
			frm.group2.disabled=true; //�������� disabled
		}else if(step==3){//����3�ܰ�
			initGroupCodeChange(frm.cmUpAuthID.value,'group3',frm); //3�ܰ� �׷켼��
			frm.group3.value=frm.cmAuthID.value; //3�ܰ� �׷� ����
			frm.SearchAuthBox.value='group3'; //���õ� ��ȸ���� box
			initGroupCodeChange(frm.group3.value,'group4',frm); //4�ܰ� �׷켼��
			frm.group1.disabled=true;//�������� disabled
			frm.group2.disabled=true;//�������� disabled
			frm.group3.disabled=true;//�������� disabled
		}else if(step==4){//����4�ܰ�
			initGroupCodeChange(frm.cmUpAuthID.value,'group4',frm);//4�ܰ� �׷켼��
			frm.group4.value=frm.cmAuthID.value;//4�ܰ� �׷� ����
			frm.SearchAuthBox.value='group4';//���õ� ��ȸ���� box
			initGroupCodeChange(frm.group4.value,'group5',frm); //5�ܰ� �׷켼��
			frm.group1.disabled=true;//�������� disabled
			frm.group2.disabled=true;//�������� disabled
			frm.group3.disabled=true;//�������� disabled
			frm.group4.disabled=true;//�������� disabled
		}else if(step==5){//����5�ܰ�
			initGroupCodeChange(frm.cmUpAuthID.value,'group5',frm);//5�ܰ� �׷켼��
			frm.group5.value=frm.cmGroupID.value;//5�ܰ� �׷� ����
			frm.SearchAuthBox.value='group5';//���õ� ��ȸ���� box
			frm.group1.disabled=true;//�������� disabled
			frm.group2.disabled=true;//�������� disabled
			frm.group3.disabled=true;//�������� disabled
			frm.group4.disabled=true;//�������� disabled
		}

		if(frm.AuthGroupOption!= undefined){

			if(frm.AuthGroupOption[0].checked){
				frm.AuthGroup.value='Y';
			}else{
				frm.AuthGroup.value='N';
			}
		}

	}else if(frm.AuthOption.value=="User"){//������ ���ΰ�� ó��
		
		frm.AuthID.value=frm.cmUserID.value;//����ID�� ���ѿ� �����Ѵ�.
		frm.AuthGroup.value='N';
		if(gobj!= undefined){
			gobj.style.display='none';
		}
		
		if(uobj!= undefined){
			uobj.style.display='block';
			sobj.style.height='50px';
		}else{
			sobj.style.height='25px';
		}

	}else{//������ �̹����ΰ�� ó��
		
		frm.AuthID.value=frm.cmAuthID.value;//�׷�ID�� ���ѿ� �����Ѵ�.
		frm.AuthGroup.value='N';
		if(gobj!= undefined){
			gobj.style.display='none';
		}
		sobj.style.height='25px';
	}
}
function setAuthGroup(frm,val){
	frm.AuthGroup.value=val;
}
function searchOptionGubin(obj){
	if(obj.searchArea.value!='3'){
		obj.vSearchTeamDIDNo.value='';
		obj.vSearchTeamDIDNo.disabled=true;
	}else{
		obj.vSearchTeamDIDNo.disabled=false;
	}
}
///////////////////////////////////////////////////////////////////////////////
//�Լ��� :  initGroupCodeChange
//��  �� : �ʱ� group �ܰ迡 ���� type�� ���� �ش� Ÿ���� �ڵ忡  ���� ���� ����Ʈ�� �������ش�.
///////////////////////////////////////////////////////////////////////////////
function initGroupCodeChange(code,target,form)
{
	clearComboBox(target,form);

	if(code=='CallAll'){//��ü�ΰ��(��)
		
		callGroupAllComboBox(form);
		
		return;
	}
	
	if(code=='LongAll'){//��ü�ΰ��(���)
		
		longGroupAllComboBox(form);
		
		return;
	}

	if(code == "S" ) {	
		return;
	}
	
	var request = contextroot+"/H_Common.do?cmd=groupComboList";
	var combo;	
	
	if(target == 'group1') {
		request = request + "&groupid="+code;		
		combo = form.group1;
	} else if(target == 'group2') {
		request = request + "&groupid="+code;			
		combo = form.group2;
	} else if(target == 'group3') {
		request = request + "&groupid="+code;			
		combo = form.group3;
	} else if(target == 'group4') {
		request = request + "&groupid="+code;			
		combo = form.group4;
	} else if(target == 'group5') {
		request = request + "&groupid="+code;			
		combo = form.group5;
	} else {
		return;
	}

	doRequestSubmit(combo, request);

}
function upGroupValue(target,form){

	var result;
	
	if(target=='group5'){
		result=form.group3.value;
	}else if(target=='group4'){ 
		result=form.group2.value;
	}else if(target=='group3'){ 
		result=form.group1.value;
	}else if(target=='group2'){ 
		result='G0000000';
	} 

	return result;
	
}
///////////////////////////////////////////////////////////////////////////////
//�Լ��� :  GroupCodeChange
//��  �� : ���� group �ܰ迡 ���� type�� ���� �ش� Ÿ���� �ڵ忡  ���� ���� ����Ʈ�� �������ش�.
///////////////////////////////////////////////////////////////////////////////
function GroupCodeChange(object,target,form)
{
	
	var code = getSelectValue(object, true);//���ð� ��������
	
	
	if(code=='S' || code==''){
		form.AuthID.value=upGroupValue(target,form);
	}else{
    	form.AuthID.value=code;//���ð����� ���Ѽ���
	}



	if(form.GroupDID!= undefined){//�׷�DID�˻��ΰ��
		var title=getSelectTitle(object);//���õ� Ÿ��Ʋ ��������
		form.GroupDID.value=title;
		var groupname = getSelectValue(object, false);//�׷�� ��������
		form.GroupName.value=groupname;
	}
	
	if(target == 'group1') {
		//���� ������ ����Ʈ ���� box����
		clearComboBox('group1',form);
		clearComboBox('group2',form);
		clearComboBox('group3',form);
		clearComboBox('group4',form);
		clearComboBox('group5',form);
		form.SearchAuthBox.value='group1';//���õ� ��ȸ���� box
		form.sGroup1.value=code;//���õ� ��ȸ���� box
	}else if(target == 'group2') {
		//���� ������ ����Ʈ ���� box����
		clearComboBox('group2',form);
		clearComboBox('group3',form);
		clearComboBox('group4',form);
		clearComboBox('group5',form);
		form.SearchAuthBox.value='group1';//���õ� ��ȸ���� box
		form.sGroup1.value=code;//���õ� ��ȸ���� box
	}else if(target == 'group3') {
		//���� ������ ����Ʈ ���� box����
		clearComboBox('group3',form);
		clearComboBox('group4',form);
		clearComboBox('group5',form);
		form.SearchAuthBox.value='group2';//���õ� ��ȸ���� box
		form.sGroup2.value=code;//���õ� ��ȸ���� box
	}else if(target == 'group4') {
		//���� ������ ����Ʈ ���� box����
		clearComboBox('group4',form);
		clearComboBox('group5',form);
		form.SearchAuthBox.value='group3';//���õ� ��ȸ���� box
		form.sGroup3.value=code;//���õ� ��ȸ���� box
	}else if(target == 'group5') {
		//���� ������ ����Ʈ ���� box����
		clearComboBox('group5',form);
		form.SearchAuthBox.value='group4';//���õ� ��ȸ���� box
		form.sGroup4.value=code;//���õ� ��ȸ���� box
		
	}

	if(code == "S") {	
		return;
	}
	
	var request = contextroot+"/H_Common.do?cmd=groupComboList";
	var combo;	
	
	if(target == 'group1') {
		request = request + "&groupid=G-1";		
		combo = form.group1;
	} else if(target == 'group2') {
		request = request + "&groupid="+code;			
		combo = form.group2;
	} else if(target == 'group3') {
		request = request + "&groupid="+code;			
		combo = form.group3;
	} else if(target == 'group4') {
		request = request + "&groupid="+code;			
		combo = form.group4;
	} else if(target == 'group5') {
		request = request + "&groupid="+code;			
		combo = form.group5;
	} else {
		return;
	}

	doRequestSubmit(combo, request);

}
///////////////////////////////////////////////////////////////////////////////
//�Լ��� :  searchChange
//��  �� : �˻������ �˻����ǿ� ���� type�� ���� �ش� Ÿ���� �ڵ忡  ���� ���� ����Ʈ�� �������ش�.
///////////////////////////////////////////////////////////////////////////////
function searchSelectAuth(frm,group){

	var step=frm.cmAuthStep.value;//���ѷ���
	
	if(group=='group1'){//������ ���� box(��ü)
		initGroupCodeChange('G-1','group1',frm);//1�ܰ� ���� ����
		
		if(frm.sGroup1.value=='G0000000'){//��ü�����ΰ��
			frm.group1.value='S'; 
		}else{
			frm.group1.value=frm.sGroup1.value; //0�ܰ� �׷� ����
		}

		initGroupCodeChange(frm.sGroup1.value,'group2',frm);//2�ܰ� ���� ����
	}else if(group=='group2'){//������ ���� box
		initGroupCodeChange('G-1','group1',frm);//1�ܰ� ���� ����
		initGroupCodeChange(frm.sGroup1.value,'group2',frm);//2�ܰ� ���� ����
		initGroupCodeChange(frm.sGroup2.value,'group3',frm);//3�ܰ� ���� ����
		frm.group1.value=frm.sGroup1.value;//1�ܰ���� ����
		frm.group2.value=frm.sGroup2.value;//2�ܰ���� ����
	}else if(group=='group3'){//������ ���� box
		if(step==0){//���� ���� 0�ܰ�
			initGroupCodeChange('G-1','group1',frm);//1�ܰ� ���� ����
			initGroupCodeChange(frm.sGroup1.value,'group2',frm);//2�ܰ� ���� ����
			initGroupCodeChange(frm.sGroup2.value,'group3',frm);//3�ܰ� ���� ����
			initGroupCodeChange(frm.sGroup3.value,'group4',frm);//4�ܰ� ���� ����
			frm.group1.value=frm.sGroup1.value;//1�ܰ���� ����
			frm.group2.value=frm.sGroup2.value;//2�ܰ���� ����
			frm.group3.value=frm.sGroup3.value;//3�ܰ���� ����
		}else if(step==1){//���� ���� 1�ܰ�
			initGroupCodeChange('G-1','group1',frm);//1�ܰ� ���� ����
			initGroupCodeChange(frm.sGroup1.value,'group2',frm);//2�ܰ� ���� ����
			initGroupCodeChange(frm.sGroup2.value,'group3',frm);//3�ܰ� ���� ����
			initGroupCodeChange(frm.sGroup3.value,'group4',frm);//4�ܰ� ���� ����
			frm.group1.value=frm.sGroup1.value;//1�ܰ���� ����
			frm.group2.value=frm.sGroup2.value;//2�ܰ���� ����
			frm.group3.value=frm.sGroup3.value;//3�ܰ���� ����
		}else if(step==2){//���� ���� 2�ܰ�
			initGroupCodeChange(frm.group2.value,'group3',frm);//3�ܰ� ���� ����
			initGroupCodeChange(frm.sGroup3.value,'group4',frm);//4�ܰ� ���� ����
			frm.group3.value=frm.sGroup3.value;//3�ܰ���� ����
		}else if(step==3){//���� ���� 3�ܰ�
			initGroupCodeChange(frm.group3.value,'group4',frm);//4�ܰ� ���� ����
		}
	}else {//������ ���� box(4,5)
		if(step==0){//���� ���� 0�ܰ�
			initGroupCodeChange('G-1','group1',frm);//1�ܰ� ���� ����
			initGroupCodeChange(frm.sGroup1.value,'group2',frm);//2�ܰ� ���� ����
			initGroupCodeChange(frm.sGroup2.value,'group3',frm);//3�ܰ� ���� ����
			initGroupCodeChange(frm.sGroup3.value,'group4',frm);//4�ܰ� ���� ����
			initGroupCodeChange(frm.sGroup4.value,'group5',frm);//5�ܰ� ���� ����
			frm.group1.value=frm.sGroup1.value;//1�ܰ���� ����
			frm.group2.value=frm.sGroup2.value;//2�ܰ���� ����
			frm.group3.value=frm.sGroup3.value;//3�ܰ���� ����
			frm.group4.value=frm.sGroup4.value;//4�ܰ���� ����
		}else if(step==1){//���� ���� 1�ܰ�
			initGroupCodeChange('G-1','group1',frm);//1�ܰ� ���� ����
			initGroupCodeChange(frm.sGroup1.value,'group2',frm);//2�ܰ� ���� ����
			initGroupCodeChange(frm.sGroup2.value,'group3',frm);//3�ܰ� ���� ����
			initGroupCodeChange(frm.sGroup3.value,'group4',frm);//4�ܰ� ���� ����
			initGroupCodeChange(frm.sGroup4.value,'group5',frm);//5�ܰ� ���� ����
			frm.group1.value=frm.sGroup1.value;//1�ܰ���� ����
			frm.group2.value=frm.sGroup2.value;//2�ܰ���� ����
			frm.group3.value=frm.sGroup3.value;//3�ܰ���� ����
			frm.group4.value=frm.sGroup4.value;//4�ܰ���� ����
		}else if(step==2){//���� ���� 2�ܰ�
			initGroupCodeChange(frm.group2.value,'group3',frm);//3�ܰ� ���� ����
			initGroupCodeChange(frm.sGroup3.value,'group4',frm);//4�ܰ� ���� ����
			initGroupCodeChange(frm.sGroup4.value,'group5',frm);//5�ܰ� ���� ����
			frm.group3.value=frm.sGroup3.value;//3�ܰ���� ����
			frm.group4.value=frm.sGroup4.value;//4�ܰ���� ����
		}else if(step==3){//���� ���� 3�ܰ�
			initGroupCodeChange(frm.group3.value,'group4',frm);//4�ܰ� ���� ����
			initGroupCodeChange(frm.sGroup4.value,'group5',frm);//5�ܰ� ���� ����
			frm.group4.value=frm.sGroup4.value;//4�ܰ���� ����
		}else if(step==4){//���� ���� 4�ܰ�
			initGroupCodeChange(frm.sGroup4.value,'group5',frm);//5�ܰ� ���� ����
			frm.group5.value=frm.sGroup5.value;//5�ܰ���� ����
		}
	}
	
	frm.SearchAuthBox.value=group;
	
}
//���õ� �� ��������
function getSelectValue(object, isValue)
{
	value = "";

	for(var i = 0 ; i < object.options.length ; i++)
	{
		if(object.options[i].selected)
		{
			if(isValue)
			{
				value = object.options[i].value;
			}
			else
			{
				value = object.options[i].text;
			}
			break;
		}
	}
	return value;
}
//���õ� Ÿ��Ʋ ��������
function getSelectTitle(object)
{
	title = "";

	for(var i = 0 ; i < object.options.length ; i++)
	{
		if(object.options[i].selected)
		{

			title = object.options[i].title;

			break;
		}
	}
	return title;
}
//����Ʈ �ڽ� ����
function clearComboBox(name,form)
{
	
	switch(name) {
		case "group1" : 
		case "group2" : 	
			clearSelectOptions(form.group2);	
			addSelectOption(form.group2, "S", "��ü");

		case "group3" :
			clearSelectOptions(form.group3);	
			addSelectOption(form.group3, "S", "��ü");
		
		case "group4" :
			clearSelectOptions(form.group4);	
			addSelectOption(form.group4, "S", "��ü");

		case "group5" :
			clearSelectOptions(form.group5);	
			addSelectOption(form.group5, "S", "��ü");
	}
}
//request ��û
function doRequestSubmit(combo, request)
{
	try {

		var xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
		xmlhttp.open("GET", request, false);
		xmlhttp.send(request);

		var resultText = xmlhttp.responseText;
		var xmlObject = new ActiveXObject("Microsoft.XMLDOM");
		
		xmlObject.loadXML(resultText);	

		createComboBox(combo, xmlObject);

	} catch(e) {}
}
function groupNameReplace(name){
	
	var rname;
	
	rname=name.replace("%26","&");
	
	return rname;
	
}
//����Ʈ �ڽ� ����
function createComboBox(object, resultXml) {

	var root=resultXml.documentElement;
	var groupids=root.getElementsByTagName("groupid");
	var cnt=groupids.length;
	
	clearSelectOptions(object);	
	addSelectOption(object, "S", "��ü");

	for(var i = 0 ; i < cnt ; i++) {

		addSelectOptionTitle(object, 
					root.getElementsByTagName("groupid")[i].firstChild.nodeValue, 
					groupNameReplace(root.getElementsByTagName("groupname")[i].firstChild.nodeValue),
					root.getElementsByTagName("didno")[i].firstChild.nodeValue
			);

	}
}
function addSelectOptionTitle(object, value, text , didno)
{
	
	if(didno=='N(1)'){
		didno='';
	}
	
	option = document.createElement("OPTION");
	option.text = text;
	option.value = value;
	option.title = didno;
	object.options.add(option);
}

function viewClick(index){

	document.getElementById("tdonevent_"+index).className = '';
	
	document.getElementById("imagechange1_"+index).style.display='none';
	document.getElementById("imagechange2_"+index).style.display='block';

}
function callViewClick(index){

	var tdonevent = document.getElementsByName("Forgery");
	var imagechange1 = document.getElementsByName("imagechange1");
	var imagechange2 = document.getElementsByName("imagechange2");
	
	tdonevent[index].className = '';
	
	imagechange1[index].style.display='none';
	imagechange2[index].style.display='block';
	
}	  
function groupSelect(obj,groupid1,groupid2,groupid3,groupid4,groupid5){
	
	obj.group1.value=groupid1; //1�ܰ� �׷� ����
	initGroupCodeChange(obj.group1.value,'group2',obj);  //2�ܰ� �׷켼��
	obj.group2.value=groupid2; //2�ܰ� �׷� ����
	initGroupCodeChange(obj.group2.value,'group3',obj); //3�ܰ� �׷켼��
	obj.group3.value=groupid3; //3�ܰ� �׷� ����
	initGroupCodeChange(obj.group3.value,'group4',obj);//4�ܰ� �׷켼��
	obj.group4.value=groupid4; //4�ܰ� �׷� ����
	initGroupCodeChange(obj.group4.value,'group5',obj); //5�ܰ� �׷켼��
	obj.group5.value=groupid5; //5�ܰ� �׷� ����
	
}	
//////////////////////////////////////////////////////////////////////////////
//�Լ��� : ViewDataOver(), ViewDataOut()
//��  �� : ǳ�� ���� �Լ� (
//function ViewDataOver(x,y,data1,data2,data3,...)
//////////////////////////////////////////////////////////////////////////////
var ttaStyle;
var _x;
var _y;

function ViewDataOver2() {
	_x = ViewDataOver2.arguments[0];
	_y = ViewDataOver2.arguments[1];
	ViewDataOver_do(ViewDataOver2.arguments);
}
function ViewDataOver() {
	_x = 0;
	_y = 0;

	ViewDataOver_do(ViewDataOver.arguments);
}
function ViewDataOver_do(arguments) {
	var args = arguments;
	var innerText = "";

	chkTtArea();
	document.onmousemove = getMouse;

	for(var i=0; i<args.length; i++) {

		if(i==0) {
			innerText += args[i];
		}else {
			if(args[i]!=null) {
				innerText += "<br>"+args[i];
			}
		}
	}

	var innerText = "<table ><tr valign='middle'><td align='left' >"
		  + innerText
		  + "</td></tr></table>";
	document.all("pop_mini").innerHTML = innerText;
	
	if(args.length>0){
	ttaStyle.visibility = "visible";
	}
}

//���콺������ ����
function getMouse() {
	chkTtArea();
 var x = event.x+document.body.scrollLeft;
	var y = event.y+document.body.scrollTop;
   ttaStyle.left = x+10+_x;
	ttaStyle.top  = y+5+_y;
}

//��ǳ���� ������� ��
function ViewDataOut() {
	if(ttaStyle!=undefined){
		ttaStyle.visibility = "hidden";
	}
}
//��ǳ�� ���� Ȯ��
function chkTtArea() {
	if(document.all.pop_mini==null) {
		document.body.insertAdjacentHTML("beforeEnd", '<div ID="pop_mini" style="position:absolute;visibility:hidden"> </div>');
		ttaStyle = document.all.pop_mini.style;
	}
}

function callGroupAuth(frm,init){

	var gobj=document.all.group_select;
	var sobj=document.all.seach_box;
	var uobj=document.all.user_select;

	if(frm.AuthOption.value=="Group"){//������ �����ΰ�� ó��

		frm.AuthID.value=frm.sGroup2.value;//����� ���� ���� ���̵� �����Ѵ�.

		if(gobj!= undefined){
			gobj.style.display='block';
			sobj.style.height='50px';
		}
		
		if(uobj!= undefined){
			uobj.style.display='none';
			if(frm.searchArea!= undefined){
			 frm.searchArea.value='';
			 frm.vSearchTeamDIDNo.value='';
			}

		}

		if(frm.AuthID.value=='GC10000' || frm.AuthID.value=='GC20000'){
			frm.group2.value=frm.sGroup2.value; //2�ܰ� �׷� ����
			frm.SearchAuthBox.value='group2';//���õ� ��ȸ���� box 
			initGroupCodeChange(frm.group2.value,'group3',frm); //3�ܰ� �׷켼��
		}else if(frm.AuthID.value=='CallAll' ){
			
			frm.group2.value=frm.sGroup2.value; //2�ܰ� �׷� ����
			frm.SearchAuthBox.value='group2';//���õ� ��ȸ���� box

			callGroupAllComboBox(frm); //3�ܰ� �׷켼��

		}else{

			
			if(init==true){
				
				var sGroup3='G067900';
				var sGroup4='G067901';
				frm.AuthID.value='G067901';

				frm.group2.value='G1G0000'; //2�ܰ� �׷� ����
				frm.sGroup2.value='G1G0000';
				initGroupCodeChange(frm.group2.value,'group3',frm); //3�ܰ� �׷켼��	
				frm.group3.value=sGroup3; //3�ܰ� �׷� ����
				frm.sGroup3.value=sGroup3;
				initGroupCodeChange(frm.group3.value,'group4',frm); //4�ܰ� �׷켼��	
				frm.group4.value=sGroup4; //4�ܰ� �׷� ����
				frm.sGroup4.value=sGroup4;
				initGroupCodeChange(frm.group4.value, 'group5',frm);
				
				frm.SearchAuthBox.value='group4';//���õ� ��ȸ���� box 

			}else{
				
				var sGroup3=frm.sGroup3.value;
				var sGroup4=frm.sGroup4.value;

				frm.group2.value='G1G0000'; //2�ܰ� �׷� ����

				callGroupCodeChange(frm.group2,'group3',frm); //3�ܰ� �׷켼��	
				frm.group3.value=sGroup3; //3�ܰ� �׷� ����
				callGroupCodeChange(frm.group3,'group4',frm); //4�ܰ� �׷켼��	
				frm.group4.value=sGroup4; //4�ܰ� �׷� ����
				callGroupCodeChange(frm.group4, 'group5',frm);
				
				frm.SearchAuthBox.value='group4';//���õ� ��ȸ���� box 
			}
			
			
		}
		
		frm.AuthGroup.value='Y';

	}else if(frm.AuthOption.value=="User"){//������ ���ΰ�� ó��
		
		frm.AuthID.value=frm.cmUserID.value;//����ID�� ���ѿ� �����Ѵ�.
		frm.AuthGroup.value='N';
		if(gobj!= undefined){
			gobj.style.display='none';
		}
		
		if(uobj!= undefined){
			uobj.style.display='block';
			sobj.style.height='50px';
		}else{
			sobj.style.height='25px';
		}

	}else{//������ �̹����ΰ�� ó��

		frm.AuthID.value=frm.cmAuthID.value;//�׷�ID�� ���ѿ� �����Ѵ�.
		frm.AuthGroup.value='N';
		if(gobj!= undefined){
			gobj.style.display='none';
		}
		sobj.style.height='25px';
	}
}
function longGroupAuth(frm,init){

	var gobj=document.all.group_select;
	var sobj=document.all.seach_box;
	var uobj=document.all.user_select;

	if(frm.AuthOption.value=="Group"){//������ �����ΰ�� ó��

		frm.AuthID.value=frm.sGroup3.value;//����� ���� ���� ���̵� �����Ѵ�.

		if(gobj!= undefined){
			gobj.style.display='block';
			sobj.style.height='50px';
		}
		
		if(uobj!= undefined){
			uobj.style.display='none';
			if(frm.searchArea!= undefined){
			 frm.searchArea.value='';
			 frm.vSearchTeamDIDNo.value='';
			}

		}

		if(frm.AuthID.value=='GSA0100' || frm.AuthID.value=='G045200'){
			frm.group3.value=frm.sGroup3.value; //3�ܰ� �׷� ����
			frm.SearchAuthBox.value='group3';//���õ� ��ȸ���� box 
			initGroupCodeChange(frm.group3.value,'group4',frm); //4�ܰ� �׷켼��
		}else {
			frm.AuthID.value='LongAll';
			frm.sGroup3.value='LongAll';
			frm.group3.value=frm.sGroup3.value; //3�ܰ� �׷� ����
			frm.SearchAuthBox.value='group3';//���õ� ��ȸ���� box

			longGroupAllComboBox(frm); //3�ܰ� �׷켼��

		}

		frm.AuthGroup.value='Y';

	}else if(frm.AuthOption.value=="User"){//������ ���ΰ�� ó��

		frm.AuthID.value=frm.cmUserID.value;//����ID�� ���ѿ� �����Ѵ�.
		frm.AuthGroup.value='N';
		if(gobj!= undefined){
			gobj.style.display='none';
		}
		
		if(uobj!= undefined){
			uobj.style.display='block';
			sobj.style.height='50px';
		}else{
			sobj.style.height='25px';
		}

	}
}
function callSearchSelectAuth(frm,group){

	var step=frm.cmAuthStep.value;//���ѷ���

	 if(group=='group2'){//������ ���� box
		initGroupCodeChange(frm.sGroup2.value,'group3',frm);//3�ܰ� ���� ����
		frm.group2.value=frm.sGroup2.value;//2�ܰ���� ����
	}else if(group=='group3'){//������ ���� box
			initGroupCodeChange(frm.sGroup2.value,'group3',frm);//3�ܰ� ���� ����
			initGroupCodeChange(frm.sGroup3.value,'group4',frm);//4�ܰ� ���� ����
			frm.group3.value=frm.sGroup3.value;//3�ܰ���� ����

	}else {//������ ���� box(4,5)

			initGroupCodeChange(frm.sGroup2.value,'group3',frm);//3�ܰ� ���� ����
			frm.group3.value=frm.sGroup3.value;//3�ܰ���� ����
			initGroupCodeChange(frm.sGroup3.value,'group4',frm);//4�ܰ� ���� ����
			frm.group4.value=frm.sGroup4.value;//4�ܰ���� ����
			initGroupCodeChange(frm.sGroup4.value,'group5',frm);//5�ܰ� ���� ����

	}

	frm.SearchAuthBox.value=group;
	
}
function longSearchSelectAuth(frm,group){

	var step=frm.cmAuthStep.value;//���ѷ���

	  if(group=='group3'){//������ ���� box
			initGroupCodeChange(frm.sGroup3.value,'group4',frm);//4�ܰ� ���� ����
			frm.group3.value=frm.sGroup3.value;//3�ܰ���� ����

	}else {//������ ���� box(4,5)

			frm.group3.value=frm.sGroup3.value;//3�ܰ���� ����
			initGroupCodeChange(frm.sGroup3.value,'group4',frm);//4�ܰ� ���� ����
			frm.group4.value=frm.sGroup4.value;//4�ܰ���� ����
			initGroupCodeChange(frm.sGroup4.value,'group5',frm);//5�ܰ� ���� ����

	}

	frm.SearchAuthBox.value=group;
	
}
function callGroupAllComboBox(form){
	
	form.AuthID.value='CallAll';
	
	clearComboBox('group3',form);
	clearComboBox('group4',form);
	clearComboBox('group5',form);
	form.SearchAuthBox.value='group2';//���õ� ��ȸ���� box
	form.sGroup2.value='CallAll';//���õ� ��ȸ���� box
	
	doCallRequestSubmit(form);
	

}
function longGroupAllComboBox(form){
	
	form.AuthID.value='LongAll';

	clearComboBox('group4',form);
	clearComboBox('group5',form);
	form.SearchAuthBox.value='group3';//���õ� ��ȸ���� box
	form.sGroup3.value='LongAll';//���õ� ��ȸ���� box
	
	doLongRequestSubmit(form);
	

}
//request ��û
function doCallRequestSubmit(form)
{
	try {
		var combo = form.group3;
		
		clearSelectOptions(combo);	
		addSelectOption(combo, "S", "��ü");
		createCallComboBox(combo,'GC10000');
		createCallComboBox(combo,'GC20000');
		createCallComboBox(combo,'G1G0000');

	} catch(e) {}
}
//request ��û
function doLongRequestSubmit(form)
{
	try {
		var combo = form.group4;
		
		clearSelectOptions(combo);	
		addSelectOption(combo, "S", "��ü");
		createCallComboBox(combo,'GSA0100');
		createCallComboBox(combo,'G045200');

	} catch(e) {}
}
function createCallComboBox(object,groupid) {
	
	var request = contextroot+"/H_Common.do?cmd=groupComboList&groupid="+groupid;

	var xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
	xmlhttp.open("GET", request, false);
	xmlhttp.send(request);

	var resultText = xmlhttp.responseText;
	var xmlObject = new ActiveXObject("Microsoft.XMLDOM");

	xmlObject.loadXML(resultText);	
	
	var root=xmlObject.documentElement;
	var groupids=root.getElementsByTagName("groupid");

	var cnt=groupids.length;

	for(var i = 0 ; i < cnt ; i++) {

		addSelectOptionTitle(object, 
					root.getElementsByTagName("groupid")[i].firstChild.nodeValue, 
					groupNameReplace(root.getElementsByTagName("groupname")[i].firstChild.nodeValue),
					root.getElementsByTagName("didno")[i].firstChild.nodeValue
			);

	}
}
function callGroupCodeChange(object,target,form)
{
	var code = getSelectValue(object, true);//���ð� ��������

	if(code=='CallAll'){//��ü�ΰ��
		
		callGroupAllComboBox(form);
		
		return;
	}
	
	if(code=='S' || code==''){
		form.AuthID.value=upGroupValue(target,form);
	}else{
    	form.AuthID.value=code;//���ð����� ���Ѽ���
	}

	if(form.GroupDID!= undefined){//�׷�DID�˻��ΰ��
		var title=getSelectTitle(object);//���õ� Ÿ��Ʋ ��������
		form.GroupDID.value=title;
		var groupname = getSelectValue(object, false);//�׷�� ��������
		form.GroupName.value=groupname;
	}

	if(target == 'group3') {
		//���� ������ ����Ʈ ���� box����
		clearComboBox('group3',form);
		clearComboBox('group4',form);
		clearComboBox('group5',form);
		form.SearchAuthBox.value='group2';//���õ� ��ȸ���� box
		form.sGroup2.value=code;//���õ� ��ȸ���� box
	}else if(target == 'group4') {
		//���� ������ ����Ʈ ���� box����
		clearComboBox('group4',form);
		clearComboBox('group5',form);
		form.SearchAuthBox.value='group3';//���õ� ��ȸ���� box
		form.sGroup3.value=code;//���õ� ��ȸ���� box
	}else if(target == 'group5') {
		//���� ������ ����Ʈ ���� box����
		clearComboBox('group5',form);
		form.SearchAuthBox.value='group4';//���õ� ��ȸ���� box
		form.sGroup4.value=code;//���õ� ��ȸ���� box
		
	}

	if(code == "S") {	
		return;
	}
	
	var request = contextroot+"/H_Common.do?cmd=groupComboList";
	var combo;	
	
	 if(target == 'group3') {
		request = request + "&groupid="+code;			
		combo = form.group3;
	} else if(target == 'group4') {
		request = request + "&groupid="+code;			
		combo = form.group4;
	} else if(target == 'group5') {
		request = request + "&groupid="+code;			
		combo = form.group5;
	} else {
		return;
	}

	doRequestSubmit(combo, request);

}
function longGroupCodeChange(object,target,form)
{
	var code = getSelectValue(object, true);//���ð� ��������

	if(code=='LongAll'){//��ü�ΰ��
		
		longGroupAllComboBox(form);
		
		return;
	}
	
	if(code=='S' || code==''){
		form.AuthID.value=upGroupValue(target,form);
	}else{
    	form.AuthID.value=code;//���ð����� ���Ѽ���
	}

	if(form.GroupDID!= undefined){//�׷�DID�˻��ΰ��
		var title=getSelectTitle(object);//���õ� Ÿ��Ʋ ��������
		form.GroupDID.value=title;
		var groupname = getSelectValue(object, false);//�׷�� ��������
		form.GroupName.value=groupname;
	}

	if(target == 'group4') {
		//���� ������ ����Ʈ ���� box����
		clearComboBox('group4',form);
		clearComboBox('group5',form);
		form.SearchAuthBox.value='group3';//���õ� ��ȸ���� box
		form.sGroup3.value=code;//���õ� ��ȸ���� box
	}else if(target == 'group5') {
		//���� ������ ����Ʈ ���� box����
		clearComboBox('group5',form);
		form.SearchAuthBox.value='group4';//���õ� ��ȸ���� box
		form.sGroup4.value=code;//���õ� ��ȸ���� box
		
	}

	if(code == "S") {	
		return;
	}
	
	var request = contextroot+"/H_Common.do?cmd=groupComboList";
	var combo;	
	
	if(target == 'group4') {
		request = request + "&groupid="+code;			
		combo = form.group4;
	} else if(target == 'group5') {
		request = request + "&groupid="+code;			
		combo = form.group5;
	} else {
		return;
	}

	doRequestSubmit(combo, request);

}

function SearchReciveResultType( step, obj, CodeGroupID, frm, flag ){
	
	var request = contextroot + '/H_Common.do?cmd=SearchReciveResultTypeGroup';
	request = request + '&codegroupid=' + CodeGroupID;
	
	try {

		var xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
		xmlhttp.open("GET", request, false);
		xmlhttp.send(request);

		var resultText = xmlhttp.responseText;
		var xmlObject = new ActiveXObject("Microsoft.XMLDOM");
		
		xmlObject.loadXML(resultText);
		
		var root=xmlObject.documentElement;
		var groupids=root.getElementsByTagName("codegroupid");
		var cnt=groupids.length;
		
		for(var i = obj.options.length - 1 ; i >= 0 ; i--) 
		{
			obj.options.remove(i);
		}
		
		if( flag == 1 ) {
			addSelectOption(obj, "0", "��ü");			
		}
		
		for(var i = 0 ; i < cnt ; i++) {
			
			option = document.createElement("OPTION");
			option.text = root.getElementsByTagName("codename")[i].firstChild.nodeValue;
			option.value = root.getElementsByTagName("codeid")[i].firstChild.nodeValue;
			option.title = root.getElementsByTagName("codename")[i].firstChild.nodeValue;
			obj.options.add(option);
		}
		
	} catch(e) {}
}

function bluring(){ 
	if(event.srcElement.tagName=="A"||event.srcElement.tagName=="IMG" ||event.srcElement.tagType=="checkbox" ||event.srcElement.tagType=="radio") document.body.focus(); 
	} 
	document.onfocusin=bluring; 

	
	//��ȭ��ȣ ���� �Է½� üũ �� - ����
	function PhonNumStr( str ){ 

		 var RegNotNum  = /[^0-9]/g; 

		 var RegPhonNum = ""; 

		 var DataForm   = ""; 

		 // return blank     

		 if( str == "" || str == null ) return ""; 

		 // delete not number

		 str = str.replace(RegNotNum,'');    

		 if( str.length < 4 ) return str; 


		 if( str.length > 3 && str.length < 7 ) { 

		   	DataForm = "$1-$2"; 

			 RegPhonNum = /([0-9]{3})([0-9]+)/; 

		 } else if(str.length == 7 ) {

			 DataForm = "$1-$2"; 

			 RegPhonNum = /([0-9]{3})([0-9]{4})/; 

		 // �� ��ȭ��ȣ ���ڸ��� - ������ replace �� ��� ���ǽ�.
		 } else if(str.length == 8 ) {

			 DataForm = "$1-$2"; 

			 RegPhonNum = /([0-9]{4})([0-9]{4})/; 
			 
		 } else if(str.length == 9 ) {

			 DataForm = "$1-$2-$3"; 

			 RegPhonNum = /([0-9]{2})([0-9]{3})([0-9]+)/; 

		 } else if(str.length == 10){ 

			 if(str.substring(0,2)=="02"){

				 DataForm = "$1-$2-$3"; 

				 RegPhonNum = /([0-9]{2})([0-9]{4})([0-9]+)/; 

			 }else{

				 DataForm = "$1-$2-$3"; 

				 RegPhonNum = /([0-9]{3})([0-9]{3})([0-9]+)/;

			 }

		 } else if(str.length > 10){ 

			 DataForm = "$1-$2-$3"; 

			 RegPhonNum = /([0-9]{3})([0-9]{4})([0-9]+)/; 

		 } 


		 while( RegPhonNum.test(str) ) {  

			 str = str.replace(RegPhonNum, DataForm);  

		 } 

		 return str; 

	} 
	String.prototype.replaceAll=replaceAll;
	function replaceAll(strValue1,strValue2){
		var strTemp=this;
		strTemp=strTemp.replace(new RegExp(strValue1,"g"),strValue2);
		return strTemp
		
	}