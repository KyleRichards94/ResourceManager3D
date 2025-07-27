<script lang="ts">
  import type { SystemInfo } from 'systeminformation'
  import stringSimilarity from 'string-similarity'

  export let _Controllers: SystemInfo['GraphicsControllerData'][] | null = null

  function getModelString(controller: SystemInfo['GraphicsControllerData']) {
    return controller.model
      .split(' ')
      .filter(
        (modelWord) =>
          !controller.vendor
            .split(' ')
            .some(
              (vendorWord) =>
                stringSimilarity.compareTwoStrings(
                  modelWord.toLowerCase(),
                  vendorWord.toLowerCase()
                ) > 0.6
            )
      )
      .join(' ')
      .trim()
  }
</script>

<div class="container">
  <div class="scanlines glass border border-dark p-2 dos-box">
    <table>
      <thead>
        <tr>
          <td></td>
          {#each _Controllers as controller, i}
            <td>|{controller.vendor}</td>
          {/each}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Model</td>
          {#each _Controllers as controller, i}
            <td>|{getModelString(controller)}</td>
          {/each}
        </tr>
        <tr>
          <td>VRAM</td>
          {#each _Controllers as controller, i}
            <td>|{controller.vram / 1000} GB</td>
          {/each}
        </tr>
        <tr>
          <td>ID</td>
          {#each _Controllers as controller, i}
            <td>|{controller.subDeviceId}</td>
          {/each}
        </tr>
      </tbody>
    </table>
  </div>
</div>
