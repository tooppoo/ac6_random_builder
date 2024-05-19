
<script lang="ts">
  import i18n from "~view/i18n/define.ts";

  const defaultLanguage: string = 'ja'
  const languageQuery: string = 'lng'

  // state
  let language: string

  const languages = (() => {
    const defLng = (opt: { value: string, label: string }) => ({
      ...opt,
      isSelected: () => language === opt.value,
    })

    return [
      defLng({ value: 'ja', label: '日本語' }),
      defLng({ value: 'en', label: 'English' }),
    ]
  })()

  // handler
  $: {
    $i18n.changeLanguage(language)

    setLanguageQuery()
  }
  function onChange(e: Event) {
    const target = e.target as HTMLInputElement
    language = target.value
  }

  // setup
  function initialize() {
    const url = new URL(location.href)

    language = url.searchParams.get(languageQuery) || defaultLanguage
  }
  function setLanguageQuery() {
    const url = new URL(location.href)
    const query = url.searchParams

    query.set(languageQuery, language)
    url.search = query.toString()

    history.pushState({}, '', url)
  }

  initialize()
</script>

{#if language !== undefined}
<div>
  <select
    id="change-language"
    on:change={onChange}
    bind:value={language}
  >
    {#each languages as lng}
      <option
        value={lng.value}
        selected={lng.isSelected()}
      >
        {lng.label}
      </option>
    {/each}
  </select>
</div>
{/if}