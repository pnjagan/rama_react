

const PathFunctionMap = Object.create(null);

PathFunctionMap.HOME 		= {path: "/"				, module:""			, func: ""};
PathFunctionMap.SIGN_IN 	= {path: "/signin"			, module:"signin"	, func: ""};
PathFunctionMap.REGISTER 	= {path: "/register"		, module:"register"	, func: ""};
PathFunctionMap.INV_CREATE 	= {path: "/invoice/create"	, module:"invoice"	, func: "create"};
PathFunctionMap.INV_SEARCH 	= {path: "/invoice/search"	, module:"invoice"	, func: "search"};
PathFunctionMap.INV_OPEN 	= {path: "/invoice/open"	, module:"invoice"	, func: "open"};
//----------------------
PathFunctionMap.ITEM_SEARCH = {path: "/item/search"	, module:"item"	, func: "search"};
PathFunctionMap.ITEM_CREATE = {path: "/item/create"	, module:"item"	, func: "create"};
PathFunctionMap.ITEM_OPEN 	= {path: "/item/open"	, module:"item"	, func: "open"};
PathFunctionMap.ITEM_PRICE 	= {path: "/item/price"	, module:"item"	, func: "price"};
PathFunctionMap.ITEM_CAT 	= {path: "/item/cat"	, module:"item"	, func: "cat"};
//----------------------
PathFunctionMap.CUST_CREATE = {path: "/cust/create"	, module:"cust"	, func: "create"} ;
PathFunctionMap.CUST_SEARCH = {path: "/cust/search"	, module:"cust"	, func: "search"} ;
PathFunctionMap.CUST_OPEN   = {path: "/cust/open"	, module:"cust"	, func: "open"} ;
//---------------------------
PathFunctionMap.CONFIG_PARAMS = {path: "/config/params"	, module:"config"	, func: "params"} 
PathFunctionMap.CONFIG_USERS  = {path: "/config/users"	, module:"config"	, func: "users"} 
PathFunctionMap.CONFIG_TAX    = {path: "/config/tax"	, module:"config"	, func: "tax"} 
PathFunctionMap.CONFIG_SHIP   = {path: "/config/ship"	, module:"config"	, func: "ship"} 


/*
const PathFunctionMap = {
	HOME            : {path: "/", module:"", func: ""}
	//-----------------
	,SIGN_IN        : {path: "/signin"			, module:"signin"	, func: ""}
	,REGISTER       : {path: "/register"		, module:"register"	, func: ""} //"/"
	,INV_CREATE 	: {path: "/invoice/create"	, module:"invoice"	, func: "create"}  
	,INV_SEARCH 	: {path: "/invoice/search"	, module:"invoice"	, func: "search"} 
	,INV_OPEN 		: {path: "/invoice/open"	, module:"invoice"	, func: "open"}
	//----------------------
	,ITEM_SEARCH 	: {path: "/item/search"	, module:"item"	, func: "search"} 
	,ITEM_CREATE 	: {path: "/item/create"	, module:"item"	, func: "create"}
	,ITEM_OPEN   	: {path: "/item/open"	, module:"item"	, func: "open"}
	,ITEM_PRICE 	: {path: "/item/price"	, module:"item"	, func: "price"}
	,ITEM_CAT 		: {path: "/item/cat"	, module:"item"	, func: "cat"}
	//----------------------
	,CUST_CREATE 	: {path: "/cust/create"	, module:"cust"	, func: "create"} 
	,CUST_SEARCH 	: {path: "/cust/search"	, module:"cust"	, func: "search"} 
	,CUST_OPEN 		: {path: "/cust/open"	, module:"cust"	, func: "open"} 
	//----------------------
	,CONFIG_PARAMS 	: {path: "/config/params"	, module:"config"	, func: "params"} 
	,CONFIG_USERS 	: {path: "/config/users"	, module:"config"	, func: "users"} 
	,CONFIG_TAX 	: {path: "/config/tax"	, module:"config"	, func: "tax"} 
	,CONFIG_SHIP 	: {path: "/config/ship"	, module:"config"	, func: "ship"} 
}
*/

Object.freeze(PathFunctionMap);

export {PathFunctionMap}

