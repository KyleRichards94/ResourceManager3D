<script lang="ts">
  export let _Value: number = 5
  export let _Width: number = 300
  export let _Height: number = 300
  export let _Time: number = 0
  export let _Style: string = ''
  export let _ColorPrimary: string = '#3875dd'
  export let _ColorSecondary: string = '#ffffffaa'
  export let _Patterns: number = 6

  let _OscilloscopeID = crypto.randomUUID()
  let canvas: HTMLCanvasElement
  let ctx: CanvasRenderingContext2D

  function draw() {
    if (!ctx) return
    const w = canvas.width
    const h = canvas.height
    const cx = w / 2
    const cy = h / 2
    const amp = (Math.min(w, h) / 3) * (_Value / 10)

    ctx.clearRect(0, 0, w, h)

    for (let i = 1; i <= _Patterns; i++) {
      // dynamically boost petal count by value
      const k = i * (_Value / (i * 2))

      // phase offset per layer
      const phase = _Time * i * 0.3

      // base amplitude scales with overall amp, layer index, and value
      const baseAmp = amp * (i / _Patterns) * (_Value / 50)

      // noise amplitude as a fraction of baseAmp
      const noiseAmp = baseAmp * (_Value / 590)

      ctx.beginPath()
      ctx.strokeStyle = i % 2 === 0 ? _ColorPrimary : _ColorSecondary
      ctx.lineWidth = 1 + i * 0.2 // optional: thicker lines on higher layers
      ctx.globalCompositeOperation = i === 1 ? 'source-over' : 'lighter'

      // more steps = smoother curve when Value is high
      const steps = Math.floor(8 * i * (_Value / 5 + 1)) || 1

      for (let s = 0; s <= steps; s++) {
        const theta = (s / steps) * Math.PI * 2

        // rose radius
        let r = baseAmp * Math.sin(k * theta + phase)

        // smooth noise from Simplex (coords depend on theta & time)
        r += noiseAmp

        const x = cx + r * Math.cos(theta)
        const y = cy + r * Math.sin(theta)
        if (s === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }

      ctx.stroke()
    }

    _Time += 0.02
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
  id={_OscilloscopeID}
  class="oscilloscope scanlines"
  style="width: {_Width}px; height: {_Height}px; {_Style}"
>
  <canvas bind:this={canvas}></canvas>
</div>

<style>
  .oscilloscope {
    width: 100%;
    height: 100%;
    background: rgba(25, 24, 24, 0.2);
    border-radius: 4px;
    box-shadow: 0 0 12px #3875dd7f;
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
