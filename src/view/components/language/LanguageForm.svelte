
<script lang="ts">
  import i18n from "~view/i18n/define.ts";

  function onChange(e: Event) {
    const target = e.target as HTMLInputElement
    const language = target.value

    $i18n.changeLanguage(language)
  }
</script>

<div>
  <select
    id="change-language"
    on:change={onChange}
  >
    <option value="ja" selected>日本語</option>
    <option value="en">English</option>
  </select>
</div>
