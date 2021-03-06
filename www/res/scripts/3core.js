$(document).ready(function() {

  var music_control = $('#sound-control img');

  music_control.click(function () {
    if (music_control.hasClass('clicked'))
    {
      music_control.attr('src', 'res/images/mute-sound-light.png');
      music_control.removeClass('clicked');
      music_control.removeAttr('class');
      $('#sound-info').text('ON');
      document.getElementById('home-music').play();
    }
    else
    {
      music_control.attr('src', 'res/images/play-sound-light.png');
      music_control.addClass('clicked');
      $('#sound-info').text('OFF');
      document.getElementById('home-music').pause();
    }
  });

  music_control.mouseenter(function () {
    music_control.animate({width: '36px', height: '36px'}, 'fast');
  }).mouseleave(function () {
    music_control.animate({width: '24px', height: '24px'}, 'fast', function () {
      music_control.removeAttr('style');
    });
  });

  init();

  // global variables
  var renderer,
    scene,
    camera,
    control,
    stats;


  /**
  * Initializes the scene, camera and objects. Called when the window is
  * loaded by using window.onload (see below)
  */
  function init() {

    // create a scene, that will hold all our elements such as objects, cameras and lights.
    scene = new THREE.Scene();

    // create a camera, which defines where we're looking at.
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

    // create a render, sets the background color and the size
    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0x000000, 1.0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMapEnabled = true;

    // create the ground plane
    var planeGeometry = new THREE.PlaneGeometry(20, 20);
    var planeMaterial = new THREE.MeshLambertMaterial({color: 0xcccccc});
    var plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.receiveShadow = true;

    // rotate and position the plane
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.x = 0;
    plane.position.y = -2;
    plane.position.z = 0;


    // position and point the camera to the center of the scene
    camera.position.x = 3;
    camera.position.y = 3;
    camera.position.z = 3;
    camera.lookAt(scene.position);


    // setup the control object for the control gui
    control = new function() {
      this.rotationSpeed = 0.005;
    };

    // add extras
    addControlGui(control);
    addStatsObject();

    loadModel();


    // add the output of the renderer to the html element
    document.body.appendChild(renderer.domElement);

    // call the render function, after the first render, interval is determined
    // by requestAnimationFrame
    render();
  }

  function loadModel() {
    var loader = new THREE.JSONLoader();
    loader.load('res/models/monkey.js',
    function(model) {
      var material = new THREE.MeshNormalMaterial();

      var mesh = new THREE.Mesh(model, material);
      mesh.translateY(-0.5);
      mesh.scale = new THREE.Vector3(3,3,3);

      scene.add(mesh);
    });
  }


  function addControlGui(controlObject) {
    var gui = new dat.GUI();
    gui.add(controlObject, 'rotationSpeed', -0.01, 0.01);
  }

  function addStatsObject() {
    stats = new Stats();
    stats.setMode(0);

    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';

    document.body.appendChild( stats.domElement );
  }


  /**
  * Called when the scene needs to be rendered. Delegates to requestAnimationFrame
  * for future renders
  */
  function render() {
    // update the camera
    var rotSpeed = control.rotationSpeed;
    camera.position.x = camera.position.x * Math.cos(rotSpeed) + camera.position.z * Math.sin(rotSpeed);
    camera.position.z = camera.position.z * Math.cos(rotSpeed) - camera.position.x * Math.sin(rotSpeed);
    camera.lookAt(scene.position);

    // update stats
    stats.update();

    // and render the scene
    renderer.render(scene, camera);

    // render using requestAnimationFrame
    requestAnimationFrame(render);
  }


  /**
  * Function handles the resize event. This make sure the camera and the renderer
  * are updated at the correct moment.
  */
  function handleResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }
  // calls the handleResize function when the window is resized
  window.addEventListener('resize', handleResize, false);
});