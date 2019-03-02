
$(function(){
 $(".owl-carousel").owlCarousel({
     
     items:1,
     autoplay:true,
     autoplayTimeout:2500,
     rewind:true,
     autoplayHoverPause:false,
     dots:true,
     center:true,
     animateIn:'slideInRight',
     animateOut:'slideOutLeft',
     
 });
});
             
function openCity(container,elmnt,color) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].style.backgroundColor = "";
  }
  document.getElementById(container).style.display = "block";
  elmnt.style.backgroundColor = color;

}
var i = 1;
$(document).ready(function(){
    setInterval(function(){
        $("#cont-tab-"+i).trigger("click");
        if(i==4)
            i=1;
        else
            ++i;
    },2500)
})
