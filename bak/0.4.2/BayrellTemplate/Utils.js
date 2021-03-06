"use strict;"
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
var rtl = require('BayrellRuntime').rtl;
var Map = require('BayrellRuntime').Map;
var Vector = require('BayrellRuntime').Vector;
var CoreObject = require('BayrellRuntime').CoreObject;
var ContextObject = require('BayrellRuntime').ContextObject;
var ContextInterface = require('BayrellRuntime').Interfaces.ContextInterface;
var FactoryInterface = require('BayrellRuntime').Interfaces.FactoryInterface;
var CommonTranslator = require('BayrellLang').CommonTranslator;
var TemplateParser = require('./TemplateParser.js');
class Utils{
	getClassName(){return "BayrellTemplate.Utils";}
	static getParentClassName(){return "";}
	/**
	 * Transcompile Bayrell language to other
	 * @string FactoryInterface translator_factory
	 * @string string source
	 * @return string
	 */
	static translateView(translator_factory, source){
		var translator = translator_factory.newInstance();
		var parser = new TemplateParser(translator.context());
		parser.parseString(source);
		var code_tree = parser.getAST();
		var res = translator.translate(code_tree);
		return res;
	}
}
module.exports = Utils;