<script lang="ts">
  import { onMount } from 'svelte'

  export let _Temp: number = 0

  let canvas: HTMLCanvasElement
  let ctx: CanvasRenderingContext2D

  const _Width = 200
  const _Height = 100
  const _Radius = 90
  const _CenterX = _Width / 2
  const _CenterY = _Height
  const _MaxTemp = 100

  function drawGauge(temp: number): void {
    if (_Temp) {
      ctx.clearRect(0, 0, _Width, _Height)

      // Background Arc (black)
      ctx.beginPath()
      ctx.arc(_CenterX, _CenterY, _Radius, Math.PI, 0, false)
      ctx.fillStyle = 'black'
      ctx.fill()
      ctx.closePath()

      // Usage Arc (blue)
      const tempRatio = Math.min(temp / _MaxTemp, 1)
      const usageEndAngle = Math.PI + Math.PI * tempRatio
      ctx.beginPath()
      ctx.moveTo(_CenterX, _CenterY)
      ctx.arc(_CenterX, _CenterY, _Radius, Math.PI, usageEndAngle, false)
      ctx.fillStyle = '#3571b8'
      ctx.fill()
      ctx.closePath()

      // Foreground Cover (black, inner ring)
      ctx.beginPath()
      ctx.arc(_CenterX, _CenterY, _Radius - 20, Math.PI, 0, false)
      ctx.fillStyle = 'black'
      ctx.fill()
      ctx.closePath()

      // Text (temperature)
      ctx.fillStyle = 'white'
      ctx.font = 'bold 16px monospace'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(`${temp}°C`, _CenterX, _CenterY - 10)
    }
  }

  onMount(() => {
    ctx = canvas.getContext('2d')!
    drawGauge(_Temp)
  })

  $: drawGauge(_Temp)
</script>

<div tyle="width:{_Width}px; height:{_Height}px;">
  <canvas bind:this={canvas} width={_Width} height={_Height} />
</div>
