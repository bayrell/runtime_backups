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
var IndexOutOfRange = require('./Exceptions/IndexOutOfRange.js');

var isBrowser=function(){return typeof window !== "undefined" && this === window;}

if (typeof Runtime == "undefined") Runtime = {};

Runtime.Collection = class extends Array{
	
	
	/**
	 * Correct items
	 */
	_correctItemsByType(type){
		var arr = this.slice();
		for (var i=0; i<arr.length; i++)
		{
			if (isBrowser()) arr[i] = Runtime.rtl.correct(arr[i], type, null);
			else arr[i] = rtl.correct(arr[i], type, null);
		}
		return arr;
	}
	
	
	
	/**
	 * Returns new Instance
	 */
	createNewInstance(){
		if (isBrowser()) return new Runtime.Collection();
		return new Collection();
	}
	
	
	
	/**
	 * Assign all data from other object
	 * @param Collection obj
	 */
	assignObject(obj){
		this.clear();
		obj.each((item)=>{
			if (isBrowser()) this.push( Runtime.rtl._clone(item) );
			else this.push( rtl._clone(item) );
		});
	}
	
	
	
	/**
	 * Append value to the end of array
	 * @param T value
	 */
	push(value){
		/*Array.prototype.push.call(this, value);*/
		super.push(value);
		return this;
	}
	
	
	
	/**
	 * Insert first value size_to array
	 * @return T value
	 */
	unshift(value){
		super.unshift(value);
		return this;
	}
	
	
	
	/**
	 * Extract last value from array
	 * @return T value
	 */
	pop(){
		return super.pop();
	}
	
	
	
	/**
	 * Extract first value from array
	 * @return T value
	 */
	shift(){
		return super.shift();
	}
	
	
	
	/**
	 * Find value in array
	 * @param T value
	 * @return  int
	 */
	indexOf(value){
		for (var i=0; i<this.count(); i++){
			if (this[i] == value)
				return i;
		}
		return -1;
	}
	
	
	
	/**
	 * Find value in array in range pos_begin <= pos <= pos_end, and returns position. 
	 * @param T value
	 * @param int pos_begin - begin position
	 * @param int pos_end - end position
	 * @return int - position
	 */
	indexOfRange(value, pos_begin, pos_end){
		var pos = super.indexOf(value, pos_begin);
		if (pos == -1 || pos > pos_end)
			return -1;
		return pos;
	}
	
	
	
	/**
	 * Insert value size_to position
	 * @param T value
	 * @param int pos - position
	 */
	insert(pos, value){
		super.splice(pos, 0, value);
		return this;
	}
	
	
	
	/**
	 * Remove value from position
	 * @param int pos - position
	 */
	remove(pos, count){
		if (count == undefined) count = 1;
		super.splice(pos, count);
		return this;
	}
	
	
	
	/**
	 * Remove range
	 * @param int pos_begin - start position
	 * @param int pos_end - end position
	 */
	removeRange(pos_begin, pos_end){
		super.splice(pos_begin, pos_end - pos_begin + 1);
		return this;
	}
	
	
	
	/**
	 * Returns value from position
	 * @param int pos - position
	 */
	get(pos, default_value){
		if (pos < 0 || pos >= this.length)
			return default_value;
		return this[pos];
	}
	
	
	
	/**
	 * Returns value from position. Throw exception, if position does not exists
	 * @param int pos - position
	 */
	item(pos){
		if (pos < 0 || pos >= this.length){
			if (isBrowser()) throw new Runtime.Exceptions.IndexOutOfRange();
			throw new IndexOutOfRange();
		}
		return this[pos];
	}
	
	
	
	/**
	 * Set value size_to position
	 * @param int pos - position
	 * @param T value 
	 */
	set(pos, value){
		if (pos < 0 || pos >= this.length){
			if (isBrowser()) throw new Runtime.Exceptions.IndexOutOfRange();
			throw new IndexOutOfRange();
		}
		this[pos] = value;
		return this;
	}
	
	
	
	/**
	 * Clear all values from vector
	 */
	clear(){
		super.splice(0, this.length);
		return this;
	}
	
	
	
	/**
	 * Returns count items in vector
	 */
	count(){
		return this.length;
	}
	
	
	
	/**
	 * Append value to the end of the vector
	 * @param T value
	 */
	append(value){
		this.push(value);
		return this;
	}
	
	
	
	/**
	 * Insert first value to the begin of the vector
	 * @return T value
	 */
	prepend(value){
		this.unshift(value);
		return this;
	}
	
	
	
	/**
	 * Append vector to the end of the vector
	 * @param Collection<T> arr
	 */
	appendVector(arr){
		if (!arr) return this;
		for (var i=0; i<arr.length; i++) super.push(arr[i]);
		return this;
	}
	
	
	
	/**
	 * Prepend vector to the begin of the vector
	 * @param Collection<T> arr
	 */
	prependVector(arr){
		for (var i=0; i<arr.length; i++) super.unshift(arr[i]);
		return this;
	}
	
	
	
	/**
	 * Get last item
	 */
	getLastItem(default_value, pos){
		if (pos == undefined) pos = -1;
		if (this.length == 0)
			return default_value;
		if (this.length + pos + 1 == 0)
			return default_value;	
		return this[this.length + pos];
	}
	last(default_value, pos){
		if (pos == undefined) pos = -1;
		return this.getLastItem(default_value, pos); 
	}
	
	
	
	/**
	 * Remove value
	 */
	removeValue(value){
		var index = this.indexOf(value);
		if (index != -1)
			this.remove(index, 1);
		return this;
	}
	
	
	
	/**
	 * Remove value
	 */
	removeItem(value){
		var index = this.indexOf(value);
		if (index != -1)
			this.remove(index, 1);
		return this;
	}
	
	
	
	/**
	 * Remove values
	 */
	removeItems(values)
	{
		for (var i=0; i<values.count(); i++)
		{
			this.removeItem( values.item(i) );
		}
		return this;
	}
	
	
	
	/**
	 * Map
	 * @param func f
	 * @return Collection
	 */
	map(f){
		return super.map(f);
	}
	
	
	
	/**
	 * Filter items
	 * @param func f
	 * @return Collection
	 */
	filter(f){
		return super.filter(f);
	}
	
	
	
	/**
	 * Reduce
	 * @param func f
	 * @param mixed init_value
	 * @return init_value
	 */
	reduce(f, init_value){
		return super.reduce(f, init_value);
	}
	
	
	
	/**
	 * Call function for each item
	 * @param func f
	 */
	each(f){
		super.forEach(f);
		return this;
	}
	
	
	
	/**
	 * Each item recursive
	 * @param func f
	 * @param func childs Returns childs items
	 * @param func kind. 1 - Node item first, -1 - Node item last
	 */
	recurse(f, childs, kind)
	{
		if (kind == undefined) kind=1;
		return this;
	}
	
	
	
	/**
	 * Returns Collection
	 * @param Collection<T> arr
	 * @return Collection<T>
	 */
	concat(arr){
		if (arr == null && arr == undefined){
			return super.slice();
		}
		return super.concat(arr);
	}
	
	
	
	/**
	 * Returns Collection
	 * @param int offset begin
	 * @param int length end
	 * @return Collection<T>
	 */
	slice(offset, length){
		if (length == undefined){
			return super.slice(offset);
		}
		if (length >= 0){
			length = this.count() - offset + length - 1;
		}
		return super.slice(offset, length);
	}
	
	
	
	/**
	 * Copy Collection
	 * @return Collection<T>
	 */
	copy(){
		return super.slice();
	}
	
	
	
	/**
	 * Reverse array
	 */
	reverse(){
		super.reverse();
		return this;
	}
	
	
	
	/**
	 * Returns sorted vector
	 * @param func f - Sort user function
	 */
	sort(f){
		if (f == undefined) super.sort();
		super.sort(f);
		return this;
	}
	
	
	
	/**
	 * Swap item1 to item2
	 * @params int index1 - item1 position
	 * @params int index2 - item2 position. If index2 = -1, insert as last item
	 */
	swap(index1, index2){
		if (index2 < 0){
			index2 += this.length;
		}
		var item1 = this.item(index1);
		if (index2 == -1){
			this.remove(index1, 1);
			this.push(item1);
		}
		else if (index1 > index2){
			var item2 = this.item(index2);
			this.insert(index1, item2);
			this.remove(index1 + 1, 1);	
			this.insert(index2, item1);
			this.remove(index2 + 1, 1);
		}
		else if (index1 < index2){
			var item2 = this.item(index2);
			this.insert(index2, item1);
			this.remove(index2 + 1, 1);
			this.insert(index1, item2);
			this.remove(index1 + 1, 1);			
		}
		return this;
	}
	
	
	/**
	 * Remove dublicate values
	 */
	removeDublicates(){
		var arr = this.copy();
		this.clear();		
		for (var i=0; i<arr.length; i++){
			if (this.indexOf(arr[i]) == -1){
				this.push(arr[i]);
			}
		}
		return this;
	}
}
if (false){

module.exports = {
	"Collection": Runtime.Collection
}

}
else{

module.exports = Runtime.Collection;

}