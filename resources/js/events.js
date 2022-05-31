const callbackList = {}

export function on(eventName,callback){
	if(!callbackList[eventName]){
		callbackList[eventName] = []
	}
	callbackList[eventName].push(callback)
}


export function dispatch(eventName,data){
	if(!callbackList[eventName]){
		return
	}
	for(var i = 0; i < callbackList[eventName].length; i++){
		callbackList[eventName][i](data)
	}
}