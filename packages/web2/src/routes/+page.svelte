<script lang="ts">
  import { baseUrl } from '$lib/app-url';
  import Index from '$lib/view/index/Index.svelte'
  import { type PageData } from './+page'

  export let data: PageData
</script>

<svelte:head>
  <!-- url -->
  <link rel="canonical" href={baseUrl} />
  <meta property="og:url" content={baseUrl} />

  <!-- title -->
  <title>
    AC6 ASSEMBLE TOOL(UNOFFICIAL) | ARMORED CORE Ⅵ FIRES OF RUBICON
  </title>
  <meta
    property="og:title"
    content="AC6 ASSEMBLE TOOL(UNOFFICIAL) | ARMORED CORE Ⅵ FIRES OF RUBICON"
  />

  <!-- description -->
  <meta
    name="description"
    content="ARMORED CORE Ⅵ FIRES OF RUBICON 用 非公式アセンブル支援ツール。部位ごとのパーツ固定や条件設定によるアセンブルを生成、およびアセンブルのステータスを確認可能。"
  />
  <meta
    property="og:description"
    content="ARMORED CORE Ⅵ FIRES OF RUBICON 用 非公式アセンブル支援ツール。部位ごとのパーツ固定や条件設定によるアセンブルを生成、およびアセンブルのステータスを確認可能。"
  />
</svelte:head>

<Index
  regulation={data.regulation}
/>
