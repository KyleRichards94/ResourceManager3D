
<script lang="ts">
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { onMount } from 'svelte';
import { Vector3 } from '../../../../classes/Vector3.js';

export let _Style : HTMLAttributes['style'];
export let _Class : HTMLAttributes['class'];
export let _Title : string | null = null; // Default to null if not provided
export let _RenderHeight: number | null = null;
export let _RenderWidth: number | null = null;
export let _ModelScale: Vector3 = new Vector3(2,2,2); // Default to (2, 2, 2) if not provided
export let _ModelPosition: Vector3 = new Vector3(0,0,0); 
export let _Rotation: Vector3 = new Vector3(0,0,0); 

console.log(_ModelScale, _ModelPosition);

export let _ModelUrl: string | null = null; // Default to the imported model URL

let model: THREE.Group;

let _ContainerID = crypto.randomUUID(); // Generate a unique ID for the container

  const hoverlight = new THREE.AmbientLight(0xffccff, 0);

function handleMouseOver(event: MouseEvent) : void {
  model.scale.set(_ModelScale.x * 1.2, _ModelScale.y * 1.2, _ModelScale.z * 1.2);
  hoverlight.intensity = 6; // Increase light intensity on hover
}

function handleMouseLeave(event: MouseEvent) : void {
  model.scale.set(_ModelScale.x, _ModelScale.y, _ModelScale.z);
  hoverlight.intensity = 0; // Increase light intensity on hover
} 
onMount(() => {
  // Initialize the scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(70, 
              (_RenderWidth ? _RenderWidth : window.innerWidth) / (_RenderHeight ? _RenderHeight : window.innerHeight), 
              0.1, 1000);
    camera.position.z = 6;

    // Transparent background
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(_RenderWidth ? _RenderWidth : window.innerWidth/1.5,( _RenderHeight ? _RenderHeight : window.innerHeight/1.5));
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.setClearColor(0x000000, 0); 
    document.getElementById(_ContainerID).append(renderer.domElement); // alternativly attch to element by ID 

    // Lights
    scene.add(hoverlight);

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
      _ModelUrl,
      (gltf) => {
        model = gltf.scene;
        model.scale.set(_ModelScale.x, _ModelScale.y, _ModelScale.z);
        model.position.set(_ModelPosition.x, _ModelPosition.y, _ModelPosition.z);
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
        model.rotation.x += _Rotation.x;
        model.rotation.y += _Rotation.y;
        model.rotation.z += _Rotation.z;
      }
      renderer.render(scene, camera);
    }
    animate();

});

</script>

<div id={_ContainerID} style={_Style} class={_Class} on:mouseenter={handleMouseOver} on:mouseleave={handleMouseLeave} title={_Title}></div>
