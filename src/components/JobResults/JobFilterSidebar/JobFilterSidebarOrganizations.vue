<template>
  <collapsible-accordion header="Organizations">
    <div class="mt-5">
      <fieldset>
        <ul class="flex flex-row flex-wrap">
          <li class="h-8 w-1/2">
            <input id="VueTube" type="checkbox" class="mr-3" />
            <label for="VueTube">VueTube</label>
          </li>
          <li class="h-8 w-1/2">
            <input id="Between Vue" type="checkbox" class="mr-3" />
            <label for="Between Vue">Between Vue</label>
          </li>
          <li class="h-8 w-1/2">
            <input id="At Vue Brute" type="checkbox" class="mr-3" />
            <label for="At Vue Brute">At Vue Brute</label>
          </li>
          <li class="h-8 w-1/2">
            <input id="Vue and Half Man" type="checkbox" class="mr-3" />
            <label for="Vue and Half Man">Vue and Half Man</label>
          </li>
        </ul>
      </fieldset>
    </div>
  </collapsible-accordion>
</template>

<script>
import CollapsibleAccordion from "@/components/Shared/CollapsibleAccordion.vue";

export default {
  name: "JobFilterSidebarOrganizations",
  components: {
    CollapsibleAccordion,
  },
};
</script>
