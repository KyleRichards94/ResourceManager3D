<script lang="ts">
  import { onMount } from 'svelte'

  const _Width = 250
  const _Height = 100
  export let _Interval: number = 1000
  const MAX_POINTS = _Width

  let _MaxPower: number = 0
  let powerData: number[] = []
  let canvas: HTMLCanvasElement

  function drawGraph(): void {
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.clearRect(0, 0, _Width, _Height)

    ctx.font = '12px monospace'
    ctx.fillStyle = 'white'

    ctx.textAlign = 'left'
    ctx.textBaseline = 'left'
    ctx.fillText(`Max Power: ${_MaxPower}W`, 10, 20)

    ctx.textAlign = 'right'
    ctx.textBaseline = 'right'
    ctx.fillText(`Power Draw: ${powerData[powerData.length - 1]}W`, _Width - 10, _Height - 10)

    // Draw axes
    ctx.strokeStyle = 'lime'
    ctx.beginPath()
    ctx.moveTo(0, _Height)
    ctx.lineTo(_Width, _Height) // X axis
    ctx.moveTo(0, 0)
    ctx.lineTo(0, _Height) // Y axis
    ctx.stroke()

    // Draw power line
    ctx.strokeStyle = '#00f0ff'
    ctx.beginPath()
    powerData.forEach((val, i) => {
      const x = i
      const y = _Height - (val / _MaxPower) * _Height
      if (i === 0) ctx.moveTo(x, y)
      else ctx.lineTo(x, y)
    })
    ctx.stroke()
  }

  async function pollPower(): void {
    let _PowerDraw: number = 0
    await window.api.getPowerDraw().then((res) => {
      _PowerDraw = res['power.draw']
      _MaxPower = res['power.limit']
    })
    powerData.push(_PowerDraw)
    if (powerData.length > MAX_POINTS) powerData.shift()
    drawGraph()
  }

  onMount(() => {
    drawGraph()
    const interval = setInterval(pollPower, _Interval)
    return () => clearInterval(interval)
  })
</script>

<canvas bind:this={canvas} width={_Width} height={_Height} class="border border-dark glass" />
