/**
 *
 */
package com.offact.addys.service.impl.recovery;

import java.util.ArrayList;
import java.util.List;
import java.util.HashMap;
import java.util.Map;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.offact.framework.util.StringUtil;
import com.offact.framework.db.SqlSessionCommonDao;
import com.offact.framework.exception.BizException;
import com.offact.addys.service.recovery.RecoveryService;
import com.offact.addys.vo.manage.UserManageVO;
import com.offact.addys.vo.master.ProductMasterVO;
import com.offact.addys.vo.master.StockVO;
import com.offact.addys.vo.order.TargetVO;
import com.offact.addys.vo.recovery.RecoveryVO;

/**
 * @author 4530
 */
@Service
public class RecoveryServiceImpl implements RecoveryService {

    private final Logger        logger = Logger.getLogger(getClass());

    @Autowired
    private SqlSessionCommonDao commonDao;

    @Override
    public List<RecoveryVO> getCollectPageList(RecoveryVO recovery) throws BizException {
    	
        List<RecoveryVO> recoveryList = commonDao.selectList("Recovery.getCollectPageList", recovery);

        return recoveryList;
    }

    @Override
    public int getCollectCnt(RecoveryVO recovery) throws BizException {
        return commonDao.selectOne("Recovery.getCollectCnt", recovery);
    }
    @Override
    public RecoveryVO getRecoveryState(RecoveryVO recovery) throws BizException {
        return commonDao.selectOne("Recovery.getRecoveryState", recovery);
    }
    @Override
    public List<RecoveryVO> getRecoveryList(RecoveryVO recovery) throws BizException {
    	
        List<RecoveryVO> recoveryList = commonDao.selectList("Recovery.getRecoveryList", recovery);

        return recoveryList;
    }
    
