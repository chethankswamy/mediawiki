<?php
error_reporting( -1 ); 
ini_set( 'display_errors', 1 );

# This file was automatically generated by the MediaWiki 1.23.6
# installer. If you make manual changes, please keep track in case you
# need to recreate them later.
#
# See includes/DefaultSettings.php for all configurable settings
# and their default values, but don't forget to make changes in _this_
# file, not there.
#
# Further documentation for configuration settings may be found at:
# https://www.mediawiki.org/wiki/Manual:Configuration_settings

# Protect against web entry
if ( !defined( 'MEDIAWIKI' ) ) {
	exit;
}

## Uncomment this to disable output compression
# $wgDisableOutputCompression = true;

$wgSitename = "My MediaWIKI";
$wgMetaNamespace = "My_MediaWIKI";

## The URL base path to the directory containing the wiki;
## defaults for all runtime URL paths are based off of this.
## For more information on customizing the URLs
## (like /w/index.php/Page_title to /wiki/Page_title) please see:
## https://www.mediawiki.org/wiki/Manual:Short_URL
$wgScriptPath = "/mediawiki";
$wgScriptExtension = ".php";

## The protocol and server name to use in fully-qualified URLs
$wgServer = "http://localhost";

## The relative URL path to the skins directory
$wgStylePath = "$wgScriptPath/skins";

## The relative URL path to the logo.  Make sure you change this from the default,
## or else you'll overwrite your logo when you upgrade!
$wgLogo = "$wgStylePath/common/images/logo.jpg";

## UPO means: this is also a user preference option

$wgEnableEmail = true;
$wgEnableUserEmail = true; # UPO

$wgEmergencyContact = "chethanmacmail@gmail.com";
$wgPasswordSender = "ch3than_k";

$wgEnotifUserTalk = true; # UPO
$wgEnotifWatchlist = true; # UPO
$wgEmailAuthentication = true;

## Database settings
$wgDBtype = "mysql";
$wgDBserver = "localhost";
$wgDBname = "my_wiki";
$wgDBuser = "root";
$wgDBpassword = "root";

# MySQL specific settings
$wgDBprefix = "";

# MySQL table options to use during installation or update
$wgDBTableOptions = "ENGINE=InnoDB, DEFAULT CHARSET=binary";

# Experimental charset support for MySQL 5.0.
$wgDBmysql5 = false;

## Shared memory settings
$wgMainCacheType = CACHE_NONE;
$wgMemCachedServers = array();

## To enable image uploads, make sure the 'images' directory
## is writable, then set this to true:
$wgEnableUploads = true;
#$wgUseImageMagick = true;
#$wgImageMagickConvertCommand = "/usr/bin/convert";

# InstantCommons allows wiki to use images from http://commons.wikimedia.org
$wgUseInstantCommons = true;

## If you use ImageMagick (or any other shell command) on a
## Linux server, this will need to be set to the name of an
## available UTF-8 locale
$wgShellLocale = "en_US.UTF-8";

## If you want to use image uploads under safe mode,
## create the directories images/archive, images/thumb and
## images/temp, and make them all writable. Then uncomment
## this, if it's not already uncommented:
#$wgHashedUploadDirectory = false;

## Set $wgCacheDirectory to a writable directory on the web server
## to make your wiki go slightly faster. The directory should not
## be publically accessible from the web.
#$wgCacheDirectory = "$IP/cache";

# Site language code, should be one of the list in ./languages/Names.php
$wgLanguageCode = "en";

$wgSecretKey = "6c0debfea4577424678f955812974543ea4eb470539a663dda2801e749b8df39";

# Site upgrade key. Must be set to a string (default provided) to turn on the
# web installer while LocalSettings.php is in place
$wgUpgradeKey = "95a94b136b697bfb";

## Default skin: you can change the default skin. Use the internal symbolic
## names, ie 'cologneblue', 'monobook', 'vector':
//$wgDefaultSkin = "vector";
require_once( "$IP/skins/bootstrap/bootstrapskin.php" );
$wgDefaultSkin = "bootstrapskin";

$wgRestrictDisplayTitle = false;
$wgAllowExternalImages = true;

## For attaching licensing metadata to pages, and displaying an
## appropriate copyright notice / icon. GNU Free Documentation
## License and Creative Commons licenses are supported so far.
$wgRightsPage = ""; # Set to the title of a wiki page that describes your license/copyright
$wgRightsUrl = "";
$wgRightsText = "";
$wgRightsIcon = "";

# Path to the GNU diff3 utility. Used for conflict resolution.
$wgDiff3 = "/usr/bin/diff3";

# The following permissions were set based on your choice in the installer
#$wgGroupPermissions['*']['createaccount'] = false;
#$wgGroupPermissions['*']['edit'] = false;

