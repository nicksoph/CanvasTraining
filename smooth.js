  <script>
      
        function gradient(a, b) {
            return (b.y-a.y)/(b.x-a.x);
        }
      
        function bzCurve(points, f, t) {
            if (typeof(f) == 'undefined') f = 0.3;
            if (typeof(t) == 'undefined') t = 0.6;
          
            ctx.beginPath();
            ctx.moveTo(points[0].x, points[0].y);
          
            var m = 0;
            var dx1 = 0;
            var dy1 = 0;
      
            var preP = points[0];
      
            for (var i = 1; i < points.length; i++) {
                var curP = points[i];
                nexP = points[i + 1];
                if (nexP) {
                    m = gradient(preP, nexP);
                    dx2 = (nexP.x - curP.x) * -f;
                    dy2 = dx2 * m * t;
                } else {
                    dx2 = 0;
                    dy2 = 0;
                }
                  
                ctx.bezierCurveTo(
                    preP.x - dx1, preP.y - dy1,
                    curP.x + dx2, curP.y + dy2,
                    curP.x, curP.y
                );
              
                dx1 = dx2;
                dy1 = dy2;
                preP = curP;
            }
            ctx.stroke();
        }
  
        // Generate random data 
        var lines = [];     
        var X = 10;
        var t = 40; // control the width of X.
        for (var i = 0; i < 100; i++ ) {
            Y = Math.floor((Math.random() * 300) + 50);
            p = { x: X, y: Y };
            lines.push(p);
            X = X + t;
        }
  
        // Draw smooth line 
        ctx.setLineDash([0]);
        ctx.lineWidth = 2;
        ctx.strokeStyle = "green";
        bzCurve(lines, 0.3, 1);
    </script> 