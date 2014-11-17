<?php
if ( !defined( 'MEDIAWIKI' ) ) die();

$wgExtensionCredits['other'][] = array(
	'path' => __FILE__,
	'name' => 'Font Awesome',
	'author' => array(
		'[http://www.mediawikibootstrapskin.co.uk Lee Miller]',
	),
	'descriptionmsg' => 'awesome-desc',
	'url' => 'http://www.mediawikibootstrapskin.co.uk',
);

$wgExtensionMessagesFiles['FontAwesome'] = __DIR__ . '/awesome.i18n.php';

$wgResourceModules['ext.FontAwesome'] = array(
	'scripts' => array(''),
	'styles' => array('modules/ext.awesome.css'),
 
	'localBasePath' => __DIR__,
	'remoteExtPath' => 'BootStrapSkinAwesome',
);

$wgHooks['BeforePageDisplay'][] = 'addAwesome';
 
function addAwesome( OutputPage &$out, Skin &$skin ) {
   $out->addModules( 'ext.FontAwesome' );
 
   return true;
}