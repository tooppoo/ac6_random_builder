<script lang="ts">
  import { domain, basePath } from '$lib/app-url';
  import i18n from '$lib/i18n/define';
  import { setContext } from 'svelte';

  setContext('i18n', i18n)
</script>

<svelte:head>
  <!-- OGP -->
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="AC6 ASSEMBLE TOOL" />
  <meta
    property="og:image"
    content={`${domain}/ogp/ac6_assembly_tool.png`}
  />
  <meta property="og:locale" content="ja_JP" />

  <meta name="twitter:card" content="summary" />
  <!-- End OGP -->

  <!-- Favicon -->
  <link rel="icon" type="image/svg+xml" href="/{basePath}/favicon/favicon.ico" />
  <link rel="icon" type="image/svg+xml" href="/{basePath}/favicon/favicon-16x16.png" />
  <link rel="icon" type="image/svg+xml" href="/{basePath}/favicon/favicon-32x32.png" />
  <link
    rel="icon"
    type="image/svg+xml"
    href="/{basePath}/favicon/apple-touch-icon.png"
  />
  <link
    rel="icon"
    type="image/svg+xml"
    href="/{basePath}/favicon/android-chrome-192x192.png"
  />
  <link
    rel="icon"
    type="image/svg+xml"
    href="/{basePath}/favicon/android-chrome-512x512.png"
  />
  <!-- End Favicon -->
</svelte:head>

<slot></slot>
