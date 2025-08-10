<script lang="ts">
  import Osciliscope from './../Osciliscopes/Osciliscope.svelte'
  import BarGraph from './../Shared/BarGraph.svelte'
  import PollingLineGraph from './../Osciliscopes/PollingLineGraph.svelte'
  import { onMount } from 'svelte'

  let netStats
  let netCons
  let wifiNets
  let wifiInter
  let wifiCons

  let _MaxMSHeight: number = 150

  let _MaxRXHeight: number = 0

  onMount(async () => {
    setInterval(async () => {
      await window.api.getNet().then((res) => {
        if (res[0].rx_sec > _MaxRXHeight) _MaxRXHeight = res[0].rx_sec
        if (res[0].ms > _MaxMSHeight) _MaxMSHeight = res[0].ms
        netStats = res
      })
    }, 2000)
    // setInterval(async () => {
    //   await window.api.getNetworkConnections().then((res) => {
    //     console.log(res)
    //     netCons = res
    //   })
    // }, 1000)
    await window.api.getWifiNetworks().then((res) => {
      wifiNets = res
    })
    await window.api.getWifiInterfaces().then((res) => {
      wifiInter = res
    })
    setInterval(async () => {
      await window.api.getWifiConnections().then((res) => {
        console.log(res)
        wifiCons = res
      })
    }, 1000)
  })

  //netStats
  const _Width = 450
  const _Height = 145
  const _Interval: number = 1000
</script>

{#if netStats && wifiNets}
  <div class="scanlines">
    <p>Wifi Network: {wifiNets[0].ssid}</p>
    {netStats[0].iface}
    <div class="row position-relative">
      <div class="col-md-6 p-3">
        <PollingLineGraph
          _MaxTitle="bytes"
          _StepTitle="rx/sec"
          _Unit="bytes"
          _Interval={200}
          _Poll={() => {
            return netStats[0].rx_sec
          }}
          {_Width}
          {_Height}
          _MaxHeight={_MaxRXHeight}
        ></PollingLineGraph>
      </div>

      <div class="col-md-6 p-3">
        <PollingLineGraph
          _MaxTitle="latency"
          _StepTitle="time"
          _Unit="ms"
          _Poll={() => {
            return netStats[0].ms
          }}
          {_Interval}
          {_Width}
          {_Height}
          _MaxHeight={_MaxMSHeight}
        ></PollingLineGraph>
      </div>
    </div>

    <div class="row">
      <div class="col-md-4">
        {#if wifiInter}
          <p>{wifiInter[0].model}</p>
          <p>Vendor: {wifiInter[0].vendor}</p>
          <p>Mac Addr: {wifiInter[0].mac}</p>
        {/if}
      </div>
      <div class="col-md-4">
        <p>SID: {wifiNets[0].bssid}</p>
        <p>Security: {wifiNets[0].security}</p>
        <p>WPA flags: {wifiNets[0].wpaFlags}</p>
      </div>
      <div class="col-md-4">
        {#if wifiCons}
          <Osciliscope
            _Patterns={4}
            _Style=""
            _Width={300}
            _Height={200}
            _Value={(netStats[0].rx_sec / 1024 / netStats[0].ms) * (wifiCons[0].frequency / 50)}
          ></Osciliscope>
        {/if}
      </div>
    </div>
    <span class="text-center">Signal Quality</span>
    <BarGraph
      used={wifiNets[0].quality}
      total={100}
      showLabels
      delimeter="%"
      usedLabel="quality"
      freeLabel={null}
    ></BarGraph>
  </div>
{/if}
