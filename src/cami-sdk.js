var camisdk = {};

camisdk.Client = (function (apiKey, development) {

    if (typeof apiKey == 'undefined')
    {
         throw new Error("Argument missing: apiKey is required");
    }
    
    if (typeof development == 'undefined' || !development)
    {
         server = "http://api.penseur-ai.com/";
    }
    else
    {
        server = "http://api.penseur-ai.com:8080/";
    }   
   
    /**
     * HTTP GET request
     */
    function requestGET(url, callback)
    {
        var request = new XMLHttpRequest();
        request.open("GET", server+url, true);
        request.onerror = function()
        {
            callback({"error": request.responseText, "status": request.status});
        };
        request.onload = function()
        {
            var obj = {};
            try
            {
                obj = JSON.parse(request.responseText);
            }
            catch (e)
            {
            }
            obj.status = request.status;
            callback(obj);
        };
        //request.setRequestHeader("Authentication", "apikey " + apiKey);
        //request.setRequestHeader("Accept", "application/json");
        //request.setRequestHeader("Access-Control-Allow-Origin", "*");
        //request.setRequestHeader("Origin", "");
        request.send();
        //return JSON.parse(request.responseText);
    }
    
    /**
     * HTTP POST request
     */
    function requestPOST(url, form, data, callback)
    {
        var request = new XMLHttpRequest();
        request.open("POST", server+url, true);
        request.onerror = function()
        {
            callback({"error": request.responseText, "status": request.status});
        };
        request.onload = function()
        {
            /*
            if (request.readystate == 4 && request.status == 200)
            {
            }
            else if (request.status != 200)
            {
            }
            */
            var obj = {};
            try
            {
                obj = JSON.parse(request.responseText);
            }
            catch (e)
            {
            }
            obj.status = request.status;
            callback(obj);
        };        
        //request.setRequestHeader("Authentication", "apikey " + apiKey);
        //request.setRequestHeader("Accept", "application/json");
        //request.setRequestHeader("Content-type", "application/json");
        //request.send(formdata);
        request.send(form);
        //return request.responseText;
        //return JSON.parse(request.responseText);
    }

    var cami = {};
   
    cami.semantics =
    {
   
        getSemantics: function(bit, pos, max_results)
        {        
            var url = "semantics/";
         
            if (bit === undefined && pos === undefined && max_results === undefined)
                return get(url);
                
            url = url + "?";         
         
            if (max_results)
                url = url + "max_results=" + +max_results + "&";
            
            if (bit)
                url = url + "bit=" + +bit + "&";
            
            if (pos)
                url = url + "pos=" + pos;
            
            return requestGET(url);
        }, 
      
        getEncodings: function(string, max_results)
        {
            var url = "encodings/";
            
            if (string === undefined) return get(url);
            
            url = url + "?string=" + string;
            
            if (max_results)
                url = url + "&max_results=" + +max_results;
            
            return requestGET(url);
        }
    };
    
    cami.penny =
    {
        sendMessage: function(user_info, message, callback)
        {
            var url = "penny/";
            var formdata = {};
            formdata.datetime = new Date();
            formdata.message = message;
            formdata.user = apiKey;
            if (user_info.username) formdata.username = user_info.username;
            return requestPOST(url, formdata, callback);
        },
        
        uploadFiles: function(user_info, data, callback)
        {
        }
    };
   
    return cami;
});
