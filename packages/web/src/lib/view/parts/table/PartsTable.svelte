<script lang="ts">
  import type { AssemblyKey } from '@ac6_assemble_tool/core/assembly/assembly'
  import { type Candidates } from '@ac6_assemble_tool/parts/types/candidates'
  import { Column, Table } from '@sveltestrap/sveltestrap'

  export let title: string
  export let key: AssemblyKey
  export let candidates: Candidates

  let tableRows: Candidates[typeof key][number][] = [...candidates[key]]
</script>

<div>{title}</div>

<Table bordered={true} responsive={true} size="sm" rows={tableRows} let:row>
  {#if row !== undefined}
    <Column header="Name">
      {row.name}
    </Column>
  {/if}
</Table>
