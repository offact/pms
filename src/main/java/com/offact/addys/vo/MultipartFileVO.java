package com.offact.addys.vo;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

public class MultipartFileVO extends AbstractVO  {

	/**
	 * serialVersionUID
	 */
	private static final long serialVersionUID = 1L;
	
	private List<MultipartFile> files;
	
	private List<MultipartFile> cfiles;
	
	private List<MultipartFile> bfiles;

	public List<MultipartFile> getFiles() {
		return files;
	}

	public void setFiles(List<MultipartFile> files) {
		this.files = files;
	}

	public List<MultipartFile> getCfiles() {
		return cfiles;
	}

	public void setCfiles(List<MultipartFile> cfiles) {
		this.cfiles = cfiles;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public List<MultipartFile> getBfiles() {
		return bfiles;
	}

	public void setBfiles(List<MultipartFile> bfiles) {
		this.bfiles = bfiles;
	}
	
}
