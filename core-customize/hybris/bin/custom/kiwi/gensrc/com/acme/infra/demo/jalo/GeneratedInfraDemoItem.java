/*
 * ----------------------------------------------------------------
 * --- WARNING: THIS FILE IS GENERATED AND WILL BE OVERWRITTEN! ---
 * --- Generated at 4 Nov 2024, 15:59:59                        ---
 * ----------------------------------------------------------------
 */
package com.acme.infra.demo.jalo;

import com.acme.infra.demo.constants.KiwiConstants;
import de.hybris.platform.jalo.GenericItem;
import de.hybris.platform.jalo.Item.AttributeMode;
import de.hybris.platform.jalo.SessionContext;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

/**
 * Generated class for type {@link com.acme.infra.demo.jalo.InfraDemoItem InfraDemoItem}.
 */
@SuppressWarnings({"deprecation","unused","cast"})
public abstract class GeneratedInfraDemoItem extends GenericItem
{
	/** Qualifier of the <code>InfraDemoItem.exampleStringField</code> attribute **/
	public static final String EXAMPLESTRINGFIELD = "exampleStringField";
	/** Qualifier of the <code>InfraDemoItem.exampleNumberField</code> attribute **/
	public static final String EXAMPLENUMBERFIELD = "exampleNumberField";
	protected static final Map<String, AttributeMode> DEFAULT_INITIAL_ATTRIBUTES;
	static
	{
		final Map<String, AttributeMode> tmp = new HashMap<String, AttributeMode>();
		tmp.put(EXAMPLESTRINGFIELD, AttributeMode.INITIAL);
		tmp.put(EXAMPLENUMBERFIELD, AttributeMode.INITIAL);
		DEFAULT_INITIAL_ATTRIBUTES = Collections.unmodifiableMap(tmp);
	}
	@Override
	protected Map<String, AttributeMode> getDefaultAttributeModes()
	{
		return DEFAULT_INITIAL_ATTRIBUTES;
	}
	
	/**
	 * <i>Generated method</i> - Getter of the <code>InfraDemoItem.exampleNumberField</code> attribute.
	 * @return the exampleNumberField - Example Number Field
	 */
	public Long getExampleNumberField(final SessionContext ctx)
	{
		return (Long)getProperty( ctx, EXAMPLENUMBERFIELD);
	}
	
	/**
	 * <i>Generated method</i> - Getter of the <code>InfraDemoItem.exampleNumberField</code> attribute.
	 * @return the exampleNumberField - Example Number Field
	 */
	public Long getExampleNumberField()
	{
		return getExampleNumberField( getSession().getSessionContext() );
	}
	
	/**
	 * <i>Generated method</i> - Getter of the <code>InfraDemoItem.exampleNumberField</code> attribute. 
	 * @return the exampleNumberField - Example Number Field
	 */
	public long getExampleNumberFieldAsPrimitive(final SessionContext ctx)
	{
		Long value = getExampleNumberField( ctx );
		return value != null ? value.longValue() : 0;
	}
	
	/**
	 * <i>Generated method</i> - Getter of the <code>InfraDemoItem.exampleNumberField</code> attribute. 
	 * @return the exampleNumberField - Example Number Field
	 */
	public long getExampleNumberFieldAsPrimitive()
	{
		return getExampleNumberFieldAsPrimitive( getSession().getSessionContext() );
	}
	
	/**
	 * <i>Generated method</i> - Setter of the <code>InfraDemoItem.exampleNumberField</code> attribute. 
	 * @param value the exampleNumberField - Example Number Field
	 */
	public void setExampleNumberField(final SessionContext ctx, final Long value)
	{
		setProperty(ctx, EXAMPLENUMBERFIELD,value);
	}
	
	/**
	 * <i>Generated method</i> - Setter of the <code>InfraDemoItem.exampleNumberField</code> attribute. 
	 * @param value the exampleNumberField - Example Number Field
	 */
	public void setExampleNumberField(final Long value)
	{
		setExampleNumberField( getSession().getSessionContext(), value );
	}
	
	/**
	 * <i>Generated method</i> - Setter of the <code>InfraDemoItem.exampleNumberField</code> attribute. 
	 * @param value the exampleNumberField - Example Number Field
	 */
	public void setExampleNumberField(final SessionContext ctx, final long value)
	{
		setExampleNumberField( ctx,Long.valueOf( value ) );
	}
	
	/**
	 * <i>Generated method</i> - Setter of the <code>InfraDemoItem.exampleNumberField</code> attribute. 
	 * @param value the exampleNumberField - Example Number Field
	 */
	public void setExampleNumberField(final long value)
	{
		setExampleNumberField( getSession().getSessionContext(), value );
	}
	
	/**
	 * <i>Generated method</i> - Getter of the <code>InfraDemoItem.exampleStringField</code> attribute.
	 * @return the exampleStringField - Example String Value
	 */
	public String getExampleStringField(final SessionContext ctx)
	{
		return (String)getProperty( ctx, EXAMPLESTRINGFIELD);
	}
	
	/**
	 * <i>Generated method</i> - Getter of the <code>InfraDemoItem.exampleStringField</code> attribute.
	 * @return the exampleStringField - Example String Value
	 */
	public String getExampleStringField()
	{
		return getExampleStringField( getSession().getSessionContext() );
	}
	
	/**
	 * <i>Generated method</i> - Setter of the <code>InfraDemoItem.exampleStringField</code> attribute. 
	 * @param value the exampleStringField - Example String Value
	 */
	public void setExampleStringField(final SessionContext ctx, final String value)
	{
		setProperty(ctx, EXAMPLESTRINGFIELD,value);
	}
	
	/**
	 * <i>Generated method</i> - Setter of the <code>InfraDemoItem.exampleStringField</code> attribute. 
	 * @param value the exampleStringField - Example String Value
	 */
	public void setExampleStringField(final String value)
	{
		setExampleStringField( getSession().getSessionContext(), value );
	}
	
}
