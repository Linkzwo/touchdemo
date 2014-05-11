//Namespace
var touchdemo = touchdemo || {};

touchdemo.canvas = CE.defines("canvas_id").
    ready(function() {
        touchdemo.canvas.Scene.call("MyScene");
    });
            
touchdemo.canvas.Scene.new({
    name: "MyScene",
    ready: function(stage) {

        var el = this.createElement();
        el.fillStyle = "red";
        el.fillRect(0, 0, 100, 100);

        el.on("drag", function(e, mouse) {
            this.x = e.gesture.deltaX;
            this.y = e.gesture.deltaY;
            console.log(e);
        });

        stage.append(el);
    }
});