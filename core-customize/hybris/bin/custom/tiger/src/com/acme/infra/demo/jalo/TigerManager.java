package com.acme.infra.demo.jalo;

import com.acme.infra.demo.constants.TigerConstants;
import de.hybris.platform.jalo.JaloSession;
import de.hybris.platform.jalo.extension.ExtensionManager;
import org.apache.log4j.Logger;

public class TigerManager extends GeneratedTigerManager
{
	@SuppressWarnings("unused")
	private static final Logger log = Logger.getLogger( TigerManager.class.getName() );
	
	public static final TigerManager getInstance()
	{
		ExtensionManager em = JaloSession.getCurrentSession().getExtensionManager();
		return (TigerManager) em.getExtension(TigerConstants.EXTENSIONNAME);
	}
	
}
