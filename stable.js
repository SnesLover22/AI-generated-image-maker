window.API_STABLE = {
    url: "//didisoftwares.ddns.net",    
    onStartWorking:()=>{},
    uid:null,
    makeid:function(length) {
      var result           = '';
      var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      var charactersLength = characters.length;
      for ( var i = 0; i < length; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result;
  }, 
  finishtest:async function(error,onProgress,callback,id){
     fetch(API_STABLE.url+'/AIX='+encodeURIComponent(      
      JSON.stringify({'id':id,'mode':'check'})
     ), { method: 'GET' })
    .then((response) => response.json())
    .catch(errormsg => { if (typeof (error) == 'function') error(errormsg); })
    .then( data =>{
      if(data && data.busy && data.msg){
        if (typeof (onProgress) == 'function') onProgress(data.msg);
        setTimeout(()=>{
          API_STABLE.finishtest(error,onProgress,callback,id);
        },1600);
      }else if(data && data.created && data.msg){
          callback(data.msg);     
      }else{
        callback(null);
      }
    });
  },
  createImage:async function(prompt,error,onProgress,callback){  
    var myid=this.makeid(20);
     fetch(API_STABLE.url+'/AIX='+encodeURIComponent(      
      JSON.stringify({'id':myid,'mode':'create','prompt':prompt})
     ), { method: 'GET' })
    .then((response) => response.json())
    .catch(errormsg => { if (typeof (error) == 'function') error(errormsg); })
    .then( data =>{
      if(data && data.busy && data.msg){
      if (typeof (error) == 'function') error(data.msg);
      }else if(data && data.creating){
        if (typeof (onProgress) == 'function') onProgress('Creating...');
        API_STABLE.finishtest(error,onProgress,callback,myid);        
      }else{
        callback(null);
      }
    });        
  },
  }
