<script lang="ts">
  import { onMount } from 'svelte'

  const _Width = 300
  const _Height = 100
  export let _Interval: number = 1000
  export let _Poll: () => Promise<number>
  export let _Label: string = 'Value'
  export let _Unit: string = ''
  export let _Color: string = '#00f0ff'

  const MAX_POINTS = _Width

  let _MaxValue: number = 0
  let _LastValue: number = 0
  let data: number[] = []
  let canvas: HTMLCanvasElement

  function drawGraph(): void {
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.clearRect(0, 0, _Width, _Height)

    ctx.font = '12px monospace'
    ctx.fillStyle = 'white'

    ctx.textAlign = 'left'
    ctx.textBaseline = 'top'
    ctx.fillText(`Max ${_Label}: ${_MaxValue.toFixed(2)}${_Unit}`, 10, 10)

    ctx.textAlign = 'right'
    ctx.textBaseline = 'bottom'
    ctx.fillText(`${_Label}: ${_LastValue.toFixed(2)}${_Unit}`, _Width - 10, _Height - 10)

    // Draw axes
    ctx.strokeStyle = 'lime'
    ctx.beginPath()
    ctx.moveTo(0, _Height)
    ctx.lineTo(_Width, _Height) // X axis
    ctx.moveTo(0, 0)
    ctx.lineTo(0, _Height) // Y axis
    ctx.stroke()

    // Draw line
    ctx.strokeStyle = _Color
    ctx.beginPath()
    data.forEach((val, i) => {
      const x = i
      const y = _Height - (val / _MaxValue) * _Height
      if (i === 0) ctx.moveTo(x, y)
      else ctx.lineTo(x, y)
    })
    ctx.stroke()
  }

  async function pollData(): Promise<void> {
    try {
      const value = await _Poll()
      _LastValue = value
      if (value > _MaxValue) _MaxValue = value
      data.push(value)
      if (data.length > MAX_POINTS) data.shift()
      drawGraph()
    } catch (err) {
      console.error('Polling failed:', err)
    }
  }

  onMount(() => {
    drawGraph()
    const interval = setInterval(pollData, _Interval)
    return () => clearInterval(interval)
  })
</script>

<canvas bind:this={canvas} width={_Width} height={_Height} class="border border-dark glass" />
