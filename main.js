function loadNews(container,is_widget,limit,first_news,type)
{var url=index_url+"esana/load";if(type!==true)
{url=index_url+"niwedana/load";}
$.ajax({type:"POST",url:url,dataType:'json',data:{newsLimit:limit,esanaWidget:is_widget,[csrfName]:csrfHash},success:function(data){var news_response=data;if(news_response.STATUS)
{var cont=$('#'+container);cont.empty();cont.append(news_response.VIEW);if(first_news)
{getNewsById(first_news,false,'si',type)}
else
{getNewsById(news_response.FIRST_NEWS_ID,false,'si',type)}}},error:function(data){console.log(data)}})}
function load_news_on_scroll(container,is_widget,limit,type)
{var cont=$('#'+container);var url=index_url+"esana/load";if(type!==true)
{url=index_url+"niwedana/load";}
$.ajax({type:"POST",url:url,dataType:'json',data:{newsLimit:limit,esanaWidget:is_widget,[csrfName]:csrfHash},success:function(data){setTimeout(function(){var news_response=data;if(news_response.STATUS)
{$('.news_loader_onscroll').hide();cont.append(news_response.VIEW);}},1000)},error:function(data){console.log(data)}})}
function addComment(comment,post_id,is_reply,comment_id)
{if(is_reply=='true')
{return new Promise((resolve,reject)=>{var loggedUserData=JSON.parse(localStorage.getItem('u'));var comment_data={'c':comment,'uid':loggedUserData.tk,'cid':comment_id,[csrfName]:csrfHash};$.ajax({'type':'POST','url':index_url+'comment/add/reply','data':comment_data,'dataType':'JSON',success:function(res){resolve(res)},error:function(data){reject(false)
console.log(data)
resolve(false)}});})}
else
{return new Promise((resolve,reject)=>{var loggedUserData=JSON.parse(localStorage.getItem('u'));var comment_data={'c':comment,'pid':post_id,'uid':loggedUserData.tk,[csrfName]:csrfHash};$.ajax({'type':'POST','url':index_url+'comment/add','data':comment_data,'dataType':'JSON',success:function(res){resolve(res)},error:function(data){reject(false)
console.log(data)
resolve(false)}});})}}
function removeComment(newsId,comment_id)
{return new Promise((resolve,reject)=>{var loggedUserData=JSON.parse(localStorage.getItem('u'));var comment_data={'n':newsId,'c':comment_id,'u':loggedUserData.tk,[csrfName]:csrfHash};$.ajax({'type':'POST','url':index_url+'comment/delete','data':comment_data,success:function(data){var res=JSON.parse(data);resolve(true)},error:function(data){reject(false)
console.log(data)
resolve(false)}});})}
function addReaction(el)
{if(localStorage.getItem('u')!=null&&localStorage.getItem('u')!=undefined)
{_addReaction(el);}
else
{google_login().then(function(res){if(res)
{_addReaction(el);}
else
{unsuccessful_notification('Login failed! Please try again')}});}}
function addReactionToPost(el)
{if(localStorage.getItem('u')!=null&&localStorage.getItem('u')!=undefined)
{_addReactionToPost(el);}
else
{google_login().then(function(res){if(res)
{_addReactionToPost(el);}
else
{unsuccessful_notification('Login failed! Please try again')}});}}
function _addReaction(el)
{var reaction_type=$(el).data('reaction-type');var comment_id=$(el).data('comment-id');var newsId=$(el).data('news-id');addReactionDataToIndexedDb(newsId,comment_id,reaction_type,true).then(function(res){var dbResult=res;let totalCountElement="#total_count_"+comment_id;let oldTotalValue=parseInt($(totalCountElement).text());let reactions={1:images+"reactions/reaction_like.gif",2:images+"reactions/reaction_love.gif",3:images+"reactions/reaction_haha.gif",4:images+"reactions/reaction_sad.gif",5:images+"reactions/reaction_angry.gif",6:images+"reactions/reaction_wow.gif",}
$('#span_to_be_removed_'+comment_id).hide();$('#to_be_removed_'+comment_id).removeClass("reaction-container-new-like").addClass("reaction-container-new");$('#emoji_reaction_tobe_delete_'+comment_id).attr("src",reactions[reaction_type]).show();if(dbResult.newReaction)
{let element="#count_"+reaction_type+"_"+comment_id;let oldValue=parseInt($(element).text());$(element).empty();$(totalCountElement).empty();$(element).text(oldValue+1);$(totalCountElement).text(oldTotalValue+1);$(totalCountElement).attr("style","display: inline !important");}
else if(dbResult.sameReaction&&dbResult.deleted)
{let element="#count_"+reaction_type+"_"+comment_id;let oldValue=parseInt($(element).text());$(element).empty();$(totalCountElement).empty();$(element).text(oldValue-1);$(totalCountElement).text(oldTotalValue-1);$(totalCountElement).attr("style","display: inline !important");}
else if(!dbResult.sameReaction&&!dbResult.deleted)
{let element="#count_"+dbResult.currentReaction+"_"+comment_id;let oldValue=parseInt($(element).text());$(element).empty();$(element).text(oldValue-1);let newElement="#count_"+reaction_type+"_"+comment_id;let newOldValue=parseInt($(newElement).text());$(newElement).empty();$(newElement).text(newOldValue+1);}
addCommentReactions(reaction_type,comment_id,newsId).then(function(res){if(!res.STATUS)
{unsuccessful_notification('Reaction failed! please try again.')}});});}
function _addReactionToPost(el)
{var reaction_type=$(el).data('reaction-type');var post_id=$(el).data('post-id');addReactionDataToIndexedDb(post_id,post_id,reaction_type,false).then(function(res){var dbResult=res;let totalCountElement="#post_total_count_"+post_id;let oldTotalValue=parseInt($(totalCountElement).text());if(dbResult.newReaction)
{let element="#post_count_"+reaction_type+"_"+post_id;let oldValue=parseInt($(element).text());$(element).empty();$(totalCountElement).empty();$(element).text(oldValue+1);$(totalCountElement).text(oldTotalValue+1);$(totalCountElement).attr("style","display: inline !important");}
else if(dbResult.sameReaction&&dbResult.deleted)
{let element="#post_count_"+reaction_type+"_"+post_id;let oldValue=parseInt($(element).text());$(element).empty();$(totalCountElement).empty();$(element).text(oldValue-1);$(totalCountElement).text(oldTotalValue-1);$(totalCountElement).attr("style","display: inline !important");}
else if(!dbResult.sameReaction&&!dbResult.deleted)
{let element="#post_count_"+dbResult.currentReaction+"_"+post_id;let oldValue=parseInt($(element).text());$(element).empty();$(element).text(oldValue-1);let newElement="#post_count_"+reaction_type+"_"+post_id;let newOldValue=parseInt($(newElement).text());$(newElement).empty();$(newElement).text(newOldValue+1);}});addPostReaction(reaction_type,post_id).then(function(res){if(!res.STATUS)
{unsuccessful_notification('Reaction failed! please try again.')}});}
function addCommentReactions(reactionType,commentId)
{return new Promise((resolve,reject)=>{var loggedUserData=JSON.parse(localStorage.getItem('u'));var reaction_data={'rid':reactionType,'cid':commentId,'uid':loggedUserData.tk,[csrfName]:csrfHash};$.ajax({'type':'POST','url':index_url+'comment/add/reaction','data':reaction_data,'dataType':'JSON',success:function(res){resolve(res)},error:function(data){reject(false)
console.log(data)
resolve(false)}});})}
function addPostReaction(reactionType,postId)
{return new Promise((resolve,reject)=>{var loggedUserData=JSON.parse(localStorage.getItem('u'));var reaction_data={'rid':reactionType,'pid':postId,'uid':loggedUserData.tk,[csrfName]:csrfHash};$.ajax({'type':'POST','url':index_url+'comment/add/post/reaction','data':reaction_data,'dataType':'JSON',success:function(res){resolve(res)},error:function(data){reject(false)
console.log(data)
resolve(false)}});})}
function reportComment(comment_id,newsId)
{if(localStorage.getItem('u')!=null&&localStorage.getItem('u')!=undefined)
{var loggedUserData=JSON.parse(localStorage.getItem('u'));_reportComment(comment_id,newsId,loggedUserData.tk)}
else
{google_login().then(function(res){if(res)
{var loggedUserData=JSON.parse(localStorage.getItem('u'));_reportComment(comment_id,newsId,loggedUserData.tk)}});}}
function _reportComment(comment_id,newsId,usesr_id)
{var reportData={'cid':comment_id,'pid':newsId,'uid':usesr_id,[csrfName]:csrfHash};$.ajax({'type':'POST','url':index_url+'comment/report','data':reportData,'dataType':'JSON',success:function(res){var response=JSON.parse(res.DATA);console.log(response.Status.success)
if(response.Status.success)
{successful_notification('Success!','Comment reported');}
else
{unsuccessful_notification('Error!','Something went wrong');}},error:function(data){unsuccessful_notification('Error!','Something went wrong');}});}
function addReactionDataToIndexedDb(newsId,commentId,reactionType,is_comment)
{return new Promise((resolve,reject)=>{let loggedUserData=JSON.parse(localStorage.getItem('u'));if(localStorage.getItem('u')!=null&&localStorage.getItem('u')!=undefined)
{let user_id=loggedUserData.tk
const indexedDB=window.indexedDB||window.mozIndexedDB||window.webkitIndexedDB||window.msIndexedDB||window.shimIndexedDB;if(!indexedDB)
{unsuccessful_notification('Unexpected Error',"Please try again");reject(false);}
const request=indexedDB.open("Helakuru",1);request.onerror=function(event){unsuccessful_notification('Unexpected Error',"Please try again");reject(false);};request.onupgradeneeded=function(){const db=request.result;db.createObjectStore("reactions",{keyPath:"unique_id",autoincrement:true});};request.onsuccess=function(){const db=request.result;const transaction=db.transaction(["reactions"],"readwrite");const store=transaction.objectStore("reactions");if(is_comment)
{var search_data=newsId+"_comment_"+commentId+"_"+user_id;}
else
{var search_data=newsId+"_post_"+commentId+"_"+user_id;}
const idQuery=store.get(search_data);idQuery.onsuccess=function(){var reaction_data={unique_id:search_data,reactionType:reactionType};if(idQuery.result==undefined)
{store.put(reaction_data);resolve({newReaction:true,success:true,sameReaction:false,deleted:false,currentReaction:null});}
else
{if(idQuery.result.reactionType==reactionType)
{const deleteReaction=store.delete(search_data);deleteReaction.onsuccess=function(){resolve({newReaction:false,success:true,sameReaction:true,deleted:true,currentReaction:idQuery.result.reactionType});};}
else
{store.put(reaction_data);resolve({newReaction:false,success:true,sameReaction:false,deleted:false,currentReaction:idQuery.result.reactionType});}}};transaction.oncomplete=function(){db.close();};};}});}
function getLocalStorageData(newsId,commentId,is_comment)
{return new Promise((resolve,reject)=>{let loggedUserData=JSON.parse(localStorage.getItem('u'));if(localStorage.getItem('u')!=null&&localStorage.getItem('u')!=undefined)
{let user_id=loggedUserData.tk
const indexedDB=window.indexedDB||window.mozIndexedDB||window.webkitIndexedDB||window.msIndexedDB||window.shimIndexedDB;if(!indexedDB)
{unsuccessful_notification('Unexpected Error',"Please try again");reject(false);}
const request=indexedDB.open("Helakuru",1);request.onerror=function(event){unsuccessful_notification('Unexpected Error',"Please try again");reject(false);};request.onupgradeneeded=function(){const db=request.result;db.createObjectStore("reactions",{keyPath:"unique_id",autoincrement:true});};request.onsuccess=function(){const db=request.result;const transaction=db.transaction(["reactions"],"readwrite");const store=transaction.objectStore("reactions");if(is_comment)
{var search_data=newsId+"_comment_"+commentId+"_"+user_id;}
else
{var search_data=newsId+"_post_"+commentId+ +"_"+user_id;;}
const idQuery=store.get(search_data);idQuery.onsuccess=function(){if(idQuery.result==undefined)
{resolve({success:false,});}
else
{resolve({success:true,data:idQuery.result});}};transaction.oncomplete=function(){db.close();};};}});}
function addReply(commentData)
{var comment_user=$(commentData).data('comment-user-name');var comment_id=$(commentData).data('comment-id');var newsId=$(commentData).data('news-id');$('#has-comment-data').attr('data-has-comment',true);$('#has-comment-data').attr('data-comment-id',comment_id);$('.reply-to-container').show();$('#reply-to-name').text(comment_user)
scrollBottomCommentDiv();}
function removeAddReply()
{$('.reply-to-container').hide();$('#has-comment-data').attr('data-has-comment',false);$('#has-comment-data').attr('data-comment-id','');}
function animateDOM(div_id)
{$("#comment_send_div_"+div_id).animate({backgroundColor:"#dbe2f5"},500).animate({backgroundColor:"#f4f5f8"},500).animate({backgroundColor:"#dbe2f5"},500).animate({backgroundColor:"#f4f5f8"},500);}
$.contextMenu({selector:".comment-content-context",items:{Report:{name:"Report",callback:function(key,options){comment_id=options.$trigger.attr("data-comment-id");newsId=options.$trigger.attr("data-news-id");reportComment(comment_id,newsId);},}}});