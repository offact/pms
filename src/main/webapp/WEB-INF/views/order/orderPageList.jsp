<%@ include file="/WEB-INF/views/addys/base.jsp" %>
<SCRIPT>
    // 페이지 이동
    function goPageOrderPageList(page) {
        document.orderConForm.curPage.value = page;
        var dataParam = $("#orderConForm").serialize();
        commonDim(true);
        $.ajax({
            type: "POST",
            url:  "<%= request.getContextPath() %>/order/orderpagelist",
              data:dataParam,
            success: function(result) {
                   commonDim(false);
                   $("#orderPageList").html(result);
            },
            error:function(){
                commonDim(false);
            }
        });
    }
    // 검수 상세 페이지 리스트 Layup
    function fcOrder_detail(orderCode) {
    	
    	var url='<%= request.getContextPath() %>/order/orderdetailview';

    	$('#orderDetailView').dialog({
            resizable : false, //사이즈 변경 불가능
            draggable : true, //드래그 불가능
            closeOnEscape : true, //ESC 버튼 눌렀을때 종료

            width : 950,
            height : 850,
            modal : true, //주위를 어둡게

            open:function(){
                //팝업 가져올 url
                $(this).load(url+'?orderCode='+orderCode);
               
              //  $(".ui-widget-overlay").click(function(){ //레이어팝업외 화면 클릭시 팝업 닫기
              //      $("#orderDetailView").dialog('close');

              //      });
            }
            ,close:function(){
                $('#orderDetailView').empty();
                
                
               	try{
	           		// alert(barcodeObj);
	           		// alert(etcObj);

	           		
	               	  if(barcodeObj==undefined){
	               		 	return;
	                 	  }else{
	                 		barcodeObj.close();
	                 	  }
	               	
	               	  if(barcodeResultObj==undefined){
               		 	return;
                 	  }else{
                 		 barcodeResultObj.close();
                 	  }
	               	
	               	  if(barcodeCehckObj==undefined){
	               		 	return;
	                 	  }else{
	                 		 barcodeCehckObj.close();
	                 	  }
	               	  
	                  	 
	               	  if(etcObj==undefined){
	               		 	return;
	                 	  }else{
	                 		 etcObj.close();
	                 	  }
	
	           		  
	           	  }catch(e){
	           		 return;
	           	  }

            }
        });
    };
    
    function stateSearch(state){
    	//alert('state::'+state);
    	document.orderConForm.con_orderState.value=state;
    	document.orderConForm.searchGubun.value='';
    	document.orderConForm.searchValue.value='';
    	
    	//alert(document.orderConForm.con_orderState.value);
    	fcOrder_listSearch();
    }
</SCRIPT>
     <form:form commandName="orderVO" name="orderPageListForm" method="post" action="" >
	  <table style="width:630px" class="table table-bordered tbl_type" >
	     <colgroup>
	      <col width="80px" >
	      <col width="50px" >
	      <col width="80px" >
	      <col width="50px">
	      <col width="80px" >
	      <col width="50px" >
	      <col width="80px" >
	      <col width="50px">
	      <col width="80px" >
	      <col width="50px">
	     </colgroup>
	     <tr>
	     	<td class='text-center' style="background-color:#E6F3FF">전체건수</td>
	     	<td class='text-right'><a href="javascript:stateSearch('')"><span style="color:red">
	          <f:formatNumber type="currency" currencySymbol="" pattern="#,##0" value="${totalCount}" />
	          </span></a></td>
	     	<td class='text-center' style="background-color:#E6F3FF">검수대기</td>
	     	<td class='text-right'><a href="javascript:stateSearch('03')"><f:formatNumber type="currency" currencySymbol="" pattern="#,##0" value="${stateVO.waitCnt}" /></a></td>
	     	<td class='text-center' style="background-color:#E6F3FF">검수보류</td>
	     	<td class='text-right'><a href="javascript:stateSearch('04')"><f:formatNumber type="currency" currencySymbol="" pattern="#,##0" value="${stateVO.deferCnt}" /></a></td>
	     	<td class='text-center' style="background-color:#E6F3FF">검수완료</td>
	     	<td class='text-right'><a href="javascript:stateSearch('06')"><f:formatNumber type="currency" currencySymbol="" pattern="#,##0" value="${stateVO.completeCnt}" /></a></td>
	     	<td class='text-center' style="background-color:#E6F3FF">등록완료</td>
	     	<td class='text-right'><a href="javascript:stateSearch('07')"><f:formatNumber type="currency" currencySymbol="" pattern="#,##0" value="${stateVO.registCnt}" /></a></td>
	     </tr>
     </table>     
	  <table class="table table-bordered">
	    <thead>
	      <tr style="background-color:#E6F3FF">
	        <th class='text-center'>검수상태</th>
            <th class='text-center'>발주번호</th>
            <th class='text-center'>발주일자</th>
            <th class='text-center'>발주자</th>
            <th class='text-center'>매장명</th>
            <th class='text-center'>업체명</th>
            <!--  >th class='text-center'>공급가</th>
            <th class='text-center'>부가세</th-->
            <th class='text-center'>금액(VAT포함)</th>
            <th class='text-center'>등록완료일자</th>
	      </tr>
	    </thead>
	    <tbody>
	    	<c:if test="${!empty orderList}">
             <c:forEach items="${orderList}" var="orderVO" varStatus="status">
             <tr id="select_tr_${orderVO.orderCode}">
                 <td class='text-center'><c:out value="${orderVO.orderStateView}"></c:out></td>
                 <td class='text-center'><a href="javascript:fcOrder_detail('${orderVO.orderCode}')"><c:out value="${orderVO.orderCode}"></c:out></a></td>
                 <td class='text-center'><c:out value="${orderVO.orderDateTime}"></c:out></td>
                 <td class='text-center'><c:out value="${orderVO.orderUserName}"></c:out></td>
                 <td class='text-center'><c:out value="${orderVO.groupName}"></c:out></td>
                 <td class='text-center'><c:out value="${orderVO.companyName}"></c:out></td>
                 <!--td class='text-right'><f:formatNumber type="currency" currencySymbol="" pattern="#,##0" value="${orderVO.supplyPrice}"/></td>
                 <td class='text-right'><f:formatNumber type="currency" currencySymbol="" pattern="#,##0" value="${orderVO.vat}"/></td-->
                 <td class='text-right'><f:formatNumber type="currency" currencySymbol="" pattern="#,##0" value="${orderVO.totalOrderPrice}"/></td>
                 <td class='text-center'><c:out value="${orderVO.buyDateTime}"></c:out></td>
              </tr>
             </c:forEach>
            </c:if>
           <c:if test="${empty orderList}">
           <tr>
           	<td colspan='8' class='text-center'>조회된 데이터가 없습니다.</td>
           </tr>
          </c:if>
	    </tbody>
	  </table>
	 </form:form>

    <!-- 페이징 -->
    <taglib:paging cbFnc="goPageOrderPageList" totalCount="${totalCount}" curPage="${orderConVO.curPage}" rowCount="${orderConVO.rowCount}" />
    <!-- //페이징 -->

    