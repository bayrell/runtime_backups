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
var rtl = require('bayrell-runtime-nodejs').rtl;
var rs = require('bayrell-runtime-nodejs').rs;
var Map = require('bayrell-runtime-nodejs').Map;
var Dict = require('bayrell-runtime-nodejs').Dict;
var Vector = require('bayrell-runtime-nodejs').Vector;
var Collection = require('bayrell-runtime-nodejs').Collection;
var IntrospectionInfo = require('bayrell-runtime-nodejs').IntrospectionInfo;
var UIStruct = require('bayrell-runtime-nodejs').UIStruct;
var ParserToken = require('./Parser/ParserToken.js');
var CoreParser = require('./Parser/CoreParser.js');
var HexNumberExpected = require('./Exceptions/HexNumberExpected.js');
var BaseOpCode = require('./OpCodes/BaseOpCode.js');
class CommonParser extends CoreParser{
	/**
	 * Return true if char is alfa symbol
	 * @param char ch
	 * @return boolean
	 */
	isLetterChar(ch){
		return rs.strpos("qazwsxedcrfvtgbyhnujmikolp", rs.strtolower(ch)) !== -1;
	}
	/**
	 * Return true if char is number
	 * @param char ch
	 * @return boolean
	 */
	isNumChar(ch){
		return rs.strpos("0123456789", ch) !== -1;
	}
	/**
	 * Return true if char is number
	 * @param char ch
	 * @return boolean
	 */
	isHexChar(ch){
		return rs.strpos("0123456789abcdef", rs.strtolower(ch)) !== -1;
	}
	/**
	 * Return true if string is alfa string
	 * @param string ch
	 * @return boolean
	 */
	isLetterString(s){
		var sz = rs.strlen(s);
		for (var i = 0; i < sz; i++){
			if (!this.isLetterChar(s[i])){
				return false;
			}
		}
		return true;
	}
	/**
	 * Return true if string is number
	 * @param string ch
	 * @return boolean
	 */
	isNumString(s){
		var sz = rs.strlen(s);
		for (var i = 0; i < sz; i++){
			if (!this.isNumChar(s[i])){
				return false;
			}
		}
		return true;
	}
	/**
	 * Return true if string is number
	 * @param string ch
	 * @return boolean
	 */
	isHexStringBegin(s){
		var sz = rs.strlen(s);
		if (sz < 2){
			return false;
		}
		if (s[0] == "0" && (s[1] == "x" || s[1] == "X")){
			return true;
		}
		return false;
	}
	/**
	 * Return true if string is number
	 * @param string ch
	 * @return boolean
	 */
	isHexString(s){
		var sz = rs.strlen(s);
		if (sz < 2){
			return false;
		}
		if (s[0] == "0" && (s[1] == "x" || s[1] == "X")){
			for (var i = 2; i < sz; i++){
				if (!this.isHexChar(s[i])){
					return false;
				}
			}
			return true;
		}
		return false;
	}
	/**
	 * Return true if string is alfa string
	 * @param string ch
	 * @return boolean
	 */
	isSymbolOrNumString(s){
		var sz = rs.strlen(s);
		for (var i = 0; i < sz; i++){
			if (!this.isAlphaChar(s[i]) && !this.isNumChar(s[i])){
				return false;
			}
		}
		return true;
	}
	/**
	 * Return if next token is number
	 * @return boolean
	 */
	isNextTokenNumber(){
		return this.isNumString(this.next_token.token) && this.next_token.tp == ParserToken.TOKEN_BASE;
	}
	/**
	 * Return if next token is number
	 * @return boolean
	 */
	isNextTokenHexNumber(){
		return this.isHexString(this.next_token.token) && this.next_token.tp == ParserToken.TOKEN_BASE;
	}
	/**
	 * Return if next token is alfa string
	 * @return boolean
	 */
	isNextTokenLetters(){
		return this.isLetterString(this.next_token.token) && this.next_token.tp == ParserToken.TOKEN_BASE;
	}
	/**
	 * Check next string is number
	 * @return {string} number
	 */
	matchDouble(){
		var sign = "";
		if (this.findNextToken("+")){
			this.matchNextToken("+");
		}
		else if (this.findNextToken("-")){
			this.matchNextToken("-");
			sign = "-";
		}
		if (!this.isNextTokenNumber()){
			throw this.nextTokenExpected("number");
		}
		var value = this.readNextToken().token;
		if (this.findNextToken(".")){
			this.matchNextToken(".");
			if (!this.isNextTokenNumber()){
				throw this.nextTokenExpected("double");
			}
			value += "."+rtl.toString(this.readNextToken().token);
		}
		if (sign == "-"){
			return "-"+rtl.toString(value);
		}
		return value;
	}
	/**
	 * Check next string is number
	 * @return {string} number
	 */
	matchHexNumber(){
		var sign = "";
		if (this.findNextToken("+")){
			this.matchNextToken("+");
		}
		else if (this.findNextToken("-")){
			this.matchNextToken("-");
			sign = "-";
		}
		if (!this.isNextTokenHexNumber()){
			if (this.lookNextTokenType() == ParserToken.TOKEN_BASE && this.isHexStringBegin(this.lookNextToken())){
				var start_line = this.next_token.start_line;
				var start_col = this.next_token.start_col;
				throw new HexNumberExpected(start_line, start_col, this.context());
			}
			else {
				throw this.nextTokenExpected(this.translate("ERROR_PARSER_HEX_NUMBER_EXPECTED"));
			}
		}
		return rtl.toString(sign)+rtl.toString(this.readNextToken().token);
	}
	/**
	 * Returns abstract syntax tree
	 */
	getAST(){
		return this._result;
	}
	/**
	 * Parser function
	 */
	runParser(){
		this._result = null;
	}
	/* ======================= Class Init Functions ======================= */
	getClassName(){return "BayrellLang.CommonParser";}
	static getCurrentNamespace(){return "BayrellLang";}
	static getCurrentClassName(){return "BayrellLang.CommonParser";}
	static getParentClassName(){return "BayrellLang.Parser.CoreParser";}
	_init(){
		super._init();
		var names = Object.getOwnPropertyNames(this);
		this._result = null;
		this.skip_comments = false;
	}
	static getFieldsList(names, flag){
		if (flag==undefined)flag=0;
	}
	static getFieldInfoByName(field_name){
		return null;
	}
	static getMethodsList(names){
	}
	static getMethodInfoByName(method_name){
		return null;
	}
}
module.exports = CommonParser;