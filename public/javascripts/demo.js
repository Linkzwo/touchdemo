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
            
        });

        this.text = this.createElement();
        this.text.font = '14pt Arial';
        this.text.fillStyle = 'black';
        this.text.fillText('touches count: 0', 25, 25);

        stage.on("touch", function(e, mouse) {
            console.log(mouse);
            console.log(e);
        });

        stage.append(el);
        stage.append(this.text);
    }
});