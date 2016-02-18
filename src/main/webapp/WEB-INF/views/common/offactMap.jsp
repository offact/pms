<!DOCTYPE HTML>
<html>
<head>
<meta charset="utf-8">
<title></title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <!-- JQuery Mobile을 사용하기 위해 반드시 필요한 태그-->
    <link rel="stylesheet" href="http://code.jquery.com/mobile/1.0rc2/jquery.mobile-1.0rc2.min.css" />
    <script src="http://code.jquery.com/jquery-1.6.4.min.js"></script>
    <script src="http://code.jquery.com/mobile/1.0rc2/jquery.mobile-1.0rc2.min.js"></script>
    <!-- JQuery-UI-Map을 사용하기 위해 반드시 필요한 태그-->
    <script src="http://maps.google.com/maps/api/js?sensor=true" type="text/javascript"></script>
    <script src="<%= request.getContextPath() %>/web/jquery.fn.gmap.js" type="text/javascript"></script>
    <script src="<%= request.getContextPath() %>/ui/jquery.ui.map.full.min.js" type="text/javascript"></script>   
    <script src="<%= request.getContextPath() %>/ui/jquery.ui.map.extensions.js" type="text/javascript"></script>
  
    
      <script type="text/javascript">
         $(document).ready(function() {
             //초기 위치를 안산대학교로 설정
            var StartLatLng = new google.maps.LatLng(37.30981, 126.87560);                    
            $("#map_canvas").gmap({"center": StartLatLng, "zoom":16});

            // <현위치> 버튼 처리        
               $("#current_location").click(function() { 
                $("#map_canvas").gmap("getCurrentPosition" , function(position, status) {
                	
                	//alert(position.coords.latitude);
                	//alert(position.coords.longitude);
                	
                    if ( status === "OK" ) {
                        var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
                        var markerBlue = "http://www.google.com/intl/en_us/mapfiles/ms/icons/blue-dot.png";
                        $("#map_canvas").gmap("get", "map").panTo(latlng); 
                        $("#map_canvas").gmap("addMarker", {"position": latlng, "icon": markerBlue});                        
                    } else {
                        alert("현재위치를 찾을 수 없습니다. ");
                    }
                }); //$("#map_canvas").gmap() 끝
            }); // $("#current_location").click() 끝
         }); // $(document).ready() 끝
         
     	
     	function goBack(){
     	document.offactForm.submit();
        }
         
    </script>    
	<style type="text/css">
	.map_style {
	    padding: 0px;
	    height: 100%;
	    width: 100%;
	}
	</style>
</head>

<body>
<form  id="offactForm" name="offactForm"  role="form" action="<%= request.getContextPath() %>/offactdev">
<div data-role="page" id="page" data-fullscreen="true" class="map_style">
  <div data-role="header"  data-position="fixed" >
    <h1><a href="javascript:goBack()" data-icon="back">Back</a> Offact Map</h1>
  </div>
  <div data-role="content" class="map_style">
      <div id="map_canvas" class="map_style"></div>
  </div>
  <div data-role="footer" data-position="fixed">
      <div data-role="navbar" >
        <ul>
            <li><a href="#" data-icon="search" id="current_location">현위치 찾기</a></li>
        </ul>
    </div>  <!-- navbar 끝 -->     
  </div>  
</div>
</form>
</body>
</html>