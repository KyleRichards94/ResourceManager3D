<script lang="ts">
  import { Vector3 } from '../../../../classes/Vector3.js'
  import ThreeRender from './../Three/ThreeRender.svelte'
  import ModelUrl from '../../assets/Cpu.glb?url'
  import { toGB } from './../../../../classes/SPAViewModel.ts'
  import { onMount } from 'svelte'
  import type { SystemInfo } from 'systeminformation'

  let fsBlockDevices: SystemInfo['BlockDevicesData'][] | null = null

  onMount(async () => {
    try {
      await window.api.getFSBlockDevices().then((res) => {
        fsBlockDevices = res
      })
    } catch (error) {
      console.error('Error loading file system data:', error)
    }
  })
</script>

<div class="container-fluid">
  <div class="row">
    {#each fsBlockDevices as device (device.uuid)}
      <div class="col-sm-4 position-relative scanlines">
        <ThreeRender
          _Style="z-index:0;"
          _RenderHeight={290}
          _RenderWidth={290}
          _ModelUrl={ModelUrl}
          _Rotation={new Vector3(0.001, 0.0, 0.01)}
        />
        <h3 class="text-center mb-3">{device.label ? device.label : 'Unnamed'}</h3>
        <div class="mb-2">
          <div class="row">
            <div class="col-6">
              <span>Type: {device.type || 'N/A'}</span>
            </div>
            <div class="col-6">
              <span>Size: {device.size ? toGB(device.size) + 'GB' : 'N/A'}</span>
            </div>
          </div>
          <div class="row">
            <div class="col-6">
              <span>Mount: {device.mount || 'N/A'}</span>
            </div>
            <div class="col-6">
              <span>UUID: {device.uuid ? device.uuid : 'N/A'} </span>
            </div>
          </div>
        </div>
      </div>
    {/each}
  </div>
</div>
