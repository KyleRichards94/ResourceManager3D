
<script lang="ts">
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import modelUrl from '../assets/Cpu.glb?url';
import { onMount } from 'svelte';

let model: THREE.Group;


onMount(() => {
  // Initialize the scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 6;

    // Transparent background
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth/1.5, window.innerHeight/1.5);
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.setClearColor(0x000000, 0); 
    document.getElementById("three-container").append(renderer.domElement); // alternativly attch to element by ID 

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffccff, 1);
    scene.add(ambientLight);

    const hemiLight = new THREE.HemisphereLight(0xffeeff, 0x444444, 2);
    hemiLight.position.set(0, 20, 0);
    scene.add(hemiLight);

    const directionalLight = new THREE.DirectionalLight(0xfeefff, 1);
    directionalLight.position.set(5, 10, 7.5);
    scene.add(directionalLight);

    // Load model
    const loader = new GLTFLoader();
    loader.load(
      modelUrl,
      (gltf) => {
        model = gltf.scene;
        model.scale.set(2, 2, 2);
        model.position.set(0, 0, 0);
        scene.add(model);
      },
      undefined,
      (error) => {
        console.error('🚨 Failed to load model:', error);
      }
    );
    
    // Animate
    function animate() {
      requestAnimationFrame(animate);
    
      // Rotate model if loaded
      if (model) {
        model.rotation.x += 0.001;
        model.rotation.y += 0.001;
        model.rotation.z += 0.0006;
      }
    
      renderer.render(scene, camera);
    }
    animate();
});

</script>

<div id="three-container" style="z-index:0; position:absolute; top:0%; right:0%"  ></div>
