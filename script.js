var aladin = A.aladin(
  '#aladin-lite-div',
  {
    fullScreen: true,
    showFullscreenControl: false,
    survey: 'P/Fermi/color',
    cooFrame: 'galactic',
    target: '0 +0',
    fov: 30
  }
);

var catalog = A.catalogFromVizieR(
  'J/ApJS/218/23/table4',
  '0 +0',
  180, // TODO: Make this load faster
  {
    onClick: 'showTable'
  }
);

aladin.addCatalog(catalog);

$(document).ready(function(){
    var timesClicked = 0;
    $("#aboutButton").click(function(){
        $("#aboutInfo").toggle();
        timesClicked++;
        if(timesClicked%2 === 0) {
          $(this).html("About");
        }
        else {
          $(this).html("Close");
        }
      });
});

function resizeAboutMargin() {
  var pageWidth  = document.documentElement.clientWidth;

  if(pageWidth > 800) {
    document.getElementById("aboutButton").style.right = "100px";
    document.getElementById("aboutInfo").style.right = "100px";
  }
  if(pageWidth <= 800) {
    document.getElementById("aboutButton").style.right = "50px";
    document.getElementById("aboutInfo").style.right = "50px";
  }
  if(pageWidth > 500) {
    document.getElementById("aboutInfo").style.width = "410px";
  }
  if(pageWidth <= 500) {
    document.getElementById("aboutInfo").style.width = "205px";
  }
}
setInterval(resizeAboutMargin, 0);
