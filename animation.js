$(document).ready(function(){

var s = Snap('#svg');

var circleRadius = 40;

var circle = s.circle(100, 100, 50);
circle.attr({
    fill: "#bada55",
    stroke: "#000",
    strokeWidth: 10
});

var circleClone = circle.clone().attr({cx: 250});
var ellipse = s.ellipse(100,100,10,15).attr({ fill: "black" });
var ellipseClone = ellipse.clone().attr({cx: 250});

var eyes = s.g(ellipse,ellipseClone);

var glasses = s.g(circle,circleClone, eyes);

var basicLine = {
    strokeWidth: 10,
    stroke:'#000',
    fill : 'none'
};
circle.before(s.path('M 150 110 q 27 -35 50 0').attr(basicLine));

var mouth = s.path('M 125 250 q 50 0 100 20').attr(basicLine);

// creation des lignes partant du centre des yeux vers 0 0 pour le moment
var L1 = s.path("M 100 100 L 0 0");
var L2 = s.path("M 250 100 L 0 0");

var $element  = $('#element');

function OnMouseMove(evt) {

	// attribution des coordonn�es du pointeur aux lignes
    L1.attr({ d: "M 100 100 L "+evt.clientX+" "+evt.clientY });
    L2.attr({ d: "M 250 100 L "+evt.clientX+" "+evt.clientY });

		//attribution des coordonn�es du pointeur aux elipses dans la limite d'un rayon de 40px
        var PAL = L1.getPointAtLength(circleRadius);
        ellipse.attr({ cx: PAL.x , cy: PAL.y });

        var PAL2 = L2.getPointAtLength(circleRadius);
        ellipseClone.attr({ cx: PAL2.x , cy: PAL2.y });


        var mX, mY, distance,
        $zone = $('#zone');

        //fonction qui calcule la distance par rapport a un element
        function calculateDistance(elem, mouseX, mouseY) {
            return Math.floor(Math.sqrt(Math.pow(mouseX - (elem.offset().left+(elem.width()/2)), 2) + Math.pow(mouseY - (elem.offset().top+(elem.height()/2)), 2)));
        }

        mX = evt.pageX;
        mY = evt.pageY;
        w = $zone.width();
        h = $zone.height();

        // zone d'action
        radiusZone = (w+h)/4;

        // calcule de la distance dans la variable distance
        distance = calculateDistance($element, mX, mY);

        // creation du premier mouvement bas� sur le rayon de la zone
        // exemple pour une zone de 150px :
        // radiusZone 150px, distance de 0 � 150px
        // divis� par 1.5 pour etre sur une base de 100
        // divis� par 100 et multipli� par 40 pour un r�sultat de 40px
        // R�sultat -> le mouvement dans la radiusZone augmente de 40px
        smile1 = (radiusZone - distance)/(radiusZone/100)/100*40;

        if(distance < radiusZone){
            mouth.attr({ d: "M 125 250 q 50 "+smile1+" 100 20"});
        }else{
            mouth.attr({ d: "M 125 250 q 50 0 100 20"});
        }


        $('p span.distance').text(distance);
        $('p span.zone').text(radiusZone);


}


$(document).mousemove(OnMouseMove);

$element.on('click',function(){
	 $(document).off("mousemove");
     mouth.animate({ d: "M 115 250 q 50 40 120 20 "}, 150, mina.ease);
})



});
