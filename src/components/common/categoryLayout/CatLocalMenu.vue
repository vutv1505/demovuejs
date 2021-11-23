<template>
  <div v-if="localMenu">
    <action-button
      v-for="(action, actionName) in localMenu"
      v-if="!action.hidden"
      :key="actionName"
      :disabled="action.button.disabled"
      variant="outline-primary"
      size="sm"
      :hidden="action.button.hidden"
      :class="action.button.class"
      @click="onAction([action, actionName])"
    >
      {{ action.button.text }}
    </action-button>

    <b-modal
      v-if="showModal[currentAction.actionName]"
      v-model="showModal[currentAction.actionName]"
      :id="'modal_' + currentAction.actionName"
      :ref="'modal_' + currentAction.actionName"
      :key="'modal_' + currentAction.actionName"
      :title="currentAction.action.modal.title"
      :size="currentAction.action.modal.size"
      scrollable
      :ok-title="currentAction.action.modal.okTitle"
      :ok-variant="currentAction.action.modal.okVariant"
      @ok="onClickOkModal"
      :ok-disabled="currentAction.action.modal.okDisabled"
      :cancel-title="currentAction.action.modal.cancelTitle"
      :cancel-variant="currentAction.action.modal.cancelVariant"
      @cancel="onClickCancelModal"
      @close="onClickCancelModal"
      buttonSize="sm"
      :modal-class="currentAction.action.modal.class"
      :lazy="true"
      no-close-on-backdrop
      no-close-on-esc
      @shown="onShown"
    >
      <slot
        :name="currentAction.actionName"
        :selectedData="selectedData"
        :onChangeOkDisable="onChangeOkDisable"
      ></slot>
      <template v-slot:modal-footer="{ ok, cancel }">
        <slot :name="'modal_footer' + currentAction.actionName">
          <b-row class="w-100 m-0" v-if="currentAction.action.onBack">
            <b-col class="pl-0">
              <b-button
                :variant="currentAction.action.modal.backVariant"
                @click="onClickBackModal()"
              >
                {{ currentAction.action.modal.backTitle }}
              </b-button>
            </b-col>
            <b-col cols="auto" class="pr-0 mr-1"
              ><b-button
                :variant="currentAction.action.modal.cancelVariant"
                @click="cancel()"
              >
                {{ currentAction.action.modal.cancelTitle }}
              </b-button>
            </b-col>
            <b-col cols="auto" class="pl-0 pr-0 ml-1">
              <b-button
                :variant="currentAction.action.modal.okVariant"
                @click="ok()"
                :disabled="currentAction.action.modal.okDisabled"
              >
                {{ currentAction.action.modal.okTitle }}
              </b-button>
            </b-col>
          </b-row>
        </slot>
      </template>
    </b-modal>
  </div>
</template>

<script>
import menuActionHandler from './menuActionHandler'

export default {
  name: 'CatLocalMenu',
  mixins: [menuActionHandler],
  props: {
    localMenu: {
      type: Object,
      required: true
    }
  },
  computed: {
    listItemMenu() {
      return this.getListItemMenu()
    }
  },
  methods: {
    getListItemMenu() {
      return this.localMenu
    }
  }
}
</script>

<style scoped></style>
