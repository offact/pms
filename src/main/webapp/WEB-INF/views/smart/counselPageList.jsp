<%@ include file="/WEB-INF/views/addys/base.jsp" %>
<SCRIPT>
    // 페이지 이동
    function goPageCounselPageList(page) {
        document.counselConForm.curPage.value = page;
        var dataParam = $("#counselConForm").serialize();
        commonDim(true);
        $.ajax({
            type: "POST",
            url:  "<%= request.getContextPath() %>/smart/counselpagelist",
              data:dataParam,
            success: function(result) {
                   commonDim(false);
                   $("#counselPageList").html(result);
            },
            error:function(){
                commonDim(false);
            }
        });
    }

</SCRIPT>

     <form:form commandName="counselVO" name="counselPageListForm" method="post" action="" >
      <p><span style="color:#FF9900"> <span class="glyphicon glyphicon-asterisk"></span> total : <f:formatNumber type="currency" currencySymbol="" pattern="#,##0" value="${totalCount}" /> </span></p>       
	  <table class="table table-bordered">
	    <thead>
	      <tr style="background-color:#E6F3FF">
	        <th>핸드폰번호</th>
	        <th>상담히스토리</th>
            <th>문의상태</th>
            <th>문의일시</th>
            <th>문의내용</th>
            <th>고객명</th>
            <th>처리일시</th>
            <th>처리자</th>
	      </tr>
	    </thead>
	    <tbody>
	    	<c:if test="${!empty counselList}">
             <c:forEach items="${counselList}" var="counselListVO" varStatus="status">
             <tr id="select_tr_${counselListVO.idx}">
                 <td><a href="javascript:fcCounsel_procForm('${counselListVO.idx}')"><c:out value="${counselListVO.customerKey}"></c:out></a>
                 </td>
                 <td>(${counselListVO.counselCnt})
                 <img id="hisbtn" onClick="fcHis_detail('${counselListVO.customerKey}','${counselListVO.idx}','${counselListVO.counsel}')" src="<%= request.getContextPath()%>/images/common/ico_company.gif" width="16" height="16" align="absmiddle" title="이력">
                </td>
                 <td><c:out value="${counselListVO.counselState}"></c:out></td>
                 <td><c:out value="${counselListVO.counselDateTime}"></c:out></td>
                 <td>
                 <c:out value="${counselListVO.counsel}">
                 </c:out>
                 <c:if test="${counselListVO.counselImage!=null}">
					<img src="<%=request.getContextPath()%>/images/image_16x16.png" alt="이미지" >
				 </c:if>
                 </td>
                 <td><c:out value="${counselListVO.customerName}"></c:out></td>
                 <td><c:out value="${counselListVO.counselResultDateTime}"></c:out></td>
                 <td><c:out value="${counselListVO.userName}(${counselListVO.userId})"></c:out></td>
              </tr>
             </c:forEach>
            </c:if>
           <c:if test="${empty counselList}">
           <tr>
               <td colspan='8' class='text-center'>조회된 데이터가 없습니다.</td>
           </tr>
          </c:if>
	    </tbody>
	  </table>
	 </form:form>

	 <!-- 페이징 -->
     <taglib:paging cbFnc="goPageCounselPageList" totalCount="${totalCount}" curPage="${counselConVO.curPage}" rowCount="${counselConVO.rowCount}" />
     <!-- //페이징 -->

    