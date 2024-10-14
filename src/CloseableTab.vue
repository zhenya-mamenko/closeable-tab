<template>
  <v-tab ref="tab"
    class="pe-1 ps-4"
    :value="value"
  >
    <div class="d-flex">
      <slot />
      <x-button
        :active="isSelected"
        :closeIconClass="buttonIcons?.close?.class || 'text-grey'"
        :closeIconName="buttonIcons?.close?.icon || '$close'"
        :modified="!!isModified"
        :modifiedIconClass="buttonIcons?.modified?.class || 'text-primary text-medium-emphasis'"
        :modifiedIconName="buttonIcons?.modified?.icon || 'mdi-circle'"
        :size="buttonIcons?.size || 'x-small'"
        @click.stop="handleClose"
      />
    </div>
  </v-tab>
</template>

<script lang="ts">
import XButton from './XButton.vue'
import { type VTab } from "vuetify/components/VTabs"

export default {
  name: "CloseableTab",

  components: {
    XButton
  },

  data: () => ({
    isSelected: true,
  }),

  emits: [
    'closeRequest'
  ],

  methods: {
    handleClose() {
      this.$emit('closeRequest', this.value)
    }
  },

  mounted () {
    (this.$refs.tab as VTab).$watch('isSelected', (isSelected: boolean) => {
      this.isSelected = isSelected;
    })
  },

  props: {
    buttonIcons: {
      type: Object,
      default: () => ({
        close: {
          class: "text-grey",
          icon: "$close",
        },
        modified: {
          class: "text-primary",
          icon: "mdi-circle",
        },
        size: "x-small",
      }),
    },
    isModified: Boolean,
    value: {
      type: String,
      required: true,
    },
  },

}
</script>
