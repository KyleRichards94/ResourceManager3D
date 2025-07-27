<script lang="ts">
  import PollingLineGraph from './../Osciliscopes/PollingLineGraph.svelte'
  import { onMount } from 'svelte'

  const _Width = 500
  const _Height = 145
  const _Interval: number = 1000

  let _MaxPower: number = 0

  onMount(async () => {
    await window.api.getPowerDraw().then((res) => {
      _MaxPower = res['power.limit']
    })
  })
</script>

<PollingLineGraph
  {_Interval}
  _Poll={async () => {
    const _Response = await window.api.getPowerDraw().then((res) => {
      return res['power.draw']
    })
    return _Response
  }}
  _MaxHeight={_MaxPower}
  {_Width}
  {_Height}
  _MaxTitle="Max Power"
  _StepTitle="Power Draw"
  _Unit="W"
/>
