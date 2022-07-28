var camera,scene,renderer
var ww = window.innerWidth,
    wh = window.innerHeight;
var starsY = [];   //黃星星
var starsW = [];   //白星星

function init(){

    renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("canvas")
    });
    renderer.setSize(ww, wh);

    scene = new THREE.Scene();
    
    camera = new THREE.PerspectiveCamera(45, ww / wh, 1, 1000); 
    camera.position.z = 5;                                  	//設置相機位置

}

function AddStarsY(){
    for ( var z= -500; z < 500; z+=10 ) { 
        var geometry   = new THREE.SphereGeometry(0.5, 30, 30);
        var material = new THREE.MeshBasicMaterial( {color: 0xFFDC35} );
        var sphere = new THREE.Mesh(geometry, material);

        sphere.position.x = Math.random() * 1000 - 500;   //x跟y position在-500~5--之間
        sphere.position.y = Math.random() * 1000 - 500;

        sphere.position.z = z;
        sphere.scale.x = sphere.scale.y = 2;  //大小

        scene.add( sphere );
        starsY.push(sphere); 
    }
}

function AddStarsW(){
    for ( var z= -2000; z < 2000; z+=40 ) { 
        var geometry   = new THREE.SphereGeometry(0.4, 26, 26);
        var material = new THREE.MeshBasicMaterial( {color: 0xffffff} );
        var sphere = new THREE.Mesh(geometry, material);

        sphere.position.x = Math.random() * 1000 - 500;   //x跟y position在-500~500之間
        sphere.position.y = Math.random() * 1000 - 500;

        sphere.position.z = z;
        sphere.scale.x = sphere.scale.y = 2;  //大小

        scene.add( sphere );
        starsW.push(sphere); 
    }
}

function AnimateStars() { 

    for(var i=0; i<starsY.length; i++) {
        
        star = starsY[i]; 
        star.position.z +=  i/3;  //速度

        if(star.position.z>1000){
            star.position.z-=2000; 
        }
        
    }
    for(var i=0; i<starsW.length; i++) {
        
        star = starsW[i]; 
        star.position.z +=  i;  //速度

        if(star.position.z>1000){
            star.position.z-=2000; 
        }
        
    }

}

function render(){
    requestAnimationFrame( render );
    renderer.render( scene, camera );
        AnimateStars();
}

init();
AddStarsY();
AddStarsW();
render();