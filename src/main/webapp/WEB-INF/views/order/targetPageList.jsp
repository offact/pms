<%@ include file="/WEB-INF/views/addys/base.jsp" %>
<SCRIPT>
    // 페이지 이동
    function goPageTargetPageList(page) {
        document.targetConForm.curPage.value = page;
        var dataParam = $("#targetConForm").serialize();
        commonDim(true);
        $.ajax({
            type: "POST",
            url:  "<%= request.getContextPath() %>/order/targetpagelist",
              data:dataParam,
            success: function(result) {
                   commonDim(false);
                   $("#targetPageList").html(result);
            },
            error:function(){
                commonDim(false);
            }
        });
    }
    // 재고 상세 페이지 리스트 Layup
    function fcTarget_detail(orderCode,groupId,groupName,companyCode,companyName,orderState,productPrice,vat,orderPrice,safeOrderCnt,orderAddress) {

    	if(companyName==''){
    		
    		alert('['+companyCode+'] 에 대한 업체정보가 없습니다.\n관리자에게 해당 업체정보 업데이트 여부 확인 부탁드립니다.');
    		return;
    		
    	}
    	
    	var url='<%= request.getContextPath() %>/order/targetdetailview';
    	
    	if(orderState=='02'){//보류상태 URL
    		
    		url='<%= request.getContextPath() %>/order/deferdetailview';

    	}
    	
    	$('#targetDetailView').dialog({
            resizable : false, //사이즈 변경 불가능
            draggable : true, //드래그 불가능
            closeOnEscape : true, //ESC 버튼 눌렀을때 종료

            width : 950,
            height : 850,
            modal : true, //주위를 어둡게

            open:function(){
                //팝업 가져올 url
                $(this).load(url+'?orderCode='+orderCode+'&groupId='+groupId+'&safeOrderCnt='+safeOrderCnt+
                		'&groupName='+encodeURIComponent(groupName)+'&companyCode='+companyCode+
                		'&orderState='+orderState+'&productPrice='+productPrice+'&vat='+vat+'&orderPrice='+orderPrice+'&orderAddress='+encodeURIComponent(orderAddress));
               
           //     $(".ui-widget-overlay").click(function(){ //레이어팝업외 화면 클릭시 팝업 닫기
            //        $("#targetDetailView").dialog('close');

             //       });
            }
            ,close:function(){
                $('#targetDetailView').empty();
            }
        });
    };

    function stateSearch(state){
    	
    	document.targetConForm.con_orderState.value=state;
    	//alert(document.targetConForm.con_orderState.value);
    	fcTarget_listSearch();
    }
    function failureAlert(limitStartDate,limitEndDate){
    	
    	alert('선택하신 발주대상건은\n'+limitStartDate+' 부터 '+limitEndDate+' 까지\n발주제한이 걸린 상태입니다.\n관리자에게 확인 부탁드립니다.');
    	
    }

