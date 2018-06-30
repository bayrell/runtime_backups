"use strict;"
/*!
 *  Bayrell Common Library
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
class Pipe extends CoreObject{
	_init(){
		super._init();
		this.pipe = null;
	}
	/**
	 * Constructor
	 */
	constructor(){
		super();
		this.pipe = new Vector();
	}
	/**
	 * Constructor
	 */
	destructor(){
		super.destructor();
	}
	/**
	 * Add function to pipe
	 */
	then(f){
		this.pipe.push(f);
		return this;
	}
	/**
	 * Add function to pipe
	 */
	prepend(f){
		this.pipe.prepend(f);
		return this;
	}
	/**
	 * Prepend another pipe
	 */
	prependPipe(p){
		p.pipe.each((item) => {
			this.pipe.prepend(item);
		});
		return this;
	}
	/**
	 * Append another pipe
	 */
	appendPipe(p){
		p.pipe.each((item) => {
			this.pipe.append(item);
		});
		return this;
	}
	/**
	 * Run pipe of functions
	 * @param mixed obj - input value
	 * @return mixed - the result
	 */
	run(obj){
		return this.pipe.reduce((res, item) => {
			return item(res);
		}, obj);
	}
}
module.exports = Pipe;