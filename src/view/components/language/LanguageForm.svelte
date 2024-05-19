
<script lang="ts">
  import i18n from "~view/i18n/define.ts";
</script>

<div>
  <select
    id="change-language"
    on:change={({ target }) => {
      $i18n.changeLanguage(target.value)
    }}
  >
    <option value="ja" selected>日本語</option>
    <option value="en">English</option>
  </select>
</div>
