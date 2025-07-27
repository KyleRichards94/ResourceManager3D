<script lang="ts">
  import PollingLineGraph from './../Osciliscopes/PollingLineGraph.svelte'

  export let _Temp: number = 0

  const _Width = 500
  const _Height = 145
  const _MaxTemp = 150
</script>

<PollingLineGraph
  _Interval={1000}
  _Poll={async () => {
    return _Temp
  }}
  _MaxHeight={_MaxTemp}
  {_Width}
  {_Height}
  _MaxTitle="Max Temp"
  _StepTitle="Current Temp"
  _Unit="°C"
/>
