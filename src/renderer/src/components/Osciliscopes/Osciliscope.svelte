<script lang="ts">
  export let _Value: number = 0
  export let _Width: number = 300
  export let _Height: number = 150
  export let _Time: number = 0.6
  export let _Style: string = ''
  export let _ColorPrimary: string = '#3875dd'
  export let _ColorSecondary: string = '#ffffffaa'
  export let _Patterns: number = 7

  let _OsciliscopeID = crypto.randomUUID()
  let canvas: HTMLCanvasElement
  let ctx: CanvasRenderingContext2D

  function draw() {
    if (!ctx) return

    const w = canvas.width
    const h = canvas.height
    const amp = (h / 3) * (_Value / 10)
    const freq = 2 + _Value
    ctx.fillStyle = '#000'

    ctx.strokeStyle = _ColorPrimary
    ctx.lineWidth = 1
    for (let i = 0; i < _Patterns; i++) {
      ctx.fillRect(0, 0, w, h)
      ctx.globalCompositeOperation = i === 0 ? 'source-over' : 'lighter'
      ctx.beginPath()
      for (let x = 40; x < w + 40; x++) {
        const bend = Math.sin(x * 0.01) * 4
        const sine = Math.sin((x + _Time) * (0.1 / (i + 1)) * (freq / x + 1))
        const saw = ((x + _Time * (i + 1) * 1.2) % 120) / 60 - 1
        const tan = Math.tan((x + _Time * i) % 120) / 60 - 1
        let y = 0
        if (i % 2 === 0) {
          y = h / 3 + (((sine + saw) * amp) / i) * 0.5 + bend + 20
        } else {
          y = h / 2 + (((sine + tan) * amp) / i) * 0.5 + bend + 20
        }
        x === 0 ? ctx.moveTo(x - 40, y) : ctx.lineTo(x - 40, y)
      }

      ctx.stroke()
    }
    _Time += 0.2
    requestAnimationFrame(draw)
  }

  import { onMount } from 'svelte'

  onMount(() => {
    ctx = canvas.getContext('2d')!
    canvas.width = _Width
    canvas.height = _Height
    draw()
  })
</script>

<div
  id={_OsciliscopeID}
  class="oscilloscope scanlines"
  style="width: {_Width}px; height: {_Height}px; {_Style}"
>
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
