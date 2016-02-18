/**
 *
 */
package com.offact.addys.service.order;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.offact.framework.exception.BizException;
import com.offact.addys.vo.master.StockVO;
import com.offact.addys.vo.order.OrderVO;
import com.offact.addys.vo.order.TargetVO;

/**
 * @author
 */
public interface TargetService {
    /**
     * 발주대상 목록 조회
     * 
     * @return
     * @throws BizException
     */
    public List<TargetVO> getTargetPageList(TargetVO target) throws BizException;
    /**
     * 발주대상 전체 갯수
     * 
     * @return
     * @throws BizException
     */
    public int getTargetCnt(TargetVO target) throws BizException;
    

    /**
     * 발주번호 조회
     * 
     * @return
     * @throws BizException
     */
    public TargetVO getOrderCode(TargetVO target) throws BizException;
    
    
    /**
     * 발주대상 상세목록 조회
     * 
     * @return
     * @throws BizException
     */
    public List<TargetVO> getTargetDetailList(TargetVO target) throws BizException;
   
    /**
     * 발주 보류처리
     * 
     * @param TargetVO
     * @return
     * @throws BizException
     */
    public int regiDeferProcess(String[] deferlist , TargetVO target ,String arrDeferProductId)
    	    throws BizException;
    
    /**
     * 발주 처리
     * 
     * @param TargetVO
     * @return
     * @throws BizException
     */
    public int regiOrderProcess(String[] orderlist , TargetVO target)
    	    throws BizException;
   
    /**
     * 보류대상 상세조회
     * 
     * @return
     * @throws BizException
     */
    public TargetVO getDeferDetail(TargetVO defer) throws BizException;
    
    /**
     * 보류대상 상세목록 조회
     * 
     * @return
     * @throws BizException
     */
    public List<TargetVO> getDeferDetailList(TargetVO defer) throws BizException;
    
    /**
     * 발주 보류폐기
     * 
     * @param TargetVO
     * @return
     * @throws BizException
     */
    public int regiDeferCancel(TargetVO target)
    	    throws BizException;
    
    /**
     * 발주상세가져오기
     * 
     * @return
     * @throws BizException
     */
    public TargetVO getStateCnt(TargetVO targetCon) throws BizException;
    
    /**
     * 추가여부 조회
     * 
     * @return
     * @throws BizException
     */
    public TargetVO getTargetAddYn(TargetVO target) throws BizException;
    
}