</SCRIPT>
     <form:form commandName="targetVO" name="targetPageListForm" method="post" action="" >
      <input type="hidden" name="selectCurPage"             id="selectCurPage"            value="${targetConVO.curPage}" />
	  <table style="width:530px" class="table table-bordered tbl_type" >
	     <colgroup>
	      <col width="80px" >
	      <col width="50px" >
	      <col width="50px" >
	      <col width="50px">
	      <col width="50px" >
	      <col width="50px" >
	      <col width="50px" >
	      <col width="50px">
	     </colgroup>
	     <!--
	     <tr>
	     	<td class='text-center' style="background-color:#E6F3FF">전체건수</td>
	     	<td class='text-right'><a href="javascript:stateSearch('')"><span style="color:red">
	          <f:formatNumber type="currency" currencySymbol="" pattern="#,##0" value="${totalCount}" />
	          </span></a></td>
	     	<td class='text-center' style="background-color:#E6F3FF">발주제한</td>
	     	<td class='text-right'><a href="javascript:stateSearch('00')"><f:formatNumber type="currency" currencySymbol="" pattern="#,##0" value="${stateVO.failureCnt}" /></a></td>
	     	<td class='text-center' style="background-color:#E6F3FF">발주대기</td>
	     	<td class='text-right'><a href="javascript:stateSearch('01')"><f:formatNumber type="currency" currencySymbol="" pattern="#,##0" value="${stateVO.targetCnt}" /></a></td>
	     	<td class='text-center' style="background-color:#E6F3FF">발주보류</td>
	     	<td class='text-right'><a href="javascript:stateSearch('02')"><f:formatNumber type="currency" currencySymbol="" pattern="#,##0" value="${stateVO.deferCnt}" /></a></td>
	     </tr>
	       -->
     </table>
	  <table class="table table-bordered">
	    <thead>
	      <tr style="background-color:#E6F3FF">
	        <th class='text-center'>발주상태</th>
            <th class='text-center'>매장</th>
            <th class='text-center'>업체</th>
            <th class='text-center'>안전재고 미달 품목수량</th>
            <th class='text-center'>재고현황(기준)일</th>
            <!-- >th class='text-center'>기준금액</th>
            <th class='text-center'>부가세</th>
            <th class='text-center'>발주금액</th-->
	      </tr>
	    </thead>
	    <tbody>
	    	<c:if test="${!empty targetList}">
             <c:forEach items="${targetList}" var="targetVO" varStatus="status">
	             <c:choose>
		    		<c:when test="${targetVO.orderState=='00'}">
	                 	<tr id="select_tr_${targetVO.groupId}_${targetVO.companyCode}" style="background-color:#F0B3AC">
	                 	 <td class='text-center' ><a style="color:red" href="javascript:failureAlert('${targetVO.limitStartDate}','${targetVO.limitEndDate}');">        
					</c:when>
					<c:otherwise>
						<tr id="select_tr_${targetVO.groupId}_${targetVO.companyCode}">
						 <td class='text-center'><a href="javascript:fcTarget_detail('${targetVO.orderCode}','${targetVO.groupId}','${targetVO.groupName}','${targetVO.companyCode}','${targetVO.companyName}','${targetVO.orderState}','${targetVO.productPrice}','${targetVO.vat}','${targetVO.orderPrice}','${targetVO.safeOrderCnt}','${targetVO.orderAddress}')">       
					</c:otherwise>
				</c:choose>
                 <c:out value="${targetVO.orderStateView}"></c:out></a></td>
                 <td class='text-center'><c:out value="${targetVO.groupName}"></c:out></td>
                 <td><c:out value="${targetVO.companyName}"></c:out></td>
                 <td class='text-right'><f:formatNumber type="currency" currencySymbol="" pattern="#,##0" value="${targetVO.safeOrderCnt}"/></td>
                 <td class='text-center'><c:out value="${targetVO.stockDate}"></c:out></td>
                 <!--td class='text-right'><f:formatNumber type="currency" currencySymbol="" pattern="#,##0" value="${targetVO.orderCnt}"/></td>
                 <td class='text-right'><f:formatNumber type="currency" currencySymbol="" pattern="#,##0" value="${targetVO.productPrice}"/></td>
                 <td class='text-right'><f:formatNumber type="currency" currencySymbol="" pattern="#,##0" value="${targetVO.vat}"/></td>
                 <td class='text-right'><f:formatNumber type="currency" currencySymbol="" pattern="#,##0" value="${targetVO.orderPrice}"/></td-->
              </tr>
             </c:forEach>
            </c:if>
           <c:if test="${empty targetList}">
           <tr>
           	<td colspan='5' class='text-center'>조회된 데이터가 없습니다.</td>
           </tr>
          </c:if>
	    </tbody>
	  </table>
	 </form:form>

    <!-- 페이징 -->
    <taglib:paging cbFnc="goPageTargetPageList" totalCount="${totalCount}" curPage="${targetConVO.curPage}" rowCount="${targetConVO.rowCount}" />
    <!-- //페이징 -->

    