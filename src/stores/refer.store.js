import { defineStore } from 'pinia'

export const useReferStore = defineStore('todoList', {
  state: () => ({
    todoList: [],
    id: 0,
  }),
  actions: {
    addTodo(item) {
        console.log("IN REFER STORE ADD ITEM REFERRAL, ",item);
      this.todoList.push({ item, id: this.id++, completed: false })
    },
    deleteTodo(itemID) {
    this.todoList = this.todoList.filter((object) => {
        return object.id !== itemID;
        });
    },
  },
})



    //localStorage.setItem('referral', JSON.stringify(referral));

