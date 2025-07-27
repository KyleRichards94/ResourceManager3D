<script lang="ts">
  import { onMount } from 'svelte'

  export let _Interval: number = 1000
  export let _Poll: () => Promise<unknown>
  export let _MaxHeight: number = 100

  export let _Width: number = 250
  export let _Height: number = 100
  export let _MaxTitle: string = 'Max'
  export let _StepTitle: string = 'Current'
  export let _Unit: string = 'W'

  const MAX_POINTS = _Width

  let _Title: string = ''
  let _Data: number[] = []
  let canvas: HTMLCanvasElement

  function drawGraph(): void {
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.clearRect(0, 0, _Width, _Height)

    ctx.font = '12px monospace'
    ctx.fillStyle = 'white'

    ctx.textAlign = 'left'
    ctx.textBaseline = 'left'
    ctx.fillText(`${_MaxTitle}: ${_MaxHeight}${_Unit}`, 10, 20)

    ctx.textAlign = 'right'
    ctx.textBaseline = 'right'
    ctx.fillText(`${_StepTitle}: ${_Data[_Data.length - 1]}${_Unit}`, _Width - 10, _Height - 10)
    _Title = `${_Data[_Data.length - 1]}${_Unit}`
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
    _Data.forEach((val, i) => {
      const x = i
      const y = _Height - (val / _MaxHeight) * _Height
      if (i === 0) ctx.moveTo(x, y)
      else ctx.lineTo(x, y)
    })
    ctx.stroke()
  }

  async function pollPower(): void {
    let _Tick: number = 0
    _Tick = (await _Poll()) as number
    _Data.push(_Tick)
    if (_Data.length > MAX_POINTS) _Data.shift()
    drawGraph()
  }

  onMount(() => {
    drawGraph()
    const interval = setInterval(pollPower, _Interval)
    return () => clearInterval(interval)
  })
</script>

<canvas title={_Title} bind:this={canvas} width={_Width} height={_Height} />
