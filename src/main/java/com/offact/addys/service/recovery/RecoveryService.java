/**
 *
 */
package com.offact.addys.service.recovery;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.offact.framework.exception.BizException;
import com.offact.addys.vo.order.TargetVO;
import com.offact.addys.vo.recovery.RecoveryVO;
import com.offact.addys.vo.manage.UserManageVO;
import com.offact.addys.vo.master.ProductMasterVO;

/**
 * @author
 */
public interface RecoveryService {
	 /**
     * 작업대상 목록 조회
     * 
     * @return
     * @throws BizException
     */
    public List<RecoveryVO> getCollectPageList(RecoveryVO recovery) throws BizException;
    /**
     * 작업대상 전체 갯수
     * 
     * @return
     * @throws BizException
     */
    public int getCollectCnt(RecoveryVO recovery) throws BizException;
    /**
     * 회수 상태조회
     * 
     * @return
     * @throws BizException
     */
    public RecoveryVO getRecoveryState(RecoveryVO recovery) throws BizException;
    /**
     * 회수대상  리스트 조회
     * 
     * @return
     * @throws BizException
     */
    public List<RecoveryVO> getRecoveryList(RecoveryVO recovery) throws BizException;
    /**
     * 회수대상 목록 조회
     * 
     * @return
     * @throws BizException
     */
    public List<RecoveryVO> getRecoveryPageList(RecoveryVO recovery) throws BizException;
    /**
     * 회수대상 전체 갯수
     * 
     * @return
     * @throws BizException
     */
    public int getRecoveryCnt(RecoveryVO recovery) throws BizException;
    /**
     * 회수코드생성
     * 
     * @return
     * @throws BizException
     */
    public RecoveryVO getCollectCode(RecoveryVO recovery) throws BizException;
    /**
     * 회수 등록처리
     * 
     * @param TargetVO
     * @return
     * @throws BizException
     */
    public int regiRecoveryRegist(RecoveryVO recovery, String arrCheckGroupId ,String arrSelectProductId)
    	    throws BizException;
    
    /**
     * 회수대상 상세 조회
     * 
     * @return
     * @throws BizException
     */
    public RecoveryVO getRecoveryDetail(RecoveryVO recoveryCon) throws BizException;
    /**
     * 회수대상 상세목록 조회
     * 
     * @return
     * @throws BizException
     */
    public List<RecoveryVO> getRecoveryDetailList(RecoveryVO recovery) throws BizException;
   
    /**
     * 회수처리
     * 
     * @param RecoveryVO
     * @return
     * @throws BizException
     */
    public int regiRecoveryProcess(String[] recoverylist , RecoveryVO recovery)
    	    throws BizException;
    /**
     * 검수처리
     * 
     * @param RecoveryVO
     * @return
     * @throws BizException
     */
    public int regiRecoveryComplete(String[] recoverylist , RecoveryVO recovery)
    	    throws BizException;
    
    /**
     * 회수품목 attach
     * 
     * @return
     * @throws BizException
     */
    public List<ProductMasterVO> getExcelAttach(List<ProductMasterVO> reproductlist) throws BizException;
    /**
     * 회수 수신처리
     * 
     * @param TargetVO
     * @return
     * @throws BizException
     */
    public int receiveProcess(RecoveryVO recovery)
    	    throws BizException;
    /**
     * 회수 취소처리
     * 
     * @param TargetVO
     * @return
     * @throws BizException
     */
    public int cancelProcess(RecoveryVO recovery)
    	    throws BizException;
    
    /**
     * 회수업체발송처리
     * 
     * @param TargetVO
     * @return
     * @throws BizException
     */
    public int transProcess(RecoveryVO recovery)
    	    throws BizException;
    
    /**
     * 회수 완료처리
     * 
     * @param TargetVO
     * @return
     * @throws BizException
     */
    public int closeProcess(RecoveryVO recovery)
    	    throws BizException;
    
    /**
     * 회수 창고이동 전표
     * 
     * @return
     * @throws BizException
     */
    public List<RecoveryVO> getTransProduct(RecoveryVO recovery) throws BizException;
    
    /**
     * 운송정보 수정
     * 
     * @return
     * @throws BizException
     */
    public int transUpdateProc(RecoveryVO recovery) throws BizException;

}
