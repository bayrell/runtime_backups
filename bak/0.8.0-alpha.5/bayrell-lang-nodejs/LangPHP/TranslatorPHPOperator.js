"use strict;"
var use = require('bayrell').use;
/*!
 *  Bayrell Language
 *
 *  (c) Copyright 2016-2019 "Ildar Bikmamatov" <support@bayrell.org>
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
if (typeof Bayrell == 'undefined') Bayrell = {};
if (typeof Bayrell.Lang == 'undefined') Bayrell.Lang = {};
if (typeof Bayrell.Lang.LangPHP == 'undefined') Bayrell.Lang.LangPHP = {};
Bayrell.Lang.LangPHP.TranslatorPHPOperator = function()
{
};
Object.assign(Bayrell.Lang.LangPHP.TranslatorPHPOperator.prototype,
{
	getClassName: function()
	{
		return "Bayrell.Lang.LangPHP.TranslatorPHPOperator";
	},
});
Object.assign(Bayrell.Lang.LangPHP.TranslatorPHPOperator,
{
	/**
	 * OpAssign
	 */
	OpAssignStruct: function(t,op_code,pos)
	{
		if (pos == undefined) pos = 0;
		if (op_code.names.count() <= pos)
		{
			return t.expression.constructor.Expression(t, op_code.expression);
		}
		var names = op_code.names.slice(0, pos).unshiftIm(op_code.var_name);
		var _v0 = use("Runtime.rs");
		var s = "$" + use("Runtime.rtl").toString(_v0.join("->", names));
		var name = op_code.names.item(pos);
		var res = this.OpAssignStruct(t, op_code, pos + 1);
		t = res[0];
		s += use("Runtime.rtl").toString("->copy([\"" + use("Runtime.rtl").toString(name) + use("Runtime.rtl").toString("\"=>") + use("Runtime.rtl").toString(res[1]) + use("Runtime.rtl").toString("])"));
		return use("Runtime.Collection").create([t,s]);
	},
	/**
	 * OpAssign
	 */
	OpAssign: function(t,op_code,flag_indent)
	{
		if (flag_indent == undefined) flag_indent = true;
		var content = "";
		var _v0 = use("Bayrell.Lang.OpCodes.OpAssign");
		var _v1 = use("Bayrell.Lang.OpCodes.OpAssign");
		var _v2 = use("Bayrell.Lang.OpCodes.OpAssign");
		if (op_code.kind == _v0.KIND_ASSIGN || op_code.kind == _v1.KIND_DECLARE)
		{
			for (var i = 0;i < op_code.values.count();i++)
			{
				var s = "";
				var op = "=";
				var item = op_code.values.item(i);
				if (item.expression == null)
				{
					continue;
				}
				var _v2 = use("Bayrell.Lang.OpCodes.OpAssign");
				if (op_code.kind == _v2.KIND_DECLARE)
				{
					s = "$" + use("Runtime.rtl").toString(item.var_name);
				}
				else
				{
					var res = t.expression.constructor.Dynamic(t, item.op_code);
					t = res[0];
					s = res[1];
					op = item.op;
				}
				if (item.expression != null)
				{
					var res = t.expression.constructor.Expression(t, item.expression);
					t = res[0];
					if (op == "~=")
					{
						s += use("Runtime.rtl").toString(" .= " + use("Runtime.rtl").toString(t.expression.constructor.rtlToStr(t, res[1])));
					}
					else
					{
						s += use("Runtime.rtl").toString(" " + use("Runtime.rtl").toString(op) + use("Runtime.rtl").toString(" ") + use("Runtime.rtl").toString(res[1]));
					}
				}
				content += use("Runtime.rtl").toString((flag_indent) ? t.s(s + use("Runtime.rtl").toString(";")) : s + use("Runtime.rtl").toString(";"));
				if (item.var_name != "" && t.save_vars.indexOf(item.var_name) == -1)
				{
					t = t.copy({ "save_vars": t.save_vars.pushIm(item.var_name) });
				}
			}
		}
		else if (op_code.kind == _v2.KIND_STRUCT)
		{
			var s = "$" + use("Runtime.rtl").toString(op_code.var_name) + use("Runtime.rtl").toString(" = ");
			var res = this.OpAssignStruct(t, op_code, 0);
			t = res[0];
			content = t.s(s + use("Runtime.rtl").toString(res[1]) + use("Runtime.rtl").toString(";"));
		}
		return use("Runtime.Collection").create([t,content]);
	},
	/**
	 * OpDelete
	 */
	OpDelete: function(t,op_code)
	{
		var content = "";
		return use("Runtime.Collection").create([t,content]);
	},
	/**
	 * OpFor
	 */
	OpFor: function(t,op_code)
	{
		var content = "";
		var s1 = "";
		var s2 = "";
		var s3 = "";
		var _v0 = use("Bayrell.Lang.OpCodes.OpAssign");
		if (op_code.expr1 instanceof _v0)
		{
			var res = this.OpAssign(t, op_code.expr1, false);
			t = res[0];
			s1 = res[1];
		}
		else
		{
			var res = t.expression.constructor.Expression(t, op_code.expr1);
			t = res[0];
			s1 = res[1];
		}
		var res = t.expression.constructor.Expression(t, op_code.expr2);
		t = res[0];
		s2 = res[1];
		var res = t.expression.constructor.Expression(t, op_code.expr3);
		t = res[0];
		s3 = res[1];
		content = t.s("for (" + use("Runtime.rtl").toString(s1) + use("Runtime.rtl").toString(s2) + use("Runtime.rtl").toString(";") + use("Runtime.rtl").toString(s3) + use("Runtime.rtl").toString(")"));
		content += use("Runtime.rtl").toString(t.s("{"));
		t = t.levelInc();
		var res = this.Operators(t, op_code.value);
		t = res[0];
		content += use("Runtime.rtl").toString(res[1]);
		t = t.levelDec();
		content += use("Runtime.rtl").toString(t.s("}"));
		return use("Runtime.Collection").create([t,content]);
	},
	/**
	 * OpIf
	 */
	OpIf: function(t,op_code)
	{
		var content = "";
		var res = t.expression.constructor.Expression(t, op_code.condition);
		t = res[0];
		var s1 = res[1];
		content = t.s("if (" + use("Runtime.rtl").toString(s1) + use("Runtime.rtl").toString(")"));
		content += use("Runtime.rtl").toString(t.s("{"));
		t = t.levelInc();
		var res = this.Operators(t, op_code.if_true);
		t = res[0];
		content += use("Runtime.rtl").toString(res[1]);
		t = t.levelDec();
		content += use("Runtime.rtl").toString(t.s("}"));
		for (var i = 0;i < op_code.if_else.count();i++)
		{
			var if_else = op_code.if_else.item(i);
			var res = t.expression.constructor.Expression(t, if_else.condition);
			t = res[0];
			var s2 = res[1];
			content += use("Runtime.rtl").toString(t.s("else if (" + use("Runtime.rtl").toString(s2) + use("Runtime.rtl").toString(")")));
			content += use("Runtime.rtl").toString(t.s("{"));
			t = t.levelInc();
			var res = this.Operators(t, if_else.if_true);
			t = res[0];
			content += use("Runtime.rtl").toString(res[1]);
			t = t.levelDec();
			content += use("Runtime.rtl").toString(t.s("}"));
		}
		if (op_code.if_false != null)
		{
			content += use("Runtime.rtl").toString(t.s("else"));
			content += use("Runtime.rtl").toString(t.s("{"));
			t = t.levelInc();
			var res = this.Operators(t, op_code.if_false);
			t = res[0];
			content += use("Runtime.rtl").toString(res[1]);
			t = t.levelDec();
			content += use("Runtime.rtl").toString(t.s("}"));
		}
		return use("Runtime.Collection").create([t,content]);
	},
	/**
	 * OpReturn
	 */
	OpReturn: function(t,op_code)
	{
		var content = "";
		var s1 = "";
		if (op_code.expression)
		{
			var res = t.expression.constructor.Expression(t, op_code.expression);
			t = res[0];
			s1 = res[1];
		}
		if (t.current_function.flags != null && t.current_function.flags.isFlag("memorize"))
		{
			var content = "$__memorize_value = " + use("Runtime.rtl").toString(s1) + use("Runtime.rtl").toString(";");
			content += use("Runtime.rtl").toString(t.s(t.expression.constructor.getModuleName(t, "Runtime.rtl") + use("Runtime.rtl").toString("::_memorizeSave(\"") + use("Runtime.rtl").toString(t.current_class_full_name) + use("Runtime.rtl").toString(".") + use("Runtime.rtl").toString(t.current_function.name) + use("Runtime.rtl").toString("\", func_get_args(), $__memorize_value);")));
			content += use("Runtime.rtl").toString(t.s("return $__memorize_value;"));
			return use("Runtime.Collection").create([t,content]);
		}
		content += use("Runtime.rtl").toString(t.s("return " + use("Runtime.rtl").toString(s1) + use("Runtime.rtl").toString(";")));
		return use("Runtime.Collection").create([t,content]);
	},
	/**
	 * OpThrow
	 */
	OpThrow: function(t,op_code)
	{
		var res = t.expression.constructor.Expression(t, op_code.expression);
		t = res[0];
		var content = t.s("throw " + use("Runtime.rtl").toString(res[1]) + use("Runtime.rtl").toString(";"));
		return use("Runtime.Collection").create([t,content]);
	},
	/**
	 * OpTryCatch
	 */
	OpTryCatch: function(t,op_code)
	{
		var content = "";
		content += use("Runtime.rtl").toString(t.s("try"));
		content += use("Runtime.rtl").toString(t.s("{"));
		t = t.levelInc();
		var res = this.Operators(t, op_code.op_try);
		t = res[0];
		content += use("Runtime.rtl").toString(t.s(res[1]));
		t = t.levelDec();
		content += use("Runtime.rtl").toString(t.s("}"));
		content += use("Runtime.rtl").toString(t.s("catch (\\Exception $_ex)"));
		content += use("Runtime.rtl").toString(t.s("{"));
		t = t.levelInc();
		for (var i = 0;i < op_code.items.count();i++)
		{
			var s = "";
			var pattern = "";
			var item = op_code.items.item(i);
			var res = t.expression.constructor.OpTypeIdentifier(t, item.pattern);
			t = res[0];
			pattern += use("Runtime.rtl").toString(res[1]);
			if (pattern != "\\var")
			{
				s = "if ($_ex instanceof " + use("Runtime.rtl").toString(pattern) + use("Runtime.rtl").toString(")");
			}
			else
			{
				s = "";
			}
			var flag = true;
			if (s == "")
			{
				flag = false;
			}
			if (flag || i > 0)
			{
				s += use("Runtime.rtl").toString(t.s("{"));
				t = t.levelInc();
			}
			s += use("Runtime.rtl").toString((s != "") ? t.s("$" + use("Runtime.rtl").toString(item.name) + use("Runtime.rtl").toString(" = $_ex;")) : "$" + use("Runtime.rtl").toString(item.name) + use("Runtime.rtl").toString(" = $_ex;"));
			var res = this.Operators(t, item.value);
			t = res[0];
			s += use("Runtime.rtl").toString(res[1]);
			if (flag || i > 0)
			{
				t = t.levelDec();
				s += use("Runtime.rtl").toString(t.s("}"));
			}
			if (i != 0)
			{
				s = "else " + use("Runtime.rtl").toString(s);
			}
			content += use("Runtime.rtl").toString(t.s(s));
		}
		t = t.levelDec();
		content += use("Runtime.rtl").toString(t.s("}"));
		return use("Runtime.Collection").create([t,content]);
	},
	/**
	 * OpWhile
	 */
	OpWhile: function(t,op_code)
	{
		var content = "";
		var res = t.expression.constructor.Expression(t, op_code.condition);
		t = res[0];
		var s1 = res[1];
		content += use("Runtime.rtl").toString(t.s("while (" + use("Runtime.rtl").toString(s1) + use("Runtime.rtl").toString(")")));
		content += use("Runtime.rtl").toString(t.s("{"));
		t = t.levelInc();
		var res = this.Operators(t, op_code.value);
		t = res[0];
		content += use("Runtime.rtl").toString(res[1]);
		t = t.levelDec();
		content += use("Runtime.rtl").toString(t.s("}"));
		return use("Runtime.Collection").create([t,content]);
	},
	/**
	 * OpPreprocessorIfCode
	 */
	OpPreprocessorIfCode: function(t,op_code)
	{
		var content = "";
		if (t.preprocessor_flags.has(op_code.condition.value))
		{
			var _v0 = use("Runtime.rs");
			content = _v0.trim(op_code.content);
		}
		return use("Runtime.Collection").create([t,content]);
	},
	/**
	 * OpComment
	 */
	OpComment: function(t,op_code)
	{
		var content = t.s("/*" + use("Runtime.rtl").toString(op_code.value) + use("Runtime.rtl").toString("*/"));
		return use("Runtime.Collection").create([t,content]);
	},
	/**
	 * OpComments
	 */
	OpComments: function(t,comments)
	{
		var content = "";
		for (var i = 0;i < comments.count();i++)
		{
			var res = this.OpComment(t, comments.item(i));
			content += use("Runtime.rtl").toString(res[1]);
		}
		return use("Runtime.Collection").create([t,content]);
	},
	/**
	 * OpComments
	 */
	AddComments: function(t,comments,content)
	{
		if (comments && comments.count() > 0)
		{
			var res = this.OpComments(t, comments);
			var s = res[1];
			if (s != "")
			{
				content = s + use("Runtime.rtl").toString(content);
			}
		}
		return use("Runtime.Collection").create([t,content]);
	},
	/**
	 * Operator
	 */
	Operator: function(t,op_code)
	{
		var content = "";
		/* Clear save op codes */
		var save_op_codes = t.save_op_codes;
		var save_op_code_inc = t.save_op_code_inc;
		var _v0 = use("Bayrell.Lang.OpCodes.OpAssign");
		var _v1 = use("Bayrell.Lang.OpCodes.OpAssignStruct");
		var _v2 = use("Bayrell.Lang.OpCodes.OpBreak");
		var _v3 = use("Bayrell.Lang.OpCodes.OpCall");
		var _v4 = use("Bayrell.Lang.OpCodes.OpContinue");
		var _v5 = use("Bayrell.Lang.OpCodes.OpDelete");
		var _v6 = use("Bayrell.Lang.OpCodes.OpFor");
		var _v7 = use("Bayrell.Lang.OpCodes.OpIf");
		var _v8 = use("Bayrell.Lang.OpCodes.OpReturn");
		var _v9 = use("Bayrell.Lang.OpCodes.OpThrow");
		var _v10 = use("Bayrell.Lang.OpCodes.OpTryCatch");
		var _v11 = use("Bayrell.Lang.OpCodes.OpWhile");
		var _v12 = use("Bayrell.Lang.OpCodes.OpInc");
		var _v13 = use("Bayrell.Lang.OpCodes.OpPreprocessorIfCode");
		var _v14 = use("Bayrell.Lang.OpCodes.OpPreprocessorSwitch");
		var _v15 = use("Bayrell.Lang.OpCodes.OpComment");
		if (op_code instanceof _v0)
		{
			var res = this.OpAssign(t, op_code);
			t = res[0];
			var arr = res[1];
			/* Output save op code */
			var save = t.constructor.outputSaveOpCode(t, save_op_codes.count());
			if (save != "")
			{
				content = save + use("Runtime.rtl").toString(content);
			}
			t = t.copy({ "save_op_codes": save_op_codes });
			t = t.copy({ "save_op_code_inc": save_op_code_inc });
			return use("Runtime.Collection").create([t,arr]);
		}
		else if (op_code instanceof _v1)
		{
			var res = this.OpAssignStruct(t, op_code);
			t = res[0];
			var s1 = res[1];
			/* Output save op code */
			var save = t.constructor.outputSaveOpCode(t, save_op_codes.count());
			if (save != "")
			{
				content = save;
			}
			content += use("Runtime.rtl").toString(t.s("$" + use("Runtime.rtl").toString(op_code.var_name) + use("Runtime.rtl").toString(" = ") + use("Runtime.rtl").toString(s1) + use("Runtime.rtl").toString(";")));
			t = t.copy({ "save_op_codes": save_op_codes });
			t = t.copy({ "save_op_code_inc": save_op_code_inc });
			return use("Runtime.Collection").create([t,content]);
		}
		else if (op_code instanceof _v2)
		{
			content = t.s("break;");
		}
		else if (op_code instanceof _v3)
		{
			var res = t.expression.constructor.OpCall(t, op_code);
			t = res[0];
			content = t.s(res[1] + use("Runtime.rtl").toString(";"));
		}
		else if (op_code instanceof _v4)
		{
			content = t.s("continue;");
		}
		else if (op_code instanceof _v5)
		{
			var res = this.OpDelete(t, op_code);
			t = res[0];
			content = res[1];
		}
		else if (op_code instanceof _v6)
		{
			var res = this.OpFor(t, op_code);
			t = res[0];
			content = res[1];
		}
		else if (op_code instanceof _v7)
		{
			var res = this.OpIf(t, op_code);
			t = res[0];
			content = res[1];
		}
		else if (op_code instanceof _v8)
		{
			var res = this.OpReturn(t, op_code);
			t = res[0];
			content = res[1];
		}
		else if (op_code instanceof _v9)
		{
			var res = this.OpThrow(t, op_code);
			t = res[0];
			content = res[1];
		}
		else if (op_code instanceof _v10)
		{
			var res = this.OpTryCatch(t, op_code);
			t = res[0];
			content = res[1];
		}
		else if (op_code instanceof _v11)
		{
			var res = this.OpWhile(t, op_code);
			t = res[0];
			content = res[1];
		}
		else if (op_code instanceof _v12)
		{
			var res = t.expression.constructor.OpInc(t, op_code);
			t = res[0];
			content = t.s(res[1] + use("Runtime.rtl").toString(";"));
		}
		else if (op_code instanceof _v13)
		{
			var res = this.OpPreprocessorIfCode(t, op_code);
			t = res[0];
			content = res[1];
		}
		else if (op_code instanceof _v14)
		{
			for (var i = 0;i < op_code.items.count();i++)
			{
				var res = this.OpPreprocessorIfCode(t, op_code.items.item(i));
				var s = res[1];
				if (s == "")
				{
					continue;
				}
				content += use("Runtime.rtl").toString(s);
			}
		}
		else if (op_code instanceof _v15)
		{
			var res = this.OpComment(t, op_code);
			t = res[0];
			content = res[1];
		}
		/* Output save op code */
		var save = t.constructor.outputSaveOpCode(t, save_op_codes.count());
		if (save != "")
		{
			content = save + use("Runtime.rtl").toString(content);
		}
		/* Restore save op codes */
		t = t.copy({ "save_op_codes": save_op_codes });
		t = t.copy({ "save_op_code_inc": save_op_code_inc });
		return use("Runtime.Collection").create([t,content]);
	},
	/**
	 * Operators
	 */
	Operators: function(t,op_code)
	{
		var content = "";
		var f1 = (op_code) => 
		{
			var _v0 = use("Bayrell.Lang.OpCodes.OpBreak");
			var _v1 = use("Bayrell.Lang.OpCodes.OpCall");
			var _v2 = use("Bayrell.Lang.OpCodes.OpContinue");
			var _v3 = use("Bayrell.Lang.OpCodes.OpReturn");
			var _v4 = use("Bayrell.Lang.OpCodes.OpThrow");
			return op_code instanceof _v0 || op_code instanceof _v1 || op_code instanceof _v2 || op_code instanceof _v3 || op_code instanceof _v4;
		};
		var _v0 = use("Bayrell.Lang.OpCodes.OpItems");
		if (op_code instanceof _v0)
		{
			for (var i = 0;i < op_code.items.count();i++)
			{
				var item = op_code.items.item(i);
				var res = this.Operator(t, item);
				t = res[0];
				content += use("Runtime.rtl").toString(res[1]);
			}
		}
		else
		{
			var res = this.Operator(t, op_code);
			t = res[0];
			content += use("Runtime.rtl").toString(res[1]);
		}
		return use("Runtime.Collection").create([t,content]);
	},
	/**
	 * OpDeclareFunction Arguments
	 */
	OpDeclareFunctionArgs: function(t,f)
	{
		var content = "";
		if (f.args != null)
		{
			for (var i = 0;i < f.args.count(i);i++)
			{
				var arg = f.args.item(i);
				var name = arg.name;
				var expr = "";
				if (arg.expression != null)
				{
					var res = t.expression.constructor.Expression(t, arg.expression);
					t = res[0];
					expr = res[1];
				}
				content += use("Runtime.rtl").toString(((i == 0) ? "" : ",") + use("Runtime.rtl").toString("$") + use("Runtime.rtl").toString(name) + use("Runtime.rtl").toString(((expr != "") ? "=" + use("Runtime.rtl").toString(expr) : "")));
			}
		}
		return use("Runtime.Collection").create([t,content]);
	},
	/**
	 * OpDeclareFunction Body
	 */
	OpDeclareFunctionBody: function(t,f)
	{
		var save_t = t;
		var content = "";
		t = t.levelInc();
		if (f.value)
		{
			var res = t.operator.constructor.Operators(t, f.value);
			t = res[0];
			content += use("Runtime.rtl").toString(res[1]);
		}
		else if (f.expression)
		{
			/* Clear save op codes */
			t = t.constructor.clearSaveOpCode(t);
			var res = t.expression.constructor.Expression(t, f.expression);
			t = res[0];
			var expr = res[1];
			var s = "";
			if (f.flags != null && f.flags.isFlag("memorize"))
			{
				s = "$__memorize_value = " + use("Runtime.rtl").toString(expr) + use("Runtime.rtl").toString(";");
				s += use("Runtime.rtl").toString(t.s(t.expression.constructor.getModuleName(t, "Runtime.rtl") + use("Runtime.rtl").toString("::_memorizeSave(\"") + use("Runtime.rtl").toString(t.current_class_full_name) + use("Runtime.rtl").toString(".") + use("Runtime.rtl").toString(f.name) + use("Runtime.rtl").toString("\", func_get_args(), $__memorize_value);")));
				s += use("Runtime.rtl").toString(t.s("return $__memorize_value;"));
			}
			else
			{
				s = t.s("return " + use("Runtime.rtl").toString(expr) + use("Runtime.rtl").toString(";"));
			}
			/* Output save op code */
			var save = t.constructor.outputSaveOpCode(t);
			if (save != "")
			{
				content += use("Runtime.rtl").toString(save);
			}
			content += use("Runtime.rtl").toString(s);
		}
		if (f.flags != null && f.flags.isFlag("memorize"))
		{
			var s = "";
			s += use("Runtime.rtl").toString(t.s("$__memorize_value = " + use("Runtime.rtl").toString(t.expression.constructor.getModuleName(t, "Runtime.rtl")) + use("Runtime.rtl").toString("::_memorizeValue(\"") + use("Runtime.rtl").toString(t.current_class_full_name) + use("Runtime.rtl").toString(".") + use("Runtime.rtl").toString(f.name) + use("Runtime.rtl").toString("\", func_get_args());")));
			s += use("Runtime.rtl").toString(t.s("if ($__memorize_value != " + use("Runtime.rtl").toString(t.expression.constructor.getModuleName(t, "Runtime.rtl")) + use("Runtime.rtl").toString("::$_memorize_not_found) return $__memorize_value;")));
			content = s + use("Runtime.rtl").toString(content);
		}
		t = t.levelDec();
		content = t.s("{") + use("Runtime.rtl").toString(content);
		content += use("Runtime.rtl").toString(t.s("}"));
		return use("Runtime.Collection").create([save_t,content]);
	},
	/* ======================= Class Init Functions ======================= */
	getCurrentNamespace: function()
	{
		return "Bayrell.Lang.LangPHP";
	},
	getCurrentClassName: function()
	{
		return "Bayrell.Lang.LangPHP.TranslatorPHPOperator";
	},
	getParentClassName: function()
	{
		return "";
	},
	getClassInfo: function()
	{
		var Collection = use("Runtime.Collection");
		var Dict = use("Runtime.Dict");
		var IntrospectionInfo = use("Runtime.Annotations.IntrospectionInfo");
		return new IntrospectionInfo({
			"kind": IntrospectionInfo.ITEM_CLASS,
			"class_name": "Bayrell.Lang.LangPHP.TranslatorPHPOperator",
			"name": "Bayrell.Lang.LangPHP.TranslatorPHPOperator",
			"annotations": Collection.create([
			]),
		});
	},
	getFieldsList: function(f)
	{
		var a = [];
		if (f==undefined) f=0;
		return use("Runtime.Collection").create(a);
	},
	getFieldInfoByName: function(field_name)
	{
		return null;
	},
	getMethodsList: function()
	{
		var a = [
		];
		return use("Runtime.Collection").create(a);
	},
	getMethodInfoByName: function(field_name)
	{
		return null;
	},
});use.add(Bayrell.Lang.LangPHP.TranslatorPHPOperator);
if (module.exports == undefined) module.exports = {};
if (module.exports.Bayrell == undefined) module.exports.Bayrell = {};
if (module.exports.Bayrell.Lang == undefined) module.exports.Bayrell.Lang = {};
if (module.exports.Bayrell.Lang.LangPHP == undefined) module.exports.Bayrell.Lang.LangPHP = {};
module.exports.Bayrell.Lang.LangPHP.TranslatorPHPOperator = Bayrell.Lang.LangPHP.TranslatorPHPOperator;