    @Override
    public List<RecoveryVO> getRecoveryPageList(RecoveryVO recovery) throws BizException {
    	
        List<RecoveryVO> recoveryList = commonDao.selectList("Recovery.getRecoveryPageList", recovery);

        return recoveryList;
    }
    @Override
    public int getRecoveryCnt(RecoveryVO recovery) throws BizException {
        return commonDao.selectOne("Recovery.getRecoveryCnt", recovery);
    }
    @Override
    public RecoveryVO getCollectCode(RecoveryVO recovery) throws BizException {
        return commonDao.selectOne("Recovery.getCollectCode", recovery);
    }
    @Override
    public int regiRecoveryRegist(RecoveryVO recovery, String arrCheckGroupId ,String arrSelectProductId)
    	    throws BizException
	{
	    int retVal=-1;
	    
	    try{//회수 등록
	    	
	    	arrCheckGroupId = arrCheckGroupId.substring(0, arrCheckGroupId.lastIndexOf("^"));
		    String[] arrGroupId = arrCheckGroupId.split("\\^");
		    
		    retVal=this.commonDao.insert("Recovery.collectInsert", recovery);
	    	
		    for (int i = 0; i < arrGroupId.length; i++) {
		    	
		    	long t1 = System.currentTimeMillis();
		    	String groupId=arrGroupId[i];
		    	String recoveryCode=groupId+recovery.getRecoveryCode();
		    	
		    	RecoveryVO recoveryVO = new RecoveryVO();
		    	
		    	recoveryVO.setGroupId(groupId);
		    	recoveryVO.setRecoveryCode(recoveryCode);
		    	recoveryVO.setCollectCode(recovery.getCollectCode());
		    	recoveryVO.setRecoveryState("01");
		    	
		    	retVal=this.commonDao.insert("Recovery.recoveryInsert", recoveryVO);
		    	
		    	String arrGroupSelectProductId = arrSelectProductId.substring(0, arrSelectProductId.lastIndexOf("^"));
			    String[] arrGroupProductCode = arrGroupSelectProductId.split("\\^");
			    
			    for (int j = 0; j < arrGroupProductCode.length; j++) {
			    	
			    	String productCode=arrGroupProductCode[j];
			    	
			    	RecoveryVO recoveryDetailVO = new RecoveryVO();
			    	
			    	recoveryDetailVO.setRecoveryCode(recoveryCode);
			    	recoveryDetailVO.setCreateUserId(recovery.getCollectUserId());
			    	recoveryDetailVO.setProductCode(productCode);
	
			    	this.commonDao.insert("Recovery.recoveryDetailInsert", recoveryDetailVO);
			    	
			    }
	
		    }
		    
		    String arrProductSelectProductId = arrSelectProductId.substring(0, arrSelectProductId.lastIndexOf("^"));
		    String[] arrProductCode = arrProductSelectProductId.split("\\^");
		    //회수품목 품목상태 업데이트
		    for (int k = 0; k < arrProductCode.length; k++) {
		    	Map updateMap = new HashMap();
	
		    	updateMap.put("updateUserId", recovery.getUpdateUserId());
		    	updateMap.put("productCode", arrProductCode[k]);
	        
		    	retVal=this.commonDao.update("ProductMaster.productRecoveryUpdate", updateMap);
	
		    }
	    	
	    }catch(Exception e){
	    	
	    	e.printStackTrace();
	    	e.printStackTrace();
	    	throw new BizException(e.getMessage());

	    }
	
	    return retVal;
	    
   }
    @Override
    public RecoveryVO getRecoveryDetail(RecoveryVO recoveryCon) throws BizException {
        return commonDao.selectOne("Recovery.getRecoveryDetail", recoveryCon);
    }
    @Override
    public List<RecoveryVO> getRecoveryDetailList(RecoveryVO recovery) throws BizException {
    	
        List<RecoveryVO> recoveryList = commonDao.selectList("Recovery.getRecoveryDetailList", recovery);

        return recoveryList;
    }
    @Override
    public int regiRecoveryProcess(String[] recoveryList , RecoveryVO recoveryVo)
    	    throws BizException
	{
	    int retVal=-1;
	    
	    try{//회수처리
	
	    	this.commonDao.update("Recovery.recoveryProcUpdate", recoveryVo);
	
	    	String[] r_data=null;
	    	
		    for(int i=0;i<recoveryList.length;i++){
	
		        r_data = StringUtil.getTokens(recoveryList[i], "|");
		        
		        RecoveryVO recoveryDetailVo = new RecoveryVO();

		        recoveryDetailVo.setRecoveryCode(recoveryVo.getRecoveryCode());
		        recoveryDetailVo.setProductCode(StringUtil.nvl(r_data[0],""));
		        recoveryDetailVo.setStockDate(StringUtil.nvl(r_data[1],""));
		        recoveryDetailVo.setStockCnt(StringUtil.nvl(r_data[2],""));
		        recoveryDetailVo.setRecoveryCnt(StringUtil.nvl(r_data[3],""));
		        recoveryDetailVo.setAddCnt(StringUtil.nvl(r_data[4],""));
		    	recoveryDetailVo.setLossCnt(StringUtil.nvl(r_data[5],""));
		    	recoveryDetailVo.setEtc(StringUtil.nvl(r_data[6],""));
		    	recoveryDetailVo.setUpdateUserId(recoveryVo.getUpdateUserId());
		    	
	            retVal=this.commonDao.update("Recovery.recoveryDetailProcUpdate", recoveryDetailVo);
		      
		      }

	    /*
		      arrDeferProductId = arrDeferProductId.substring(0, arrDeferProductId.lastIndexOf("^"));
		      String[] arrDeferId = arrDeferProductId.split("\\^");
	      
		    int deferRetVal=0;
	
		    for (int i = 0; i < arrDeferId.length; i++) {
		    	Map updateMap = new HashMap();
	
		    	updateMap.put("orderCode", targetVo.getOrderCode());
		    	updateMap.put("productCode", arrDeferId[i]);
	        
		    	retVal=this.commonDao.update("Target.deferUpdateProc", updateMap);
	
		    }
		  */  
	    }catch(Exception e){
	    	
	    	e.printStackTrace();
	    	e.printStackTrace();
	    	throw new BizException(e.getMessage());

	    }
	
	    return retVal;
	    
   }
    @Override
    public int regiRecoveryComplete(String[] recoveryList , RecoveryVO recoveryVo)
    	    throws BizException
	{
	    int retVal=-1;
	    
	    try{//회수처리
	
	    	this.commonDao.update("Recovery.recoveryCompleteUpdate", recoveryVo);
	
	    	String[] r_data=null;
	    	
		    for(int i=0;i<recoveryList.length;i++){
	
		        r_data = StringUtil.getTokens(recoveryList[i], "|");
		        
		        RecoveryVO recoveryDetailVo = new RecoveryVO();

		        recoveryDetailVo.setRecoveryCode(recoveryVo.getRecoveryCode());
		        recoveryDetailVo.setProductCode(StringUtil.nvl(r_data[0],""));
		        recoveryDetailVo.setRecoveryResultCnt(StringUtil.nvl(r_data[1],""));
		    	recoveryDetailVo.setUpdateUserId(recoveryVo.getUpdateUserId());
		    	
	            retVal=this.commonDao.update("Recovery.recoveryCompleteDetailProcUpdate", recoveryDetailVo);
		      
		      }
		    
		    commonDao.update("Recovery.getProductCancel", recoveryVo);

	    }catch(Exception e){
	    	
	    	e.printStackTrace();
	    	e.printStackTrace();
	    	throw new BizException(e.getMessage());

	    }
	
	    return retVal;
	    
   }
    
