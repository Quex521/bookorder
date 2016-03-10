/**
 * Created by Quex on 2016/3/9 0009.
 */
		var count=0;
		var name="";
		var postjson="";
		var htmltxt="";
		var xmlhttp;
		function mysubmit(){

			var obj = document.getElementById("submit");
			if(obj.value=="提交")
			{
			   // document.getElementById("books_div").innerHTML=postjson;
				if(!checkInput()){
					alert("请输入姓名!");
					document.getElementById("nameText").focus();
				}else{
					name=document.getElementById("nameText").value;
					postdata();
				}
				return;
			}
			var choices = document.getElementsByTagName("input");
			var names = document.getElementsByTagName("dt");
			count=0;
			postjson="";
			htmltxt+="<div class='item' style='margin-left: 275px;'><dl><dt>选择的书目</dt>";
			for(var i=0;i<choices.length;i++)
			{
				// alert(choices[i].checked);
				if(choices[i].checked){

					htmltxt+=("<dd>"+names[i].innerHTML+"<dd/>");
					postjson+=i+"_";
					count++;
				}
			}
			htmltxt+="</dl>";
            htmltxt+='<div class="inputName"><input type="text" id="nameText" placeholder="请输入姓名..." autofocus="autofocus" onKeyPress="if(event.keyCode==13){mysubmit();return false;} "/></div></div>';
			postjson+=count+"";
			document.getElementById("title").innerHTML="请确认并填入姓名后提交：";
			document.getElementById("books_div").innerHTML=htmltxt;
			obj.value="提交";
		}
		function  checkInput(){
			if(!(document.getElementById("nameText").value)){
				return false;
			}
			return true;
		}
		function postdata(){
			$.ajax({
				type:"GET",
				async : true,
				url:"http://quejqx.oicp.net/php/bookorder/data.php?name="+name+"&id="+postjson,
				dataType:"jsonp",
				jsonp : "callback", //传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(一般默认为:callback)
				jsonpCallback : "handler",
				success:function(data) {
                    //alert("success");
					htmltxt="<div><img width='240' height='240' src='image/zhifu.png' style='margin:20px 0 0 280px;'></div>";
					document.getElementById("title").innerHTML="请扫码预付款(每本10元)共"+count*10+"元";
					document.getElementById("books_div").innerHTML=htmltxt;
					document.getElementById("submit").style.display="none";
				},
				error: function (XMLHttpRequest, textStatus, errorThrown) {
					alert(errorThrown);
				}
			});
		}
		function Load(){
			$.ajax({
					type:"Get",
					url:"json/books.json",
					dataType:"json",
					success:function(data){
						add_html="";
						path="";
						$.each(data.data,function(idx,item){
							add_html+=" <div class='item'> <dl><dt>"+item.name+"</dt>"
									+"<dd>"+item.author+"</dd>"
									+"<dd>"+item.type+"</dd>"
									+ "<dd class='price'>"+item.price+"</dd>"
									+ "<dd>"+item.company+"</dd><dl>"
									+" <div class='checkbox'> <input type='checkbox' id='checkboxInput"+idx
									+"' name='boook_sel'/> <label for='checkboxInput"+idx+"'></label> </div> </div>";
						});
						$("#books_div").html(add_html);
					}
				});
		}