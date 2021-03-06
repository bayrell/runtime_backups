/*!
 *  Bayrell Common Languages Transcompiler
 *
 *  (c) Copyright 2016-2018 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.bayrell.org/licenses/APACHE-LICENSE-2.0.html
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

if (false){

function ObjectAssign(res, obj){
	for (var key in obj){
		if (res[key] == undefined) res[key] = obj[key];
		else if (res[key] instanceof Object) ObjectAssign(res[key], obj[key]);
	}
}

module.exports = {
	VERSION: '0.6.2',
};

/* OpCodes */
ObjectAssign(module.exports, require("./OpCodes/OpComponent.js"));
ObjectAssign(module.exports, require("./OpCodes/OpHtmlAttribute.js"));
ObjectAssign(module.exports, require("./OpCodes/OpHtmlCall.js"));
ObjectAssign(module.exports, require("./OpCodes/OpHtmlComment.js"));
ObjectAssign(module.exports, require("./OpCodes/OpHtmlEscape.js"));
ObjectAssign(module.exports, require("./OpCodes/OpHtmlExpression.js"));
ObjectAssign(module.exports, require("./OpCodes/OpHtmlTag.js"));
ObjectAssign(module.exports, require("./OpCodes/OpHtmlText.js"));
ObjectAssign(module.exports, require("./OpCodes/OpHtmlValue.js"));
ObjectAssign(module.exports, require("./OpCodes/OpHtmlView.js"));
ObjectAssign(module.exports, require("./OpCodes/OpRender.js"));
ObjectAssign(module.exports, require("./OpCodes/OpTemplateDeclare.js"));
ObjectAssign(module.exports, require("./OpCodes/OpViewDeclare.js"));

/* Root */
ObjectAssign(module.exports, require("./HtmlToken.js"));
ObjectAssign(module.exports, require("./ModuleDescription.js"));
ObjectAssign(module.exports, require("./TemplateParser.js"));
ObjectAssign(module.exports, require("./TemplateParserFactory.js"));
ObjectAssign(module.exports, require("./TranslatorES6.js"));
ObjectAssign(module.exports, require("./TranslatorES6Factory.js"));
ObjectAssign(module.exports, require("./TranslatorNodeJS.js"));
ObjectAssign(module.exports, require("./TranslatorNodeJSFactory.js"));
ObjectAssign(module.exports, require("./TranslatorPHP.js"));
ObjectAssign(module.exports, require("./TranslatorPHPFactory.js"));
ObjectAssign(module.exports, require("./Utils.js"));

}
else{

module.exports = {
	VERSION: '0.6.2',
	'OpCodes': {
		'OpComponent': require("./OpCodes/OpComponent.js"),
		'OpHtmlAttribute': require("./OpCodes/OpHtmlAttribute.js"),
		'OpHtmlCall': require("./OpCodes/OpHtmlCall.js"),
		'OpHtmlComment': require("./OpCodes/OpHtmlComment.js"),
		'OpHtmlEscape': require("./OpCodes/OpHtmlEscape.js"),
		'OpHtmlExpression': require("./OpCodes/OpHtmlExpression.js"),
		'OpHtmlTag': require("./OpCodes/OpHtmlTag.js"),
		'OpHtmlText': require("./OpCodes/OpHtmlText.js"),
		'OpHtmlValue': require("./OpCodes/OpHtmlValue.js"),
		'OpHtmlView': require("./OpCodes/OpHtmlView.js"),
		'OpRender': require("./OpCodes/OpRender.js"),
		'OpTemplateDeclare': require("./OpCodes/OpTemplateDeclare.js"),
		'OpViewDeclare': require("./OpCodes/OpViewDeclare.js"),
	},
	'HtmlToken': require("./HtmlToken.js"),
	'ModuleDescription': require("./ModuleDescription.js"),
	'TemplateParser': require("./TemplateParser.js"),
	'TemplateParserFactory': require("./TemplateParserFactory.js"),
	'TranslatorES6': require("./TranslatorES6.js"),
	'TranslatorES6Factory': require("./TranslatorES6Factory.js"),
	'TranslatorNodeJS': require("./TranslatorNodeJS.js"),
	'TranslatorNodeJSFactory': require("./TranslatorNodeJSFactory.js"),
	'TranslatorPHP': require("./TranslatorPHP.js"),
	'TranslatorPHPFactory': require("./TranslatorPHPFactory.js"),
	'Utils': require("./Utils.js"),
};

}