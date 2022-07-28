var percentage,path,geometry, material,tube,camera,scene,renderer
var ww = window.innerWidth,
    wh = window.innerHeight;

function init(){

    renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("canvas")
    });
    renderer.setSize(ww, wh);

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(45, ww / wh, 0.001, 1000);
    camera.position.z = 400;

    var points = [
    [-100,0,100],
    [-50,50,50],
    [0,0,0],
    [50,-50,50],
    [100,0,100]
    ];

    for (var i = 0; i < points.length; i++) {
    var x = points[i][0];
    var y = points[i][1];
    var z = points[i][2];
    points[i] = new THREE.Vector3(x, y, z);
    }
    path = new THREE.CatmullRomCurve3(points);  //連線的function
    geometry = new THREE.TubeGeometry( path, 300, 2, 20, true );  //建立物件
    material = new THREE.MeshBasicMaterial( { color: 0xFFDC35, side : THREE.BackSide, wireframe:true } );
    tube = new THREE.Mesh( geometry, material );
    scene.add( tube );


    percentage = 0;
}

function render(){

  percentage += 0.001;
  var p1 = path.getPointAt(percentage%1);
  var p2 = path.getPointAt((percentage + 0.01)%1);
  camera.position.set(p1.x,p1.y,p1.z);
  camera.lookAt(p2);

  renderer.render(scene, camera);

  requestAnimationFrame(render);
}

init();
requestAnimationFrame(render);