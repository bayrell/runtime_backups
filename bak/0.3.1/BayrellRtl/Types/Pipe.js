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
var Vector = require('./Vector.js');
var CoreObject = require('../CoreObject.js');
class Pipe extends CoreObject{
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