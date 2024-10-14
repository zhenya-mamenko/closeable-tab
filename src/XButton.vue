<template>
  <v-hover
    v-slot="{ isHovering, props }"
  >
    <div
      :class="['pa-0', 'x-button', $attrs.class]"
      v-bind="props"
    >
      <v-btn v-if="isHovering || (!!active && !modified)"
        class="close"
        flat
        :size="size || 'x-small'"
        @click="$emit('click', $event)"
      >
        <v-icon
          :class="closeIconClass || 'text-grey'"
          :icon="closeIconName || '$close'"
        />
      </v-btn>
      <v-icon v-if="!!modified && !isHovering"
        :class="modifiedIconClass || 'text-primary'"
        :icon="modifiedIconName || 'mdi-circle'"
        :size="size || 'x-small'"
      />
    </div>
  </v-hover>
</template>

<script lang="ts">
export default {
  name: "XButton",

  emits: ['click'],

  inheritAttrs: false,

  props: {
    active: Boolean,
    closeIconClass: String,
    closeIconName: String,
    modified: Boolean,
    modifiedIconClass: String,
    modifiedIconName: String,
    size: {
      type: [String, Number],
    },
  },
}
</script>

<style>
  .x-button {
    --spacer-size: 20px;
    --spacer-margin-top: 3px;
    --button-size: 18px;
    --button-margin-top: -3px;
    --button-padding-top: 2px;

    display: flex;
    justify-content: center;

    height: var(--spacer-size);
    margin-top: var(--spacer-margin-top);
    max-height: var(--spacer-size);
    max-width: var(--spacer-size);
    min-height: var(--spacer-size);
    min-width: var(--spacer-size);
    width: var(--spacer-size);
  }

  .x-button .close {
    height: var(--button-size);
    margin-top: var(--button-margin-top);
    max-height: var(--button-size);
    max-width: var(--button-size);
    min-height: var(--button-size);
    min-width: var(--button-size);
    padding-top: var(--button-padding-top);
    width: var(--button-size);
  }
</style>
