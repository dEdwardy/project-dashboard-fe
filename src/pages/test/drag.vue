<template>
  <div class="container">
    <div class="left-list">
      <draggable v-model="leftList" :group="{ name:'items',pull:'clone',put:false }" class="list-group" item-key="id" clone>
        <template #item="{ element }">
          <div class="list-group-item">
            {{ element.name }}
          </div>
        </template>
      </draggable>
    </div>
    <div class="right-list">
      <draggable v-model="rightList" group="items" class="list-group" item-key="id" :clone="cloneItem" @add="handleAdd">
        <template #item="{ element }">
          <div class="list-group-item">
            {{ element.name }}
            <draggable v-if="element.children" :group="{ name: 'items', put: true }" class="nested-list"
              :list="element.children" item-key="id">
              <template #item="{ element }">
                <div class="nested-list-item">
                  {{ element.name }}
                </div>
              </template>
            </draggable>
          </div>
        </template>
      </draggable>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable';

export default {
  components: {
    draggable
  },
  data () {
    return {
      leftList: [
        { id: 1, name: 'Item 1' },
        { id: 2, name: 'Item 2' }
      ],
      rightList: [
        { id: 3, name: 'Folder 1', children: [{ id: 4, name: 'Sub Item 1' }] },
        { id: 5, name: 'Item 3' }
      ]
    };
  },
  methods: {
    cloneItem (original) {
      // 如果需要，可以克隆被拖拽的项
      const clone = JSON.parse(JSON.stringify(original));
      clone.id = Math.random(); // 生成新的ID
      return clone;
    },
    handleAdd (event) {
      console.error(event)
      const item = event.item;
      const toList = event.to;

      // 如果添加到嵌套列表，则需要特殊处理
      if (toList?.options?.group?.name !== 'items') {
        const parentItem = toList.el[0].__vue__;
        if (!parentItem.children) {
          Vue.set(parentItem, 'children', []);
        }
        parentItem.children.push(item);
      }
    }
  }
};
</script>

<style>
.container {
  display: flex;
}

.list-group {
  cursor: pointer;
  margin-right: 10px;
}

.list-group-item {
  margin-bottom: 5px;
  padding: 5px;
  border: 1px solid #ccc;
}

.nested-list {
  padding-left: 30px;
}

.nested-list-item {
  margin-bottom: 5px;
  padding: 5px;
  border: 1px solid #ccc;
}
</style>