    public List<ProductMasterVO> getExcelAttach(List<ProductMasterVO> excelUploadList)
    	    throws BizException
    	  {

    	    List reProductAttachList = new ArrayList();
    	    int idx = 0;

    	    for (int i = 0; i < excelUploadList.size(); i++) {
    	      
    	      try 
    	      {
    	        
    	    	idx = i + 2;
    	    	ProductMasterVO reProductVO = (ProductMasterVO)excelUploadList.get(i);

    	    	reProductVO=this.commonDao.selectOne("ProductMaster.getProductDetail", reProductVO);
    	    	
    	    	if(null!=reProductVO){
    	    		reProductAttachList.add(reProductVO);
    	    	}
    	      
    	      } catch (Exception e) {
    	        
    	    	e.printStackTrace();
    	        String errMsg = e.getMessage();
    	        errMsg = errMsg.substring(errMsg.lastIndexOf("Exception"));
    	       
    	      }
    	    
    	    }

    	    return reProductAttachList;
    	  }
    
    @Override
    public int receiveProcess(RecoveryVO recovery) throws BizException {
        return commonDao.update("Recovery.getRecoveryReceive", recovery);
    }
    
    @Override
    public int cancelProcess(RecoveryVO recovery) throws BizException {
    	
    	commonDao.update("Recovery.getCollectCancel", recovery);
    	
        return commonDao.update("Recovery.getProductCancel", recovery);
    }
    
    @Override
    public int transProcess(RecoveryVO recovery) throws BizException {

        return commonDao.update("Recovery.getCollectTrans", recovery);
    }
    
    @Override
    public int closeProcess(RecoveryVO recovery) throws BizException {
	
        return commonDao.update("Recovery.getCollectClose", recovery);
    }
    @Override
    public List<RecoveryVO> getTransProduct(RecoveryVO recovery) throws BizException {
    	
        List<RecoveryVO> recoveryList = commonDao.selectList("Recovery.getTransProduct", recovery);

        return recoveryList;
    }
    
    @Override
    public int transUpdateProc(RecoveryVO recovery) throws BizException {

    	return commonDao.update("Recovery.transUpdateProc", recovery);

    }

}
