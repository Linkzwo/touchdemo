//Namespace
var touchdemo = touchdemo || {};

touchdemo.canvas = CE.defines("canvas_id").
    ready(function() {
        touchdemo.canvas.Scene.call("MyScene");
    });
            
touchdemo.canvas.Scene.new({
    name: "MyScene",
    ready: function(stage) {

        this.title = this.createElement();
        this.title.font = '24pt Helvetica';
        this.title.fillStyle = 'black';
        this.title.fillText('touchdemo', 50, 50);

        function addEntities(x, y) {
            var entity = Class.New("Entity", [stage]);
            entity.rect(100); // square
            entity.position(x, y);
            entity.el.fillStyle = "red";
            entity.el.fillRect(0, 0, 100, 100);
            stage.append(entity.el);
            return entity;
         }

        stage.on("touch", function(e, mouse) {
            //console.log(mouse);
            //console.log(e);
        });

        stage.on("hold", function(e, mouse){
            var ent = addEntities(mouse.x - 50 , mouse.y - 50)
            ent.el.on("drag", function(e, mouse) {
                ent.position(mouse.x - 50, mouse.y - 50);
                console.log(e);
            });
        });

        stage.append(this.title);
    },
    render: function(stage){
        stage.refresh();
    }
});