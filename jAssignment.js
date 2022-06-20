$(document).ready(
    function(){

        var today = new Date();
        var day = String (today.getDate()).padStart(2,'0');
        var month = String (today.getMonth()+1).padStart(2,'0');
        var year = today.getFullYear();

        today=day+'/'+month+'/'+year;
        $('#currentdate').append(today);
        
        $("form").submit(function(e) {
            var task = $('#task').val();
            var cat = $("#category").val();
            var prio = $("input[name=priority]:checked").val();
            var date = $("#date").val();

            var html = '<input type="checkbox" id="check">';
            var newtask = $("<div>" + task +"<br>" + date +"<br>"+ html + "</div>" + "<br>").prependTo(".newtask");

            //change color based on the priority
            

            if (prio == "high") {
              newtask.css({
                "background-color": "#ea9999",
                "border-radius": "10px",
                "margin-bottom": "30px",
                "padding-left": "20px"
              });
            }
            if (prio == "medium") {
              newtask.css({
                "background-color": "#f8ca9c",
                "border-radius": "10px",
                "margin-bottom": "30px",
                "padding-left": "20px"
              });
            }
            if (prio == "low") {
              newtask.css({
                "background-color": "#ffe498",
                "border-radius": "10px",
                "margin-bottom": "30px",
                "padding-left": "20px"
              });
            }

            // insert icons
            var date1 = new Date();
            var mytoday = new Date ( date1.getFullYear(),date1.getMonth(),date1.getDate(),0,0,0);
            var date2 = new Date(date);
            var difference = date2.getTime() - mytoday.getTime();
            var result = difference/(1000*60*60*24);
            

            if(result < 0)
            {
                var img2 = '<img src="expired.png" alt="icon" class="imgg">';
                var expired = $(img2+"<br>").prependTo(newtask).css({"float":"right",
                "margin-right":"10px",
                "margin-top":"5px",
                "width": "50px",
                "height": "50px",});}

            if(result < 3 && result>0 )
            {
                var img3 = '<img src="warning.png" alt="icon" class="imgg">';
                var warning = $(img3+"<br>").prependTo(newtask).css({"float":"right",
                "margin-right":"10px",
                "margin-top":"5px",
                "width": "50px",
                "height": "50px",});

            }


            e.preventDefault();
          });


          //clear form inputs

        $("#clear").click(function(){  
            $("#form").trigger("reset");  
            $(".pTask").hide();
        });

        //input validation

        $("#submit").click(function(){
            var task = $('#task').val();
            var cat = $("#category").val();
            var date = $("#date").val();
            if(task=='')
            {
                alert("empty inputs");
                return false;
            }
            if(task.length<=2)
            {
                $(".pTask").html("Should be more than 2 letters").css({"color":"red","font-size":"13px"});
                $(".pTask").show();
                return false;
            }
            if(task.length>2)
            {
                $(".pTask").hide();
            }
            if(!$("input[name=priority]").is(":checked"))
            {
                alert("empty inputs");
                return false;
            }
            if(date=='')
            {
                alert("empty inputs");
                return false;
            }
        })

        $("#done").click(function(){

            if(!$('input[type=checkbox]').is(":checked")){
                alert("no task has been selected");
                return false;
            }

            if($('input[type=checkbox]').is(":checked"))
            {
                var t = $("input[type=checkbox]:checked").parent();
                t.hide(function(){
                    $(".comp").append(t);
                    t.css("background-color","#c4dfb4");
                    $(".imgg",t).attr("src","checked.png");
                    if(t.find('.imgg').length==0)
                    {

                     var img4 = '<img src="checked.png" alt="icon" class="imgg">';
                     var checked = $(img4+"<br>").prependTo(t).css({"float":"right",
                     "margin-right":"10px",
                     "margin-top":"5px",
                     "width": "50px",
                     "height": "50px",});
                    }
                    
                    t.show();
                });

                $("input[type=checkbox]:checked").remove();
            }

        });

    }
);