"use strict;"
/*!
 *  Bayrell Runtime Library
 *
 *  (c) Copyright 2016-2019 "Ildar Bikmamatov" <support@bayrell.org>
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
var rtl = require('./rtl.js');
var KeyNotFound = require('./Exceptions/KeyNotFound.js');

var isBrowser=function(){return typeof window !== "undefined" && this === window;}

if (typeof Runtime == "undefined") Runtime = {};

Runtime.Dict = class extends Map
{
	
	/**
	 * Returns new Instance
	 * @return Object
	 */
	static createNewInstance(obj)
	{
		if (obj == undefined) obj = null;
		return new Runtime.Dict(obj);
	}
	
	
	
	/**
	 * Convert to dict
	 */
	toDict()
	{
		return new Runtime.Dict(this);
	}
	
	
	
	/**
	 * Convert to dict
	 */
	toMap()
	{
		var _Map = Runtime.Dict.getMap();
		return new _Map(this);
	}
	
	
	
	/**
	 * Returns copy of the current Dict
	 */
	copy()
	{
		return this.constructor.createNewInstance(this);
	}
	
	
	
	/**
	 * Correct items
	 */
	_correctItemsByType(type)
	{
		if (type == "mixed" || type == "primitive" || type == "var") return this;
		
		var obj = this.constructor.createNewInstance();
		var it = super.keys();
		var next = it.next();
		while (!next.done){
			var key = next.value;
			var val = super.get(key);
			if (isBrowser()) val = Runtime.rtl.correct(val, type, null);
			else val = rtl.correct(val, type, null);
			obj.set(key, val);
			next = it.next();
		}
		
		return obj;
	}
	
	
	
	/**
	 * Convert to string
	 * @param var value
	 * @return value
	 */
	toString(value){
		if (isBrowser()) return Runtime.rtl.toString(value);
		return rtl.toString(value);
	}
	
	
	
	/**
	 * Dict constructor
	 */
	constructor(map)
	{
		super();
		if (map != undefined && typeof map == 'object')
		{		
			if (map instanceof Runtime.Dict)
			{
				var keys = map.keys();
				keys.each(
					(key)=>{
						super.set(key, map.item(key));
					}
				);		
			}
			else
			{
				for (var i in map)
				{
					super.set(i, map[i]);
				}
			}
		}
		this.__uq__ = Symbol();
	}
	
	
	
	/**
	 * Return true if key exists
	 * @param T key
	 * @return bool var
	 */
	contains(key)
	{
		key = this.toString(key);
		return super.has(key);
	}
	
	
	
	/**
	 * Return true if key exists
	 * @param T key
	 * @return bool var
	 */
	has(key)
	{
		key = this.toString(key);
		return super.has(key);
	}
	
	
	
	/**
	 * Returns value from position
	 * @param T key
	 * @param T default_value
	 * @return T
	 */
	get(key, default_value, type_value = "mixed", type_template = "")
	{
		key = this.toString(key);
		var val = super.get(key);
		if (val == undefined) return default_value;
		if (isBrowser()) return Runtime.rtl.correct(val, type_value, default_value, type_template);
		return rtl.correct(val, type_value, default_value, type_template);
	}
	
	
	
	/**
	 * Returns value from position. Throw exception, if position does not exists
	 * @param T key - position
	 * @return T
	 */
	item(key)
	{
		key = this.toString(key);
		if (!super.has(key))
		{
			if (isBrowser()) throw new Runtime.Exceptions.KeyNotFound(key);
			throw new KeyNotFound(key);
		}
		var val = super.get(key);
		if (val === null || val == undefined) return null;
		return val;
	}
	
	
	
	/**
	 * Set value size_to position
	 * @param T pos - position
	 * @param T value 
	 */
	setIm(key, value)
	{
		key = this.toString(key);
		var res = this.copy();
		res.set(key, value);
		return res;
	}
	
	
	
	/**
	 * Remove value from position
	 * @param T key
	 */
	removeIm(key)
	{
		key = this.toString(key);
		if (super.has(key))
		{
			var res = this.copy();
			res.delete(key, value);
			return res;
		}
		return this;
	}
	
	
	
	/**
	 * Returns count items in vector
	 */
	count(){
		return this.size;
	}
	
	
	
	/**
	 * Returns vector of the keys
	 * @return Vector<T>
	 */
	keys()
	{
		var it = super.keys();
		var res = new Runtime.Collection();
		var next = it.next();
		while (!next.done)
		{
			res.push( next.value );
			next = it.next();
		}
		return res;
	}
	
	
	
	/**
	 * Returns vector of the values
	 * @return Vector<T>
	 */
	values()
	{
		var it = super.values();
		var res = new Runtime.Collection();
		var next = it.next();
		while (!next.done)
		{
			res.push( next.value );
			next = it.next();
		}
		return res;
	}
	
	
	
	/**
	 * Call function for each item
	 * @param func f
	 */
	each(f)
	{
		var keys = this.keys();
		keys.each(
			(key)=>{
				var value = this.item(key);
				f(key, value);
			}
		);
		return this;
	}
	
	
	
	/**
	 * Call function map
	 * @param func f
	 * @return Dict
	 */
	map(f)
	{
		var obj={};
		this.each(
			(key, value)=>{
				obj[key] = f(key, value);
			}
		);
		return this.constructor.createNewInstance(obj);
	}
	
	
	
	/**
	 * Filter items
	 * @param func f
	 * @return Dict
	 */
	filter(f)
	{
		var obj={};
		this.each(
			(key, value)=>{
				if (f(key, value))
				{
					obj[key] = value;
				}
			}
		);
		return this.constructor.createNewInstance(obj);
	}
	
	
	
	/**
	 * Reduce
	 * @param func f
	 * @param mixed init_value
	 * @return init_value
	 */
	reduce(f, init_value)
	{
		var res = init_value;
		this.each(
			(key, value) => {
				res = f(res, key, value);
			}
		);
		return res;
	}
	
	
	
	/**
	 * Add values from other map
	 * @param Dict<T, T> map
	 * @return self
	 */
	concat(map)
	{
		if (map != null)
		{
			var res = this.copy();
			map.each(
				(key)=>{
					res.set(key, map.item(key));
				}
			);
			return res;
		}
		return this;
	}
	
	
	
	/**
	 * Convert Dict to Object
	 */
	toObject(){
		var obj = {};
		this.each((key)=>{obj[key]=this.get(key, null);});
		return obj;
	}
	
	
	getClassName(){return "Runtime.Dict";}
	static getCurrentClassName(){return "Runtime.Dict";}
	static getParentClassName(){return "Map";}
	
}
Runtime.Dict.getMap = function(){ return require('./Map.js'); }
if (false){

module.exports = {
	"Dict": Runtime.Dict
}

}
else{

module.exports = Runtime.Dict;

}