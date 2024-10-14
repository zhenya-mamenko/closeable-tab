<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row>
          <v-col>
            <h1 class="display-1">Closeable Tab</h1>
            <p class="mt-2">
              This component is a Vue 3 (Vuetify 3 based) closeable tab designed for use with Vuetify <b>v-tabs</b> component.
              It is a simple and easy-to-use component that allows you to create tabs, which can be closed by click on button.
            </p>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-tabs
              v-model="activeTab"
              class="mt-2 mb-0 ms-4 me-4"
              density="compact"
              :show-arrows="true"
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
            <v-window
              v-model="activeTab"
              class="mt-1"
              style="border: 1px solid #e0e0e0; min-height: 250px; height: 250px; min-width: 500px; width: 500px"
            >
            <v-empty-state
              v-if="tabs.length === 0"
              headline="Whoops"
              title="No tabs left"
              text="Thats all folks, try to reload the page"
            ></v-empty-state>
              <v-window-item v-for="item in tabs"
                class="ma-3"
                :key="item.id"
                :value="item.id"
              >
                <div
                  v-if="item.name === ''"
                >
                  <h3
                    class="mb-3"
                  >
                    Press button to save the tab
                  </h3>
                  <v-btn
                    @click="saveTab(item.id)"
                    text
                    color="primary"
                  >
                    Save
                  </v-btn>
                </div>
                <div
                  v-if="item.name !== ''"
                >
                  <h3>
                    {{ item.name }}
                  </h3>
                </div>
              </v-window-item>
            </v-window>

          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-alert
              v-if="errorMessage"
              type="error"
              dismissible
              elevation="2"
              icon="mdi-alert"
            >
              {{ errorMessage }}
            </v-alert>
          </v-col>
        </v-row>
        <v-footer><p>Copyright (c) 2024-present, &nbsp; <a href="https://github.com/zhenya-mamenko/closeable-tab/">Zhenya Mamenko</a></p></v-footer>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import CloseableTab from '@mamenko/closeable-tab';

export default {
  components: {
    CloseableTab
  },

  data() {
    return {
      errorMessage: "",
      activeTab: "tab1",
      tabs: [
        { id: "tab1", name: "Tab 1", modified: false,  },
        { id: "tab2", name: "Tab 2", modified: false,  },
        { id: "tab3", name: "", modified: true,  },
      ],
    }
  },

  methods: {
    closeRequest(tabId) {
      const tabIndex = this.tabs.findIndex(tab => tab.id === tabId);
      if (!this.tabs[tabIndex].modified) {
        this.tabs.splice(tabIndex, 1);
        this.activeTab = this.tabs.length > tabIndex ? this.tabs[tabIndex].id : (this.tabs.length > 0 ? this.tabs[tabIndex-1].id : "");
      }
      else {
        this.errorMessage = "Save tab before closing";
      }
    },
    saveTab(tabId) {
      const tab = this.tabs.find(tab => tab.id === tabId);
      tab.name = `Tab ${tabId.substring(3)}`;
      tab.modified = false;
    }
  },

  watch: {
    errorMessage(value) {
      if (value) {
        setTimeout(() => {
          this.errorMessage = "";
        }, 3000);
      }
    }
  },
}
</script>
