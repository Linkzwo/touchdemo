//Namespace
var touchdemo = touchdemo || {};

touchdemo.canvas = CE.defines("canvas_id").
    extend(Animation).
    extend(Window).
    extend(Spritesheet).
    ready(function() {
        touchdemo.canvas.Scene.call("MyScene");
    });
            
touchdemo.canvas.Scene.new({
    name: "MyScene",
    ready: function(stage) {

        //Canvas variables
        var htmlCanvas = document.getElementById('canvas_id');
        var width = htmlCanvas.width;
        var height = htmlCanvas.height;

        //Custom variables
        touchdemo.touchCount = 0;
        touchdemo.isScalable = false;
        touchdemo.selectedEntity = null;
        touchdemo.scale = 1;
        touchdemo.tempHeight = 0;
        touchdemo.tempWidth = 0;
        touchdemo.rotation = 0;

        //Create title
        this.title = this.createElement();
        this.title.font = '24pt Helvetica';
        this.title.fillStyle = 'black';
        this.title.fillText('touchdemo', 50, 50);
        stage.append(this.title);

        //Create Menu + Animation
        /*var _window, content, 
            text = this.createElement();

        _window = touchdemo.canvas.Window.new(this, 400, 150);
         content = _window.getContent();

        text.fillStyle = "black";
        text.font = "15px Arial";
        text.fillText("Window Test", 0, 0);
        text.y = 10;
        
        content.append(text)
        
        _window.open(stage);*/

        touchdemo.menu = Class.New("Entity", [stage]);
        touchdemo.roundRect(-110, 100, 100, height - 200, 20, touchdemo.menu);
        stage.append(touchdemo.menu.el);

        var timelineIn = touchdemo.canvas.Timeline.new(touchdemo.menu.el);
        touchdemo.menuIn = timelineIn.to({x: 120}, 60 * 2,  Ease.easeOutElastic);
        var timelineOut = touchdemo.canvas.Timeline.new(touchdemo.menu.el);
        touchdemo.menuOut = timelineOut.to({x: -110}, 60 * 3, Ease.easeOutSine);

        //Touch counter
        touchdemo.touches = Class.New("Entity", [stage]);
        touchdemo.touches.el.font = "18pt Helvetica";
        touchdemo.touches.el.fillStyle = 'black';
        touchdemo.touches.el.textAlign ="end";
        touchdemo.touches.el.fillText('touch count: 0', 0, 0);
        touchdemo.touches.position(width -10, height -10);
        stage.append(touchdemo.touches.el);

        //Function to create entities
        function addEntities(x, y) {
            var entity = Class.New("Entity", [stage]);
            entity.rect(x,y,100,100); // square
            entity.position(x, y);
            entity.el.fillStyle = "rgba(0,0,255,0.5)";
            entity.el.fillRect(0, 0, 100, 100);
            entity.el.setOriginPoint("middle");
            entity.width = 100;
            entity.height = 100;
            stage.append(entity.el);
            return entity;
         }

        touchdemo.testEl = this.createElement(200, 200);
        touchdemo.testEl.rect(200, 200, 200, 200);
        touchdemo.testEl.setOriginPoint(300,300);
        touchdemo.testEl.fillStyle = 'green';
        touchdemo.testEl.fill();
        touchdemo.testEl.lineWidth = 7;
        touchdemo.testEl.strokeStyle = 'black';
        touchdemo.testEl.stroke();        
        stage.append(touchdemo.testEl);
        touchdemo.testRotation = 0;
        touchdemo.testScale = 1;
        touchdemo.testX = 0;
        touchdemo.testY = 0;
        touchdemo.testEl.lastX = 0;
        touchdemo.testEl.lastY = 0;
        touchdemo.testEl.on("transform", function(e, mouse){
            touchdemo.testRotation = e.gesture.rotation;
            touchdemo.testScale = e.gesture.scale;
            console.log(this);
        });
        touchdemo.testEl.on("drag", function(e, mouse){
            touchdemo.testX = e.gesture.deltaX + this.lastX;
            touchdemo.testY = e.gesture.deltaY + this.lastY;
            console.log("ondrag: " + this.lastX + "," + this.lastY);
        });
        touchdemo.testEl.on("dragend", function(e, mouse){
            this.lastX = touchdemo.testX;
            this.lastY = touchdemo.testY;
        });

        //Stage events
        stage.on("tap touch release", function(e, mouse) {
            touchdemo.touchCount = e.gesture.touches.length;
        });

        stage.on("swiperight", function(e, mouse) {
              touchdemo.menuIn.call();
        });

        stage.on("swipeleft", function(e, mouse) {
              touchdemo.menuOut.call();
        });

        stage.on("hold", function(e, mouse){
            if(e.gesture.touches.length == 1){
                var ent = addEntities(mouse.x - 50 , mouse.y - 50)
                ent.el.on("drag", function(e, mouse) {
                    ent.position(mouse.x - (ent.width / 2), mouse.y - (ent.height / 2));
                    //ent.position(mouse.x - ent.width, mouse.y - ent.height);
                });
                ent.el.on("doubletap", function(e, mouse) {
                    ent.el.remove();
                });
                ent.el.on("transformstart", function(e, mouse){
                    touchdemo.isScalable = true;
                    touchdemo.selectedEntity = ent;
                    touchdemo.tempWidth = ent.width;
                    touchdemo.tempHeight = ent.height;
                });
                ent.el.on("pinch rotate transform", function(e, mouse){
                    touchdemo.scale = e.gesture.scale;
                    touchdemo.rotation = e.gesture.rotation;
                });
                ent.el.on("transformed", function(e, mouse){
                    touchdemo.isScalable = false;
                    touchdemo.selectedEntity = null;
                    touchdemo.scale = 1;
                    toucdemo.rotation = 0;
                    touchdemo.tempWidth = 0;
                    touchdemo.tempHeight = 0;
                });
            }
        });
    },
    render: function(stage){
        touchdemo.touches.el.fillText('touch count: ' + touchdemo.touchCount, 0, 0);
        
        touchdemo.testEl.rotation = touchdemo.testRotation;
        touchdemo.testEl.scaleX = touchdemo.testScale;
        touchdemo.testEl.scaleY = touchdemo.testScale;
        touchdemo.testEl.x = touchdemo.testX;
        touchdemo.testEl.y = touchdemo.testY;
        //console.log(touchdemo.testX + ", " + touchdemo.testY);

        if(touchdemo.isScalable && touchdemo.selectedEntity){
            touchdemo.selectedEntity.height = touchdemo.tempHeight * touchdemo.scale;
            touchdemo.selectedEntity.width = touchdemo.tempWidth * touchdemo.scale;
            //touchdemo.selectedEntity.el.rotation = touchdemo.rotation;
            touchdemo.selectedEntity.el.fillRect(0, 0, touchdemo.selectedEntity.width , touchdemo.selectedEntity.height);
        }
        stage.refresh();
    }
});

touchdemo.roundRect = function(x, y, w, h, radius, entity){
    var r = x + w;
    var b = y + h;
    entity.el.beginPath();
    entity.el.strokeStyle="grey";
    entity.el.lineWidth="2";
    entity.el.moveTo(x+radius, y);
    entity.el.lineTo(r-radius, y);
    entity.el.quadraticCurveTo(r, y, r, y+radius);
    entity.el.lineTo(r, y+h-radius);
    entity.el.quadraticCurveTo(r, b, r-radius, b);
    entity.el.lineTo(x+radius, b);
    entity.el.quadraticCurveTo(x, b, x, b-radius);
    entity.el.lineTo(x, y+radius);
    entity.el.quadraticCurveTo(x, y, x+radius, y);
    entity.el.stroke();
}