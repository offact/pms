package com.offact.addys.controller;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLConnection;
import java.net.InetAddress;
import java.net.NetworkInterface;
import java.net.SocketException;
import java.net.UnknownHostException;
import java.text.DateFormat;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.ResourceBundle;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.web.servlet.view.RedirectView;

import com.offact.framework.util.StringUtil;
import com.offact.framework.constants.CodeConstant;
import com.offact.framework.exception.BizException;
import com.offact.addys.service.common.CommonService;
import com.offact.addys.service.common.UserService;
import com.offact.addys.service.manage.UserManageService;
import com.offact.addys.vo.common.CodeVO;
import com.offact.addys.vo.common.CommentVO;
import com.offact.addys.vo.common.GroupVO;
import com.offact.addys.vo.common.UserVO;
import com.offact.addys.vo.common.WorkVO;
import com.offact.addys.vo.manage.UserManageVO;
import com.offact.addys.vo.order.OrderVO;
import com.offact.addys.vo.order.TargetVO;

/**
 * Handles requests for the application home page.
 */
@Controller

public class AddysController {

	private final Logger logger = Logger.getLogger(getClass());
	/*
    * log id 생성 
    */
	public String logid(){
		
		double id=Math.random();
		long t1 = System.currentTimeMillis ( ); 
		
		String logid=""+t1+id;
		
		return logid;
	}
	
    @Autowired
    private CommonService commonSvc;
    
	@Autowired
	private UserService userSvc;
	
    @Autowired
    private UserManageService userManageSvc;
	
	/**
	 * Simply selects the home view to render by returning its name.
	 */
	@RequestMapping(value = "/addys/loginform", method = RequestMethod.GET)
	public ModelAndView loginForm(HttpServletRequest request) throws BizException {
		
		logger.info("Welcome addys loginForm! ");
		
		// 사용자 세션정보
        HttpSession session = request.getSession();
        String strUserId = StringUtil.nvl((String) session.getAttribute("strUserId"));
        String strUserName = StringUtil.nvl((String) session.getAttribute("strUserName")); 
        String strGroupId = StringUtil.nvl((String) session.getAttribute("strGroupId"));
        String strAuthId = StringUtil.nvl((String) session.getAttribute("strAuthId"));
        
		ModelAndView mv = new ModelAndView();
		String strMainUrl = "addys/loginForm";
		
		try{

			if(!"".equals(strUserId)){
				
				//조직정보 조회
		        GroupVO group = new GroupVO();
		        group.setGroupId(strGroupId);
		        List<GroupVO> group_comboList = commonSvc.getGroupComboList(group);
		        mv.addObject("group_comboList", group_comboList);

				if(strAuthId.equals("STAFF")){//스태프인 경우 검수화면 기본세팅
					 
					// 공통코드 조회 (검수상태코드)
			        CodeVO code = new CodeVO();
			        code.setCodeGroupId("OD02");
			        List<CodeVO> code_comboList = commonSvc.getCodeComboList(code);
			        mv.addObject("code_comboList", code_comboList);
					
					//검수리스트 화면 로직 추가
					OrderVO orderConVO = new OrderVO();
					
			        //오늘 날짜
			        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd", Locale.KOREA);
			        Date currentTime = new Date();
			        Date deliveryTime = new Date();
			        int movedate=-7;//(1:내일 ,-1:어제)
			        
			        deliveryTime.setTime(currentTime.getTime()+(1000*60*60*24)*movedate);
			        
			        String strToday = simpleDateFormat.format(currentTime);
			        String strDeliveryDay = simpleDateFormat.format(deliveryTime);
			        
			        orderConVO.setStart_orderDate(strDeliveryDay);
			        orderConVO.setEnd_orderDate(strToday);
   
					orderConVO.setGroupId(strGroupId);
	
			        // 조회조건저장
			        mv.addObject("orderConVO", orderConVO);
	
					strMainUrl = "order/orderManage";
					
				}else{//발주화면 기본화면

					// 공통코드 조회 (발주상태코드)
			        CodeVO code = new CodeVO();
			        code.setCodeGroupId("OD01");
			        List<CodeVO> code_comboList = commonSvc.getCodeComboList(code);
			        mv.addObject("code_comboList", code_comboList);
			        
			        TargetVO targetConVO = new TargetVO();
			        
			        targetConVO.setGroupId(strGroupId);
	
			        // 조회조건저장
			        mv.addObject("targetConVO", targetConVO);

					strMainUrl="order/targetManage";
					
				}
			}
			
		    mv.setViewName(strMainUrl);
	
			return mv;
			
		}catch(Exception e){
			
			mv.setViewName(strMainUrl);
			return mv;
		}

	}

