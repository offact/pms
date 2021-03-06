<%@ include file="/WEB-INF/views/addys/base.jsp" %>
<SCRIPT>
    // 리스트 조회
    function fcStockDetail_listSearch(curPage){

        curPage = (curPage==null) ? 1:curPage;
        stockDetailConForm.curPage.value = curPage;

        commonDim(true);
        $.ajax({
            type: "POST",
               url:  "<%= request.getContextPath() %>/master/stockdetailpagelist",
                    data:$("#stockDetailConForm").serialize(),
               success: function(result) {
                   commonDim(false);
                   $("#stockDetailPageList").html(result);
               },
               error:function() {
                   commonDim(false);
               }
        });
    }
    /// key down function (엔터키가 입력되면 검색함수 호출)
    function checkKey(event){
        if(event.keyCode == 13){
        	fcStockDetail_listSearch('1');
            return false;
        } else{
            return true;
        }
    }
    
</SCRIPT>
<!-- 사용자관리 -->
		<div class="container-fluid">
        <h4><strong><font style="color:#428bca"> <span class="glyphicon glyphicon-book"></span> 재고 상세현황  리스트</font></strong></h4>
        <!-- 조회조건 -->
        <form:form class="form-inline" role="form"  commandName="stockDetailConVO" id="stockDetailConForm" name="stockDetailConForm" method="post" action="" >
        <input type="hidden" name="curPage"             id="curPage"            value="1" />
        <input type="hidden" name="rowCount"            id="rowCount"           value="10"/>
        <input type="hidden" name="totalCount"          id="totalCount"         value=""  />
        <input type="hidden" name="stockDate"          id="stockDate"         value="${stockDetailConVO.stockDate}"  />
        <input type="hidden" name="groupId"          id="groupId"         value="${stockDetailConVO.groupId}"  />
        <fieldset>
        	<div class="form-group">
				<label for="searchGubun"><h6><strong><font style="color:#FF9900">  <span class="glyphicon glyphicon-search"></span> 검색조건 :</font></strong></h6></label>
				<select class="form-control" title="검색조건" id="searchGubun" name="searchGubun" value="">
                	<option value="01" >품목코드</option>
                    <option value="02" >품목명</option>
           		</select>
				<label class="sr-only" for="searchValue"> 조회값 </label>
				<input type="text" class="form-control" id="searchValue" name="searchValue"  value="${productConVO.searchValue}" onkeypress="javascript:return checkKey(event);"/>
				<button type="button" class="btn btn-primary" onClick="javascript:fcStockDetail_listSearch()">조회</button>
	            <!-- >button type="button" class="btn" onClick="">excel</button -->
            </div>
	    </fieldset>
        </form:form>
        </div >
  <!-- //조회 -->
  <br>
  <!-- 조회결과리스트 -->
  <div id=stockDetailPageList>
  </div>
  <!-- //조회결과리스트 -->
</div>
<script>
	fcStockDetail_listSearch();
</script>