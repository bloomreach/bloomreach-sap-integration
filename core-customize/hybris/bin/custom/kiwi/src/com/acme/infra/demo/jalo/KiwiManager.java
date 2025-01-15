package com.acme.infra.demo.jalo;

import com.acme.infra.demo.constants.KiwiConstants;
import de.hybris.platform.jalo.JaloSession;
import de.hybris.platform.jalo.extension.ExtensionManager;
import org.apache.log4j.Logger;

public class KiwiManager extends GeneratedKiwiManager
{
	@SuppressWarnings("unused")
	private static final Logger log = Logger.getLogger( KiwiManager.class.getName() );
	
	public static final KiwiManager getInstance()
	{
		ExtensionManager em = JaloSession.getCurrentSession().getExtensionManager();
		return (KiwiManager) em.getExtension(KiwiConstants.EXTENSIONNAME);
	}
	
}
