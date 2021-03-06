"use strict;"
/*!
 *  Bayrell Runtime Library
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
var rtl = require('./rtl.js');
var Vector = require('../Types/Vector.js');

var isBrowser=function(){return typeof window !== "undefined" && this === window;}
class rs{
	_init(){
	}
	/**
	 * Returns string lenght
	 * @param string s The string
	 * @return int
	 */
	
	static strlen(s){
		if (isBrowser())
			return BayrellRtl.Lib.rtl.toString(s).length;
		return rtl.toString(s).length;
	}
	/**
	 * Returns substring
	 * @param string s The string
	 * @param int start
	 * @param int length
	 * @return string
	 */
	
	static substr(s, start, length){
		if (isBrowser())
			return BayrellRtl.Lib.rtl.toString(s).substring(start, start + length);
		return rtl.toString(s).substring(start, start + length);
	}
	/**
	 * Returns char from string at the position
	 * @param string s The string
	 * @param int pos The position
	 * @return string
	 */
	static charAt(s, pos){
		var sz = rs.strlen(s);
		if (pos >= 0 && pos < sz){
			return s[pos];
		}
		return "";
	}
	/**
	 * Returns ASCII symbol code
	 * @param char ch
	 */
	
	static ord(s){
		if (isBrowser())
			return BayrellRtl.Lib.rtl.toString(s).charCodeAt(0);
		return rtl.toString(s).charCodeAt(0);
	}
	/**
	 * Convert string to lower case
	 * @param string s 
	 * @return string
	 */
	
	static strtolower(s){
		if (isBrowser())
			return BayrellRtl.Lib.rtl.toString(s).toLowerCase();
		return rtl.toString(s).toLowerCase();
	}
	/**
	 * Convert string to upper case
	 * @param string s
	 * @return string
	 */
	
	static strtoupper(s){
		if (isBrowser())
			return BayrellRtl.Lib.rtl.toString(s).toUpperCase();
		return rtl.toString(s).toUpperCase();
	}
	/**
	 * Ищет позицию первого вхождения подстроки search в строке s.
	 * @param {string} s - строка, в которой производится поиск 
	 * @param {string} search - строка, которую ищем 
	 * @param {string} offset - если этот параметр указан, 
	 *                 то поиск будет начат с указанного количества символов с начала строки.  
	 * @return {variable} Если строка найдена, то возвращает позицию вхождения, начиная с 0.
	 *                    Если строка не найдена, то вернет -1
	 */
	
	static strpos(s, search, offset){
		var _rtl; if (isBrowser()) _rtl = BayrellRtl.Lib.rtl; else _rtl = rtl;
		if (!_rtl.exists(offset)) offset = 0;
		var res = _rtl.toString(s).indexOf(search);
		return res;
	}
	/**
	 * Возвращает повторяющуюся строку
	 * @param {string} s - повторяемая строка
	 * @param {integer} n - количество раз, которые нужно повторить строку s
	 * @return {string} строка
	 */
	
	static str_repeat(s, n){
		if (n <= 0) return "";
		var res = '';
		for (var i=0; i < n; i++){
			res += s;
		}
		return res;
	}
	/**
	 * Разбивает строку на подстроки
	 * @param string ch - разделитель
	 * @param string s - строка, которую нужно разбить
	 * @param integer limit - ограничение 
	 * @return Vector<string>
	 */
	
	static explode(delimiter, s, limit){
		var _rtl; if (isBrowser()) _rtl = BayrellRtl.Lib.rtl; else _rtl = rtl;
		var _Vector; if (isBrowser()) _Vector = BayrellRtl.Types.Vector; else _Vector = Vector;
		var arr = null;
		if (!_rtl.exists(limit))
			arr = s.split(delimiter);
		arr = s.split(delimiter, limit);
		return (new _Vector()).concat(arr);
	}
	/**
	 * Разбивает строку на подстроки
	 * @param string ch - разделитель
	 * @param string s - строка, которую нужно разбить
	 * @param integer limit - ограничение 
	 * @return Vector<string>
	 */
	
	static implode(ch, arr){
		return arr.join(ch);
	}
	/**
	 * Удаляет лишние символы слева и справа
	 * @param {string} s - входная строка
	 * @return {integer} новая строка
	 */
	
	static trim(s){
		if (isBrowser())
			return BayrellRtl.Lib.rtl.toString(s).trim();
		return rtl.toString(s).trim();
	}
	/**
	 * json encode
	 * @param {mixed} obj - объект
	 * @param {int} flags - Флаги
	 * @return {string} json строка
	 */
	
	static json_encode(obj, flags = 0){
		if (flags & 128 == 128) 
			return JSON.stringify(obj, null, 2);
		return JSON.stringify(obj);
	}
}
module.exports = rs;