"use strict;"
/* 
 * Bayrell
 * https://github.com/bayrell/bayrell
 * Copyright (c) 2016 Ildar Bikmamatov <vistoyn@gmail.com>
 * Licensed under the Bayrell license (http://bayrell.org/license/bayrell.html)
  */
var m__BayrellObject = require('./BayrellObject.js');
var BayrellObject = m__BayrellObject.BayrellObject;
var m__rtl = require('./rtl.js');
var rtl = m__rtl.rtl;
class BayrellListItem extends BayrellObject {
	constructor(){
		super();
		this._prev = null;
		this._next = null;
		this._data = null;
	}
}
module.exports.BayrellListItem = BayrellListItem;
