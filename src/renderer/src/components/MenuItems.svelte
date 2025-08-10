<script lang="ts">
  import { Vector3 } from '../../../classes/Vector3.js'
  import { CurrentView, Views } from '../../../classes/SPAViewModel.js'
  // Import the ThreeRender component
  import ThreeRender from './Three/ThreeRender.svelte'
  import ModelUrl from '../assets/Cpu.glb?url'

  let _WidthHeight = 80
</script>

<div class="row align-items-center justify-content-center pb-3 border-top p-3">
  <div
    on:click={() => CurrentView.set(Views.CpuInfo)}
    class="col menuitem {$CurrentView === Views.CpuInfo ? 'selected-item scanlines' : ''}"
    style="cursor: pointer;"
  >
    <ThreeRender
      _Title="Cpu Info menu"
      _RenderHeight={_WidthHeight}
      _RenderWidth={_WidthHeight}
      _Style="cursor:pointer"
      _ModelUrl={ModelUrl}
      _Rotation={new Vector3(0.01, 0.002, 0)}
    />
    <span class="menu-item-label"> CPU</span>
  </div>
  <!--   
  <div on:click={() => CurrentView.set(Views.TaskManager)} class="col menuitem {$CurrentView === Views.TaskManager ? 'selected-item scanlines' : ''}" style="cursor: pointer;">
        <ThreeRender _Title="Cpu Info menu" 
          _RenderHeight={_WidthHeight}
          _RenderWidth={_WidthHeight} 
          _Style="cursor:pointer" 
          _ModelUrl={ModelUrl} 
          _Rotation={new Vector3(0.01,0.002,0)}
          />
          <span class="menu-item-label"> Task Manger</span>
  </div> -->

  <div
    on:click={() => CurrentView.set(Views.MemoryInfo)}
    class="col menuitem {$CurrentView === Views.MemoryInfo ? 'selected-item scanlines' : ''}"
    style="cursor: pointer;"
  >
    <ThreeRender
      _Title="Cpu Info menu"
      _RenderHeight={_WidthHeight}
      _RenderWidth={_WidthHeight}
      _Style="cursor:pointer"
      _ModelUrl={ModelUrl}
      _Rotation={new Vector3(0.01, 0.002, 0)}
    />
    <span class="menu-item-label"> Memory</span>
  </div>

  <div
    on:click={() => CurrentView.set(Views.GPUInfo)}
    class="col menuitem {$CurrentView === Views.GPUInfo ? 'selected-item scanlines' : ''}"
    style="cursor: pointer;"
  >
    <ThreeRender
      _Title="Cpu Info menu"
      _RenderHeight={_WidthHeight}
      _RenderWidth={_WidthHeight}
      _Style="cursor:pointer"
      _ModelUrl={ModelUrl}
      _Rotation={new Vector3(0.01, 0.002, 0)}
    />
    <span class="menu-item-label"> GPU </span>
  </div>

  <div
    on:click={() => CurrentView.set(Views.DiskInfo)}
    class="col menuitem {$CurrentView === Views.DiskInfo ? 'selected-item scanlines' : ''}"
    style="cursor: pointer;"
  >
    <ThreeRender
      _Title="Cpu Info menu"
      _RenderHeight={_WidthHeight}
      _RenderWidth={_WidthHeight}
      _Style="cursor:pointer"
      _ModelUrl={ModelUrl}
      _Rotation={new Vector3(0.01, 0.002, 0)}
    />
    <span class="menu-item-label"> Disk </span>
  </div>

  <div
    on:click={() => CurrentView.set(Views.NetworkInfo)}
    class="col menuitem {$CurrentView === Views.NetworkInfo ? 'selected-item scanlines' : ''}"
    style="cursor: pointer;"
  >
    <ThreeRender
      _Title="Cpu Info menu"
      _RenderHeight={_WidthHeight}
      _RenderWidth={_WidthHeight}
      _Style="cursor:pointer"
      _ModelUrl={ModelUrl}
      _Rotation={new Vector3(0.01, 0.002, 0)}
    />
    <span class="menu-item-label"> Network </span>
  </div>
</div>

<style>
  .menu-item-label {
    position: absolute;
    top: 0;
    right: 0;
    margin-right: 5px;
    padding: 0px;
  }

  .menuitem {
    font-family: 'Share Tech Mono', monospace;
    position: relative;
    width: 80px;
    height: 80px;
    margin: 0 12px;
    border-radius: 6px;
    background: rgba(0, 0, 0, 0.4);
    border: 2px solid rgba(255, 255, 255, 0.05);
    box-shadow:
      inset 0 0 8px rgba(0, 255, 255, 0.2),
      0 0 10px rgba(0, 255, 255, 0.15);
    backdrop-filter: blur(4px);
    transition: all 0.2s ease-in-out;
  }

  .menuitem:hover {
    border: 2px solid rgba(0, 255, 255, 0.5);
    box-shadow:
      inset 0 0 12px rgba(0, 255, 255, 0.4),
      0 0 12px rgba(0, 255, 255, 0.4);
    transform: scale(1.05);
    cursor: pointer;
  }

  .selected-item {
    border: 2px solid white;
    box-shadow:
      0 0 10px rgba(255, 255, 255, 0.6),
      inset 0 0 8px rgba(255, 255, 255, 0.3);
    border-radius: 6px;
  }

  .selected-item {
    animation: pulseGlow 1.2s infinite alternate ease-in-out;
  }

  @keyframes pulseGlow {
    from {
      box-shadow:
        0 0 10px #00ffff55,
        inset 0 0 6px #00ffff33;
    }
    to {
      box-shadow:
        0 0 14px #00ffffaa,
        inset 0 0 12px #00ffff66;
    }
  }
</style>