	/**
	 * Login 처리
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception 
	 */
	@SuppressWarnings("null")
	@RequestMapping(value = "/addys/login", method = RequestMethod.POST)
	public ModelAndView addyslogin(HttpServletRequest request,
			                       HttpServletResponse response) throws Exception
	{
		
		//log Controller execute time start
		String logid=logid();
		long t1 = System.currentTimeMillis();
		logger.info("["+logid+"] Controller start");
		
		ModelAndView  mv = new ModelAndView();

		String workCode="CM001";
		
		String strUserId = StringUtil.nvl(request.getParameter("id"));
		String strUserPw = StringUtil.nvl(request.getParameter("pwd"));
		String sClientIP = StringUtil.nvl(request.getParameter("sClientIP"));
		
		logger.info(">>>> userId :"+strUserId);
		logger.info(">>>> userPw :"+strUserPw);
		logger.info(">>>> sClientIP :"+sClientIP);
		
		String ip = request.getHeader("X-Forwarded-For");

		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) { 

		    ip = request.getHeader("Proxy-Client-IP"); 
		    logger.info(">>>> Proxy-Client-IP :"+ip);

		} 

		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) { 

		    ip = request.getHeader("WL-Proxy-Client-IP"); 
		    logger.info(">>>> WL-Proxy-Client-IP :"+ip);

		} 

		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) { 

		    ip = request.getHeader("HTTP_CLIENT_IP"); 
		    logger.info(">>>> HTTP_CLIENT_IP :"+ip);

		} 

		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) { 

		    ip = request.getHeader("HTTP_X_FORWARDED_FOR"); 
		    logger.info(">>>> HTTP_X_FORWARDED_FOR :"+ip);

		} 

		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) { 

		    ip = request.getRemoteAddr(); 
		    logger.info(">>>> RemoteAddr :"+ip);

		}

		String strMainUrl = "";
		
		// # 2. 넘겨받은 아이디로 데이터베이스를 조회하여 사용자가 있는지를 체크한다.
		UserVO userChkVo = new UserVO();
		userChkVo.setUserId(strUserId);
		userChkVo.setInPassword(strUserPw);
		UserVO userChk = userSvc.getUser(userChkVo);		

		String strUserName = "";
		String strGroupId = "";
		String strGroupName = "";
		String strAuthId = "";
		String strAuth = "";
		String strAuthName = "";
		String strExcelAuth = "";
		String strPassword = "";
		String strOfficePhone = "";
		String strOfficePhoneFormat = "";
		String strMobliePhone = "";
		String strMobliePhoneFormat = "";
		String strEmail = "";
		String strIp = "";
		String strPwdChangeDateTime = "";
		String strPwCycleDate = "";
		String smsAlarmYn = "";
		String smsAlarmPoint = "";
		
		strIp = ip;//Client 외부IP or G/W
		
		//서버 IP/MAC정보
		
		sClientIP = request.getLocalAddr();
		/*
		InetAddress serverIp;
		serverIp=InetAddress.getLocalHost();
		NetworkInterface network = NetworkInterface.getByInetAddress(serverIp);
		byte[] mac = network.getHardwareAddress();

		StringBuilder sb = new StringBuilder();
		for (int i = 0; i < mac.length; i++) {
			sb.append(String.format("%02X%s", mac[i], (i < mac.length - 1) ? "-" : ""));		
		}
		logger.info(">>>> [Current MAC address ] ");
		logger.info("@@@@ [serverIp] :"+serverIp);
		logger.info("@@@@ [MAC addres] :"+sb.toString());
		*/
		logger.info(">>>> [strIp] :"+strIp);
		logger.info(">>>> [sClientIP] :"+sClientIP);
	
		if(userChk != null)
		{
			//패스워드 체크
			if(!userChk.getPassword().equals(userChk.getInPassword())){
				
				logger.info(">>> 비밀번호 오류");
				strMainUrl = "addys/loginFail";
				workCode="CM006";
				
				mv.addObject("userId", strUserId);
				
				mv.setViewName(strMainUrl);
				
				//작업이력
				WorkVO work = new WorkVO();
				work.setWorkUserId(strUserId);
				work.setWorkIp(strIp);
				work.setWorkCategory("CM");
				work.setWorkCode(workCode);
				commonSvc.regiHistoryInsert(work);
				
				//log Controller execute time end
		      	long t2 = System.currentTimeMillis();
		      	logger.info("["+logid+"] Controller end execute time:[" + (t2-t1)/1000.0 + "] seconds");
		      	
				return mv;
				
			}
			
			strUserId= userChk.getUserId();
			strUserName = userChk.getUserName();
			strGroupId = userChk.getGroupId();
			strGroupName = userChk.getGroupName();
			strAuthId = userChk.getAuthId();
			strAuthName = userChk.getAuthName();
			strExcelAuth = userChk.getExcelAuth();
			strPassword = userChk.getPassword();
			strOfficePhone = userChk.getOfficePhone();
			strOfficePhoneFormat = userChk.getOfficePhoneFormat();
			strMobliePhone = userChk.getMobliePhone();
			strMobliePhoneFormat = userChk.getMobliePhoneFormat();
			strEmail = userChk.getEmail();
			strAuth =userChk.getAuth();
			strPwdChangeDateTime =userChk.getPwdChangeDateTime();
			strPwCycleDate =userChk.getPwCycleDate();
			smsAlarmYn =userChk.getSmsAlarmYn();
			smsAlarmPoint =userChk.getSmsAlarmPoint();

			// # 3. Session 객체에 셋팅
			
			HttpSession session = request.getSession(false);
			
			if(session != null)
			{
				session.invalidate();
			}
				
				session = request.getSession(true);
				session.setAttribute("strUserId", strUserId);
				session.setAttribute("strUserName", strUserName);
				session.setAttribute("strGroupId", strGroupId);
				session.setAttribute("strGroupName", strGroupName);
				session.setAttribute("strAuthId", strAuthId);
				session.setAttribute("strAuthName", strAuthName);
				session.setAttribute("strExcelAuth", strExcelAuth);
				session.setAttribute("strPassword", strPassword);
				session.setAttribute("strOfficePhone", strOfficePhone);
				session.setAttribute("strOfficePhoneFormat", strOfficePhoneFormat);
				session.setAttribute("strMobliePhone", strMobliePhone);
				session.setAttribute("strMobliePhoneFormat", strMobliePhoneFormat);
				session.setAttribute("strEmail", strEmail);
				session.setAttribute("strIp", strIp);
				session.setAttribute("strAuth", strAuth);
				session.setAttribute("sClientIP", sClientIP);
				session.setAttribute("pwdChangeDateTime", strPwdChangeDateTime);
				session.setAttribute("pwCycleDate", strPwCycleDate);
				session.setAttribute("smsAlarmYn", smsAlarmYn);
				session.setAttribute("smsAlarmPoint", smsAlarmPoint);
				
				//로그인 상태처리		
				
				userChk.setUserId(strUserId);
				userChk.setLoginYn("Y");
				userChk.setIp(strIp);
				userChk.setConnectIp(sClientIP);
				try{
					userSvc.regiLoginYnUpdate(userChk);
				}catch(Exception e){
					logger.debug("[Error]USER SQL lock 오류");
				}
		        
				mv.addObject("userId", strUserId);
				
		        //조직정보 조회
		        GroupVO group = new GroupVO();
		        group.setGroupId(strGroupId);
		        List<GroupVO> group_comboList = commonSvc.getGroupComboList(group);
		        mv.addObject("group_comboList", group_comboList);
				
				if(strAuthId.equals("STAFF")){//스태프인 경우 검수화면 기본세팅
					
					// 공통코드 조회 (검수상태코드)
			        CodeVO code = new CodeVO();
			        code.setCodeGroupId("OD02");
			        List<CodeVO> code_comboList = commonSvc.getCodeComboList(code);
			        mv.addObject("code_comboList", code_comboList);
			        
					//검수리스트 화면 로직 추가
					OrderVO orderConVO = new OrderVO();
					
			        //오늘 날짜
			        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd", Locale.KOREA);
			        Date currentTime = new Date();
			        Date deliveryTime = new Date();
			        int movedate=-7;//(1:내일 ,-1:어제)
			        
			        deliveryTime.setTime(currentTime.getTime()+(1000*60*60*24)*movedate);
			        
			        String strToday = simpleDateFormat.format(currentTime);
			        String strDeliveryDay = simpleDateFormat.format(deliveryTime);
			        
			        orderConVO.setStart_orderDate(strDeliveryDay);
			        orderConVO.setEnd_orderDate(strToday);
   
					orderConVO.setGroupId(strGroupId);
	
			        // 조회조건저장
			        mv.addObject("orderConVO", orderConVO);
	
					strMainUrl = "order/orderManage";
					
				}else{
				
			        // 공통코드 조회 (발주상태코드)
			        CodeVO code = new CodeVO();
			        code.setCodeGroupId("OD01");
			        List<CodeVO> code_comboList = commonSvc.getCodeComboList(code);
			        mv.addObject("code_comboList", code_comboList);
			        
					//발주리스트 화면 로직 추가
					TargetVO targetConVO = new TargetVO();
			        
			        targetConVO.setGroupId(strGroupId);
	
			        // 조회조건저장
			        mv.addObject("targetConVO", targetConVO);

					strMainUrl = "order/targetManage";
				}
					
			} else {//app 상요자 정보가 없는경우
	
				logger.info(">>> 상담App 사용자 정보 없음");
				strMainUrl = "addys/loginFail";
				workCode="CM005";
			}
			
		    //작업이력
			WorkVO work = new WorkVO();
			work.setWorkUserId(strUserId);
			work.setWorkIp(strIp);
			work.setWorkCategory("CM");
			work.setWorkCode(workCode);
			commonSvc.regiHistoryInsert(work);
		
			mv.addObject("userId", strUserId);
			
			mv.setViewName(strMainUrl);
			
			//log Controller execute time end
	      	long t2 = System.currentTimeMillis();
	      	logger.info("["+logid+"] Controller end execute time:[" + (t2-t1)/1000.0 + "] seconds");
	      	
			return mv;
		}
	/**
	 * Logout 처리
	 * @param request
	 * @return
	 * @throws Exception 
	 */
	@RequestMapping(value = "/addys/logout")
	public ModelAndView logout(HttpServletRequest request) throws BizException
	{
		
		logger.info("Good bye addys! ");

		HttpSession session = request.getSession(false);
		
		String strUserId = StringUtil.nvl((String) session.getAttribute("strUserId"));
		String strIp = StringUtil.nvl((String) session.getAttribute("strIp"));
		String sClientIP = StringUtil.nvl((String) session.getAttribute("sClientIP"));
		
	 	session.removeAttribute("strUserId");
        session.removeAttribute("strUserName");
        session.removeAttribute("strGroupId");
        session.removeAttribute("strGroupName");
        session.removeAttribute("strAuthId");
        session.removeAttribute("strAuthName");
        session.removeAttribute("strExcelAuth");
        session.removeAttribute("strPassword");
        session.removeAttribute("strOfficePhone");
        session.removeAttribute("strOfficePhoneFormat");
        session.removeAttribute("strMobliePhone");
        session.removeAttribute("strMobliePhoneFormat");
        session.removeAttribute("strEmail");
        session.removeAttribute("strIp");
        session.removeAttribute("strAuth");
        session.removeAttribute("sClientIP");
        session.removeAttribute("pwdChangeDateTime");
        session.removeAttribute("pwCycleDate");
        
        //로그인 상태처리		
		UserVO userState =new UserVO();
		userState.setUserId(strUserId);
		userState.setLoginYn("N");
		userState.setIp(strIp);
		userState.setConnectIp(sClientIP);
		userSvc.regiLoginYnUpdate(userState);
        
        //작업이력
		WorkVO work = new WorkVO();
		work.setWorkUserId(strUserId);
		work.setWorkIp(strIp);
		work.setWorkCategory("CM");
		work.setWorkCode("CM002");
		commonSvc.regiHistoryInsert(work);
	
        ModelAndView mv = new ModelAndView();
        mv.setViewName("addys/loginForm");

		return mv;
	}
	
	/**
	 *main request test
	 */
	@RequestMapping("/addysmain")
    public String addysmain(@RequestParam(value = "addys1") String addys1) 
	{
		
		logger.info("[addys1]"+addys1);

		return "addys/addysMain";
	}
	
	 /**
     * 사용자정 수정화면
     *
     * @param UserManageVO
     * @param request
     * @param response
     * @param model
     * @param locale
     * @return
     * @throws BizException
     */
    @RequestMapping(value = "/addys/usermodifyform")
	public ModelAndView userModifyForm(@RequestParam(value = "userId") String userId, 
									   HttpServletRequest request) throws BizException 
    {
		
    	//log Controller execute time start
		String logid=logid();
		long t1 = System.currentTimeMillis();
		logger.info("["+logid+"] Controller start : userId" + userId);
    			
		ModelAndView mv = new ModelAndView();
		
		UserManageVO userVO = new UserManageVO();
		
    	// 사용자 세션정보
        HttpSession session = request.getSession();
        String strUserId = StringUtil.nvl((String) session.getAttribute("strUserId"));
        String strGroupId = StringUtil.nvl((String) session.getAttribute("strGroupId"));
        String strIp = StringUtil.nvl((String) session.getAttribute("strIp"));
        String sClientIP = StringUtil.nvl((String) session.getAttribute("sClientIP"));
        
        if(strUserId.equals("") || strUserId.equals("null") || strUserId.equals(null)){
        	
        	strIp = request.getRemoteAddr(); //로그인 상태처리		
    		UserVO userState =new UserVO();
    		userState.setUserId(strUserId);
    		userState.setLoginYn("N");
    		userState.setIp(strIp);
    		userState.setConnectIp(sClientIP);
    		userSvc.regiLoginYnUpdate(userState);

            //작업이력
    		WorkVO work = new WorkVO();
    		work.setWorkUserId(strUserId);
    		work.setWorkIp(strIp);
    		work.setWorkCategory("CM");
    		work.setWorkCode("CM004");
    		commonSvc.regiHistoryInsert(work);
    		
        	mv.setViewName("/addys/loginForm");
       		return mv;
     	}
        userVO = userManageSvc.getUserDetail(userId);
		
		userVO.setUpdateUserId(strUserId);
		mv.addObject("userVO", userVO);
		
		mv.setViewName("/addys/userModifyForm");
		
		//log Controller execute time end
       	long t2 = System.currentTimeMillis();
       	logger.info("["+logid+"] Controller end execute time:[" + (t2-t1)/1000.0 + "] seconds");
       	
		return mv;
	}
    /**
	 * ajax test
	 */
	@RequestMapping("/common/passwordcheck")
	public @ResponseBody
	String passwordCheck(@RequestParam(value = "curPwd") String curPwd) 
	{

		logger.info("[pwd]" + curPwd);
		
		UserVO userVo =new UserVO();
		userVo.setCurPwd(curPwd);

		try{
        	
			userVo = commonSvc.getEncPassword(userVo);

	    }catch(BizException e){
	       	
	    	e.printStackTrace();
	    }

		return ""+userVo.getEncPwd();

	 }
	/**
	 * ajax test
	 */
	@RequestMapping("/addys/addyscheck")
	public @ResponseBody
	String addysCheck(@RequestParam(value = "id") String id,
				       @RequestParam(value = "pwd") String pwd) 
	{

		logger.info("[id]"+id);
		logger.info("[pwd]" + pwd);
		
		String chkresult="0";
		
		if(id.equals(pwd)){
			chkresult="1";
		}
		
		return chkresult;

	 }
	
	 private String getMonthAgoDate() {
	        Calendar cal = Calendar.getInstance(Locale.getDefault());
	        cal.add(Calendar.MONTH ,-1); // 한달전 날짜 가져오기
	          java.util.Date monthago = cal.getTime();
	           SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd", Locale.getDefault());
	           return formatter.format(monthago);
	 }
}
