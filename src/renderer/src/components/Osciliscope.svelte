<script lang="ts">
  export let _Value: number = 0;
  export let _Width: number = 300;
  export let _Height: number = 150;
  export let _T = 0.6;
  export let _Style: string = '';
  export let _ColorPrimary: string = '#3875dd';
  export let _ColorSecondary: string = '#ffffffaa';

  let _OsciliscopeID = crypto.randomUUID();
  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D;

  function draw() {
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;

    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, w, h);

    // --- Wave 1: Sine + Saw - green ---
    ctx.beginPath();
    ctx.strokeStyle = _ColorPrimary;
    ctx.lineWidth = 1.5;

    const amp = (h / 3) * (_Value / 5) + 8;
    const freq = 2 + (_Value * 4);

    for (let x = 0; x < w; x++) {
    const sine = Math.sin((x + _T) * 0.015 * freq);
    const saw = ((x + _T * 1.2) % 120) / 60 - 1;
    const y = h / 2 + (sine + saw) * amp * 0.5;
    x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.stroke();


    // --- Wave 2: Cosine + Triangle - white ---
    ctx.beginPath();
    ctx.strokeStyle = _ColorSecondary; // alpha to blend gently
    ctx.lineWidth = 1;

    const amp2 = (h / 4) * (_Value / 4) + 4;

    for (let x = 0; x < w; x++) {
    const cos = Math.cos((x + _T * 0.3) * 0.01 * freq);
    const tri = 1 - Math.abs((((x + _T * 2.3) % 200) / 100) - 1); // triangle wave
    const y = h / 2 + (cos + tri) * amp2 * 0.5;
    x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.stroke();

    _T += 0.2;

    requestAnimationFrame(draw);
  }

  import { onMount } from 'svelte';

  onMount(() => {
    ctx = canvas.getContext('2d')!;
    canvas.width = _Width;
    canvas.height = _Height;
    draw();
  });
</script>

<div id={_OsciliscopeID} class="oscilloscope scanlines" style="width: {_Width}px; height: {_Height}px; {_Style}">
  <canvas bind:this={canvas}></canvas>
</div>

<style>
.oscilloscope {
  width: 100%;
  height: 150px;
  background: rgba(25, 24, 24, 0.199);
  border-radius: 4px;
  box-shadow: 0 0 12px #72a6ff7c;
    box-shadow: 0 0 12px #3875dd;
  overflow: hidden;
  position: relative;
}

canvas {
  width: 100%;
  height: 100%;
  display: block;
  image-rendering: pixelated;
  filter: contrast(1.5) brightness(1.2);
}
</style>