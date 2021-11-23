<template>
  <div v-if="actionMenu" style="display: flex">
    <template v-for="(baseAction, baseActionName) in baseActionConfig()">
      <action-button
        v-if="
          !baseAction.hidden &&
            baseAction !== true &&
            baseActionName !== 'filterTable'
        "
        :key="baseActionName"
        :disabled="baseAction.button.disabled"
        :hidden="baseAction.button.hidden"
        size="sm"
        variant="outline-primary"
        :class="baseAction.button.class"
        @click="onAction([baseAction, baseActionName])"
      >
        <i v-if="baseAction.button.icon" :class="baseAction.button.icon"></i>
        {{ baseAction.button.text }}
      </action-button>
      <b-dropdown
        :key="baseActionName"
        size="sm"
        class="drop-menu-area fm-color-setting ml-1"
        v-if="baseActionName !== 'filterTable' && baseAction === true"
      >
        <template slot="button-content">
          <i class="fa fa-gear drop-menu-btn"></i>
        </template>
        <b-dropdown-item
          class="fm-font-standard"
          v-for="(action, actionName) in actionMenu[baseActionName]"
          v-if="!action.hidden"
          :key="actionName"
          :disabled="action.button.disabled"
          @click="onAction([action, actionName])"
        >
          <i v-if="action.button.icon" :class="action.button.icon"></i>
          {{ action.button.text }}
        </b-dropdown-item>
      </b-dropdown>
    </template>

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
            <b-col cols="auto" class="pr-0 mr-1">
              <b-button
                :variant="currentAction.action.modal.cancelVariant"
                @click="cancel()"
                >{{ currentAction.action.modal.cancelTitle }}</b-button
              >
            </b-col>
            <b-col cols="auto" class="pl-0 pr-0 ml-1">
              <b-button
                :variant="currentAction.action.modal.okVariant"
                @click="ok()"
                :disabled="currentAction.action.modal.okDisabled"
                >{{ currentAction.action.modal.okTitle }}</b-button
              >
            </b-col>
          </b-row>
        </slot>
      </template>
    </b-modal>
  </div>
</template>

<script>
import menuActionHandler from './menuActionHandler'
import * as _ from 'lodash'

export default {
  name: 'CatActionMenu',
  mixins: [menuActionHandler],
  props: {
    actionMenu: {
      required: true,
      baseAction: {
        type: Object
      }
    }
  },
  computed: {
    listItemMenu() {
      return this.getListItemMenu()
    }
  },
  methods: {
    getListItemMenu() {
      let menu = {}
      Object.keys(this.actionMenu).forEach(
        key => (menu = { ...menu, ...this.actionMenu[key] })
      )
      Object.keys(menu).forEach(
        key => typeof menu[key] !== 'object' && delete menu[key]
      )
      return menu
    },
    baseActionConfig() {
      if (
        this.actionMenu.baseAction &&
        this.actionMenu.baseAction.advanceAction == null &&
        this.actionMenu.advanceAction
      ) {
        _.merge(this.actionMenu.baseAction, { advanceAction: true })
      }
      return this.actionMenu.baseAction
    }
  }
}
</script>

<style scoped></style>
