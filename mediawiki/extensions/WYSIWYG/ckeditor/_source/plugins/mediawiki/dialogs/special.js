CKEDITOR.dialog.add( 'MWSpecialTags', function( editor ) {
{

        function stripTags(html) {                                                       //30.10.14 RL->
            return html.replace(/<\w+(\s+("[^"]*"|'[^']*'|[^>])+)?>|<\/\w+>/gi, ''); 
        } 

        function htmlEncode(html) { //text=>html using browser
            return document.createElement( 'a' ).appendChild( document.createTextNode( html ) ).parentNode.innerHTML;
        } 

        function htmlDecode(html) { //html=>text using browser
            var tmp = document.createElement("DIV");
            tmp.innerHTML = html;
            return tmp.textContent || tmp.innerText || "";
        }
        
        function convToHTML(text2html) { 
            //if (htmlEncode('<\n>') == '&lt;\n&gt;') { 
            //    //text to html using browser
            //    return htmlEncode(text2html); 
            //}
            //else { //In case browser fails...
            //    //text to html using replace
                return text2html.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
            //}    
        }; 
        
        function convFromHTML(html) {    
            //if ( htmlDecode('&lt;\n&gt;') == '<\n>' ) {
            //    //html=>text using browser
            //    return (htmlDecode(html));
            //}
            //else { //In case browser fails...   
            //    //html=>text using replace
            //    return stripTags(html).replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&'); 
			    return html.replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&'); 
            //}    
        };                                                                               //30.10.14 RL<-      

        return {
            title : editor.lang.mwplugin.specialTagTitle,
            minWidth  : 600,
            minHeight : 150,
            resizable: CKEDITOR.DIALOG_RESIZE_BOTH,
			contents : [
				{
					id : 'mwSpecialTagDef',
					label : 'Special Tags label',
                    title : 'Special Tags title',
					elements :
					[
                        {
                            id:    'tagDefinition',
                            type:  'textarea',
                            rows:  16,
                            label: editor.lang.mwplugin.specialTagDef,
                            title: 'Special Tag definition',
                            className: 'swmf_class',
                            style: 'border: 1px;'
                        }
		            ]
                }
            ],
            onOk : function() {
        		var tag = null,
                    className = null,
                    textarea = this.getContentElement( 'mwSpecialTagDef', 'tagDefinition'),
                    content = textarea.getValue(),
                    wgImgWikitags = ['syntaxhighlight', 'ref', 'nowiki', 'html',        //02.11.14 RL Was source
                        'includeonly', 'gallery', 'noinclude', 'onlyinclude'
                    ],
                    wgCKeditorMagicWords = window.parent.wgCKeditorMagicWords || window.parent.parent.wgCKeditorMagicWords;

				content.Trim();
				content = content.replace(/\r?\n/g, 'fckLR');

                // check for a allowed tags
				//17.02.14 RL->     
				if (el = content.match(/^<(source|syntaxhighlight).*?lang=/)) { //02.11.14 RL 
                    //<source lang="xx">... and <syntaxhighlight lang="xx">...
					//Replace source -tag with syntaxhighlight -tag 
					if ( content.match(/^<(source).*?lang="([\w_-]+)">(.*?)<\/(source)>$/) ) { //02.11.14 RL
						content = content.replace(/^<(source).*?lang="([\w_-]+)">(.*?)<\/(source)>$/, '<syntaxhighlight lang="$2">$3</syntaxhighlight>');
					}

					if (! (el = content.match(/^<(syntaxhighlight).*?lang="([\w_-]+)">(.*?)<\/(syntaxhighlight)>$/))) { //30.10.14 RL Was source
						alert (editor.lang.mwplugin.invalidContent);
						return false;					
					}

					var inner = el[3] || '_',
                        spanClass = 'fck_mw_special';
                    className = 'FCK__MWSpecial';

					inner = inner.replace(/ /g,'fckSPACE');                     //02.11.14 RL				
					
                    if (el[1].InArray(wgImgWikitags)) {
                        spanClass = 'fck_mw_' + el[1];
                        className = 'FCK__MW' + el[1].substr(0, 1).toUpperCase() + el[1].substr(1);
                    }					
                    tag = '<span class="'+ spanClass +'" _fck_mw_customtag="true" _fck_mw_tagname="' + el[1] + '" lang="' + el[2] + '" _fck_mw_tagtype="t">' 
                          + convToHTML(inner) + '</span>';                      //30.10.14 RL Added convToHTML()
                } //17.02.14 RL<-
                else if (el = content.match(/^<([\w_-]+)>(.*?)<\/([\w_-]+)>$/)) {
                    var inner = el[2] || '_',
                        spanClass = 'fck_mw_special';
                    className = 'FCK__MWSpecial';

                    if (el[1].InArray(wgImgWikitags)) {
                        spanClass = 'fck_mw_' + el[1];
                        className = 'FCK__MW' + el[1].substr(0, 1).toUpperCase() + el[1].substr(1);
                    }					
                    tag = '<span class="'+ spanClass +'" _fck_mw_customtag="true" _fck_mw_tagname="' + el[1] + '" _fck_mw_tagtype="t">'
                        + inner + '</span>';
					}
                else if (el = content.match(/^__(.*?)__$/)) {
                    tag = '<span class="fck_mw_magic" _fck_mw_customtag="true" _fck_mw_tagname="' + el[1] + '" _fck_mw_tagtype="c">'
                        + '_</span>'
                    className = 'FCK__MWMagicWord';
                }
                else if (el = content.match(/^{{(#?[\w\d_-]+):(.*?)}}$/)) {
                    var tagType = 'p';
                    if (el[1].InArray(wgCKeditorMagicWords.datevars)) tagType = 'v';
                    else if (el[1].InArray(wgCKeditorMagicWords.wikivars)) tagType = 'w';
                    var inner = el[2] || '_';
                    tag = '<span class="fck_mw_special" _fck_mw_customtag="true" _fck_mw_tagname="' + el[1] + '"' +
                          ' _fck_mw_tagtype="' + tagType + '">'
                        + inner + '</span>'
                    className = 'FCK__MWSpecial';
                }
                else if (el = content.match(/^{{([A-Z\d]+)}}$/)) {
                    var tagType = '';
                    if (el[1].InArray(wgCKeditorMagicWords.datevars)) tagType = 'v';
                    else if (el[1].InArray(wgCKeditorMagicWords.wikivars)) tagType = 'w';
                    if (tagType) {
                        tag = '<span class="fck_mw_special" _fck_mw_customtag="true" _fck_mw_tagname="' + el[1] + '"' +
                              ' _fck_mw_tagtype="' + tagType + '">_</span>'
                        className = 'FCK__MWSpecial';
                    }
                    else {
                        tag = '<span class="fck_mw_template">{{' + el[1] + '}}</span>';
                        className = 'FCK__MWTemplate';
                    }
                }
                else if ( wgCKeditorMagicWords.sftags && ( el = content.match(/^{{{([\w ]+)((\|[^\|]+)*)}}}$/) ) ) {
					if (el[1].InArray(wgCKeditorMagicWords.sftags)) tagType = 'sf';
                    if (tagType) {
                        tag = '<span class="fck_mw_special" _fck_mw_customtag="true" _fck_mw_tagname="' + el[1] + '"' +
                              ' _fck_mw_tagtype="' + tagType + '">' + content + '</span>'
                        className = 'FCK__MWSpecial';
                    }
                    else {
                        tag = '<span class="fck_mw_template">{{{' + el[1] + '}}}</span>';
                        className = 'FCK__MWTemplate';
                    }
                }
                else if (el = content.match(/^{{[\w\d_-]+(\|.*?)*}}$/)) {
                    tag = '<span class="fck_mw_template">' + el[0].substr(2, -2) + '</span>';
                    className = 'FCK__MWTemplate';
                }
                else {
                    alert (editor.lang.mwplugin.invalidContent);
                    return false;
                }
                var element = CKEDITOR.dom.element.createFromHtml(tag, editor.document),
                    newFakeObj = editor.createFakeElement( element, className, 'span' );
                if ( this.fakeObj ) {
					newFakeObj.replace( this.fakeObj );
					editor.getSelection().selectElement( newFakeObj );
				}
				else
					editor.insertElement( newFakeObj );

			},

       		onShow : function() {
				this.fakeObj = false;
        		var editor = this.getParentEditor(),
            		selection = editor.getSelection(),
                	element = null;

    			// Fill in all the relevant fields if there's already one item selected.
        		if ( ( element = selection.getSelectedElement() ) && element.is( 'img' )
            			&& element.getAttribute( 'class' ).InArray( [
                            'FCK__MWSpecial',
                            'FCK__MWMagicWord',
                            'FCK__MWNowiki',
                            'FCK__MWIncludeonly',
                            'FCK__MWNoinclude',
                            'FCK__MWOnlyinclude',
							'FCK__MWSyntaxhighlight'                                           //17.02.14 RL, 02.11.14 RL Was source
                         ])
                    )
                {
                    this.fakeObj = element;
    				element = editor.restoreRealElement( this.fakeObj );
        			selection.selectElement( this.fakeObj );
                    var content = '',
                        inner = element.getHtml().replace(/_$/, '').replace(/fckLR/g, '\r\n').replace(/fckSPACE/g,' '); //30.10.14 RL fckSPACE

					inner = convFromHTML(inner);		//30.10.14 RL Added convFromHTML()				
						
					if ( element.getAttribute( 'class' ).InArray(['fck_mw_special',
					                                              'fck_mw_syntaxhighlight'     //17.02.14 RL, 03.11.24 RL Was source
																 ])
                       ) 
					{         
                        var tagName = element.getAttribute('_fck_mw_tagname') || '',
						    tagLang = element.getAttribute( 'lang' ) || '',           //17.02.14 RL
                            tagType = element.getAttribute('_fck_mw_tagtype') || '';

						if ( tagName == 'syntaxhighlight' ) {                         //17.02.14 RL-> //02.11.14 RL Was source
                            content += '<' + tagName;
							if (tagLang != '') {  //<syntaxhighlight lang="xxxx">                       
							  content += ' lang="' + tagLang + '"';      
							}                                              
							content += '>' + inner + '</' + tagName + '>';  
                        }                                                             //17.02.14 RL<-
                        else if ( tagType == 't' ) {
                            content += '<' + tagName + '>' + inner + '</' + tagName + '>';
                        }
                        else if ( tagType == 'sf') {
                            content +=  inner;
                        }
                        else {
                            content += '{{' + tagName;
                            if (! tagType.IEquals('w', 'v'))
                                content += ':';
                            content += inner + '}}';
                        }
                    }
                    else if ( element.getAttribute( 'class' ) == 'fck_mw_magic' ) {
                        content += '__' + element.getAttribute('_fck_mw_tagname') + '__';
                    }
                    else {
                        content += '<' + element.getAttribute('_fck_mw_tagname') + '>' +
                        inner +
                        '</' + element.getAttribute('_fck_mw_tagname') + '>';
                    }
                    //editor.document.getById('tagDefinition').setHtml(content);
                    var textarea = this.getContentElement( 'mwSpecialTagDef', 'tagDefinition');
                    textarea.setValue(content);
                }
            }
			
        }
}
} );
