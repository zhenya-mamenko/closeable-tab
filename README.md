# CloseableTab

This component is a Vue 3 (Vuetify 3 based) closeable tab designed for use with `v-tabs` component.

## Installation

You can install the component via npm:

```bash
npm install --save @mamenko/closeable-tab
```

## Usage

```html
<template>
  <v-tabs
    v-model="activeTab"
  >
    <closeable-tab v-for="item in tabs"
      :key="item.id"
      :value="item.id"
      :is-modified="item.modified"
      @closeRequest="closeRequest"
    >
      {{ item.name != "" ? item.name : "New tab" }}
    </closeable-tab>
  </v-tabs>
</template>

<script>
import CloseableTab from '@mamenko/closeable-tab';

export default {
  components: {
    CloseableTab
  },
  data() {
    return {
      activeTab: "tab1",
      tabs: [
        { id: "tab1", name: "Tab 1", modified: false,  },
        // ...
      ],
    };
  },
  methods: {
    closeRequest(tabId) {
      const tabIndex = this.tabs.findIndex(tab => tab.id === tabId);
      if (this.tabs[tabIndex].modified) {
        // e.g. show message
      } else {
        this.tabs.splice(tabIndex, 1);
        this.activeTab = this.tabs.length > tabIndex ? this.tabs[tabIndex].id : (this.tabs.length > 0 ? this.tabs[tabIndex-1].id : "");
      }
    }
  },
};
</script>
```

## Props

* `buttonIcons` (Object): Properties for `close` and `modified` states of the tab's button.
  ```javascript
  {
    close: {
      class: "text-grey",
      icon: "$close",
    },
    modified: {
      class: "text-primary",
      icon: "mdi-circle",
    },
    size: "x-small",
    // Sets the height and width of the tab's button.
    // Refer v-btn component page: https://vuetifyjs.com/en/components/buttons/#props-size
  }
  ```
* `isModified` (Boolean): Sets `modified` state for the tab.
* `value` (string): Value for the tab.

## Events

* `closeRequest` (tabValue: String): Triggered when the tab's button clicked.

## Styles

CSS variables define some visual aspects of the closeable tab component. These properties can be customized or overridden to achieve the desired visual appearance of the tab close button.

```css
  .x-button {
    --spacer-size: 20px;
    --spacer-margin-top: 3px;
    --button-size: 18px;
    --button-margin-top: -3px;
    --button-padding-top: 2px;
  }
```

## Example

The component is in action on the [site](http://zhenya-mamenko.github.io/closeable-tab).

[Source](https://github.com/zhenya-mamenko/closeable-tab/tree/main/example).

## Dependencies

This component requires `vue` version 3.4.31 and above; `vuetify` version 3.7.2 and above.

## License

This project is licensed under the MIT License.

## Author

[Zhenya Mamenko](https://github.com/zhenya-mamenko/closeable-tab)
