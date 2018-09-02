"use strict;"
/*!
 *  Bayrell Template Engine
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
var rs = require('BayrellRuntime').rs;
var BayrellLangTranslatorES6 = require('BayrellLang').LangES6.TranslatorES6;
var BaseOpCode = require('BayrellLang').OpCodes.BaseOpCode;
var OpComponent = require('./OpCodes/OpComponent.js');
var OpHtmlAttribute = require('./OpCodes/OpHtmlAttribute.js');
var OpHtmlJson = require('./OpCodes/OpHtmlJson.js');
var OpHtmlRaw = require('./OpCodes/OpHtmlRaw.js');
var OpHtmlTag = require('./OpCodes/OpHtmlTag.js');
var OpHtmlComment = require('./OpCodes/OpHtmlComment.js');
var OpHtmlText = require('./OpCodes/OpHtmlText.js');
var OpHtmlView = require('./OpCodes/OpHtmlView.js');
class TranslatorES6 extends BayrellLangTranslatorES6{
	getClassName(){return "BayrellTemplate.TranslatorES6";}
	static getParentClassName(){return "BayrellLangTranslatorES6";}
	/**
	 * Check if name is component
	 * @param string name
	 * @return bool
	 */
	isComponent(name){
		var ch = rs.charAt(name, 0);
		return rs.strtoupper(ch) == ch && ch != "";
	}
	/**
	 * Namespace
	 */
	OpNamespace(op_code){
		super.OpNamespace(op_code);
		this.modules.set("rs", "Runtime.rs");
		return "";
	}
	/**
	 * OpHtmlJson
	 */
	OpHtmlJson(op_code){
		return rtl.toString(this.getName("rs"))+".json_encode("+rtl.toString(this.translateRun(op_code.value))+")";
	}
	/**
	 * OpHtmlRaw
	 */
	OpHtmlRaw(op_code){
		return this.translateRun(op_code.value);
	}
	/**
	 * Html tag
	 */
	OpHtmlTag(op_code){
		var is_component = false;
		var res = "";
		this.pushOneLine(false);
		this.levelInc();
		/* isComponent */
		if (this.modules.has(op_code.tag_name)){
			res = "WebJSCore.Lib.createComponent(";
			res += this.s(rtl.toString(this.modules.item(op_code.tag_name))+",");
			is_component = true;
		}
		else {
			res = "WebJSCore.Lib.createElement(";
			res += this.s(rtl.toString(this.convertString(op_code.tag_name))+",");
		}
		if (is_component){
			res += this.s("this.getElementAttrs()");
		}
		else {
			res += this.s("(new "+rtl.toString(this.getName("Map"))+"())");
		}
		if (op_code.attributes != null && op_code.attributes.count() > 0){
			op_code.attributes.each((item) => {
				this.pushOneLine(true);
				var value = this.translateRun(item.value);
				this.popOneLine();
				res += this.s(".set("+rtl.toString(this.convertString(item.key))+", "+rtl.toString(value)+")");
			});
		}
		if (op_code.spreads != null && op_code.spreads.count() > 0){
			op_code.spreads.each((item) => {
				res += this.s(".addMap("+rtl.toString(item)+")");
			});
		}
		res += this.s(".toObject()");
		/* Childs */
		if (op_code.childs == null || op_code.childs.count() == 0){
		}
		else {
			res += ",";
			res += this.s("(new "+rtl.toString(this.getName("Vector"))+"())");
			op_code.childs.each((item) => {
				res += this.s(".push("+rtl.toString(this.translateRun(item))+")");
			});
		}
		this.levelDec();
		res += this.s(")");
		this.popOneLine();
		return res;
	}
	/**
	 * Html tag
	 */
	OpHtmlView(op_code){
		this.pushOneLine(false);
		var res = "(new "+rtl.toString(this.getName("Vector"))+"())";
		op_code.childs.each((item) => {
			res += this.s(".push("+rtl.toString(this.translateRun(item))+")");
		});
		this.popOneLine();
		return res;
	}
	/**
	 * Translate to language
	 * @param BaseOpCode op_code - Abstract syntax tree
	 * @returns string - The result
	 */
	translateRun(op_code){
		if (op_code instanceof OpHtmlTag){
			return this.OpHtmlTag(op_code);
		}
		else if (op_code instanceof OpHtmlText){
			return this.OpString(op_code);
		}
		else if (op_code instanceof OpHtmlView){
			return this.OpHtmlView(op_code);
		}
		return super.translateRun(op_code);
	}
}
module.exports = TranslatorES6;