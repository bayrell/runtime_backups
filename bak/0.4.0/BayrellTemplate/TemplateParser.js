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
var ContextInterface = require('BayrellRuntime').Interfaces.ContextInterface;
var ModuleDescriptionInterface = require('BayrellRuntime').Interfaces.ModuleDescriptionInterface;
var ParserBay = require('BayrellLang').LangBay.ParserBay;
var ParserBayToken = require('BayrellLang').LangBay.ParserBayToken;
var ParserBayNameToken = require('BayrellLang').LangBay.ParserBayNameToken;
var BaseOpCode = require('BayrellLang').OpCodes.BaseOpCode;
var OpAssign = require('BayrellLang').OpCodes.OpAssign;
var OpAssignDeclare = require('BayrellLang').OpCodes.OpAssignDeclare;
var OpConcat = require('BayrellLang').OpCodes.OpConcat;
var OpFlags = require('BayrellLang').OpCodes.OpFlags;
var OpIdentifier = require('BayrellLang').OpCodes.OpIdentifier;
var OpNope = require('BayrellLang').OpCodes.OpNope;
var OpString = require('BayrellLang').OpCodes.OpString;
var OpComponent = require('./OpCodes/OpComponent.js');
var OpHtmlAttribute = require('./OpCodes/OpHtmlAttribute.js');
var OpHtmlJson = require('./OpCodes/OpHtmlJson.js');
var OpHtmlRaw = require('./OpCodes/OpHtmlRaw.js');
var OpHtmlTag = require('./OpCodes/OpHtmlTag.js');
var OpHtmlComment = require('./OpCodes/OpHtmlComment.js');
var OpHtmlText = require('./OpCodes/OpHtmlText.js');
var OpHtmlView = require('./OpCodes/OpHtmlView.js');
var HtmlToken = require('./HtmlToken.js');
class TemplateParser extends ParserBay{
	getClassName(){return "BayrellTemplate.TemplateParser";}
	static getParentClassName(){return "ParserBay";}
	/**
	 * Read class body content
	 */
	readClassBodyContent(res, flags){
		var op_code = null;
		var is_declare_function = false;
		if (flags != null && flags.p_declare || this.is_interface){
			is_declare_function = true;
		}
		op_code = this.readDeclareArrowFunction(true, is_declare_function);
		if (op_code){
			op_code.flags = flags;
			res.childs.push(op_code);
			return ;
		}
		op_code = this.readOperatorAssign();
		if (op_code instanceof OpAssign){
			throw this.parserError("Assign are not alowed here");
		}
		else if (op_code instanceof OpAssignDeclare){
			if (flags == null){
				flags = new OpFlags();
			}
			if (!flags.takeValue("protected") && !flags.takeValue("private")){
				flags.assignFlag("serializable", true);
			}
			op_code.flags = flags;
			res.class_variables.push(op_code);
			this.matchNextToken(";");
			return ;
		}
		throw this.parserError("Unknown operator");
	}
	/**
	 * Read Html Comment
	 */
	readHtmlComment(){
		this.matchNextToken("<!--");
		var res_str = this.current_token.readUntilString("-->", false);
		this.assignCurrentToken(this.current_token);
		this.matchNextToken("-->");
		return new OpHtmlComment(res_str);
	}
	/**
	 * Read Html Doctype
	 */
	readHtmlDOCTYPE(){
		var s = this.current_token.readUntilString(">", false);
		this.assignCurrentToken(this.current_token);
		var res = new OpHtmlText("<!"+rtl.toString(rs.trim(s))+">");
		this.matchNextToken(">");
		return res;
	}
	/**
	 * Read Html Attributes
	 */
	readHtmlAttributes(op_code){
		if (this.findNextToken(">")){
			return null;
		}
		var spreads = new Vector();
		var attributes = new Vector();
		while (!this.findNextToken(">") && !this.findNextToken("/>")){
			if (this.findNextToken("...")){
				this.matchNextToken("...");
				var spread_name = this.readIdentifierName();
				spreads.push(spread_name);
				continue;
			}
			var attr = new OpHtmlAttribute();
			attr.key = this.readNextToken().token;
			if (this.findNextToken("=")){
				this.matchNextToken("=");
				if (this.findNextToken("'") || this.findNextToken("\"")){
					this.pushToken(new ParserBayToken(this.context(), this));
					attr.value = new OpString(this.readAnyNextToken().token);
					this.popRestoreToken();
				}
				else if (this.findNextToken("{")){
					this.matchNextToken("{");
					this.pushToken(new ParserBayToken(this.context(), this));
					attr.value = this.readExpression();
					this.popRestoreToken();
					this.matchNextToken("}");
				}
				else {
					throw this.parserError("Unknown token "+rtl.toString(this.next_token.token));
				}
			}
			else {
				attr.bracket = "\"";
				attr.value = new OpString(attr.key);
			}
			attributes.push(attr);
		}
		op_code.spreads = spreads;
		op_code.attributes = attributes;
	}
	/**
	 * Read Html Expression
	 */
	readHtmlBlock(match_str, is_plain){
		if (is_plain == undefined) is_plain=false;
		var len_match = rs.strlen(match_str);
		if (len_match == 0){
			return null;
		}
		var look_str = this.current_token.lookString(len_match);
		var childs = new Vector();
		var special_tokens = HtmlToken.getSpecialTokens();
		special_tokens.removeValue("@{");
		special_tokens.removeValue("@raw{");
		special_tokens.removeValue("@json{");
		special_tokens.removeValue("<!--");
		var bracket_level = 0;
		var s = "";
		/* Main loop */
		while (look_str != "" && !this.current_token.isEOF() && (look_str != match_str || look_str == "}" && bracket_level > 0)){
			var res = null;
			if (!is_plain){
				var is_next_html_token = this.current_token.findString("<");
				var is_next_special_token = this.current_token.findVector(special_tokens) != -1;
				if (is_next_special_token || is_next_html_token){
					s = rs.trim(s, "\\t\\r\\n");
					if (s != ""){
						childs.push(new OpHtmlText(s));
					}
					s = "";
					this.assignCurrentToken(this.current_token);
					res = this.readHtmlTag();
				}
			}
			if (res == null){
				if (this.current_token.findString("{") && !is_plain || this.current_token.findString("@{") || this.current_token.findString("@raw{") || this.current_token.findString("@json{")){
					s = rs.trim(s, "\\t\\r\\n");
					if (s != ""){
						childs.push(new OpHtmlText(s));
					}
					s = "";
					var is_raw = false;
					var is_json = false;
					if (this.current_token.findString("@raw{")){
						is_raw = true;
						this.current_token.match("@raw{");
					}
					else if (this.current_token.findString("@json{")){
						is_json = true;
						this.current_token.match("@json{");
					}
					else if (this.current_token.findString("@{")){
						this.current_token.match("@{");
					}
					else if (this.current_token.findString("{")){
						this.current_token.match("{");
					}
					this.assignCurrentToken(this.current_token);
					this.pushToken(new ParserBayToken(this.context(), this));
					res = this.readExpression();
					if (is_raw){
						res = new OpHtmlRaw(res);
					}
					else if (is_json){
						res = new OpHtmlJson(res);
					}
					this.popRestoreToken();
					this.matchNextToken("}");
				}
			}
			else {
				if (this.current_token.findString("@{") || this.current_token.findString("@raw{") || this.current_token.findString("@json{")){
				}
			}
			if (res != null){
				childs.push(res);
			}
			else {
				var look = this.current_token.readChar();
				s = rtl.toString(s)+rtl.toString(look);
				if (look == "{"){
					bracket_level++
				}
				else if (look == "}"){
					bracket_level--
				}
			}
			look_str = this.current_token.lookString(len_match);
		}
		if (!is_plain){
			s = rs.trim(s, "\\t\\r\\n");
		}
		if (s != ""){
			childs.push(new OpHtmlText(s));
		}
		this.assignCurrentToken(this.current_token);
		return childs;
	}
	/**
	 * Read Html tag
	 * @return BaseOpCode
	 */
	readHtmlTag(){
		if (this.findNextToken("<!")){
			this.matchNextToken("<!");
			if (this.findNextString("DOCTYPE")){
				return this.readHtmlDOCTYPE();
			}
		}
		else if (this.findNextToken("<")){
			this.matchNextToken("<");
			if (this.findNextToken(">")){
				this.matchNextToken(">");
				var res = new OpHtmlView(this.readHtmlBlock("</>"));
				if (res.childs != null && res.childs.count() == 1){
					res = res.childs.item(0);
				}
				this.matchNextToken("</");
				this.matchNextToken(">");
				return res;
			}
			var res = new OpHtmlTag();
			res.tag_name = this.readNextToken().token;
			this.readHtmlAttributes(res);
			if (this.findNextToken("/>")){
				this.matchNextToken("/>");
			}
			else {
				this.matchNextToken(">");
				var close_tag = "</"+rtl.toString(res.tag_name)+">";
				if (res.tag_name == "script" || res.tag_name == "pre" || res.tag_name == "textarea"){
					res.is_plain = true;
					res.childs = this.readHtmlBlock("</"+rtl.toString(res.tag_name)+">", true);
				}
				else {
					res.childs = this.readHtmlBlock("</");
				}
				this.matchNextToken("</");
				this.matchNextToken(res.tag_name);
				this.matchNextToken(">");
			}
			return res;
		}
		return null;
	}
	/**
	 * Read Html
	 * @return BaseOpCode
	 */
	readHtml(){
		/* Push new token */
		this.pushToken(new HtmlToken(this.context(), this));
		/* Read Html tag */
		this.current_token.skipSystemChar();
		/* Read Html View */
		var res = new OpHtmlView();
		res.childs = new Vector();
		while (this.findNextToken("<") || this.findNextToken("<!")){
			res.childs.push(this.readHtmlTag());
		}
		if (res.childs == null){
			this.popRestoreToken();
			return null;
		}
		if (res.childs.count() == 0){
			this.popRestoreToken();
			return null;
		}
		if (res.childs != null && res.childs.count() == 1){
			res = res.childs.item(0);
		}
		this.popRestoreToken();
		return res;
	}
	/**
	 * Retuns css hash 
	 * @param string 
	 * @return string hash
	 */
	getCssHash(s){
		var arr = "abcdefghijklmnopqrstuvwxyz1234567890";
		var arr_sz = 36;
		var arr_mod = 1679616;
		var sz = rs.strlen(s);
		var hash = 0;
		for (var i = 0; i < sz; i++){
			var ch = rs.ord(s[i]);
			hash = ((hash << 2) + ch) % arr_mod;
		}
		var res = "";
		var pos = 0;
		var c = 0;
		while (hash != 0 || pos < 4){
			c = hash % 36;
			hash = rtl.floor(hash / 36);
			res += arr[c];
			pos++
		}
		return res;
	}
	/**
	 * Read CSS Selector
	 */
	readCssSelector(){
		var s = "";
		s = this.current_token.readUntilVector((new Vector()).push(",").push("{"));
		var pos = 0;
		var sz = rs.strlen(s);
		while (pos < sz && s[pos] != " "){
			pos++
		}
		/* Get component name and postfix */
		var name = "";
		var postfix = "";
		if (pos == sz){
			name = s;
		}
		else {
			name = rs.substr(s, 0, pos);
			postfix = rs.substr(s, pos, sz - pos);
		}
		var hash = "-"+rtl.toString(this.getCssHash(rtl.toString(this.current_namespace)+"."+rtl.toString(this.current_class_name)));
		/*string hash = "-1";*/
		return rtl.toString(name)+rtl.toString(hash)+rtl.toString(postfix);
	}
	/**
	 * Add OpCode
	 * @return BaseOpCode
	 */
	readCssAddOpCode(current_op_code, s, new_op_code){
		if (s != ""){
			if (current_op_code == null){
				current_op_code = new OpString(s);
			}
			else {
				current_op_code = new OpConcat(current_op_code, new OpString(s));
			}
		}
		if (new_op_code != null){
			current_op_code = new OpConcat(current_op_code, new_op_code);
		}
		return current_op_code;
	}
	/**
	 * Read CSS
	 * @return BaseOpCode
	 */
	readCss(){
		this.matchNextToken("{");
		var op_code = null;
		var s = "";
		var look_str = this.current_token.lookString(1);
		var match_str = "}";
		var bracket_level = 0;
		var flag_is_media = false;
		var flag_is_css_body = false;
		/* Main loop */
		while (look_str != "" && !this.current_token.isEOF() && (look_str != match_str || look_str == "}" && bracket_level > 0)){
			var look = this.current_token.readChar();
			if (look == "$"){
				this.assignCurrentToken(this.current_token);
				this.pushToken(new ParserBayToken(this.context(), this));
				var name = this.readIdentifierName();
				op_code = this.readCssAddOpCode(op_code, s, new OpIdentifier(name));
				s = "";
				this.popRestoreToken();
			}
			else if (look == "." && !flag_is_media && !flag_is_css_body){
				s = rtl.toString(s)+"."+rtl.toString(this.readCssSelector());
			}
			else if (look != "\t" && look != "\n" && look != "\r"){
				s = rtl.toString(s)+rtl.toString(look);
			}
			if (look == "@" && this.current_token.lookString(5) == "media"){
				flag_is_media = true;
			}
			if (look == "{"){
				if (!flag_is_media){
					flag_is_css_body = true;
				}
				flag_is_media = false;
				bracket_level++
			}
			else if (look == "}"){
				flag_is_css_body = false;
				bracket_level--
			}
			look_str = this.current_token.lookString(1);
		}
		this.assignCurrentToken(this.current_token);
		op_code = this.readCssAddOpCode(op_code, s, null);
		this.matchNextToken("}");
		return op_code;
	}
	/**
	 * Read element
	 * @return BaseOpCode
	 */
	readExpressionElement(){
		if (this.findNextToken("<")){
			return this.readHtml();
		}
		else if (this.findNextToken("@") && this.next_token.lookString(3) == "css"){
			this.matchNextToken("@");
			this.matchNextToken("css");
			return this.readCss();
		}
		return super.readExpressionElement();
	}
	/**
	 * Reset parser to default settings
	 */
	resetParser(){
		super.resetParser();
	}
}
module.exports = TemplateParser;