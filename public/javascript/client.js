$(document).ready(function(){function e(){var e=$(".incomplete");$("#taskCounter").html(e.length+" tasks remaining")}$(".sortable").on("click",".checkbox",function(){$(this).parent().submit()}),e(),$(".sortable").sortable(),$(".sortable").disableSelection(),$("#newTaskForm").submit(function(a){a.preventDefault(),$.ajax("/tasks",{method:"POST",data:$("#newTaskForm").serialize(),success:function(a){console.log(a);var s=$("<li>").addClass("taskList incomplete ui-sortable-handle"),t=$("<div/>").addClass("row"),n=$("<div/>").addClass("small-1 columns"),l=$("<form/>",{"class":"submitForm id",action:"/tasks/completed/"+a._id,method:"POST",enctype:"application/x-www-form-urlencoded"}),o=$("<input/>",{id:a._id,name:"task","class":"checkbox"}),d=$("<label/>",{"for":a._id,"class":"label"}),i=$("<i/>").addClass("class fa fa-2x fa-check-square-o"),p=$("<div/>").addClass("small-5 columns titleToShowTask"),c=$("<a/>",{href:"/tasks/"+a._id}),r=$("<span/>").addClass("title"),m=$("<div/>",{"class":"row hiddenNote",style:"display: none"}),u=$("<div/>").addClass("small-5 columns small-offset-1"),f=$("<span/>").addClass("notes"),b=$("<div/>").addClass("small-6 columns"),h=$("<a>",{href:"/tasks/"+a._id+"/edit"}),k=$("<i>",{"class":"fa fa-2x fa-pencil-square"}),v=$("<button>",{"class":"edit",text:"Edit"});v.append(k),h.append(v);var w=$("<form>",{"class":"deleteForm",action:"/tasks/"+a._id+"?_method=DELETE",method:"POST",enctype:"application/x-www-form-urlencoded"}),x=$("<i>",{"class":"fa fa-2x fa-bomb"}),T=$("<button>",{"class":"delete",text:"Delete",type:"submit"});T.append(x),w.append(T),$(".sortable").append(s),l.append(o),l.append(d),d.append(i),t.append(n).append(p).append(b),s.append(t),n.append(l),p.append(c),c.append(r.text(a.title)),u.append(f.text(a.notes)),m.append(u),s.append(m),t.append(h),t.append(w),console.log(s),e()},failure:function(){}}),$("#newTaskForm")[0].reset()}),$(".sortable").on("submit",".deleteForm",function(a){var s=$(this).attr("action"),t=$(this);a.preventDefault(),$.ajax(s,{method:"POST",success:function(){t.closest("li").remove(),e()},failure:function(){}})}),$(".sortable").on("click",".titleToShowTask",function(e){e.preventDefault(),$(this).parent(".row").siblings(".hiddenNote").slideToggle()})});