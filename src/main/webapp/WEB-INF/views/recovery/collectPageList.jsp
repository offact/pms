<%@ include file="/WEB-INF/views/addys/base.jsp" %>
<SCRIPT>
    // 페이지 이동
    function goPageCollectPageList(page) {
        document.collectConForm.curPage.value = page;
        var dataParam = $("#collectConForm").serialize();
        commonDim(true);
        $.ajax({
            type: "POST",
            url:  "<%= request.getContextPath() %>/recovery/collectpagelist",
              data:dataParam,
            success: function(result) {
                   commonDim(false);
                   $("#collectPageList").html(result);
            },
            error:function(){
                commonDim(false);
            }
        });
    }
    // 회수 상세 페이지 리스트 Layup
    function fcCollect_detail(collectState,collectCode,collectDateTime,recoveryClosingDate,memo,state) {
   
    	var url='<%= request.getContextPath() %>/recovery/recoverymanage';

    	$('#recoveryManage').dialog({
            resizable : false, //사이즈 변경 불가능
            draggable : true, //드래그 불가능
            closeOnEscape : true, //ESC 버튼 눌렀을때 종료

            width : 950,
            height : 850,
            modal : true, //주위를 어둡게

            open:function(){
                //팝업 가져올 url
                $(this).load(url+'?collectCode='+collectCode+'&collectState='+collectState+'&state='+state+'&collectDateTime='+collectDateTime+'&recoveryClosingDate='+recoveryClosingDate+'&memo='+encodeURIComponent(memo));
               
             //   $(".ui-widget-overlay").click(function(){ //레이어팝업외 화면 클릭시 팝업 닫기
             //       $("#recoveryManage").dialog('close');

             //       });
            }
            ,close:function(){
         
                $('#recoveryManage').empty();
                fcCollect_listSearch();
            }
        });
    };

</SCRIPT>
     <form:form commandName="collectVO" name="collectPageListForm" method="post" action="" >
      <p><span style="color:#FF9900"> <span class="glyphicon glyphicon-asterisk"></span>전체건수 : <f:formatNumber type="currency" currencySymbol="" pattern="#,##0" value="${totalCount}" /> </span></p>       
	  <table  class="table table-bordered">
	    <thead>
	      <tr style="background-color:#E6F3FF">
	        <th rowspan="2" class='text-center'>작업상태</th>
	        <th rowspan="2" class='text-center'>작업코드</th>
            <th colspan="4" class='text-center'>진행상태</th>
            <th rowspan="2" class='text-center'>회수요청일자</th>
            <th rowspan="2" class='text-center'>회수마감일자</th>
	      </tr>
	      <tr style="background-color:#E6F3FF">
	        <th class='text-center'>대기</th>
            <th class='text-center'>발신</th>
            <th class='text-center'>수신</th>
            <th class='text-center'>완료</th>
	      </tr>
	    </thead>
	    <tbody>
	    	<c:if test="${!empty collectList}">
             <c:forEach items="${collectList}" var="recoveryVO" varStatus="status">
             <tr id="select_tr_${recoveryVO.recoveryStateView}">
                 <td class='text-center'><c:out value="${recoveryVO.collectStateView}"></c:out></td>
                 <td class='text-center'><a href="javascript:fcCollect_detail('${recoveryVO.collectState}','${recoveryVO.collectCode}','${recoveryVO.collectDateTime}','${recoveryVO.recoveryClosingDate}','${recoveryVO.memo}','')"><c:out value="${recoveryVO.collectCode}"></c:out></a></td>
                 <td class='text-right'><a href="javascript:fcCollect_detail('${recoveryVO.collectState}','${recoveryVO.collectCode}','${recoveryVO.collectDateTime}','${recoveryVO.recoveryClosingDate}','${recoveryVO.memo}','01')"><f:formatNumber type="currency" currencySymbol="" pattern="#,##0" value="${recoveryVO.waitCnt}"/></a></td>
                 <td class='text-right'><a href="javascript:fcCollect_detail('${recoveryVO.collectState}','${recoveryVO.collectCode}','${recoveryVO.collectDateTime}','${recoveryVO.recoveryClosingDate}','${recoveryVO.memo}','02')"><f:formatNumber type="currency" currencySymbol="" pattern="#,##0" value="${recoveryVO.sendCnt}"/></a></td>
                 <td class='text-right'><a href="javascript:fcCollect_detail('${recoveryVO.collectState}','${recoveryVO.collectCode}','${recoveryVO.collectDateTime}','${recoveryVO.recoveryClosingDate}','${recoveryVO.memo}','03')"><f:formatNumber type="currency" currencySymbol="" pattern="#,##0" value="${recoveryVO.receiveCnt}"/></a></td>
                 <td class='text-right'><a href="javascript:fcCollect_detail('${recoveryVO.collectState}','${recoveryVO.collectCode}','${recoveryVO.collectDateTime}','${recoveryVO.recoveryClosingDate}','${recoveryVO.memo}','04')"><f:formatNumber type="currency" currencySymbol="" pattern="#,##0" value="${recoveryVO.checkCnt}"/></a></td>
                 <td class='text-center'><c:out value="${recoveryVO.collectDateTime}"></c:out></td>
                 <td class='text-center'><c:out value="${recoveryVO.recoveryClosingDate}"></c:out></td>
              </tr>
             </c:forEach>
            </c:if>
           <c:if test="${empty collectList}">
              <tr>
                  <td colspan='8' class='text-center'>조회된 데이터가 없습니다.</td>
              </tr>
          </c:if>
	    </tbody>
	  </table>
	 </form:form>

	 <!-- 페이징 -->
     <taglib:paging cbFnc="goPageCollectPageList" totalCount="${totalCount}" curPage="${collectConVO.curPage}" rowCount="${collectConVO.rowCount}" />
     <!-- //페이징 -->

    