# Enabled Extensions. Most extensions are enabled by including the base extension file here
# but check specific extension documentation for more details
# The following extensions were automatically enabled:
require_once( "$IP/extensions/Cite/Cite.php" );
require_once( "$IP/extensions/ConfirmEdit/ConfirmEdit.php" );
require_once( "$IP/extensions/Gadgets/Gadgets.php" );
require_once( "$IP/extensions/ImageMap/ImageMap.php" );
require_once( "$IP/extensions/InputBox/InputBox.php" );
require_once( "$IP/extensions/Interwiki/Interwiki.php" );
require_once( "$IP/extensions/LocalisationUpdate/LocalisationUpdate.php" );
require_once( "$IP/extensions/Nuke/Nuke.php" );
require_once( "$IP/extensions/ParserFunctions/ParserFunctions.php" );
require_once( "$IP/extensions/PdfHandler/PdfHandler.php" );
require_once( "$IP/extensions/Poem/Poem.php" );
require_once( "$IP/extensions/Renameuser/Renameuser.php" );
require_once( "$IP/extensions/SpamBlacklist/SpamBlacklist.php" );
require_once( "$IP/extensions/SyntaxHighlight_GeSHi/SyntaxHighlight_GeSHi.php" );
require_once( "$IP/extensions/TitleBlacklist/TitleBlacklist.php" );
require_once( "$IP/extensions/Vector/Vector.php" );
require_once( "$IP/extensions/WikiEditor/WikiEditor.php" );
//require_once( "$IP/extensions/EditOnlyYourOwnPage.php" );
require_once( "$IP/extensions/Lockdown/Lockdown.php" );
require_once "$IP/extensions/BootStrapSkinSidebar/BootStrapSkinSidebar.php";
require_once "$IP/extensions/BootStrapSkinContact/BootStrapSkinContact.php";
require_once "$IP/extensions/BootStrapSkinAwesome/awesome.php";
require_once "$IP/extensions/NoTitle/NoTitle.php";
$wgRestrictDisplayTitle = false;

/*
require_once "$IP/extensions/WYSIWYG/WYSIWYG.php";

$wgGroupPermissions['*']['wysiwyg'] = true;          //Everyone can use (if can edit)...
$wgDefaultUserOptions['cke_show'] = 'richeditor';    //Enable CKEditor
$wgDefaultUserOptions['riched_use_toggle'] = false;  //Editor can toggle CKEditor/WikiText
$wgDefaultUserOptions['riched_start_disabled'] = false; //Important!!! else bug...
$wgDefaultUserOptions['riched_toggle_remember_state'] = true; //working/bug?
$wgDefaultUserOptions['riched_use_popup'] = false;   //Deprecated
*/

$wgGroupPermissions['*']['edit'] = false;
 
# Requires users to confirm their eamail to edit a page
$wgEmailConfirmToEdit = false;
 
# hide user tools for anonymous (IP address) visitors
//$wgShowIPinHeader = false;
 
# Users cannot edit pages
$wgGroupPermissions['user']['edit'] = false;
 
# Anonymous users can't create pages
$wgGroupPermissions['*']['createpage'] = false;
$wgGroupPermissions['user']['createpage'] = false;
 
# Prevent new user registrations except by sysops
$wgGroupPermissions['*']['createaccount'] = false;
 
# Start with assigning the default permissions from group "user"
$wgGroupPermissions['rerun'] = $wgGroupPermissions['user'];

# Now modify these rights:
$wgGroupPermissions['rerun']['delete'] = true;
$wgGroupPermissions['rerun']['protect'] = true;
$wgGroupPermissions['rerun']['patrol'] = true;
$wgGroupPermissions['rerun']['purge'] = true; # delete the cache of a page
$wgGroupPermissions['rerun']['edit'] = true;
$wgGroupPermissions['rerun']['createpage'] = true;
 
# Start with assigning the default permissions from group "user"
$wgGroupPermissions['aec'] = $wgGroupPermissions['user'];

# Now modify these rights:
$wgGroupPermissions['aec']['delete'] = true;
$wgGroupPermissions['aec']['protect'] = true;
$wgGroupPermissions['aec']['patrol'] = true;
$wgGroupPermissions['aec']['purge'] = true; # delete the cache of a page
$wgGroupPermissions['aec']['edit'] = true;
$wgGroupPermissions['aec']['createpage'] = true;
 
#define constants for your custom namespaces, for a more readable configuration
define('NS_RERUN', 100);
define('NS_AEC', 101);
 
#define custom namespaces
$wgExtraNamespaces[NS_RERUN] = 'rerun';
$wgExtraNamespaces[NS_AEC] = 'aec';
 
#restrict "read" permission to logged in users
$wgNamespacePermissionLockdown[NS_RERUN]['read'] = array('rerun','aec');
$wgNamespacePermissionLockdown[NS_RERUN]['edit'] = array('rerun');
$wgNamespacePermissionLockdown[NS_RERUN]['createpage'] = array('rerun');
 
$wgNamespacePermissionLockdown[NS_AEC]['read'] = array('rerun','aec');
$wgNamespacePermissionLockdown[NS_AEC]['edit'] = array('aec');
$wgNamespacePermissionLockdown[NS_AEC]['createpage'] = array('aec');
 
#prevent inclusion of pages from that namespace
$wgNonincludableNamespaces[] = NS_RERUN;
$wgNonincludableNamespaces[] = NS_AEC;

$wgFileExtensions = array(
    'png', 'gif', 'jpg', 'jpeg', 'jp2', 'webp', 'ppt', 'pdf', 'psd',
    'mp3', 'xls', 'xlsx', 'swf', 'doc','docx', 'odt', 'odc', 'odp',
    'odg', 'mpp'
    );

# End of automatically generated settings.
# Add more configuration options below.

