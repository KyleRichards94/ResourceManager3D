<script lang="ts">
  import { onMount } from 'svelte'
  import type { SystemInfo } from 'systeminformation'

  export let _Displays: SystemInfo['GraphicsDisplayData'][] | null = null

  let _Padding = 20

  let _Width =
    _Displays.reduce((sum, display) => sum + display.resolutionX, 0) / 10 +
    (_Displays.length - 1) * _Padding
  let _Height = Math.max(..._Displays.map((d) => d.resolutionY)) / 10 + 20

  onMount(() => {
    console.log(_Width)
    const canvas = document.getElementById('display-canvas') as HTMLCanvasElement
    const ctx = canvas.getContext('2d')

    if (ctx) {
      _Displays?.forEach((display, index) => {
        ctx.fillStyle = 'red'

        if (display.main) {
          ctx.strokeStyle = 'lime'
          ctx.lineWidth = 1
        } else {
          ctx.strokeStyle = 'black'
        }

        let _Width = display.resolutionX / 10
        let _Height = display.resolutionY / 10
        let _X = index === 0 ? 0 : _Displays[index - 1].resolutionX / 10 + _Padding
        let _Y = 0

        ctx.strokeRect(_X, _Y, _Width, _Height)

        const _Resolution = `${display.resolutionX} x ${display.resolutionY}`
        const _Vendor = `${display.model}`
        const _RefreshRate = `${display.currentRefreshRate} Hz`
        const _AdditionalInfo = `p-depth:${display.pixelDepth} port: ${display.connection} ${display.sizeX}x${display.sizeY}`

        ctx.fillStyle = 'white'
        ctx.font = '12px monospace'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'

        ctx.fillText(_Vendor, _X + _Width / 2, _Y + _Height / 2 - 30)
        ctx.fillText(_RefreshRate, _X + _Width / 2, _Y + _Height / 2 - 15)
        ctx.fillText(_Resolution, _X + _Width / 2, _Y + _Height / 2)

        ctx.font = '10px monospace'
        ctx.textAlign = 'left'
        ctx.textBaseline = 'middle'
        ctx.fillText(_AdditionalInfo, _X, _Y + _Height + 10)

        const _OsciliscopeWidth = _Width / 3
        const _OsciliscopeHeight = 30
        const _OsciliscopeX = _X + _Width / 2 - _OsciliscopeWidth / 2
        const _OsciliscopeY = _Y + _Height - _OsciliscopeHeight - 10
        let _Time = 0
        function drawOscilloscope(): void {
          ctx.beginPath()
          ctx.clearRect(_OsciliscopeX, _OsciliscopeY, _OsciliscopeWidth, _OsciliscopeHeight)

          ctx.strokeStyle = 'lime'
          ctx.lineWidth = 1

          for (let i = 0; i < _OsciliscopeWidth; i++) {
            const t = (i + _Time) / 10
            const yOffset = Math.sin(t) * (_OsciliscopeHeight / 3)
            const yPos = _OsciliscopeY + _OsciliscopeHeight / 2 + yOffset

            if (i === 0) ctx.moveTo(_OsciliscopeX + i, yPos)
            else ctx.lineTo(_OsciliscopeX + i, yPos)
          }

          ctx.stroke()
          _Time += display.currentRefreshRate

          setTimeout(
            () => {
              drawOscilloscope()
            },
            1000 / (display.currentRefreshRate || 60)
          )
        }

        drawOscilloscope()
      })
    }
  })
</script>

<div
  class="scanlines glass border border-dark w-100 p-2 m-0 dos-box align-content-center justify-content-center"
>
  <canvas
    style="transform: translate(50%, 0);"
    id="display-canvas"
    width="{_Width}px"
    height="{_Height}px"
  ></canvas>
</div>
